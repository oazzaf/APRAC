// src/pages/ReportsPage.jsx

import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/NavbarAdmin';
import AdminSidebar from '../components/AdminSidebar';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

// Couleurs pour les statuts des devis
const COLORS = ['#FFBB28', '#0088FE', '#FF8042'];

function ReportsPage() {
  const [devis, setDevis] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [averageAmount, setAverageAmount] = useState(0);

  // Charger les devis depuis localStorage au montage du composant
  useEffect(() => {
    const savedDevis = localStorage.getItem('devis');
    if (savedDevis) {
      setDevis(JSON.parse(savedDevis));
    }
  }, []);

  // Calculer les métriques chaque fois que les devis changent
  useEffect(() => {
    // Calculer le nombre de devis par statut
    const statusCounts = devis.reduce((acc, devisItem) => {
      acc[devisItem.status] = (acc[devisItem.status] || 0) + 1;
      return acc;
    }, {});

    const statusDataFormatted = Object.keys(statusCounts).map((status) => ({
      name: status,
      value: statusCounts[status],
    }));

    setStatusData(statusDataFormatted);

    // Calculer le montant total des devis
    const total = devis.reduce((acc, devisItem) => acc + devisItem.amount, 0);
    setTotalAmount(total);

    // Calculer le montant moyen par devis
    const average = devis.length > 0 ? (total / devis.length).toFixed(2) : 0;
    setAverageAmount(average);
  }, [devis]);

  // Préparer les données pour le graphique en barres (Nombre de devis par mois)
  const barChartData = getBarChartData(devis);

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Zone principale */}
      <div className="flex-1 min-h-screen bg-gray-100">
        {/* Navbar */}
        <AdminNavbar />

        {/* Contenu principal */}
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">Rapports</h1>

          {/* Statistiques Globales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Total de Devis</h2>
              <p className="text-2xl">{devis.length}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Montant Total ($)</h2>
              <p className="text-2xl">{totalAmount.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Montant Moyen par Devis ($)</h2>
              <p className="text-2xl">{averageAmount}</p>
            </div>
          </div>

          {/* Graphique en Secteurs : Répartition des Devis par Statut */}
          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Répartition des Devis par Statut</h2>
            {statusData.length > 0 ? (
              <PieChart width={400} height={300}>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <p>Aucun devis disponible pour afficher le graphique.</p>
            )}
          </div>

          {/* Graphique en Barres : Nombre de Devis par Mois */}
          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Nombre de Devis par Mois</h2>
            {barChartData.length > 0 ? (
              <BarChart
                width={600}
                height={300}
                data={barChartData}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Nombre de Devis" />
              </BarChart>
            ) : (
              <p>Aucun devis disponible pour afficher le graphique.</p>
            )}
          </div>

          {/* Table des Devis (Optionnel) */}
          {/* Vous pouvez ajouter une table similaire à celle de ManageDevisPage pour afficher les devis */}
        </main>
      </div>
    </div>
  );
}

// Fonction pour préparer les données du graphique en barres
function getBarChartData(devis) {
  const data = {};

  devis.forEach((devisItem) => {
    const date = new Date(devisItem.date);
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    data[month] = (data[month] || 0) + 1;
  });

  // Convertir l'objet en tableau
  const chartData = Object.keys(data).map((month) => ({
    month,
    count: data[month],
  }));

  // Trier par date (optionnel)
  chartData.sort((a, b) => new Date(a.month) - new Date(b.month));

  return chartData;
}

export default ReportsPage;