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

const SignUpUserAnalysis = ({ labels, data, loading }) => {
  const classes = useStyles();

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
  // : user?.data || []
  // : user?.labels
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Weekly User SignUp Analyis',
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
          labelId='demo-simple-select-label'
          id='demo-simple-select'
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

export default SignUpUserAnalysis;
