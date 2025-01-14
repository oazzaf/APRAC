// src/pages/ManageDevisPage.jsx

import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi'; // Icônes pour ajouter et supprimer
import AdminNavbar from '../components/NavbarAdmin'; // Votre composant Navbar
import AdminSidebar from '../components/AdminSidebar'; // Votre composant Sidebar

function ManageDevisPage() {
  // État pour gérer les devis
  const [devis, setDevis] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentDevis, setCurrentDevis] = useState(null);

  // Charger les devis depuis localStorage au chargement du composant
  useEffect(() => {
    const savedDevis = localStorage.getItem('devis');
    if (savedDevis) {
      setDevis(JSON.parse(savedDevis));
    }
  }, []);

  // Sauvegarder les devis dans localStorage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem('devis', JSON.stringify(devis));
  }, [devis]);

  // Fonction pour ajouter ou mettre à jour un devis
  const handleSaveDevis = (devisData) => {
    if (currentDevis) {
      // Mise à jour d'un devis existant
      setDevis(devis.map(d => (d.id === currentDevis.id ? devisData : d)));
    } else {
      // Ajout d'un nouveau devis
      setDevis([...devis, { ...devisData, id: Date.now() }]);
    }
    setIsFormVisible(false);
    setCurrentDevis(null);
  };

  // Fonction pour supprimer un devis
  const handleDeleteDevis = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
      setDevis(devis.filter(d => d.id !== id));
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Zone principale */}
      <div className="flex-1 min-h-screen bg-gray-100">
        {/* Navbar */}
        <AdminNavbar />

        {/* Contenu */}
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Gestion des Devis</h1>
            <button
              onClick={() => setIsFormVisible(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <FiPlus className="mr-2" /> Ajouter un Devis
            </button>
          </div>

          {/* Tableau des devis */}
          <DevisTable devis={devis} onEdit={(d) => { setCurrentDevis(d); setIsFormVisible(true); }} onDelete={handleDeleteDevis} />

          {/* Formulaire de devis */}
          {isFormVisible && (
            <DevisForm
              onSave={handleSaveDevis}
              onCancel={() => { setIsFormVisible(false); setCurrentDevis(null); }}
              existingDevis={currentDevis}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// Composant pour afficher le tableau des devis
function DevisTable({ devis, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Client</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Statut</th>
            <th className="px-4 py-2 border-b">Montant (MAD)</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {devis.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">Aucun devis trouvé.</td>
            </tr>
          ) : (
            devis.map(d => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{d.clientName}</td>
                <td className="px-4 py-2 border-b">{d.date}</td>
                <td className={`px-4 py-2 border-b ${getStatusColor(d.status)}`}>{d.status}</td>
                <td className="px-4 py-2 border-b">{calculateTotalAmount(d.pieces)}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => onEdit(d)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    title="Éditer"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => onDelete(d.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Supprimer"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Fonction pour obtenir la classe de couleur en fonction du statut
function getStatusColor(status) {
  switch (status) {
    case 'En attente':
      return 'text-yellow-600';
    case 'Approuvé':
      return 'text-green-600';
    case 'Rejeté':
      return 'text-red-600';
    default:
      return '';
  }
}

// Fonction pour calculer le montant total d'un devis
function calculateTotalAmount(pieces) {
  // Supposons que chaque pièce a un champ 'price' pour le prix unitaire
  // Ici, nous utiliserons 'amount' par pièce pour simplifier
  return pieces.reduce((total, piece) => total + (piece.amount || 0), 0);
}

// Composant de formulaire pour ajouter ou éditer un devis
function DevisForm({ onSave, onCancel, existingDevis }) {
  const [clientName, setClientName] = useState(existingDevis ? existingDevis.clientName : '');
  const [date, setDate] = useState(existingDevis ? existingDevis.date : '');
  const [status, setStatus] = useState(existingDevis ? existingDevis.status : 'En attente');
  const [pieces, setPieces] = useState(existingDevis ? existingDevis.pieces : [
    { partName: '', partNumber: '', quantity: 1, photo: '', amount: 0 },
  ]);

  // Fonction pour ajouter une nouvelle pièce
  const addPiece = () => {
    setPieces([...pieces, { partName: '', partNumber: '', quantity: 1, photo: '', amount: 0 }]);
  };

  // Fonction pour supprimer une pièce
  const removePiece = (index) => {
    const newPieces = pieces.filter((_, i) => i !== index);
    setPieces(newPieces);
  };

  // Fonction pour gérer les changements dans les champs de pièces
  const handlePieceChange = (index, field, value) => {
    const newPieces = pieces.map((piece, i) => {
      if (i === index) {
        return { ...piece, [field]: value };
      }
      return piece;
    });
    setPieces(newPieces);
  };

  // Fonction pour gérer le téléchargement de la photo
  const handlePhotoUpload = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handlePieceChange(index, 'photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour gérer le prix unitaire (optionnel)
  const handleAmountChange = (index, value) => {
    handlePieceChange(index, 'amount', parseFloat(value) || 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculer le montant total ici si nécessaire
    onSave({ clientName, date, status, pieces });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-full overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{existingDevis ? 'Éditer le Devis' : 'Ajouter un Devis'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom du Client */}
            <div>
              <label className="block mb-1 font-semibold">Nom du Client</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1 font-semibold">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Statut */}
            <div>
              <label className="block mb-1 font-semibold">Statut</label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="En attente">En attente</option>
                <option value="Approuvé">Approuvé</option>
                <option value="Rejeté">Rejeté</option>
              </select>
            </div>

            {/* Liste des Pièces */}
            <div>
              <label className="block mb-2 font-semibold">Pièces</label>
              {pieces.map((piece, index) => (
                <div key={index} className="border p-4 rounded mb-4 relative">
                  {/* Bouton pour supprimer la pièce */}
                  {pieces.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePiece(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      title="Supprimer la Pièce"
                    >
                      <FiTrash2 />
                    </button>
                  )}

                  {/* Nom de la Pièce */}
                  <div className="mb-2">
                    <label className="block mb-1">Nom de la Pièce</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded"
                      value={piece.partName}
                      onChange={(e) => handlePieceChange(index, 'partName', e.target.value)}
                      required
                    />
                  </div>

                  {/* Numéro de la Pièce */}
                  <div className="mb-2">
                    <label className="block mb-1">Numéro de la Pièce</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded"
                      value={piece.partNumber}
                      onChange={(e) => handlePieceChange(index, 'partNumber', e.target.value)}
                      required
                    />
                  </div>

                  {/* Quantité */}
                  <div className="mb-2">
                    <label className="block mb-1">Quantité</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded"
                      value={piece.quantity}
                      onChange={(e) => handlePieceChange(index, 'quantity', parseInt(e.target.value) || 1)}
                      required
                      min="1"
                    />
                  </div>

                  {/* Montant (Optionnel) */}
                  <div className="mb-2">
                    <label className="block mb-1">Montant ($)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded"
                      value={piece.amount}
                      onChange={(e) => handleAmountChange(index, e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Photo */}
                  <div className="mb-2">
                    <label className="block mb-1">Photo de la Pièce</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full"
                      onChange={(e) => handlePhotoUpload(index, e.target.files[0])}
                    />
                    {piece.photo && (
                      <img src={piece.photo} alt={`Pièce ${index + 1}`} className="mt-2 w-32 h-32 object-cover rounded" />
                    )}
                  </div>
                </div>
              ))}

              {/* Bouton pour ajouter une nouvelle pièce */}
              <button
                type="button"
                onClick={addPiece}
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                <FiPlus className="mr-2" /> Ajouter une Pièce
              </button>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageDevisPage;