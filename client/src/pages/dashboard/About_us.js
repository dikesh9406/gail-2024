import React from 'react';
import { Container, Grid, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import sir from '../../assets/images/sir.jpg';
import madam from '../../assets/images/madam.jpg';
import DGM from '../../assets/images/DGM.jpg';
import '../../assets/css/AboutUs.css'; // Import the CSS file for styling

const Wrapper = styled(Container)({
  paddingTop: '2em',
});

const AboutUs = () => {
  return (
    <>
      <Wrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Typography variant="h4" color="primary">
              About Us
            </Typography>
          </Grid>

          {/* <Grid container spacing={2}>
            <Grid item xs={12} sm={4} align="center">
              <Avatar src={sir} sx={{ height: '7em', width: '7em' }} variant="square" />
              <Typography variant="subtitle1">Prof. Aurobinda Routray</Typography>
            </Grid>

            <Grid item xs={12} sm={4} align="center">
              <Avatar src={madam} sx={{ height: '7em', width: '7em' }} variant="square" />
              <Typography variant="subtitle1">Prof M Jenamani</Typography>
            </Grid>

            <Grid item xs={12} sm={4} align="center">
              <Avatar src={DGM} sx={{ height: '7em', width: '7em' }} variant="square" />
              <Typography variant="subtitle1">T. P. Yuvraj</Typography>
            </Grid>
          </Grid> */}

          <Grid item xs={12}>
            <div className="text-section">
            <Typography variant="h6" sx={{ overflow: 'hidden',  textAlign:'justify', marginTop: '1em' }}>
                This project proposes the development of an integrated cloud-based AI-enabled IoT platform for the continuous 
                monitoring, diagnosis, and prognosis of faults in electric motors and drives. This platform aims to provide 
                real-time data streaming through IoT-based sensors, facilitating preemptive fault detection and efficient 
                condition monitoring.
              </Typography>
              <Typography variant="h6" sx={{ overflow: 'hidden',   textAlign:'justify', marginTop: '1em' }}>
                Electric motor drives, which include motors and converters, are essential components in various industries, 
                including the natural gas pumping stations operated by GAIL (India) Limited. Traditional maintenance practices 
                for these motors are predominantly based on periodic supervision and servicing, which can lead to unnecessary 
                expenses and potential operational failures if a fault occurs before the next scheduled maintenance. To address 
                these challenges, there is a need for a condition-based maintenance approach that can detect faults at an early 
                stage, thereby improving the reliability and integrity of the motor drives and preventing unwarranted downtime.
              </Typography>
            
              <Typography variant="h5" sx={{ overflow: 'hidden', fontWeight:'bold', textAlign:'justify', marginTop: '1em' }}>
                Objectives:
              </Typography>
              <Typography variant="h6" sx={{ overflow: 'hidden', textAlign:'justify', marginTop: '1em' }}>
              The primary objectives of this project are as follows:
              </Typography>
              <Typography variant="h6" sx={{ overflow: 'hidden',  textAlign:'justify', marginLeft: '2em' }}>
                1. <span style={{fontWeight:'bold'}}>Design, develop, and test a prototype edge device</span> equipped with a single sensor for the diagnosis, prognosis, 
                and event detection of 3-phase constant/variable speed induction motor drives with IoT-based communication.
              </Typography>
              <Typography variant="h6" sx={{ overflow: 'hidden',  textAlign:'justify', marginLeft: '2em' }}>
                2. <span style={{fontWeight:'bold'}}>Develop algorithms for anomaly detection</span> in time-domain, time-frequency domain, and spectral domain.
              </Typography>
              <Typography variant="h6" sx={{ overflow: 'hidden',  textAlign:'justify', marginLeft: '2em' }}>
                3. <span style={{fontWeight:'bold'}}>Create cloud-based AI-enabled algorithms</span> for signal processing, analysis, and classification for fault 
                characterization and root cause analysis based on benchmarked motor fault signatures.
              </Typography>
              <Typography variant="h6" sx={{ overflow: 'hidden',  textAlign:'justify', marginLeft: '2em' }}>
                4. <span style={{fontWeight:'bold'}}>Develop a working prototype of an IoT-based edge device</span> to capture and analyze motor current signatures.
              </Typography>
              <Typography variant="h6" sx={{ overflow: 'hidden',  textAlign:'justify', marginLeft: '2em' }}>
                5. <span style={{fontWeight:'bold'}}>Establish communication methodologies</span> for transferring current signatures through cloud-based data storage 
                and processing, and test wireless sensor network communication for data transfer to workstations.
              </Typography>
              <Typography variant="h6" sx={{ overflow: 'hidden',  textAlign:'justify', marginLeft: '2em' }}>
                6. <span style={{fontWeight:'bold'}}>Develop a basic Graphical User Interface (GUI) and mobile applications</span> for displaying faults, motor 
                parameters, and alarms.
              </Typography>
              <Typography variant="h6" sx={{ overflow: 'hidden',  textAlign:'justify', marginLeft: '2em' }}>
                7. <span style={{fontWeight:'bold'}}>Experimentally verify the diagnosis and prognosis of various faults</span> in induction motors at IIT-KGP through 
                AI-based software in both steady-state and transient conditions. These faults include:
        
      <div style={{marginLeft:'40px'}}>
      <li>Inter-turn short circuit</li>
                <li>Broken or cracked rotor bar</li>
                <li>Broken or cracked end ring</li>
                <li>Static and dynamic eccentricity</li>
                <li>Bearing faults</li>
                <li>Ground faults</li>
                <li>Misalignment or imbalance</li>
                <li>Foundation looseness</li>
          
      </div>
              
              </Typography>
             
            </div>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default AboutUs;
