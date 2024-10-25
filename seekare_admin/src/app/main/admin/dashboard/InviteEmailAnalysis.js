import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  InputLabel,
  Box,
  MenuItem,
  makeStyles,
  Select,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles({
  inputSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '&>label': {
      marginRight: '15px',
    },
  },
});

const InviteEmailAnalysis = ({ labels, data, loading }) => {
  const classes = useStyles();
  // const state = {
  //   labels: ['January', 'February', 'March', 'April', 'May'],
  //   datasets: [
  //     {
  //       label: 'Questions(k)',
  //       fill: false,
  //       lineTension: 0.5,
  //       backgroundColor: 'rgba(75,192,192,1)',
  //       borderColor: 'rgba(0,0,0,1)',
  //       borderWidth: 2,
  //       data: [65, 59, 80, 81, 56],
  //     },
  //   ],
  // };

  const chartOptions = useMemo(
    () => ({
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }),
    []
  );
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Weekly Invitation Email Analyis',
        data,
        fill: false,
        backgroundColor: '#04AA6D',
        borderColor: '#04AA6D28',
        tension: 0,
      },
    ],
  };
  const [dataType, setDataType] = React.useState('week');

  const handleChange = (event) => {
    setDataType(event.target.value);
  };
  return loading ? (
    <CircularProgress />
  ) : (
    <Box>
      <Box className={classes.inputSection}>
        <InputLabel>Duration</InputLabel>
        <Select
          labelId='invite-email-range-label'
          id='invite-email-range'
          value={dataType}
          onChange={handleChange}
        >
          <MenuItem value='day'>Day</MenuItem>
          <MenuItem value='week'>Week</MenuItem>
          <MenuItem value='month'>Month</MenuItem>
          <MenuItem value='quater'>Quater</MenuItem>
          <MenuItem value='year'>Year</MenuItem>
        </Select>
      </Box>
      <Line data={chartData} options={chartOptions} />
    </Box>
  );
};

export default InviteEmailAnalysis;
