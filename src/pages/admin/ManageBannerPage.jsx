// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/admin/ManageBannerPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Spinner from '../../components/common/Spinner';
import api from '../../services/api'; // On utilise notre service API centralisé
import './ManageBannerPage.css';

const ManageBannerPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [isBannerEnabled, setIsBannerEnabled] = useState(
    localStorage.getItem('bannerVisible') !== 'false'
  );

  // RÉCUPÉRATION DES IMAGES
  const fetchImages = async () => {
    setPageLoading(true);
    try {
      // Utilisation de 'api' au lieu de 'fetch' (Gère l'URL et les erreurs)
      const { data } = await api.get('/api/upload/banner');
      setImages(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les images. Vérifiez votre connexion.");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // UPLOAD IMAGE
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Veuillez sélectionner un fichier.");
      return;
    }
    setUploading(true);
    setError('');
    setMessage('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Utilisation de 'api.post' (Envoie le Token Admin automatiquement)
      await api.post('/api/upload/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setMessage("Image ajoutée avec succès !");
      setFile(null);
      // Reset du champ file
      if (document.getElementById('fileInput')) {
        document.getElementById('fileInput').value = null;
      }
      fetchImages(); // On rafraîchit la liste
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur lors du téléversement.");
    } finally {
      setUploading(false);
    }
  };
  
  // SUPPRESSION IMAGE
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      setError('');
      setMessage('');
      try {
        // Utilisation de 'api.delete' (Envoie le Token Admin automatiquement)
        await api.delete(`/api/upload/banner/${id}`);
        
        setMessage("Image supprimée avec succès !");
        fetchImages();
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Erreur lors de la suppression.");
      }
    }
  };

  const handleToggleBanner = () => {
    const newVisibility = !isBannerEnabled;
    localStorage.setItem('bannerVisible', newVisibility);
    setIsBannerEnabled(newVisibility);
  };

  return (
    <div className="manage-banner-container">
      {/* BOUTON RETOUR */}
      <div style={{ marginBottom: '20px' }}>
        <button 
            onClick={() => navigate('/admin')} 
            className="back-button" // Utilise le style existant
            style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: '1px solid white' }}
        >
            <ArrowBack fontSize="small" /> Retour au Dashboard
        </button>
      </div>

      <h1>Gestion de la Bannière</h1>

      <div className="setting-card">
        <h3>Visibilité de la bannière</h3>
        <p>Activer ou masquer la bannière sur la page d'accueil.</p>
        <div className="toggle-wrapper">
          <label className="switch">
            <input type="checkbox" checked={isBannerEnabled} onChange={handleToggleBanner} />
            <span className="slider round"></span>
          </label>
          <span className="status">{isBannerEnabled ? 'Activée' : 'Désactivée'}</span>
        </div>
      </div>

      <div className="setting-card">
        <h3>Ajouter une nouvelle image</h3>
        <form onSubmit={handleUpload}>
          <input type="file" id="fileInput" onChange={handleFileChange} accept="image/*" />
          <button type="submit" disabled={uploading}>
            {uploading ? 'Téléversement...' : 'Téléverser'}
          </button>
          {error && <p className="error-text">{error}</p>}
          {message && <p className="success-text">{message}</p>}
        </form>
      </div>

      <div className="setting-card">
        <h3>Images actuelles de la bannière</h3>
        {pageLoading ? (
          <div className="loading-container">
            <Spinner />
            <p>Chargement des images...</p>
          </div>
        ) : (
          <div className="image-grid">
            {images.length > 0 ? (
              images.map(img => (
                <div key={img._id} className="image-card">
                  <img src={img.imageUrl} alt="Bannière" />
                  <button onClick={() => handleDelete(img._id)} className="delete-btn" title="Supprimer l'image">×</button>
                </div>
              ))
            ) : (
              <p>Aucune image dans la bannière pour le moment.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBannerPage;