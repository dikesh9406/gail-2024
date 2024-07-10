import React, { useEffect, useState } from "react";
import { styled, makeStyles } from "@mui/material/styles";
import { Typography, Button, CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Chart from 'chart.js/auto';
import QuickChart from 'quickchart-js';
import motor from "./images/motor.png"
import PdfGenerator from "./report";
import faultEvents from "./faultEvents";
import FaultsTable from "./fault_duration";
import MotorDetail from "./Motor_details";
import Charts from '../charts/displayCharts';



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
      padding: '0px',  // Reduce padding for smaller screens
      fontSize: '8px',  // Reduce font size for smaller screens
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'lighter',
  '&.MuiTableCell-head': {
    backgroundColor: '#2cb1bc',  // Set background color for table head
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





const MotorDetails = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllData, setShowAllData] = useState(true);
  const [show_RUL, setRUL] = useState()
  const [faultCounts, setFaultCounts] = useState({
    'Broken Rotor Bar': { week: 0, month: 0, year: 0 },
    'Broken End Ring': { week: 0, month: 0, year: 0 },
    'Eccentricity': { week: 0, month: 0, year: 0 },
    'Bearing': { week: 0, month: 0, year: 0 },
    'Inter-turn Short Circuit': { week: 0, month: 0, year: 0 }
  });
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChartUrl, setCurrentChartUrl] = useState('');
  const [freqChartUrl, setFreqChartUrl] = useState('');
  const [faultDetails, setFaultDetails] = useState({
    'Bearing': [],
    'Broken Rotor Bar': [],
    'Eccentricity': [],
    'Broken End Ring': []
  });
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

  // Determine the current condition of the motor and print the appropriate message
  let currentCondition = "";
  let lastFaultBeforeNA = "";
  let fault_type = "";

  // Loop through the data to find the last fault before any 'N/A'

  for (let i = 0; i < data.length; i++) {
    if (data[i].fault !== "N/A" && data[i].fault !== "Healthy" && data[i].fault !== "BRB" && data[i].fault !== "Rotor Bar") {
      lastFaultBeforeNA = data[i].fault;
      break;
    }
  }
  // Determine the current condition based on the first element's fault status
  if (data[0]?.fault === "Healthy") {
    currentCondition = "Operational Without Fault Signature";
  } else if (data[0]?.fault === "N/A") {
    currentCondition = "Not Operational";
  } else {
    currentCondition = "Operational with Fault Signature";
  }

  // Set the fault type based on conditions

  //////////////////
  //for graph
  useEffect(() => {
    axios.get('http://www.qts.iitkgp.ac.in/last/gail/current/fault/50')
      .then(response => {
        setDatas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  //for graph
  useEffect(() => {
    if (datas.length > 0) {
      const times = datas.map(item => new Date(item.Time).toLocaleDateString()); // Convert time to date only
      const currents = datas.map(item => item.current);
      const freqs = datas.map(item => item.freq);

      const currentChart = new QuickChart();
      currentChart.setConfig({
        type: 'line',
        data: {
          labels: times,
          datasets: [{
            label: 'Current vs Time',
            data: currents,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
            cubicInterpolationMode: 'monotone', // Use monotone interpolation for spline curve
          }]
        }
      });
      setCurrentChartUrl(currentChart.getUrl());

      const freqChart = new QuickChart();
      freqChart.setConfig({
        type: 'line',
        data: {
          labels: times,
          datasets: [{
            label: 'Frequency vs Time',
            data: freqs,
            borderColor: 'rgba(153,102,255,1)',
            fill: false,
            cubicInterpolationMode: 'monotone', // Use monotone interpolation for spline curve
          }]
        }
      });
      setFreqChartUrl(freqChart.getUrl());
    }
  }, [datas]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://www.qts.iitkgp.ac.in/last/gail/current/fault/2000');
        const data = await response.json();
        const newFaultCounts = {};

        // Variable to track the last fault type
        let lastFaultType = null;

        data.forEach((item) => {
          // Exclude "N/A" and "healthy" fault types
          if (item.fault !== "N/A" && item.fault !== "healthy" && item.fault !== "BRB" && item.fault !== "Rotor Bar" && item.fault !== "Healthy") {
            if (item.fault !== lastFaultType) {
              if (!newFaultCounts[item.fault]) {
                newFaultCounts[item.fault] = { week: 0, month: 0, year: 0 };
              }
              // Assuming 'week', 'month', 'year' correspond to the fault occurrences
              newFaultCounts[item.fault].week += 1;
              newFaultCounts[item.fault].month += 1;
              newFaultCounts[item.fault].year += 1;

              // Update the last fault type
              lastFaultType = item.fault;
            }
          }
        });

        setFaultCounts(newFaultCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  //Edited by Satyajit for RUL Calculation

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hello");
        const response = await axios.get(`http://www.qts.iitkgp.ac.in/last/gail/current/fault/500`);
        setData(response.data); // Store all the fetched data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };



    //  Edited by Satyajit 
    const fetchRUL = async () => {
      try {
        const response = await axios.get("http://www.qts.iitkgp.ac.in/predict_rul_database");
        setRUL(response.data.predictions); // Update RUL state with the 'predictions' key
      } catch (error) {
        console.error("Error fetching RUL data:", error);
      }
    };


    // Set up intervals for regular data and RUL fetch
    const interval = setInterval(fetchData, 5000);
    const rulInterval = setInterval(fetchRUL, 5000); //  Edited by Satyajit 

    return () => {
      clearInterval(interval);
      clearInterval(rulInterval);//  Edited by Satyajit 
    };
  }, []);



  const showAllDataHandler = () => {
    setShowAllData(!showAllData);
  };

  //pdf report






  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
    });
  };


  const displayedData = showAllData ? data : data.slice(0, 5);

  return (
    <div>
      <Typography
        component="h1"
        variant="h5"
        align="center"
        sx={{
          display: "block",
          padding: "5px 10px",
          borderRadius: "5px",
          marginBottom: "10px",

          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "left"
        }}
      >

        Motor ID: {data.length > 0 ? data[0].motor_id : ""}

      </Typography>
      <React.Fragment>
        <Paper sx={{ m: 2 }}>
          <MotorDetail></MotorDetail>
          <br />

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
              textAlign: "center",
            }}
          >
            Recent data of Motor
          </Typography>


          <TableContainer component={Paper} className={classes.tableContainer} style={{ maxHeight: "300px", overflowY: "fixed" , backgroundColor: "2cb1bc" }}>
            <Table stickyHeader>

              <TableHead style={{ maxHeight: "300px", overflowY: "fixed", backgroundColor: "2cb1bc" }}>
                <TableRow style={{ fontWeight: "lighter" , backgroundColor:'#1cb1bc'}}>

                  <StyledTableCell className={classes.stickyHeader} style={{ fontWeight: "lighter" }}>Serial No.</StyledTableCell>
                  <StyledTableCell className={classes.stickyHeader} style={{ fontWeight: "lighter" }} align="right">Current</StyledTableCell>
                  <StyledTableCell className={classes.stickyHeader} style={{ fontWeight: "lighter" }} align="right">Frequency</StyledTableCell>
                  <StyledTableCell className={classes.stickyHeader} style={{ fontWeight: "lighter" }} align="right">Frequency_LB</StyledTableCell>
                  <StyledTableCell className={classes.stickyHeader} style={{ fontWeight: "lighter" }} align="right">Frequency_UB</StyledTableCell>
                  <StyledTableCell className={classes.stickyHeader} style={{ fontWeight: "lighter" }} align="right">Fault Type</StyledTableCell>
                  <StyledTableCell className={classes.stickyHeader} style={{ fontWeight: "lighter" }} align="right">Time</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody >
                {isLoading ? (
                  <TableRow  >
                    <TableCell colSpan={5} align="center">
                      <CircularProgress
                        color="primary"
                        sx={{ color: "#2cb1bc" }}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedData.map((item, index) => (
                    <StyledTableRow key={item.Reading_id}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.current}
                      </StyledTableCell>
                      <StyledTableCell align="right">{item.freq}</StyledTableCell>
                      <StyledTableCell align="right">
                        {item.freq_lb}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.freq_ub}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.fault}
                      </StyledTableCell>
                      <StyledTableCell align="right">{formatTime(item.Time)}</StyledTableCell>

                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>



          </TableContainer>
          <br />
          <Charts />
          {/* <Charts2/> */}


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
            Fault Summary
          </Typography>

          <TableContainer component={Paper} className={classes.tableContainer} style={{ maxHeight: "300px", overflowY: "fixed" }}>

            <Table stickyHeader>

              <TableHead style={{ maxHeight: "300px", overflowY: "fixed", backgroundColor: "2cb1bc" }}>

                <TableRow style={{ fontWeight: "lighter" }}>

                  <StyledTableCell className={classes.stickyHeader}>Fault Type</StyledTableCell>
                  <StyledTableCell className={classes.stickyHeader}>Faults in last 1 week</StyledTableCell>
                  <StyledTableCell className={classes.stickyHeader}>Faults in last 1 month</StyledTableCell>
                  <StyledTableCell className={classes.stickyHeader}>Faults in last 1 year</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(faultCounts).map((faultType, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{faultType}</StyledTableCell>
                    <StyledTableCell>{faultCounts[faultType].week}</StyledTableCell>
                    <StyledTableCell>{faultCounts[faultType].month}</StyledTableCell>
                    <StyledTableCell>{faultCounts[faultType].year}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <FaultsTable></FaultsTable>




        </Paper>
        

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
            Summary and Recommendation:
          </Typography>

          <Typography
            variant="h6"
            sx={{
              display: "block",
              // padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
              width: "fit-content",
              marginLeft: "15px",
              marginRight: "auto",
              // Responsive styles
              '@media screen and (max-width: 600px)': {
                // marginLeft: "0px",
                marginRight: "0px",
                width: "100%", // Expand to full width on smaller screens
                fontSize: "8px",
              },
            }}
          >
            <p style={{ marginBottom: "0px", fontWeight: "bold" }}></p>
            <TableContainer >
      <Table>
        <TableBody >
          <TableRow >
            <TableCell>Last Fault Type:</TableCell>
            <TableCell >{lastFaultBeforeNA} Fault</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Current Condition of Motor:</TableCell>
            <TableCell>{currentCondition}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Approximate RUL of Motor (in Days):</TableCell>
            <TableCell>{show_RUL !== null ? show_RUL : "___"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

            <p style={{ textAlign: "justify" }}>
              Analysis shows sign of bearing fault, due to wear and tear. To ensure optimal performance and prevent potential breakdown it is suggested to run a maintenance program to check the driving end and non-driving end bearings.
            </p>
          </Typography>




       
      </React.Fragment>
    </div>

  );
};

export default MotorDetails;