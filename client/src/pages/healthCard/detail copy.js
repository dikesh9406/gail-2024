import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
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





const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2cb1bc",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));






const MotorDetails = () => {

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


//for graph
  useEffect(() => {
    axios.get('http://www.qts.iitkgp.ac.in/last/gail/current/50')
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
        const response = await fetch('http://www.qts.iitkgp.ac.in/last/gail/current/fault/100');
        const data = await response.json();
        // Assuming the JSON structure matches the provided sample
        const newFaultCounts = {};
        data.forEach((item) => {
          if (!newFaultCounts[item.fault]) {
            newFaultCounts[item.fault] = { week: 0, month: 0, year: 0 };
          }
          // Assuming 'week', 'month', 'year' correspond to the fault occurrences
          newFaultCounts[item.fault].week += 1;
          newFaultCounts[item.fault].month += 1;
          newFaultCounts[item.fault].year += 1;
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
        const response = await axios.get(`http://www.qts.iitkgp.ac.in/last/gail/current/fault/123`);
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
  const handleButtonClick = async(rulValue, recentData, faultCounts) => {
    // Create a new instance of jsPDF
    const pdf = new jsPDF();
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    // Add the current date to the PDF
    pdf.setFontSize(10); // Set font size
    pdf.setTextColor(0, 0, 0); // Set text color to black
    pdf.setFont("helvetica", "normal"); // Set font to normal
    pdf.text(`Report Generated on ${formattedDate}`,10, 10); // Add date at the top left corner

    // Add Health Card Report title
    pdf.setFontSize(20); // Set font size
    pdf.setFont("helvetica", "bold"); // Set font to bold
    pdf.text("Health Card Report", 10, 20); // Add Health Card Report title below the date

    pdf.setFontSize(11); // Set font size to 14
    pdf.setTextColor(0, 0, 0); // Set text color to black
    pdf.setFont("helvetica", "bold"); // Set font to bold
    pdf.text(`Motor Name: M12345 `, 10, 30); // Draw the static part of the text
    pdf.text(`Power Rating: 22 KW`, 10, 40); // Draw the static part of the text

    // Add title for fault data table
    let offsetY = 60;
    pdf.text(`Current Condition of Motor: Healthy `, 10, offsetY-10)
    pdf.text(`Estimated Remaining Useful Life (RUL) of Motor: ${rulValue !== null ? rulValue : "___"}  days`, 10, offsetY)// Draw the static part of the text
  ; 
    // pdf.setTextColor(255, 0, 0); // Set text color to red
    // pdf.text(`${rulValue !== null ? rulValue : "___"}  days`, 102, offsetY); // Add RUL value
    // pdf.setTextColor(0, 0, 0); // Set text color to black
    
    pdf.text("Fault Table Summary", 79, offsetY+15);
  
    // Add fault data table to the PDF
    const faultTableColumn = ["Fault Type", "Faults in last 1 week", "Faults in last 1 month", "Faults in last 1 year"];
    const faultTableRows = Object.keys(faultCounts).map(faultType => [
      faultType,
      faultCounts[faultType].week,
      faultCounts[faultType].month,
      faultCounts[faultType].year
    ]);
    pdf.autoTable({
      startY: offsetY + 20,
      head: [faultTableColumn],
      body: faultTableRows,
    });
      pdf.text('Current vs Time', 10, offsetY+80);

    if (currentChartUrl) {
      const currentImage = await loadImage(currentChartUrl);
      pdf.addImage(currentImage, 'PNG', 10, offsetY+80, 180, 60); // Adjusted size and positioning
    }

    pdf.text('Frequency vs Time', 10, offsetY+160); // Positioning the text for the second graph

    if (freqChartUrl) {
      const freqImage = await loadImage(freqChartUrl);
      pdf.addImage(freqImage, 'PNG', 10, offsetY+160, 180, 60); // Adjusted size and positioning
    }
    // Save the PDF
    pdf.save("rul_report.pdf");
};

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
    <React.Fragment>
      <Paper sx={{ m: 2 }}>
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
          Recent data of Motor ID: {data.length > 0 ? data[0].motor_id : ""}
        </Typography>

        
        <TableContainer component={Paper} style={{ maxHeight: "300px" }}>
            <Table aria-label="customized table">
              <TableHead style={{ maxHeight: "300px",   overflowY: "fixed" }}>
                <TableRow>
                  <StyledTableCell>Serial No.</StyledTableCell>
                  <StyledTableCell align="right">Time</StyledTableCell>
                  <StyledTableCell align="right">Current</StyledTableCell>
                  <StyledTableCell align="right">Frequency</StyledTableCell>
                  <StyledTableCell align="right">Frequency_LB</StyledTableCell>
                  <StyledTableCell align="right">Frequency_UB</StyledTableCell>
                  <StyledTableCell align="right">Fault Type</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ maxHeight: "240px", overflowY: "scroll" }}>
                {isLoading ? (
                  <TableRow >
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
                      <StyledTableCell align="right">{item.Time}</StyledTableCell>
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
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
           
         
          </TableContainer>
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
            marginTop:"20px",
            textAlign: "center",
          }}
        >
          Fault Data Of Motor 
        </Typography>
       
        <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table aria-label="faults table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Fault Type</StyledTableCell>
            <StyledTableCell>Faults in last 1 week</StyledTableCell>
            <StyledTableCell>Faults in last 1 month</StyledTableCell>
            <StyledTableCell>Faults in last 1 year</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(faultCounts).map((faultType, index) => (
            <StyledTableRow key={index}>
              <TableCell>{faultType}</TableCell>
              <TableCell>{faultCounts[faultType].week}</TableCell>
              <TableCell>{faultCounts[faultType].month}</TableCell>
              <TableCell>{faultCounts[faultType].year}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       
    

    
      </Paper>
      <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{
            color: "#ffffff",
            backgroundColor: "#2cb1bc",
            display: "block",
            padding: "25px 50px",
            borderRadius: "5px",
            marginBottom: "10px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
            // marginTop: "20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          {/* Edited by Satyajit  */}
          RUL of Motor (in Days): {show_RUL !== null ? show_RUL : "___"}
          <br/>
          <Button variant="contained" onClick={() => handleButtonClick(show_RUL, data, faultCounts)} sx={{ marginLeft: '10px' }}>
          Generate PDF
        </Button>

        </Typography>
      
    </React.Fragment>
    
  );
};

export default MotorDetails;