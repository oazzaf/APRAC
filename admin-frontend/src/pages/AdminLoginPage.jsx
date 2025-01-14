// src/pages/AdminLoginPage.jsx

import React, { useState } from 'react';

/**
 * AdminLoginPage
 * 
 * A simple login page for an admin panel. 
 * Uses local state only (no Redux).
 * Tailwind is used for styling.
 */
function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Example: call your back-end login endpoint (adjust URL/headers as needed)
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // If the response isn't OK, parse the error message
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      // If successful, parse the JSON response
      const data = await response.json();
      console.log('Login success:', data);
      // For example, redirect the user, or store data in localStorage, etc.

    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block mb-1 font-semibold">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-red-600 font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
}

export default AdminLoginPage;