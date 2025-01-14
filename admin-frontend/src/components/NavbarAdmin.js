// src/components/AdminNavbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi'; // Importing icons

function AdminNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Handle logout action
  const handleLogout = () => {
    // Clear tokens or authentication data
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / App Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-gray-800">
              APRAC Admin
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            <Link
              to="/dashboard"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
              onClick={handleLinkClick}
            >
              Dashboard
            </Link>
            <Link
              to="/users"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
              onClick={handleLinkClick}
            >
              Manage Users
            </Link>
            <Link
              to="/vehicles"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
              onClick={handleLinkClick}
            >
              Manage Vehicles
            </Link>
            <Link
              to="/pieces"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
              onClick={handleLinkClick}
            >
              Manage Pieces
            </Link>
            <Link
              to="/devis"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
              onClick={handleLinkClick}
            >
              Manage Devis
            </Link>
            <Link
              to="/reports"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
              onClick={handleLinkClick}
            >
              Reports
            </Link>
            <Link
              to="/schedule"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
              onClick={handleLinkClick}
            >
              Manage Schedule
            </Link>
            <button
              onClick={handleLogout}
              className="ml-6 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 flex items-center"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/dashboard"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
            >
              Dashboard
            </Link>
            <Link
              to="/users"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
            >
              Manage Users
            </Link>
            <Link
              to="/vehicles"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
            >
              Manage Vehicles
            </Link>
            <Link
              to="/pieces"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
            >
              Manage Pieces
            </Link>
            <Link
              to="/devis"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
            >
              Manage Devis
            </Link>
            <Link
              to="/reports"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
            >
              Reports
            </Link>
            <Link
              to="/schedule"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
            >
              Manage Schedule
            </Link>
            <button
              onClick={() => {
                handleLogout();
                handleLinkClick();
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700 flex items-center"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default AdminNavbar;