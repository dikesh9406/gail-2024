import { JobsContainer, SearchContainer, GraphC } from '../../components'
import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer, Loading, ChartsContainer } from '../../components'
import Faults from './faults';
import React, { useState } from 'react';
import axios from 'axios';
// import Chart from '../charts/usd'

// import Faults from "./faults";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Item = styled.div`
  flex: 0 0 auto;
  width: ${(props) => (props.xs ? `${(props.xs / 12) * 100}%` : "100%")};
  padding: 8px;
`;


const AllJobs = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await axios.get('/api/v1/jobs'); // Replace with your backend route URL
    //  
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
    
  };
  return (
    <>
         <div style={{textAlign:"center", width:"100%"}}>
    <h3 style={{color:"#3f51b5"}}>
        List of Motors
    </h3>
</div>
     <Container>
      <Item xs={12}>
        <Faults data={tableData} />

      </Item>
    </Container>
      <SearchContainer />
      <JobsContainer />

     
    </>
  )
}

export default AllJobs
