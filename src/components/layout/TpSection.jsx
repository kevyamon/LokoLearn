import React from 'react';
import './TpSection.css';

const TpSection = ({ title, children }) => {
  return (
    <section className="tp-section">
      <h2 className="tp-section-title">{title}</h2>
      <div className="tp-section-content">
        {children}
      </div>
    </section>
  );
};

export default TpSection;