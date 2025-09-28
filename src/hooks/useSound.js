import { useMemo } from 'react';

// Importe les fichiers sonores que tu as placés dans le dossier assets
import clickSoundFile from '../assets/sounds/click.mp3';
import hoverSoundFile from '../assets/sounds/hover.mp3';

// Ce hook va nous donner des fonctions faciles à utiliser pour jouer les sons
export const useSound = () => {
  const sounds = useMemo(() => ({
    click: new Audio(clickSoundFile),
    hover: new Audio(hoverSoundFile),
  }), []);

  // On configure le volume pour que ce soit subtil
  sounds.click.volume = 0.5;
  sounds.hover.volume = 0.2;

  const playClickSound = () => {
    sounds.click.currentTime = 0; // Permet de rejouer le son même s'il est déjà en cours
    sounds.click.play();
  };

  const playHoverSound = () => {
    sounds.hover.currentTime = 0;
    sounds.hover.play();
  };

  return { playClickSound, playHoverSound };
};