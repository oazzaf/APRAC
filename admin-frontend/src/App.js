// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageUsersPage from './pages/ManageUsersPage';
import ManageVehiclesPage from './pages/ManageVehiclesPage';
import ManagePiecesPage from './pages/ManagePiecesPage';
import ManageDevisPage from './pages/ManageDevisPage';
import ManageSchedulePage from './pages/ManageSchedulePage'; // Importing ManageSchedulePage
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route: Login */}
        <Route path="/login" element={<AdminLoginPage />} />

        {/* Auth-required routes */}
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/users" element={<ManageUsersPage />} />
        <Route path="/vehicles" element={<ManageVehiclesPage />} />
        <Route path="/pieces" element={<ManagePiecesPage />} />
        <Route path="/devis" element={<ManageDevisPage />} />
        <Route path="/schedule" element={<ManageSchedulePage />} /> {/* New Schedule Route */}
        <Route path="/reports" element={<ReportsPage />} />

        {/* Fallback: if no route matches, go to login */}
        <Route path="*" element={<AdminLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;