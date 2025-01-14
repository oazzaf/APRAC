// src/pages/ManageUsersPage.jsx

import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi'; // Icons for actions
import Modal from '../components/Modal'; // Import the Modal component
import AdminNavbar from '../components/NavbarAdmin'; // Import your existing AdminNavbar
import AdminSidebar from '../components/AdminSidebar'; // Import your existing AdminSidebar

function ManageUsersPage() {
  // Initial mock data with Moroccan names
  const initialUsers = [
    { id: 1, username: 'Rachid El Fassi', email: 'rachid.fassi@example.com', role: 'Admin' },
    { id: 2, username: 'Aicha Benjelloun', email: 'aicha.benjelloun@example.com', role: 'Expert' },
    { id: 3, username: 'Youssef Haddad', email: 'youssef.haddad@example.com', role: 'Driver' },
    { id: 4, username: 'Fatima Zahra', email: 'fatima.zahra@example.com', role: 'User' },
    { id: 5, username: 'Khalid Mouline', email: 'khalid.mouline@example.com', role: 'User' },
    { id: 6, username: 'Mounir Saidi', email: 'mounir.saidi@example.com', role: 'Expert' },
    { id: 7, username: 'Leila Bensalem', email: 'leila.bensalem@example.com', role: 'Driver' },
    { id: 8, username: 'Samir Oulad', email: 'samir.oulad@example.com', role: 'User' },
    { id: 9, username: 'Nadia Amrani', email: 'nadia.amrani@example.com', role: 'Admin' },
    { id: 10, username: 'Omar El Khatib', email: 'omar.khatib@example.com', role: 'Expert' },
  ];

  // State variables
  const [users, setUsers] = useState(initialUsers); // List of users
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add User Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit User Modal
  const [currentUser, setCurrentUser] = useState(null); // User being edited

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [filterRole, setFilterRole] = useState('All'); // Role filter

  // Persist users to localStorage to maintain state across sessions
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Function to handle adding a new user
  const handleAddUser = (userData) => {
    const newUser = {
      id: users.length + 1, // Simple ID assignment; in real apps, use UUID or backend-generated IDs
      ...userData,
    };
    setUsers([...users, newUser]);
    setIsAddModalOpen(false); // Close the Add User modal
  };

  // Function to handle editing a user
  const handleEditUser = (updatedData) => {
    setUsers(
      users.map(user =>
        user.id === currentUser.id ? { ...user, ...updatedData } : user
      )
    );
    setIsEditModalOpen(false); // Close the Edit User modal
    setCurrentUser(null); // Reset current user
  };

  // Function to handle deleting a user
  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    setUsers(users.filter(user => user.id !== userId));
  };

  // Function to open Edit User modal
  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle role filter change
  const handleFilterChange = (e) => {
    setFilterRole(e.target.value);
  };

  // Function to filter users based on search query and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filterRole === 'All' || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen bg-gray-50">
        {/* Navbar */}
        <AdminNavbar />

        {/* Main Content */}
        <main className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Users</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mt-4 md:mt-0"
            >
              <FiPlus className="mr-2" />
              Add User
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            {/* Search Bar */}
            <div className="mb-4 md:mb-0">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by username or email..."
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={filterRole}
                onChange={handleFilterChange}
                className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Expert">Expert</option>
                <option value="Driver">Driver</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-blue-500 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-center">
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-blue-500 hover:text-blue-700 mr-4"
                          title="Edit User"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete User"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Add User Modal */}
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            title="Add New User"
          >
            <UserForm
              onSubmit={handleAddUser}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </Modal>

          {/* Edit User Modal */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit User"
          >
            <UserForm
              initialData={currentUser}
              onSubmit={handleEditUser}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </Modal>
        </main>
      </div>
    </div>
  );
}

// Reusable form component for adding and editing users
function UserForm({ initialData = {}, onSubmit, onCancel }) {
  const [username, setUsername] = useState(initialData.username || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [role, setRole] = useState(initialData.role || 'User'); // Default role

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, role });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Username</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Role</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="User">User</option>
          <option value="Expert">Expert</option>
          <option value="Driver">Driver</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ManageUsersPage;