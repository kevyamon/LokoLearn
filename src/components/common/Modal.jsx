import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Le "backdrop" est le fond semi-transparent sur lequel la modale s'affiche
    <div className="modal-backdrop" onClick={onClose}>
      {/* On empêche la propagation du clic pour que cliquer sur la modale ne la ferme pas */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose} className="modal-close-button">
          &times; {/* Le symbole de la croix */}
        </button>
      </div>
    </div>
  );
};

export default Modal;