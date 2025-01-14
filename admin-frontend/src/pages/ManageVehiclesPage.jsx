// src/pages/ManageVehiclesPage.jsx

import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Imported only used icons
import Modal from '../components/Modal'; // Import the Modal component
import AdminNavbar from '../components/NavbarAdmin'; // Import your existing AdminNavbar
import AdminSidebar from '../components/AdminSidebar'; // Import your existing AdminSidebar
import DashboardCard from '../components/DashboardCard'; // If needed for metrics

function ManageVehiclesPage() {
  // Initial mock data for vehicles
  const initialVehicles = [
    { id: 1, make: 'Toyota', model: 'Camry', licensePlate: 'ABC-1234', status: 'Available' },
    { id: 2, make: 'Honda', model: 'Civic', licensePlate: 'XYZ-5678', status: 'In Use' },
    { id: 3, make: 'Ford', model: 'Focus', licensePlate: 'LMN-9012', status: 'Maintenance' },
    { id: 4, make: 'Chevrolet', model: 'Malibu', licensePlate: 'QRS-3456', status: 'Available' },
    { id: 5, make: 'Nissan', model: 'Altima', licensePlate: 'TUV-7890', status: 'In Use' },
    { id: 6, make: 'Hyundai', model: 'Elantra', licensePlate: 'GHI-2345', status: 'Available' },
    { id: 7, make: 'Kia', model: 'Optima', licensePlate: 'JKL-6789', status: 'Maintenance' },
    { id: 8, make: 'Volkswagen', model: 'Passat', licensePlate: 'MNO-0123', status: 'Available' },
    { id: 9, make: 'Subaru', model: 'Impreza', licensePlate: 'PQR-4567', status: 'In Use' },
    { id: 10, make: 'Mazda', model: 'Mazda3', licensePlate: 'STU-8901', status: 'Available' },
  ];

  // Placeholder data for dashboard metrics (optional)
  const metrics = [
    {
      title: 'Total Vehicles',
      value: 100,
      icon: <FiEdit size={24} />, // Replace with appropriate icons if needed
      bgColor: 'bg-indigo-500',
    },
    {
      title: 'Available',
      value: 60,
      icon: <FiEdit size={24} />,
      bgColor: 'bg-green-500',
    },
    {
      title: 'In Use',
      value: 30,
      icon: <FiEdit size={24} />,
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'Maintenance',
      value: 10,
      icon: <FiEdit size={24} />,
      bgColor: 'bg-red-500',
    },
  ];

  // State variables
  const [vehicles, setVehicles] = useState(initialVehicles); // List of vehicles
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add Vehicle Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit Vehicle Modal
  const [currentVehicle, setCurrentVehicle] = useState(null); // Vehicle being edited

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [filterStatus, setFilterStatus] = useState('All'); // Status filter

  // Persist vehicles to localStorage to maintain state across sessions
  useEffect(() => {
    const savedVehicles = localStorage.getItem('vehicles');
    if (savedVehicles) {
      setVehicles(JSON.parse(savedVehicles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  // Function to handle adding a new vehicle
  const handleAddVehicle = (vehicleData) => {
    const newVehicle = {
      id: vehicles.length + 1, // Simple ID assignment; in real apps, use UUID or backend-generated IDs
      ...vehicleData,
    };
    setVehicles([...vehicles, newVehicle]);
    setIsAddModalOpen(false); // Close the Add Vehicle modal
  };

  // Function to handle editing a vehicle
  const handleEditVehicle = (updatedData) => {
    setVehicles(
      vehicles.map(vehicle =>
        vehicle.id === currentVehicle.id ? { ...vehicle, ...updatedData } : vehicle
      )
    );
    setIsEditModalOpen(false); // Close the Edit Vehicle modal
    setCurrentVehicle(null); // Reset current vehicle
  };

  // Function to handle deleting a vehicle
  const handleDeleteVehicle = (vehicleId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this vehicle?');
    if (!confirmDelete) return;

    setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
  };

  // Function to open Edit Vehicle modal
  const openEditModal = (vehicle) => {
    setCurrentVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle status filter change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Function to filter vehicles based on search query and status filter
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch =
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'All' || vehicle.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar /> {/* Sidebar is always visible on md and above, hidden on small screens */}

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen bg-gray-50">
        {/* Navbar */}
        <AdminNavbar />

        {/* Dashboard Content */}
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">Manage Vehicles</h1>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
            {/* Search Bar */}
            <div className="w-full sm:w-1/2 md:w-1/3">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by Make, Model, or License Plate..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="w-full sm:w-1/2 md:w-1/4">
              <select
                value={filterStatus}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Vehicles Table */}
          <div className="overflow-x-auto">
            <table className="w-auto sm:w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-300 text-left text-blue-500 tracking-wider text-sm md:text-base">ID</th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-300 text-left text-blue-500 tracking-wider text-sm md:text-base">Make</th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-300 text-left text-blue-500 tracking-wider text-sm md:text-base">Model</th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-300 text-left text-blue-500 tracking-wider text-sm md:text-base">License Plate</th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-300 text-left text-blue-500 tracking-wider text-sm md:text-base">Status</th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-300 text-center text-blue-500 tracking-wider text-sm md:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-2 sm:px-4 py-4 text-center text-sm md:text-base">No vehicles found.</td>
                  </tr>
                ) : (
                  filteredVehicles.map(vehicle => (
                    <tr key={vehicle.id} className="hover:bg-gray-100">
                      <td className="px-2 sm:px-4 py-2 border-b border-gray-300 text-sm md:text-base">{vehicle.id}</td>
                      <td className="px-2 sm:px-4 py-2 border-b border-gray-300 text-sm md:text-base">{vehicle.make}</td>
                      <td className="px-2 sm:px-4 py-2 border-b border-gray-300 text-sm md:text-base">{vehicle.model}</td>
                      <td className="px-2 sm:px-4 py-2 border-b border-gray-300 text-sm md:text-base">{vehicle.licensePlate}</td>
                      <td className={`px-2 sm:px-4 py-2 border-b border-gray-300 text-sm md:text-base ${vehicle.status === 'Available' ? 'text-green-600' : vehicle.status === 'In Use' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {vehicle.status}
                      </td>
                      <td className="px-2 sm:px-4 py-2 border-b border-gray-300 text-center text-sm md:text-base">
                        <button
                          onClick={() => openEditModal(vehicle)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          title="Edit Vehicle"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Vehicle"
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

          {/* Add Vehicle Modal */}
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            title="Add New Vehicle"
          >
            <VehicleForm
              onSubmit={handleAddVehicle}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </Modal>

          {/* Edit Vehicle Modal */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Vehicle"
          >
            <VehicleForm
              initialData={currentVehicle}
              onSubmit={handleEditVehicle}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </Modal>
        </main>
      </div>
    </div>
  );
}

// Reusable form component for adding and editing vehicles
function VehicleForm({ initialData = {}, onSubmit, onCancel }) {
  const [make, setMake] = useState(initialData.make || '');
  const [model, setModel] = useState(initialData.model || '');
  const [licensePlate, setLicensePlate] = useState(initialData.licensePlate || '');
  const [status, setStatus] = useState(initialData.status || 'Available'); // Default status

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ make, model, licensePlate, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-semibold text-sm md:text-base">Make</label>
        <input
          type="text"
          className="w-full px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm md:text-base"
          placeholder="Enter vehicle make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold text-sm md:text-base">Model</label>
        <input
          type="text"
          className="w-full px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm md:text-base"
          placeholder="Enter vehicle model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold text-sm md:text-base">License Plate</label>
        <input
          type="text"
          className="w-full px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm md:text-base"
          placeholder="Enter license plate number"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold text-sm md:text-base">Status</label>
        <select
          className="w-full px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm md:text-base"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition text-sm md:text-base"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm md:text-base"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ManageVehiclesPage;