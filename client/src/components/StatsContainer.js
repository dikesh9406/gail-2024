import { useEffect, useState } from 'react';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import axios from 'axios';
import Wrapper from '../assets/wrappers/StatsContainer'; // Adjust the import based on your project structure
import StatItem from './StatItem';

const StatsContainer = () => {
  const [stats, setStats] = useState({
    working: 0,
    faulty: 0,
    notWorking: 0,
  });

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get('/api/v1/jobs');
        const jobData = response.data.jobs;
        const res = await axios.get('http://www.qts.iitkgp.ac.in/last/gail/current/fault/1');
        const data = res.data;
        let working = 0, faulty = 0, notWorking = 0;
        const totalCount = jobData.length;

        if (data.length > 0) {
          const firstData = data[0];
          const fault = firstData.fault;

          // Check fault status and update jobType based on the first item
          if (fault === 'N/A') {
            notWorking = totalCount;
          } else if (fault === 'Healthy') {
            working = totalCount;
          } else {
            faulty = totalCount;
          }
        }

        setStats({
          working,
          faulty,
          notWorking,
        });
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobData();
  }, []);

  const defaultStats = [
    {
      title: 'Number of Motors under Working Condition',
      count: stats.working,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Number of Motors with Fault Signature',
      count: stats.faulty,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'Number of Motors not Working',
      count: stats.notWorking,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => (
        <StatItem key={index} {...item} />
      ))}
    </Wrapper>
  );
};

export default StatsContainer;
