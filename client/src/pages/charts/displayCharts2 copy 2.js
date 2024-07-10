import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock'; // Import Highstock library
import HighchartsReact from 'highcharts-react-official'; // Import HighchartsReact component
import axios from 'axios';

const Charts2 = () => {
  const [currentData, setCurrentData] = useState([]);
  const [frequencyData, setFrequencyData] = useState([]);
  const [selectedRange, setSelectedRange] = useState('past1day');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://www.qts.iitkgp.ac.in/last/gail/current/fault/2000');
        const data = response.data;

        let filteredData;

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

  const options = {
    chart: {
      zoomType: 'x',
    },
    title: {
      text: 'Current and Frequency',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time',
      },
    },
    yAxis: [
      {
        title: {
          text: 'Current',
        },
      },
      {
        title: {
          text: 'Frequency',
        },
        opposite: true,
      },
    ],
    series: [
      {
        name: 'Current',
        data: currentData,
        turboThreshold: 0, // Disable turboThreshold
      },
      {
        name: 'Frequency',
        data: frequencyData,
        turboThreshold: 0, // Disable turboThreshold
        yAxis: 1, // Use secondary Y-axis
      },
    ],
  };

  return (
    <div>
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
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Charts2;
