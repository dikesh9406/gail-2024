import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Highcharts from 'highcharts';
import { FormRow, FormRowSelect, Alert } from '../../components';
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
      <Typography>Historical Graph:</Typography>
      <form className="form">
        <h3>Historical Graph:</h3>
        <div className="form-center">
          <FormRow
            type="date"
            value={startDate}
            style={{ color: 'gray' }}
            labelText='Start Date'

            handleChange={handleStartDateChange}

          />
          <FormRow
            type="date"
            value={endDate}
            style={{ color: 'gray' }}
            labelText='End Date'

            handleChange={handleEndDateChange}

          />
        <button onClick={handleReset} className='btn' style={{ marginLeft: '10px' }}>Reset</button>

        </div>
      </form>
      {/* <div className='form'>
        <select value={selectedRange} onChange={handleRangeChange}>
          <option value="past1day">Past 1 Day</option>
          <option value="past1week">Past 1 Week</option>
          <option value="past1month">Past 1 Month</option>
          <option value="past1year">Past 1 Year</option>
        </select>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div >
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                style={{ color: 'gray' }}
                onChange={handleStartDateChange}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                style={{ color: 'gray' }}
                onChange={handleEndDateChange}
              />
            </label>
          </div>
        </div>
        <button onClick={handleReset} className='btn' style={{ marginLeft: '10px' }}>Reset</button>

      </div> */}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Current</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HighchartsChart>
            <Chart />

            <Title>Current</Title>

            <Legend>
              <Legend.Title>Legend</Legend.Title>
            </Legend>

            <XAxis type="datetime">
              <XAxis.Title>Time</XAxis.Title>
            </XAxis>

            <YAxis>
              <YAxis.Title>Current</YAxis.Title>
              <SplineSeries name="Current" data={currentData} />
            </YAxis>
          </HighchartsChart>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Frequency</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HighchartsChart>
            <Chart />

            <Title>Frequency</Title>

            <Legend>
              <Legend.Title>Legend</Legend.Title>
            </Legend>

            <XAxis type="datetime">
              <XAxis.Title>Time</XAxis.Title>
            </XAxis>

            <YAxis>
              <YAxis.Title>Frequency</YAxis.Title>
              <SplineSeries name="Frequency" data={frequencyData} />
            </YAxis>
          </HighchartsChart>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default withHighcharts(Charts2, Highcharts);
