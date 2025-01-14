// src/components/AdminSidebar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiTruck,
  FiTool,
  FiFileText,
  FiBarChart2,
  FiCalendar,
} from 'react-icons/fi'; // Using react-icons for illustrative icons

function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome size={20} /> },
    { name: 'Manage Users', path: '/users', icon: <FiUsers size={20} /> },
    { name: 'Manage Vehicles', path: '/vehicles', icon: <FiTruck size={20} /> },
    { name: 'Manage Pieces', path: '/pieces', icon: <FiTool size={20} /> },
    { name: 'Manage Devis', path: '/devis', icon: <FiFileText size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FiBarChart2 size={20} /> },
    { name: 'Manage Schedule', path: '/schedule', icon: <FiCalendar size={20} /> },
  ];

  return (
    <aside className="hidden md:block w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Menu</h2>
      </div>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                location.pathname === item.path
                  ? 'bg-gray-700'
                  : 'hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default AdminSidebar;