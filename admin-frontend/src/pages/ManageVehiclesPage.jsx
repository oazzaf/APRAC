// src/pages/ManageVehiclesPage.jsx

import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Modal from '../components/Modal';
import AdminNavbar from '../components/NavbarAdmin';
import AdminSidebar from '../components/AdminSidebar';
import DashboardCard from '../components/DashboardCard';

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

  // Placeholder data for dashboard metrics
  const metrics = [
    {
      title: 'Total Vehicles',
      value: initialVehicles.length,
      icon: <FiEdit size={24} />,
      bgColor: 'bg-indigo-500',
    },
    {
      title: 'Available',
      value: initialVehicles.filter(v => v.status === 'Available').length,
      icon: <FiEdit size={24} />,
      bgColor: 'bg-green-500',
    },
    {
      title: 'In Use',
      value: initialVehicles.filter(v => v.status === 'In Use').length,
      icon: <FiEdit size={24} />,
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'Maintenance',
      value: initialVehicles.filter(v => v.status === 'Maintenance').length,
      icon: <FiEdit size={24} />,
      bgColor: 'bg-red-500',
    },
  ];

  // State variables
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Load & persist vehicles to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vehicles');
    if (saved) setVehicles(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  // Handlers
  const handleAddVehicle = (vehicleData) => {
    const newVehicle = {
      id: vehicles.length ? vehicles[vehicles.length - 1].id + 1 : 1,
      ...vehicleData,
    };
    setVehicles([...vehicles, newVehicle]);
    setIsAddModalOpen(false);
  };

  const handleEditVehicle = (updatedData) => {
    setVehicles(
      vehicles.map(v =>
        v.id === currentVehicle.id ? { ...v, ...updatedData } : v
      )
    );
    setIsEditModalOpen(false);
    setCurrentVehicle(null);
  };

  const handleDeleteVehicle = (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const openEditModal = (vehicle) => {
    setCurrentVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  // Filter logic
  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch =
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || v.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-50">
        <AdminNavbar />

        <main className="p-6">
          {/* Header with Add button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Vehicles</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <FiPlus className="mr-2" />
              Add Vehicle
            </button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {metrics.map((m, i) => (
              <DashboardCard
                key={i}
                title={m.title}
                value={m.value}
                icon={m.icon}
                bgColor={m.bgColor}
              />
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by Make, Model, or License Plate..."
              className="w-full sm:w-1/2 md:w-1/3 px-3 py-2 border border-gray-300 rounded focus:border-blue-500"
            />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="w-full sm:w-1/2 md:w-1/4 px-3 py-2 border border-gray-300 rounded focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="In Use">In Use</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Vehicles Table */}
          <div className="overflow-x-auto">
            <table className="w-auto sm:w-full bg-white rounded shadow">
              <thead>
                <tr>
                  {['ID','Make','Model','License Plate','Status','Actions'].map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-2 border-b text-left text-blue-500 text-sm md:text-base"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-4 text-center">
                      No vehicles found.
                    </td>
                  </tr>
                ) : (
                  filteredVehicles.map(v => (
                    <tr key={v.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b">{v.id}</td>
                      <td className="px-4 py-2 border-b">{v.make}</td>
                      <td className="px-4 py-2 border-b">{v.model}</td>
                      <td className="px-4 py-2 border-b">{v.licensePlate}</td>
                      <td
                        className={`px-4 py-2 border-b ${
                          v.status === 'Available'
                            ? 'text-green-600'
                            : v.status === 'In Use'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                      >
                        {v.status}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        <button
                          onClick={() => openEditModal(v)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          title="Edit Vehicle"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteVehicle(v.id)}
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
  const [status, setStatus] = useState(initialData.status || 'Available');

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