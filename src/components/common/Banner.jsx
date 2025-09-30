import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Va chercher les images depuis notre API au chargement
    const fetchImages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/banner`);
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des images de la bannière", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  if (images.length === 0) {
    return <div className="hero-banner-container placeholder"></div>; // Affiche un fond si pas d'images
  }

  return (
    <div className="hero-banner-container">
      {images.map((image, index) => (
        <div
          key={image._id}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image.imageUrl})` }}
        />
      ))}
      <div className="hero-banner-overlay"></div>
    </div>
  );
};

export default Banner;