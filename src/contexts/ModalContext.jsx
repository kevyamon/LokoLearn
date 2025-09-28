import React, { createContext, useState, useContext } from 'react';
import Modal from '../components/common/Modal';
import './ModalContext.css'; // On va créer ce fichier pour le style du contenu

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  const showModal = (title, message) => {
    setModalState({ isOpen: true, title, message });
  };

  const hideModal = () => {
    setModalState({ isOpen: false, title: '', message: '' });
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal isOpen={modalState.isOpen} onClose={hideModal}>
        <div className="modal-info-content">
          <h3>{modalState.title}</h3>
          <p>{modalState.message}</p>
          <button className="modal-info-button" onClick={hideModal}>
            OK
          </button>
        </div>
      </Modal>
    </ModalContext.Provider>
  );
};