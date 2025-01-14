// src/pages/ManageSchedulePage.jsx

import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiCalendar } from 'react-icons/fi'; // Imported only used icons
import Modal from '../components/Modal';
import AdminNavbar from '../components/NavbarAdmin';
import AdminSidebar from '../components/AdminSidebar';
import DashboardCard from '../components/DashboardCard';

function ManageSchedulePage() {
  // Initial mock data for schedules
  const initialSchedules = [
    { id: 1, vehicle: 'Toyota Camry', driver: 'Rachid El Fassi', date: '2023-12-01', time: '09:00 AM', status: 'Scheduled' },
    { id: 2, vehicle: 'Honda Civic', driver: 'Aicha Benjelloun', date: '2023-12-02', time: '02:00 PM', status: 'In Progress' },
    { id: 3, vehicle: 'Ford Focus', driver: 'Youssef Haddad', date: '2023-12-03', time: '11:00 AM', status: 'Completed' },
    { id: 4, vehicle: 'Chevrolet Malibu', driver: 'Fatima Zahra', date: '2023-12-04', time: '08:00 AM', status: 'Scheduled' },
    { id: 5, vehicle: 'Nissan Altima', driver: 'Khalid Mouline', date: '2023-12-05', time: '03:00 PM', status: 'In Progress' },
    { id: 6, vehicle: 'Hyundai Elantra', driver: 'Mounir Saidi', date: '2023-12-06', time: '10:00 AM', status: 'Completed' },
    { id: 7, vehicle: 'Kia Optima', driver: 'Leila Bensalem', date: '2023-12-07', time: '01:00 PM', status: 'Scheduled' },
    { id: 8, vehicle: 'Volkswagen Passat', driver: 'Samir Oulad', date: '2023-12-08', time: '04:00 PM', status: 'In Progress' },
    { id: 9, vehicle: 'Subaru Impreza', driver: 'Nadia Amrani', date: '2023-12-09', time: '07:00 AM', status: 'Completed' },
    { id: 10, vehicle: 'Mazda Mazda3', driver: 'Omar El Khatib', date: '2023-12-10', time: '05:00 PM', status: 'Scheduled' },
  ];

  // Placeholder data for dashboard metrics (optional)
  const metrics = [
    {
      title: 'Total Schedules',
      value: 120,
      icon: <FiCalendar size={24} />,
      bgColor: 'bg-indigo-500',
    },
    {
      title: 'Upcoming Schedules',
      value: 45,
      icon: <FiCalendar size={24} />,
      bgColor: 'bg-green-500',
    },
    {
      title: 'In Progress',
      value: 30,
      icon: <FiCalendar size={24} />,
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'Completed',
      value: 45,
      icon: <FiCalendar size={24} />,
      bgColor: 'bg-blue-500',
    },
  ];

  // State variables
  const [schedules, setSchedules] = useState(initialSchedules); // List of schedules
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add Schedule Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit Schedule Modal
  const [currentSchedule, setCurrentSchedule] = useState(null); // Schedule being edited

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [filterStatus, setFilterStatus] = useState('All'); // Status filter

  // Persist schedules to localStorage to maintain state across sessions
  useEffect(() => {
    const savedSchedules = localStorage.getItem('schedules');
    if (savedSchedules) {
      setSchedules(JSON.parse(savedSchedules));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  // Function to handle adding a new schedule
  const handleAddSchedule = (scheduleData) => {
    const newSchedule = {
      id: schedules.length + 1, // Simple ID assignment; in real apps, use UUID or backend-generated IDs
      ...scheduleData,
    };
    setSchedules([...schedules, newSchedule]);
    setIsAddModalOpen(false); // Close the Add Schedule modal
  };

  // Function to handle editing a schedule
  const handleEditSchedule = (updatedData) => {
    setSchedules(
      schedules.map(schedule =>
        schedule.id === currentSchedule.id ? { ...schedule, ...updatedData } : schedule
      )
    );
    setIsEditModalOpen(false); // Close the Edit Schedule modal
    setCurrentSchedule(null); // Reset current schedule
  };

  // Function to handle deleting a schedule
  const handleDeleteSchedule = (scheduleId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this schedule?');
    if (!confirmDelete) return;

    setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
  };

  // Function to open Edit Schedule modal
  const openEditModal = (schedule) => {
    setCurrentSchedule(schedule);
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

  // Function to filter schedules based on search query and status filter
  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch =
      schedule.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.date.includes(searchQuery) ||
      schedule.time.includes(searchQuery);

    const matchesStatus = filterStatus === 'All' || schedule.status === filterStatus;

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
          <h1 className="text-3xl font-bold mb-6">Manage Schedules</h1>

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
                placeholder="Search by Vehicle, Driver, Date, or Time..."
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
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Schedules Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-blue-500 tracking-wider text-sm md:text-base">ID</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-blue-500 tracking-wider text-sm md:text-base">Vehicle</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-blue-500 tracking-wider text-sm md:text-base">Driver</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-blue-500 tracking-wider text-sm md:text-base">Date</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-blue-500 tracking-wider text-sm md:text-base">Time</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-left text-blue-500 tracking-wider text-sm md:text-base">Status</th>
                  <th className="px-4 py-2 border-b border-gray-300 text-center text-blue-500 tracking-wider text-sm md:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-4 text-center text-sm md:text-base">No schedules found.</td>
                  </tr>
                ) : (
                  filteredSchedules.map(schedule => (
                    <tr key={schedule.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b border-gray-300 text-sm md:text-base">{schedule.id}</td>
                      <td className="px-4 py-2 border-b border-gray-300 text-sm md:text-base">{schedule.vehicle}</td>
                      <td className="px-4 py-2 border-b border-gray-300 text-sm md:text-base">{schedule.driver}</td>
                      <td className="px-4 py-2 border-b border-gray-300 text-sm md:text-base">{schedule.date}</td>
                      <td className="px-4 py-2 border-b border-gray-300 text-sm md:text-base">{schedule.time}</td>
                      <td className={`px-4 py-2 border-b border-gray-300 text-sm md:text-base ${schedule.status === 'Scheduled' ? 'text-yellow-600' : schedule.status === 'In Progress' ? 'text-blue-600' : 'text-green-600'}`}>
                        {schedule.status}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 text-center text-sm md:text-base">
                        <button
                          onClick={() => openEditModal(schedule)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          title="Edit Schedule"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteSchedule(schedule.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Schedule"
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

          {/* Add Schedule Modal */}
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            title="Add New Schedule"
          >
            <ScheduleForm
              onSubmit={handleAddSchedule}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </Modal>

          {/* Edit Schedule Modal */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Schedule"
          >
            <ScheduleForm
              initialData={currentSchedule}
              onSubmit={handleEditSchedule}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </Modal>
        </main>
      </div>
    </div>
  );
}

// Reusable form component for adding and editing schedules
function ScheduleForm({ initialData = {}, onSubmit, onCancel }) {
  const [vehicle, setVehicle] = useState(initialData.vehicle || '');
  const [driver, setDriver] = useState(initialData.driver || '');
  const [date, setDate] = useState(initialData.date || '');
  const [time, setTime] = useState(initialData.time || '');
  const [status, setStatus] = useState(initialData.status || 'Scheduled'); // Default status

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ vehicle, driver, date, time, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Vehicle */}
      <div>
        <label className="block mb-1 font-semibold text-sm md:text-base">Vehicle</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm md:text-base"
          placeholder="Enter vehicle name or ID"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          required
        />
      </div>

      {/* Driver */}
      <div>
        <label className="block mb-1 font-semibold text-sm md:text-base">Driver</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm md:text-base"
          placeholder="Enter driver's name"
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          required
        />
      </div>

      {/* Date */}
      <div>
        <label className="block mb-1 font-semibold text-sm md:text-base">Date</label>
        <input
          type="date"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm md:text-base"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      {/* Time */}
      <div>
        <label className="block mb-1 font-semibold text-sm md:text-base">Time</label>
        <input
          type="time"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm md:text-base"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 font-semibold text-sm md:text-base">Status</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm md:text-base"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Scheduled">Scheduled</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition text-sm md:text-base"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm md:text-base"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ManageSchedulePage;