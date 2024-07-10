import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/system';
import { Grid, Paper } from '@mui/material';
import MotorDetails from './detail';
import Charts from '../charts/displayCharts';
import Charts2 from '../charts/displayCharts2';

import PdfGenerator from "./report";





export default function HealthCard() {
    const {motorId} = useParams();
    return (
       <div>
         <div style={{textAlign:"center", width:"100%"}}>
    <h3 style={{color:"#3f51b5"}}>
        Healthcard
    </h3>
</div>
         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <MotorDetails motorId={motorId}/>
                    </Paper>
                </Grid>
                {/* Chart */}
         
              
                
            
            </Grid>
            <br />
        
<PdfGenerator></PdfGenerator>
          
        </Container>

       </div>
        
    );
}
