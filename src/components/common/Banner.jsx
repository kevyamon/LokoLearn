import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Banner.css';
import { useSocket } from '../../contexts/SocketContext';

const Banner = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const socket = useSocket();

  const fetchImages = useCallback(async () => {
    try {
      // AJOUT : Ajout d'un paramètre 'timestamp' pour déjouer le cache du navigateur
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/upload/banner`, {
        params: {
          timestamp: new Date().getTime()
        }
      });
      setImages(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des images:', error);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (socket) {
      socket.on('banner_updated', () => {
        console.log('Mise à jour de la bannière reçue !');
        fetchImages();
      });

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
    return null;
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