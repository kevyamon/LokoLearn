// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/common/ScrollToTopController.jsx
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopController = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // On force la fenêtre à se positionner tout en haut, à gauche (0, 0)
    // Instantanément, sans animation "smooth" qui donnerait le mal de mer
    window.scrollTo(0, 0);
  }, [pathname]); // Se déclenche à chaque changement d'URL

  return null; // Ce composant est invisible
};

export default ScrollToTopController;