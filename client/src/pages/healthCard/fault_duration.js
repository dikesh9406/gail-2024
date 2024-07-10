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




const FaultsTable = () => {
  const [faultData, setFaultData] = useState({});
  const classes = useStyles();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://www.qts.iitkgp.ac.in/last/gail/current/fault/2000');
        const data = await response.json();
        const groupedFaults = processFaultData(data);
        setFaultData(groupedFaults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processFaultData = (data) => {
    const groupedData = {};
    let lastFaultTime = null;
    let lastFaultType = null;

    data.forEach((item) => {
      const faultTime = new Date(item.Time); // Assuming 'Time' is the time of the fault

      // Exclude "N/A", "healthy", "BRB", "Rotor Bar", and "Healthy" fault types
      if (item.fault !== "N/A" && item.fault !== "healthy" && item.fault !== "BRB" && item.fault !== "Rotor Bar" && item.fault !== "Healthy") {
        if (item.fault !== lastFaultType) {
          if (lastFaultType && lastFaultTime) {
            const duration = Math.abs((faultTime - lastFaultTime) / 1000); // Duration in seconds
            if (!groupedData[lastFaultType]) {
              groupedData[lastFaultType] = [];
            }
            groupedData[lastFaultType].push({
              startTime: lastFaultTime,
              duration,
            });
          }
          lastFaultType = item.fault;
          lastFaultTime = faultTime;
        }
      }
    });

    // Push the last fault if it exists
    if (lastFaultType && lastFaultTime) {
      if (!groupedData[lastFaultType]) {
        groupedData[lastFaultType] = [];
      }
      groupedData[lastFaultType].push({
        startTime: lastFaultTime,
        duration: Math.abs((new Date() - lastFaultTime) / 1000), // Duration until now
      });
    }

    return groupedData;
  };

  return (
    <div>
      {Object.keys(faultData).map((faultType, index) => (
        <div key={index}>
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
            Detail of {faultType} Fault
          </Typography>
          <TableContainer component={Paper} className={classes.tableContainer} style={{ maxHeight: "300px", overflowY: "fixed" }}>
          <Table stickyHeader>

              <TableHead>
                <TableRow  style={{fontWeight:"lighter"}}>
                  <StyledTableCell className={classes.stickyHeader} style={{fontWeight:"lighter"}}>Serial Number</StyledTableCell>
                  <StyledTableCell  className={classes.stickyHeader} style={{fontWeight:"lighter"}}>Start Time</StyledTableCell>
                  <StyledTableCell  className={classes.stickyHeader} style={{fontWeight:"lighter"}}>Duration (seconds)</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {faultData[faultType].map((fault, idx) => (
                  <StyledTableRow key={idx}>
                    <StyledTableCell>{idx + 1}</StyledTableCell>
                    <StyledTableCell>{new Date(fault.startTime).toLocaleString()}</StyledTableCell>
                    <StyledTableCell>{fault.duration.toFixed(2)}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
};

export default FaultsTable;
