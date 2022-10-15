import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  IconButton,
  Avatar,
  Toolbar,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useTheme } from '@mui/material/styles';
import { Sidebar, Search } from '..';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  const dispatch = useDispatch();

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);
  return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color='inherit'
              edge='start'
              style={{ outline: 'none' }}
              onClick={() => {
                setMobileOpen((prevMobileOpen) => !prevMobileOpen);
              }}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color='inherit' sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {!isMobile && <Search />}

          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color='inherit'
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt='Profile'
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAB6CAMAAABHh7fWAAAAOVBMVEWVu9////+QuN6Mtt37/P7w9frH2u3e6fTm7veox+Styub3+vymxeSgweKxzOfB1uzP3/DY5fO40OmLyUIUAAADbklEQVRoge2bbZOrIAyFMYD4hqj//8de0bpt3RYTe7idO9fzaXdmZx6DIQmHValLly5diiLSpHxX151X84/018DaN2VlW2OKwpjWVmXj9d/gEnWuLXZqXZ0/dF1Xe+6qqs4bOdH4Ghw15gycOvOePL/4LhubmhQ4qsnEPiZnY/vkat/W3Ocg05vUflaVIWwKHHJRhAzsX3XktVo4mEoeuShKdNjEDHoOG43uueSi6LHkVAHda8SGrdnrPa84uI/wyUUBBZPgVc8vG7ni3HqyClpVaJCgByhakODgFCcnQTsomtW1NkG71zfRX1zwL6bZFzcXu1tHQTv2Fwup8hI0dirVEjS2aWrLJ1swWjKlYNGSromexGs+usaSlWYcuFYZ9BFfs6u4Q6Np4qIn+KGLc8Rd1ht/zOWuOHy9+WUcW8BvYhU0mwHMrCo5TvaKFXaWoHlhZwpa0WHYNpdnR90ROp9dqA+mwyGjQ6uTR4EqqzecOobkcOue9JZdZQbPejMqjRmR23LS9KKHmZ9WiV91osnemhKpYQc3w42onZ2wdwGkaWgfUnh+jocW6n5oywZoh3gTBeKqsOWW3daTtFbNFMLUKL2B6KfIV0EB6A/c9Z3e9y4tuv/lUw5E+kdg6sZ9TrnX12na76cYM35QVunlRjKj32cSkf/1iOuGOwmn7l2nqoK/Lfey5D68qzP2ZODJGdS6IUx9P4XBpVrpufmUf95I6cxZhH/cSEs+HJPgfJdWLX3dMpMuJXEvPZyF+OqEQYs8urSkDp7AOzmScDaHJVmUyGaQGZNHEhmXEq/qWCI3ywuutY7VSqop435eooZPlt0tHUtwCJR4gxwJ/ENslsnyDNIv7zJ8MrSgRLGLCt+e44pt48luOjhi34agBpS72KMKOsEFKS666OCJvbvwaC4ZOBxtYg5Jsvs0npimLbp5RDEbCH5bszc2djpaxZyRkIPwJuZAjC9m7HKWdiPPielh/p/oL24u6IFrleB2wEGHM+PY4OiClbDIbSn8x3XSNYJuy/qMZUnah4+qiwv+vFVKWnfh9//fH6uN2I8t2ugH9mlj7knWDb0imCu+2JFNcJVNpL6xlQuNB2IfHiB+7FH35VhZG7+9WD6+MO38SzWWfb18AgKHPj0AUXyLPn5xEr85iUSdI9JLly79e/oDqEwmCclTXRgAAAAASUVORK5CYII='
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant='temporary'
              anchor='right'
              open={mobileOpen}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant='permanent'
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
