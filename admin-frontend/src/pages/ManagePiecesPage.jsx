// src/pages/ManagePiecesPage.jsx

import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi'; // Icônes pour les actions
import Modal from '../components/Modal'; // Composant Modal réutilisable
import AdminNavbar from '../components/NavbarAdmin'; // Votre composant Navbar
import AdminSidebar from '../components/AdminSidebar'; // Votre composant Sidebar

function ManagePiecesPage() {
  // État pour gérer les pièces
  const [pieces, setPieces] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPiece, setCurrentPiece] = useState(null);

  // Charger les pièces depuis localStorage au montage du composant
  useEffect(() => {
    const savedPieces = localStorage.getItem('pieces');
    if (savedPieces) {
      setPieces(JSON.parse(savedPieces));
    }
  }, []);

  // Sauvegarder les pièces dans localStorage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem('pieces', JSON.stringify(pieces));
  }, [pieces]);

  // Fonction pour ajouter ou mettre à jour une pièce
  const handleSavePiece = (pieceData) => {
    if (currentPiece) {
      // Mise à jour d'une pièce existante
      setPieces(
        pieces.map(p => (p.id === currentPiece.id ? { ...pieceData, id: p.id } : p))
      );
    } else {
      // Ajout d'une nouvelle pièce
      setPieces([...pieces, { ...pieceData, id: Date.now() }]);
    }
    setIsFormVisible(false);
    setCurrentPiece(null);
  };

  // Fonction pour supprimer une pièce
  const handleDeletePiece = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?')) {
      setPieces(pieces.filter(p => p.id !== id));
    }
  };

  // Fonction pour ouvrir la modal d'édition d'une pièce
  const openEditModal = (piece) => {
    setCurrentPiece(piece);
    setIsFormVisible(true);
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
            <h1 className="text-2xl font-bold">Gestion des Pièces</h1>
            <button
              onClick={() => setIsFormVisible(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              <FiPlus className="mr-2" /> Ajouter une Pièce
            </button>
          </div>

          {/* Tableau des pièces */}
          <PiecesTable
            pieces={pieces}
            onEdit={openEditModal}
            onDelete={handleDeletePiece}
          />

          {/* Formulaire de pièce */}
          {isFormVisible && (
            <Modal
              isOpen={isFormVisible}
              onClose={() => { setIsFormVisible(false); setCurrentPiece(null); }}
              title={currentPiece ? 'Éditer la Pièce' : 'Ajouter une Pièce'}
            >
              <PieceForm
                onSave={handleSavePiece}
                onCancel={() => { setIsFormVisible(false); setCurrentPiece(null); }}
                existingPiece={currentPiece}
              />
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

// Composant pour afficher le tableau des pièces
function PiecesTable({ pieces, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Nom</th>
            <th className="px-4 py-2 border-b text-left">Numéro</th>
            <th className="px-4 py-2 border-b text-left">Prix ($)</th>
            <th className="px-4 py-2 border-b text-left">Photo</th>
            <th className="px-4 py-2 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pieces.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">Aucune pièce trouvée.</td>
            </tr>
          ) : (
            pieces.map(piece => (
              <tr key={piece.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{piece.name}</td>
                <td className="px-4 py-2 border-b">{piece.number}</td>
                <td className="px-4 py-2 border-b">{piece.price.toFixed(2)}</td>
                <td className="px-4 py-2 border-b">
                  {piece.photo ? (
                    <img src={piece.photo} alt={piece.name} className="w-16 h-16 object-cover rounded" />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => onEdit(piece)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    title="Éditer"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(piece.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Supprimer"
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
  );
}

// Composant de formulaire pour ajouter ou éditer une pièce
function PieceForm({ onSave, onCancel, existingPiece }) {
  const [name, setName] = useState(existingPiece ? existingPiece.name : '');
  const [number, setNumber] = useState(existingPiece ? existingPiece.number : '');
  const [price, setPrice] = useState(existingPiece ? existingPiece.price : '');
  const [photo, setPhoto] = useState(existingPiece ? existingPiece.photo : '');

  // Fonction pour gérer le téléchargement de la photo
  const handlePhotoUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation simple
    if (!name || !number || !price) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const pieceData = {
      name,
      number,
      price: parseFloat(price),
      photo,
    };

    onSave(pieceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nom de la Pièce */}
      <div>
        <label className="block mb-1 font-semibold">Nom de la Pièce</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Numéro de la Pièce */}
      <div>
        <label className="block mb-1 font-semibold">Numéro de la Pièce</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>

      {/* Prix de la Pièce */}
      <div>
        <label className="block mb-1 font-semibold">Prix ($)</label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
        />
      </div>

      {/* Photo de la Pièce */}
      <div>
        <label className="block mb-1 font-semibold">Photo de la Pièce</label>
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => handlePhotoUpload(e.target.files[0])}
        />
        {photo && (
          <img src={photo} alt={name} className="mt-2 w-32 h-32 object-cover rounded" />
        )}
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
  );
}

export default ManagePiecesPage;