// src/pages/AdminLoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * AdminLoginPage
 * 
 * Une page de connexion simple pour le panneau d'administration.
 * Valide localement les identifiants sans backend.
 * Utilise Tailwind CSS pour le style.
 */
function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation des identifiants localement
    setTimeout(() => { // Simuler une requête asynchrone
      if (username === 'admin' && password === 'test') {
        // Authentification réussie
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
      } else {
        // Authentification échouée
        setError('Nom d\'utilisateur ou mot de passe incorrect.');
      }
      setLoading(false);
    }, 1000); // Délai simulé de 1 seconde
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <h1 className="text-xl font-bold mb-4 text-center">Connexion Admin</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Nom d'utilisateur</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Mot de passe</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-red-600 font-semibold text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

export default AdminLoginPage;