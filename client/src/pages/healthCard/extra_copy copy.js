
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
  if (data[0]?.fault !== "Healthy" && data[0]?.fault !== "N/A") {
    lastFaultBeforeNA = data[0].fault;
  }else if (data[0]?.fault === "N/A" && lastFaultBeforeNA) {
    fault_type = lastFaultBeforeNA;
  }





























const handleButtonClick = async (rulValue, recentData, faultCounts) => {




    // Create a new instance of jsPDF
    const pdf = new jsPDF();
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    // Add the current date to the first page of the PDF
    pdf.setFontSize(10); // Set font size
    pdf.setTextColor(0, 0, 0); // Set text color to black
    pdf.setFont("helvetica", "normal"); // Set font to normal
    pdf.text(`Report Generated on ${formattedDate}`, 10, 10); // Add date at the top left corner

    // Add Health Card Report title to the first page
    pdf.setFontSize(20); // Set font size
    pdf.setFont("helvetica", "bold"); // Set font to bold
    pdf.text("Health Card Report", 10, 20); // Add Health Card Report title below the date

    // Add Life Expectancy Analysis Report title to the first page
    pdf.setFontSize(15); // Set font size
    pdf.setFont("helvetica", "Normal"); // Set font to bold
    pdf.text("Life Expectancy Analysis Report", 10, 28); // Add Health Card Report title below the date

    // Add Machine Details section to the first page
    pdf.setFontSize(15); // Set font size
    pdf.setFont("helvetica", "bold"); // Set font to bold
    pdf.text("Machine Details", 10, 39); // Add Health Card Report title below the date
    // Define data for the motor information and condition
    const motorData = [
        ["Customer:", "GAIL INDIA LIMITED"],
        ["Manufacturer:", "ABB"],
        ["Motor Name:", "M12345"],
        ["Power Rating:", "22 KW"],
        ["Voltage:", "415±10 kV"],
        ["Current:", "40 A"],
        ["Frequency:", "80 Hz"],
        ["Speed:", "1500 rpm"],
        ["No. of poles:", "4"],
        ["Current Condition of Motor:", "Healthy"],
        ["Estimated Remaining Useful Life (RUL) of Motor:", `${rulValue !== null ? rulValue : "___"} days`]
    ];

pdf.setFontSize(13); // Set font size
pdf.setFont("helvetica", "normal"); // Set font to normal
pdf.text(`Current Condition of Motor:", "Healthy`, 10, 190)
pdf.text(`Estimated Remaining Useful Life (RUL) of Motor: ${rulValue !== null ? rulValue : "___"} days`, 10, 200);

  

    // Add motor information and condition table to the first page
    pdf.autoTable({
        body: motorData,
        startY: 42,
        startX: 10,
        theme: 'grid',
        columnStyles: {
            0: { fontStyle: 'bold' }, // First column styling
            1: {} // Second column styling
        },
        margin: { top: 10 }
    });

    // Add title for fault data table to the first page
    let offsetY = 122;
    pdf.text("Fault Table Summary", 10, offsetY + 22);
    // pdf.setFontSize(10); // Set font size
    // pdf.setFont("helvetica", "bold"); // Set font to bold
    // pdf.text("Machine Details", 10, offsetY+130); // Add Health Card Report title below the date

    // Add fault data table to the first page
    const faultTableColumn = ["Fault Type", "Faults in last 1 week", "Faults in last 1 month", "Faults in last 1 year"];
    const faultTableRows = Object.keys(faultCounts).map(faultType => [
        faultType,
        faultCounts[faultType].week,
        faultCounts[faultType].month,
        faultCounts[faultType].year
    ]);
    pdf.autoTable({
        startY: offsetY + 27,
        head: [faultTableColumn],
        body: faultTableRows,
    });
    

    // Add both charts and images to the same page if available
    if (currentChartUrl && freqChartUrl) {
    pdf.setFont("helvetica", "Normal"); // Set font to bold

        pdf.text('Current vs Time', 10, offsetY + 80); // Positioning the text for the first graph
        const currentImage = await loadImage(currentChartUrl);
        pdf.addImage(currentImage, 'PNG', 10, offsetY + 90, 90, 60); // Adjusted size and positioning for the first graph

        pdf.text('Frequency vs Time', 110, offsetY + 80); // Positioning the text for the second graph
        const freqImage = await loadImage(freqChartUrl);
        pdf.addImage(freqImage, 'PNG', 110, offsetY + 90, 90, 60); // Adjusted size and positioning for the second graph
    }

    // Save the PDF
    pdf.save("rul_report.pdf");
};