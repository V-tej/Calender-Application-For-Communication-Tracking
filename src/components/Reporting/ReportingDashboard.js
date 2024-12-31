import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2"; // Import for Bar Chart
// Chart.js (for Bar Chart)
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";  // Import Chart.js components
import jsPDF from "jspdf"; // For generating PDF Reports
import Papa from "papaparse"; // For exporting to CSV

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Communication data (for demonstration purposes, you can fetch this dynamically from API)
const communicationsData = [
  { company: "Company A", method: "Email", response: true },
  { company: "Company B", method: "Phone Call", response: false },
  { company: "Company A", method: "LinkedIn Message", response: true },
  { company: "Company C", method: "Email", response: true },
  { company: "Company B", method: "Phone Call", response: true },
  // Add more data as needed
];

// Function to group communications by method
const getMethodFrequency = (communications) => {
  const frequencies = communications.reduce((acc, comm) => {
    acc[comm.method] = acc[comm.method] ? acc[comm.method] + 1 : 1;
    return acc;
  }, {});

  const labels = Object.keys(frequencies);
  const data = Object.values(frequencies);

  return { labels, data };
};

// Generate PDF Report
const generatePDFReport = (communications) => {
  const doc = new jsPDF();
  doc.text("Communications Report", 20, 20);
  let yPos = 30;

  communications.forEach((comm, index) => {
    doc.text(`${comm.company} - ${comm.method}`, 20, yPos);
    yPos += 10;
  });

  doc.save("communication-report.pdf");
};

// Export data to CSV
const exportToCSV = (communications) => {
  const csv = Papa.unparse(communications);
  const link = document.createElement("a");
  link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  link.target = "_blank";
  link.download = "communications.csv";
  link.click();
};

// Engagement Effectiveness (Example data for tracking successful responses)
const getEngagementEffectiveness = (communications) => {
  const successful = communications.filter((comm) => comm.response);
  return (successful.length / communications.length) * 100;
};

const ReportingDashboard = () => {
  const [communicationMethodData, setCommunicationMethodData] = useState({
    labels: [],
    data: [],
  });
  const [effectiveness, setEffectiveness] = useState(0);

  const chartRef = useRef(null); // Create ref to track the chart

  useEffect(() => {
    setCommunicationMethodData(getMethodFrequency(communicationsData));
    setEffectiveness(getEngagementEffectiveness(communicationsData));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reporting and Analytics Dashboard
      </Typography>
      
      {/* Communication Frequency Report */}
      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h6">Communication Frequency Report</Typography>
        <Bar
          ref={chartRef}  // Bind the chart ref to the Bar component
          data={{
            labels: communicationMethodData.labels,
            datasets: [{
              label: "Frequency",
              data: communicationMethodData.data,
              backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            }],
          }}
          options={{
            // You can add custom options here if needed
          }}
        />
      </Paper>

      {/* Engagement Effectiveness Dashboard */}
      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h6">Engagement Effectiveness</Typography>
        <Typography variant="body1">
          Successful Engagement: {effectiveness.toFixed(2)}% of communications received a response.
        </Typography>
      </Paper>

      {/* Export Buttons */}
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => generatePDFReport(communicationsData)}
          >
            Export as PDF
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => exportToCSV(communicationsData)}
          >
            Export as CSV
          </Button>
        </Grid>
      </Grid>

      {/* Overdue Communications & Activity Feed (For expansion) */}
      <Paper sx={{ padding: 2, marginTop: 4 }}>
        <Typography variant="h6">Activity Feed & Overdue Communications</Typography>
        {/* You can add a dynamic feed here based on incoming data */}
        <Typography variant="body2">
          Recent activity will appear here, along with any overdue communication trends.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ReportingDashboard;

