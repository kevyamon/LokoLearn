import React, { useState, useEffect } from 'react';
import './ManageBannerPage.css';

const ManageBannerPage = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchImages = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/banner`);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      setError("Erreur de récupération des images.");
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
    setLoading(true);
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
      document.getElementById('fileInput').value = null; // Réinitialise l'input
      fetchImages(); // Met à jour la liste
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-banner-container">
      <h1>Gestion de la Bannière</h1>

      <form onSubmit={handleUpload} className="upload-form">
        <h3>Ajouter une nouvelle image</h3>
        <input type="file" id="fileInput" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Téléversement...' : 'Téléverser'}
        </button>
        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}
      </form>

      <div className="image-preview-section">
        <h3>Images actuelles de la bannière</h3>
        <div className="image-grid">
          {images.length > 0 ? (
            images.map(img => (
              <div key={img._id} className="image-card">
                <img src={img.imageUrl} alt="Bannière" />
              </div>
            ))
          ) : (
            <p>Aucune image dans la bannière pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBannerPage;