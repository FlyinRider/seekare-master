import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';

import { getTimeDiff } from 'app/util/date';

const useStyles = makeStyles({
  root: {},
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10rem',
    height: '10rem',
    '& img': {
      width: '80px',
    },
  },
  timeCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10rem',
    height: '10rem',
    fontWeight: '600',
    fontSize: '1.8rem',
    background: '#68707754',
    border: '1px solid',
    margin: '2rem 1rem',
  },
});

const DownCounter = ({ scheduledDate }) => {
  const classes = useStyles();
  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const timeInterval = setInterval(() => {
      const { days, hours, minutes, seconds } = getTimeDiff(
        new Date(scheduledDate).getTime(),
        Date.now()
      );

      setTimeDiff({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [scheduledDate]);

  return (
    <Box display='flex'>
      <Box className={classes.timeCell}>
        <Box className='number'>{timeDiff.days}</Box>
        <Box>Days</Box>
      </Box>
      <Box className={classes.timeCell}>
        <Box className='number'>{timeDiff.hours}</Box>
        <Box>Hours</Box>
      </Box>
      <Box className={classes.timeCell}>
        <Box className='number'>{timeDiff.minutes}</Box>
        <Box>Minutes</Box>
      </Box>
      <Box className={classes.timeCell}>
        <Box className='number'>{timeDiff.seconds}</Box>
        <Box>Seconds</Box>
      </Box>
    </Box>
  );
};

DownCounter.propTypes = {
  scheduledDate: PropTypes.string,
};

DownCounter.defaultProps = {
  scheduledDate: '2022-02-22',
};

export default DownCounter;
