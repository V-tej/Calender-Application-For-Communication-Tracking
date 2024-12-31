import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const AdminDashboard = () => {
  // State for Companies
  const [companies, setCompanies] = useState([]);
  const [companyForm, setCompanyForm] = useState({
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "2 weeks",
  });
  const [editingCompanyIndex, setEditingCompanyIndex] = useState(null);

  // State for Communication Methods
  const initialMethods = [
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Message via LinkedIn", sequence: 2, mandatory: true },
    { name: "Email", description: "Send email to the company", sequence: 3, mandatory: true },
    { name: "Phone Call", description: "Make a phone call to the company", sequence: 4, mandatory: false },
    { name: "Other", description: "Other communication method", sequence: 5, mandatory: false },
  ];
  const [communicationMethods, setCommunicationMethods] = useState(initialMethods);
  const [methodForm, setMethodForm] = useState({
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
  });
  const [editingMethodIndex, setEditingMethodIndex] = useState(null);

  // Handle company form inputs
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm({ ...companyForm, [name]: value });
  };

  // Handle communication method form inputs
  //const handleMethodChange = (e) => {
   // const { name, value } = e.target;
   // const updatedValue = name === "mandatory" ? e.target.checked : value;
   // setMethodForm({ ...methodForm, [name]: updatedValue });
  //};

  // Handle company form submission
  const handleCompanySubmit = (e) => {
    e.preventDefault();
    if (editingCompanyIndex !== null) {
      const updatedCompanies = [...companies];
      updatedCompanies[editingCompanyIndex] = { ...companyForm };
      setCompanies(updatedCompanies);
      setEditingCompanyIndex(null);
    } else {
      setCompanies([...companies, { ...companyForm }]);
    }
    setCompanyForm({
      name: "",
      location: "",
      linkedIn: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      periodicity: "2 weeks",
    });
  };

  // Handle communication method form submission
  const handleMethodSubmit = (e) => {
    e.preventDefault();
    if (editingMethodIndex !== null) {
      const updatedMethods = [...communicationMethods];
      updatedMethods[editingMethodIndex] = {
        ...methodForm,
        sequence: parseInt(methodForm.sequence),
      };
      setCommunicationMethods(updatedMethods);
      setEditingMethodIndex(null);
    } else {
      setCommunicationMethods([
        ...communicationMethods,
        { ...methodForm, sequence: parseInt(methodForm.sequence) },
      ]);
    }
    setMethodForm({ name: "", description: "", sequence: "", mandatory: false });
  };

  // Delete company
  const handleDeleteCompany = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
  };

  // Delete communication method
  const handleDeleteMethod = (index) => {
    const updatedMethods = communicationMethods.filter((_, i) => i !== index);
    setCommunicationMethods(updatedMethods);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom color="primary">
        Admin Dashboard
      </Typography>

      {/* Company Management */}
      <Typography variant="h5" gutterBottom color="secondary">
        Company Management
      </Typography>
      <form onSubmit={handleCompanySubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Company Name"
              name="name"
              value={companyForm.name}
              onChange={handleCompanyChange}
              required
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={companyForm.location}
              onChange={handleCompanyChange}
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="LinkedIn Profile"
              name="linkedIn"
              type="url"
              value={companyForm.linkedIn}
              onChange={handleCompanyChange}
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Emails"
              name="emails"
              value={companyForm.emails}
              onChange={handleCompanyChange}
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone Numbers"
              name="phoneNumbers"
              value={companyForm.phoneNumbers}
              onChange={handleCompanyChange}
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Comments"
              name="comments"
              value={companyForm.comments}
              onChange={handleCompanyChange}
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              fullWidth
              label="Communication Periodicity"
              name="periodicity"
              value={companyForm.periodicity}
              onChange={handleCompanyChange}
              variant="outlined"
              color="primary"
            >
              <MenuItem value="1 week">1 week</MenuItem>
              <MenuItem value="2 weeks">2 weeks</MenuItem>
              <MenuItem value="1 month">1 month</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
            >
              {editingCompanyIndex !== null ? "Edit Company" : "Add Company"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid container spacing={2} marginTop={2}>
        {companies.map((company, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined" sx={{ backgroundColor: '#f9f9f9' }}>
              <CardContent>
                <Typography variant="h6">{company.name}</Typography>
                <Typography>Location: {company.location}</Typography>
                <Typography>LinkedIn: {company.linkedIn}</Typography>
                <Typography>Emails: {company.emails}</Typography>
                <Typography>Phone Numbers: {company.phoneNumbers}</Typography>
                <Typography>Comments: {company.comments}</Typography>
                <Typography>Periodicity: {company.periodicity}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setEditingCompanyIndex(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteCompany(index)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Communication Methods Section */}
      <Typography variant="h5" gutterBottom color="secondary">
        Communication Method Management
      </Typography>
      <form onSubmit={handleMethodSubmit}>
        <TextField
          label="Name"
          value={methodForm.name}
          onChange={(e) => setMethodForm({ ...methodForm, name: e.target.value })}
          fullWidth
          variant="outlined"
          color="primary"
        />
        <TextField
          label="Description"
          value={methodForm.description}
          onChange={(e) => setMethodForm({ ...methodForm, description: e.target.value })}
          fullWidth
          variant="outlined"
          color="primary"
          style={{ marginTop: '10px' }}
        />
        <TextField
          label="Sequence"
          type="number"
          value={methodForm.sequence}
          onChange={(e) => setMethodForm({ ...methodForm, sequence: e.target.value })}
          fullWidth
          variant="outlined"
          color="primary"
          style={{ marginTop: '10px' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={methodForm.mandatory}
              onChange={(e) => setMethodForm({ ...methodForm, mandatory: e.target.checked })}
            />
          }
          label="Mandatory"
          style={{ marginTop: '10px' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{ marginTop: '10px' }}
          fullWidth
        >
          {editingMethodIndex !== null ? "Edit Method" : "Add Method"}
        </Button>
      </form>

      {/* List of Communication Methods */}
      <List style={{ marginTop: '20px' }}>
        {communicationMethods.map((method, index) => (
          <ListItem key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText primary={method.name} secondary={`${method.description} (Sequence: ${method.sequence})`} />
            <div>
              <FormControlLabel
                control={<Checkbox checked={method.mandatory} onChange={() => handleDeleteMethod(index)} />}
                label="Mandatory"
              />
              <Button onClick={() => handleDeleteMethod(index)} color="error" style={{ marginLeft: '10px' }}>
                Delete
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminDashboard;







