import React, { useState, useEffect } from 'react';
import './Banner.css';

// --- IMPORTANT ---
import bannerImage1 from '../../assets/bannerimage1.jpg';
import bannerImage2 from '../../assets/bannerimage2.jpg';

const images = [bannerImage1, bannerImage2];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="hero-banner-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
        >
          <div 
            className="slide-bg" 
            style={{ backgroundImage: `url(${image})` }} 
          />
          <div 
            className="slide-fg" 
            style={{ backgroundImage: `url(${image})` }} 
          />
        </div>
      ))}
      <div className="hero-banner-overlay"></div>

      <div className="scroll-down-indicator">
        {/* On change la couleur (stroke) et l'épaisseur (strokeWidth) de la flèche */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L7 14M12 19L17 14" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default Banner;