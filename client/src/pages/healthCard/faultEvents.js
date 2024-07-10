import React, { useEffect, useState } from 'react';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const faultEvents = () => {
  const [faultCounts, setFaultCounts] = useState({
    bearing: [],
    rotorBar: [],
    eccentricity: [],
    endRing: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://www.qts.iitkgp.ac.in/last/gail/current/fault/2000');
        const data = await response.json();
        const newFaultCounts = {
          bearing: [],
          rotorBar: [],
          eccentricity: [],
          endRing: [],
        };

        data.forEach((item, index) => {
          const { fault, startTime, duration } = item;
          const faultInfo = {
            serialNumber: index + 1,
            startTime,
            duration,
          };

          // Exclude "N/A", "healthy", "BRB", "Rotor Bar", "Healthy" fault types
          if (fault !== "N/A" && fault !== "healthy" && fault !== "BRB" && fault !== "Rotor Bar" && fault !== "Healthy") {
            switch (fault) {
              case "bearing":
                newFaultCounts.bearing.push(faultInfo);
                break;
              case "rotorBar":
                newFaultCounts.rotorBar.push(faultInfo);
                break;
              case "eccentricity":
                newFaultCounts.eccentricity.push(faultInfo);
                break;
              case "endRing":
                newFaultCounts.endRing.push(faultInfo);
                break;
              default:
                break;
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

  const renderTable = (faultDetails, title) => (
    <>
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
        {title}
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table aria-label="faults table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial Number</StyledTableCell>
              <StyledTableCell>Start Time</StyledTableCell>
              <StyledTableCell>Duration</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faultDetails.map((detail) => (
              <StyledTableRow key={detail.serialNumber}>
                <TableCell>{detail.serialNumber}</TableCell>
                <TableCell>{detail.startTime}</TableCell>
                <TableCell>{detail.duration}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  return (
    <div>
      {renderTable(faultCounts.bearing, 'Detail of Bearing Fault')}
      {renderTable(faultCounts.rotorBar, 'Detail of Broken Rotor Bar Fault')}
      {renderTable(faultCounts.eccentricity, 'Detail of Ecentricity Fault')}
      {renderTable(faultCounts.endRing, 'Detail of Broken End Ring Fault')}
    </div>
  );
};

export default faultEvents;
