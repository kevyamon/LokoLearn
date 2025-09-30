import React, { useState, useEffect } from 'react';
import './ManageBannerPage.css';

const ManageBannerPage = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [isBannerEnabled, setIsBannerEnabled] = useState(
    localStorage.getItem('bannerVisible') !== 'false'
  );

  const fetchImages = async () => {
    setPageLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/banner`);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      setError("Erreur de récupération des images. Le serveur est peut-être en veille, réessayez dans une minute.");
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/banner`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      
      setMessage("Image ajoutée avec succès !");
      setFile(null);
      document.getElementById('fileInput').value = null;
      fetchImages();
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setUploading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/banner/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setMessage("Image supprimée avec succès !");
        fetchImages();
      } catch (err) {
        setError(err.message || "Erreur lors de la suppression.");
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
      <h1>Gestion de la Bannière</h1>

      <div className="setting-card">
        <h3>Visibilité de la bannière</h3>
        <p>Activer ou masquer la bannière sur la page d'accueil.</p>
        <label className="switch">
          <input type="checkbox" checked={isBannerEnabled} onChange={handleToggleBanner} />
          <span className="slider round"></span>
        </label>
        <span className="status">{isBannerEnabled ? 'Activée' : 'Désactivée'}</span>
      </div>

      <div className="setting-card">
        <h3>Ajouter une nouvelle image</h3>
        <form onSubmit={handleUpload} className="upload-form">
          <input type="file" id="fileInput" onChange={handleFileChange} />
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
          <p>Chargement des images...</p>
        ) : (
          <div className="image-grid">
            {images.length > 0 ? (
              images.map(img => (
                <div key={img._id} className="image-card">
                  <img src={img.imageUrl} alt="Bannière" />
                  <button onClick={() => handleDelete(img._id)} className="delete-btn">×</button>
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