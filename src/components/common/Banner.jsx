import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Banner.css';
import { useSocket } from '../../contexts/SocketContext'; // 1. Importer le hook useSocket

const Banner = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const socket = useSocket(); // 2. Récupérer l'instance du socket

  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/upload/banner`);
      setImages(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des images:', error);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // 3. Écouter les événements socket pour la mise à jour en temps réel
  useEffect(() => {
    if (socket) {
      // On écoute l'événement 'banner_updated' émis par le backend
      socket.on('banner_updated', () => {
        console.log('Mise à jour de la bannière reçue !');
        fetchImages(); // On recharge les images
      });

      // On nettoie l'écouteur quand le composant est démonté
      return () => {
        socket.off('banner_updated');
      };
    }
  }, [socket, fetchImages]);

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [images]);

  if (images.length === 0) {
    return null; // Ne rien afficher si aucune image n'est disponible
  }

  return (
    <div className="banner-container">
      {images.map((image, index) => (
        <div
          key={image._id}
          className={`banner-slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image.imageUrl})` }}
        />
      ))}
    </div>
  );
};

export default Banner;