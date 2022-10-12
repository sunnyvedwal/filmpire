import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Actors, NavBar, Movies, MovieInformation, Profile } from '.';
import useStyles from './styles';

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Routes>
          <Route exact path='/' element={<Movies />} />

          <Route exact path='/profile/:id' element={<Profile />} />

          <Route exact path='/movie/:id' element={<MovieInformation />} />

          <Route exact path='/actors/:id' element={<Actors />} />
        </Routes>
      </main>
    </div>
  );
};
export default App;
