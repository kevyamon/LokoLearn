import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // On utilise le service unifié
import './Banner.css';

const Banner = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // On ajoute un timestamp pour éviter que le navigateur ne garde les vieilles images en cache
        const { data } = await api.get('/api/upload/banner', {
            params: { t: new Date().getTime() }
        });
        setImages(data);
      } catch (error) {
        console.error('Erreur chargement bannière:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change toutes les 5 secondes
      return () => clearInterval(timer);
    }
  }, [images]);

  // Si aucune image n'est configurée dans l'admin, on ne monte rien (ou un placeholder)
  if (images.length === 0) {
    return <div className="hero-banner-container placeholder"></div>;
  }

  return (
    <div className="hero-banner-container">
      {images.map((image, index) => (
        <div
          key={image._id}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
        >
            {/* Image de fond floue pour remplir l'espace */}
            <div className="slide-bg" style={{ backgroundImage: `url(${image.imageUrl})` }}></div>
            {/* Image principale nette au centre */}
            <div className="slide-fg" style={{ backgroundImage: `url(${image.imageUrl})` }}></div>
        </div>
      ))}
      
      {/* Indicateur de défilement (les petits points) */}
      <div className="banner-indicators">
        {images.map((_, idx) => (
            <span 
                key={idx} 
                className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
            />
        ))}
      </div>
    </div>
  );
};

export default Banner;