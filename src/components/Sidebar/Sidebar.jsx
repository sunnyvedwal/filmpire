import React, { useEffect } from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStyle from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';

const blueLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const Sidebar = ({ setMobileOpen }) => {
  const { data, isFetching } = useGetGenresQuery();
  const theme = useTheme();
  const classes = useStyle();
  console.log(data);

  return (
    <>
      <Link to='/' className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'dark' ? redLogo : blueLogo}
          alt='logo'
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to='/'>
            <ListItem onClick={() => {}} button>
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  alt=''
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display='flex' justifyContent='center'>
            <CircularProgress size='4rem' />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to='/'>
              <ListItem onClick={() => {}} button>
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    alt=''
                    className={classes.genreImage}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;