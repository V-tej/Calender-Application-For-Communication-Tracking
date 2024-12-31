import React, { useState } from 'react';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';
import ReportingDashboard from './components/Reporting/ReportingDashboard';

const CompanyManagementApp = () => {
  const [activeTab, setActiveTab] = useState('admin'); // Default active tab is 'admin'

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Calendar Application for Communication Tracking</h1>

      {/* Navigation buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <button
          onClick={() => handleTabSwitch('admin')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'admin' ? '#4caf50' : '#e0e0e0',
            color: activeTab === 'admin' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s',
          }}
        >
          Admin Dashboard
        </button>
        <button
          onClick={() => handleTabSwitch('user')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'user' ? '#2196f3' : '#e0e0e0',
            color: activeTab === 'user' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s',
          }}
        >
          User Dashboard
        </button>
        <button
          onClick={() => handleTabSwitch('reporting')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'reporting' ? '#ff9800' : '#e0e0e0',
            color: activeTab === 'reporting' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s',
          }}
        >
          Reporting Dashboard
        </button>
      </div>

      {/* Conditional rendering for dashboards */}
      <div
        style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {activeTab === 'admin' && <AdminDashboard />}
        {activeTab === 'user' && <UserDashboard />}
        {activeTab === 'reporting' && <ReportingDashboard />}
      </div>
    </div>
  );
};

export default CompanyManagementApp;
