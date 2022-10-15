import React from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import useStyles from './styles';

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const classes = useStyles();
  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        type='button'
        onClick={handlePrev}
      >
        Prev
      </Button>
      <Typography variant='h4' className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        type='button'
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
