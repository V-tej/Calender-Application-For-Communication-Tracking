import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container, Typography, Badge, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Tooltip, Modal, Box, TextField, MenuItem, Switch, FormControlLabel, Divider } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Custom Modal Styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const UserDashboard = () => {
  // State for companies
  const [companies, setCompanies] = useState([
    {
      name: "Company A",
      lastFiveCommunications: [
        { type: "Email", date: "2023-09-05", notes: "Followed up on proposal details." },
        { type: "Phone Call", date: "2023-08-28", notes: "Discussed pricing options." },
      ],
      nextScheduledCommunication: { type: "Phone Call", date: "2024-01-15" },
      highlightDisabled: false,
    },
    {
      name: "Company B",
      lastFiveCommunications: [
        { type: "LinkedIn Message", date: "2023-10-15", notes: "Answered a query on projects." },
        { type: "Email", date: "2023-09-10", notes: "Shared pricing details." },
      ],
      nextScheduledCommunication: { type: "Email", date: "2024-02-01" },
      highlightDisabled: false,
    },
  ]);

  // State for calendar and notifications
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);  // Make sure this is correct
  const [notifications, setNotifications] = useState({
    overdue: 1, // Example: 1 company has overdue tasks
    today: 1, // Example: 1 company has tasks due today
  });

  // Handle Modal Open/Close
  const handleModalOpen = (company) => {
    setSelectedCompany(company);  // Ensure this function is correctly in scope
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCompany(null);
  };

  // Get Highlight Color
  const getHighlightColor = (nextDate, highlightDisabled) => {
    const today = new Date();
    const nextCommDate = new Date(nextDate);

    if (highlightDisabled) return "bg-transparent"; // If highlight is disabled, return transparent
    
    if (nextCommDate < today) return "bg-red-500"; // red highlight for overdue
    if (
      nextCommDate.getFullYear() === today.getFullYear() &&
      nextCommDate.getMonth() === today.getMonth() &&
      nextCommDate.getDate() === today.getDate()
    )
      return "bg-yellow-300"; // yellow highlight for today
    return "bg-transparent"; // no highlight if neither overdue nor today
  };

  // Handle Disable Highlight Toggle
  const handleToggleHighlight = (index) => {
    const updatedCompanies = companies.map((comp, idx) => {
      if (idx === index) {
        comp.highlightDisabled = !comp.highlightDisabled;
      }
      return comp;
    });
    setCompanies(updatedCompanies);
  };

  // Render Tooltip for Notes
  const renderTooltip = (comm) => comm.notes || "No additional notes recorded.";

  // Log New Communication (Action Modal Submission)
  const handleLogCommunication = () => {
    alert("Communication logged successfully!");
    handleModalClose();
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      {/* Dashboard Header */}
      <Grid container justifyContent="space-between" alignItems="center" marginBottom={4}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#4CAF50" }}>
          User Dashboard
        </Typography>
        <Badge badgeContent={notifications.overdue + notifications.today} color="error">
          <NotificationsIcon fontSize="large" />
        </Badge>
      </Grid>

      {/* Notifications */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4, backgroundColor: "#FFF3E0", border: "1px solid #FFB74D" }}>
        <Typography variant="h6" sx={{ color: "#FF9800", fontWeight: "bold" }}>
          Notifications
        </Typography>
        <Typography color="error">Overdue Communications: {notifications.overdue}</Typography>
        <Typography sx={{ color: "#FFC107" }}>Today's Communications: {notifications.today}</Typography>
      </Paper>

      {/* Calendar View */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4, backgroundColor: "#E3F2FD", border: "1px solid #64B5F6" }}>
        <Typography variant="h6" sx={{ color: "#2196F3", fontWeight: "bold" }}>
          Calendar View
        </Typography>
        <div className="flex justify-center">
          <ReactCalendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={({ date }) => {
              const formattedDate = date.toISOString().split("T")[0];
              const hasCommunication = companies.some((comp) =>
                comp.lastFiveCommunications.some((comm) => comm.date === formattedDate)
              );
              return hasCommunication ? <div style={{ color: "blue" }}>•</div> : null;
            }}
          />
        </div>
        <Typography>Selected Date: {selectedDate.toLocaleDateString()}</Typography>
      </Paper>

      {/* Company Table */}
      <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#F3E5F5", border: "1px solid #AB47BC" }}>
        <Typography variant="h6" sx={{ color: "#8E24AA", fontWeight: "bold", marginBottom: 2 }}>
          Companies
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Last Five Communications</TableCell>
              <TableCell>Next Scheduled Communication</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Disable Highlight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company, index) => (
              <TableRow key={index} className={`${company.highlightDisabled ? "bg-white" : getHighlightColor(company.nextScheduledCommunication.date, company.highlightDisabled)}`}>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {company.lastFiveCommunications.map((comm, idx) => (
                    <Tooltip title={renderTooltip(comm)} arrow key={idx}>
                      <Typography variant="body2" sx={{ cursor: "help", marginBottom: 1 }}>
                        {comm.type} on {new Date(comm.date).toLocaleDateString()}
                      </Typography>
                    </Tooltip>
                  ))}
                </TableCell>
                <TableCell>
                  {company.nextScheduledCommunication.type} on{" "}
                  {new Date(company.nextScheduledCommunication.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleModalOpen(company)}>
                    Log Communication
                  </Button>
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch checked={company.highlightDisabled} onChange={() => handleToggleHighlight(index)} />
                    }
                    label="Disable Highlight"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Modal for Logging Communication */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ color: "#1976D2", fontWeight: "bold" }}>
            Log Communication
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <TextField fullWidth label="Type of Communication" select sx={{ marginBottom: 2 }}>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Phone Call">Phone Call</MenuItem>
            <MenuItem value="LinkedIn Message">LinkedIn Message</MenuItem>
            <MenuItem value="Meeting">Meeting</MenuItem>
          </TextField>
          <TextField fullWidth label="Date of Communication" type="date" InputLabelProps={{ shrink: true }} sx={{ marginBottom: 2 }} />
          <TextField fullWidth label="Notes" multiline rows={3} sx={{ marginBottom: 2 }} />
          <Button variant="contained" fullWidth color="secondary" onClick={handleLogCommunication}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default UserDashboard;


