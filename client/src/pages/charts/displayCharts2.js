import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import axios from 'axios';
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Legend,
  SplineSeries,
} from 'react-jsx-highcharts';
import { Typography, Button, CircularProgress } from "@mui/material";


const Charts2 = () => {
  const [data, setData] = useState([]);

  const [currentData, setCurrentData] = useState([]);
  const [frequencyData, setFrequencyData] = useState([]);
  const [selectedRange, setSelectedRange] = useState('past1day');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    axios.get('http://www.qts.iitkgp.ac.in/last/gail/current/fault/50')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://www.qts.iitkgp.ac.in/last/gail/current/fault/2000');
        const data = response.data;

        let filteredData;

        // Filter data based on the selected range or date inputs
        if (startDate && endDate) {
          filteredData = filterDataByDateRange(data, new Date(startDate), new Date(endDate));
        } else {
          switch (selectedRange) {
            case 'past1day':
              filteredData = filterDataByTimeRange(data, 1, 'day');
              break;
            case 'past1week':
              filteredData = filterDataByTimeRange(data, 1, 'week');
              break;
            case 'past1month':
              filteredData = filterDataByTimeRange(data, 1, 'month');
              break;
            case 'past1year':
              filteredData = filterDataByTimeRange(data, 1, 'year');
              break;
            default:
              filteredData = data;
          }
        }

        setCurrentData(
          filteredData.map((item) => [new Date(item.Time).getTime(), item.current])
        );
        setFrequencyData(
          filteredData.map((item) => [new Date(item.Time).getTime(), item.freq])
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(fetchData, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedRange, startDate, endDate]);

  const filterDataByTimeRange = (data, value, unit) => {
    const currentDate = new Date();
    const pastDate = new Date();
    switch (unit) {
      case 'day':
        pastDate.setDate(currentDate.getDate() - value);
        break;
      case 'week':
        pastDate.setDate(currentDate.getDate() - value * 7);
        break;
      case 'month':
        pastDate.setMonth(currentDate.getMonth() - value);
        break;
      case 'year':
        pastDate.setFullYear(currentDate.getFullYear() - value);
        break;
      default:
        pastDate.setDate(currentDate.getDate() - value);
    }

    return data.filter((item) => new Date(item.Time) > pastDate);
  };

  const filterDataByDateRange = (data, start, end) => {
    return data.filter((item) => {
      const itemDate = new Date(item.Time);
      return itemDate >= start && itemDate <= end;
    });
  };

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleReset = () => {
    setSelectedRange('past1day');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div>
            <div style={{textAlign:"center", width:"100%"}}>
    <h3 style={{color:"#3f51b5"}}>
        Historical Graph
    </h3>
</div>
            <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{
            color: "#ffffff",
            backgroundColor: "#2cb1bc",
            display: "block",
            padding: "5px 10px",
            borderRadius: "5px",
            marginBottom: "10px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Historical Graph of Motor: {data.length > 0 ? data[0].motor_id : ""}
        </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <select value={selectedRange} onChange={handleRangeChange}>
            <option value="past1day">Past 1 Day</option>
            <option value="past1week">Past 1 Week</option>
            <option value="past1month">Past 1 Month</option>
            <option value="past1year">Past 1 Year</option>
          </select>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div>
          <label>Start Date: </label>
          <input type="date" value={startDate} onChange={handleStartDateChange} />
          <label>End Date: </label>
          <input type="date" value={endDate} onChange={handleEndDateChange} />
        </div>
      </div>

      <HighchartsChart zoomType="x">
        <Chart />
        <Title>Current and Frequency</Title>
        <Legend>
          <Legend.Title>Legend</Legend.Title>
        </Legend>
        <XAxis type="datetime">
          <XAxis.Title>Time</XAxis.Title>
        </XAxis>
        <YAxis>
          <YAxis.Title>Value</YAxis.Title>
          <SplineSeries name="Current" data={currentData} />
          <SplineSeries name="Frequency" data={frequencyData} />
        </YAxis>
      </HighchartsChart>
    </div>
  );
};

export default withHighcharts(Charts2, Highcharts);
