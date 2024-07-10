import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const useStyles = styled({
    tableContainer: {
      maxHeight: 400,  // Set the desired height
      backgroundColor: '#1cb1bc',
    },
    stickyHeader: {
      position: 'sticky',
      top: 0,
      backgroundColor: '#1cb1bc',  // Add background color for sticky header
      zIndex: 1,
      color: '#ffffff',  // Text color for better contrast
    },
    '@media (max-width: 600px)': {
      tableCell: {
        padding: '4px',  // Reduce padding for smaller screens
        fontSize: '8px',  // Reduce font size for smaller screens
      },
    },
  });
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'lighter',
    '&.MuiTableCell-head': {
      backgroundColor: '#1cb1bc',  // Set background color for table head
      color: '#ffffff',  // Text color for better contrast
    },
    [theme.breakpoints.down('sm')]: {
      padding: '4px',  // Reduce padding for smaller screens
      fontSize: '8px',  // Reduce font size for smaller screens
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    [theme.breakpoints.down('sm')]: {
      padding: '4px',  // Reduce padding for smaller screens
      fontSize: '8px',  // Reduce font size for smaller screens
    },
  }));
  

const MotorDetail = () => {
  const [tableData, setTableData] = useState([]);
  const [motorData, setMotorData] = useState([]);
  

  useEffect(() => {
    fetchTableData();
  }, []);

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  const fetchTableData = async () => {
    try {
      const response = await axios.get('/api/v1/jobs'); // Replace with your backend route URL
      setTableData(response.data);
      const res = await axios.get('http://www.qts.iitkgp.ac.in/last/gail/current/fault/5'); // Replace with your backend route URL
      
      
      const recentData = response.data.jobs[response.data.jobs.length - 1] || {};
      const data=res.data[0] || {};
      const motorData = [
        ["Customer:", "GAIL INDIA LIMITED"],
        ["Manufacturer:", recentData.position || 'N/A'],
        ["Motor Name:", recentData.company || 'N/A'],
        ["Power Rating:", `${recentData.Power_Rating || 'N/A'} kW`],
        ["Rated Voltage:", `${recentData.Voltage || 'N/A'} V`],
        ["Rated Current:", `${recentData.Current || 'N/A'} A`],
        ["Rated Frequency:", `${recentData.Frequency || 'N/A'} Hz`],
        ["Speed:", `${recentData.Speed || 'N/A'} rpm`],
        ["No. of poles:", recentData.No_of_poles || 'N/A'],
        ["Time:", formatTime(data.Time) || 'N/A'],
        ["Design Life:", recentData.Disign_Life || 'N/A'],
      ];
      setMotorData(motorData);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  return (
    <div>
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
        Nameplate Details
      </Typography>
      <TableContainer component={Paper} style={{ maxHeight: "300px", overflowY: "auto", overflowX: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Parameter</StyledTableCell>
              <StyledTableCell>Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {motorData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">{row[0]}</StyledTableCell>
                <StyledTableCell>{row[1]}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MotorDetail;
