import { useEffect, useState } from 'react';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import axios from 'axios';
import Wrapper from '../assets/wrappers/StatsContainer'; // Adjust the import based on your project structure
import StatItem from './StatItem';

const StatsContainer = () => {
  const [stats, setStats] = useState({
    notWorking: 0,
    working: 0,
    faulty: 0,
  });



  

  useEffect(() => {
    fetchJobData();
  }, []);

  const fetchJobData = async () => {
    try {
      const response = await axios.get('/api/v1/jobs');
      const jobData = response.data.jobs;
      const workingCount = jobData.filter((job) => job.status === 'Working').length;
      const faultyCount = jobData.filter((job) => job.status === 'Faulty').length;

      const notWorkingCount = jobData.filter((job) => job.status === 'Not Working').length;

      setStats({
        notWorking: notWorkingCount,
        working: workingCount,
        faulty: faultyCount,
      });
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

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
   <div>
     <Wrapper>
      {defaultStats.map((item, index) => (
        <StatItem key={index} {...item} />
      ))}
    </Wrapper>
   
   </div>
    
  );
};

export default StatsContainer;
