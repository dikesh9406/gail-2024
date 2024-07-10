import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Custom styled components
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

const TableContainer = styled(Paper)(({ theme }) => ({
  maxHeight: 300,
  overflowY: "scroll",
}));

export default function JobTable() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/v1/jobs')
      .then(response => response.json())
      .then(data => {
        setJobs(data.jobs);
      });
  }, []);

  return (
    <React.Fragment>
      {/* <Typography
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
        List of Motors
      </Typography> */}
      <TableContainer sx={{ m: 2 }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Motor Name</StyledTableCell>
              {/* <StyledTableCell align="right">Motor Status</StyledTableCell> */}
              <StyledTableCell align="right">Motor Type</StyledTableCell>
              <StyledTableCell align="right">HealthCard</StyledTableCell>
              <StyledTableCell align="right">Historical Graph</StyledTableCell>
              <StyledTableCell align="right">Created At</StyledTableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <StyledTableRow key={job._id}>

                <StyledTableCell align="right">{job.company}</StyledTableCell>
                <StyledTableCell align="right">
                  {/* {row.motorType} */}
                  {job.jobType}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/list-of-motors/healthCard/${Math.floor(Math.random() * 100000)}`}>HealthCard</Link> {/* Generates a random number for the link */}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/list-of-motors/historicalGraph`}>Historical Graph</Link>
                </StyledTableCell>
                <StyledTableCell align="right">{new Date(job.createdAt).toLocaleString()}</StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
