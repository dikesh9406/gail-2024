import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress } from "@mui/material";
import jsPDF from 'jspdf';
import QuickChart from 'quickchart-js';

const GraphComponent = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChartUrl, setCurrentChartUrl] = useState('');
  const [freqChartUrl, setFreqChartUrl] = useState('');

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

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF();
    pdf.text('Current vs Time', 10, 10);

    if (currentChartUrl) {
      const currentImage = await loadImage(currentChartUrl);
      pdf.addImage(currentImage, 'PNG', 10, 20, 180, 60); // Adjusted size and positioning
    }

    pdf.text('Frequency vs Time', 10, 90); // Positioning the text for the second graph

    if (freqChartUrl) {
      const freqImage = await loadImage(freqChartUrl);
      pdf.addImage(freqImage, 'PNG', 10, 100, 180, 60); // Adjusted size and positioning
    }

    pdf.save('graph.pdf');
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

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Button onClick={handleDownloadPDF} variant="contained" color="primary">
        Download Graph
      </Button>
    </div>
  );
};

export default GraphComponent;
