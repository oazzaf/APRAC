// src/pages/AdminDashboardPage.jsx

import React from 'react';
import AdminNavbar from '../components/NavbarAdmin';
import AdminSidebar from '../components/AdminSidebar';
import DashboardCard from '../components/DashboardCard';
import {
  FiUsers,
  FiTruck,
  FiTool,
  FiFileText,
  FiBarChart2,
  FiCalendar,
} from 'react-icons/fi';

function AdminDashboardPage() {
  // Placeholder data for dashboard metrics
  const metrics = [
    {
      title: 'Total Users',
      value: 120,
      icon: <FiUsers size={24} />,
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Vehicles',
      value: 45,
      icon: <FiTruck size={24} />,
      bgColor: 'bg-green-500',
    },
    {
      title: 'Pieces',
      value: 300,
      icon: <FiTool size={24} />,
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'Devis',
      value: 80,
      icon: <FiFileText size={24} />,
      bgColor: 'bg-purple-500',
    },
    {
      title: 'Reports Generated',
      value: 25,
      icon: <FiBarChart2 size={24} />,
      bgColor: 'bg-red-500',
    },
    {
      title: 'Scheduled Appointments',
      value: 15,
      icon: <FiCalendar size={24} />,
      bgColor: 'bg-indigo-500',
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen bg-gray-50">
        {/* Navbar */}
        <AdminNavbar />

        {/* Dashboard Content */}
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <DashboardCard
                key={index}
                title={metric.title}
                value={metric.value}
                icon={metric.icon}
                bgColor={metric.bgColor}
              />
            ))}
          </div>

          {/* Recent Activities or Additional Sections */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
            {/* Placeholder for recent activities */}
            <div className="bg-white rounded shadow p-4">
              <p>No recent activities to display.</p>
              {/* In the future, integrate with your back-end to fetch and display activities */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardPage;