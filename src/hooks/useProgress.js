import { useState, useCallback } from 'react';

const PROGRESS_KEY = 'lokoLearnProgress';

// Fonction pour récupérer les données sauvegardées depuis le localStorage
const getProgress = () => {
  try {
    const progress = localStorage.getItem(PROGRESS_KEY);
    // Si des données existent, on les parse, sinon on retourne un objet vide
    return progress ? JSON.parse(progress) : {};
  } catch (error) {
    console.error("Erreur lors de la lecture de la progression depuis le localStorage", error);
    return {};
  }
};

// Notre hook personnalisé pour interagir avec la progression
export const useProgress = () => {
  const [progress, setProgress] = useState(getProgress());

  // Vérifie si un élément (leçon, TP...) est marqué comme terminé
  // useCallback est une optimisation pour que la fonction ne soit pas recréée à chaque rendu
  const isCompleted = useCallback((itemId) => {
    return !!progress[itemId]; // Renvoie true si l'ID existe dans notre objet de progression, sinon false
  }, [progress]);

  // Fonction pour marquer/démarquer un élément comme terminé
  const toggleCompletion = (itemId) => {
    const newProgress = { ...progress };
    if (newProgress[itemId]) {
      // S'il est déjà terminé, on le supprime de la liste (on le "dé-coche")
      delete newProgress[itemId];
    } else {
      // Sinon, on l'ajoute à la liste
      newProgress[itemId] = true;
    }
    // On sauvegarde le nouvel état de la progression dans le localStorage
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    // On met à jour l'état de notre application pour que l'interface réagisse
    setProgress(newProgress);
  };

  // On expose les fonctions utiles pour les autres composants
  return { isCompleted, toggleCompletion };
};