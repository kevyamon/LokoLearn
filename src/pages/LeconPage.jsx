import React from 'react';
import { useParams } from 'react-router-dom';
import { programmeData } from '../data/programmeData';
import LessonNavigator from '../components/common/LessonNavigator';
import './LeconPage.css';

const LeconPage = () => {
  const { annee, matiereSlug, chapitreIndex, leconIndex } = useParams();
  
  // Retrouver le programme et la leçon actuels
  const matiereName = matiereSlug.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const programmeKey = `${matiereName}-${annee}`;
  const programme = programmeData[programmeKey] || programmeData['Default'];
  
  const chapIdx = parseInt(chapitreIndex);
  const leconIdx = parseInt(leconIndex);
  
  const chapitreActuel = programme.chapitres[chapIdx];
  const leconActuelle = chapitreActuel?.lecons[leconIdx];

  // --- Logique pour trouver la leçon précédente et suivante ---
  let prevLesson = null;
  if (leconIdx > 0) {
    prevLesson = { url: `/lecon/${annee}/${matiereSlug}/${chapIdx}/${leconIdx - 1}` };
  } else if (chapIdx > 0) {
    const chapPrecedent = programme.chapitres[chapIdx - 1];
    prevLesson = { url: `/lecon/${annee}/${matiereSlug}/${chapIdx - 1}/${chapPrecedent.lecons.length - 1}` };
  }

  let nextLesson = null;
  if (leconIdx < chapitreActuel?.lecons.length - 1) {
    nextLesson = { url: `/lecon/${annee}/${matiereSlug}/${chapIdx}/${leconIdx + 1}` };
  } else if (chapIdx < programme.chapitres.length - 1) {
    nextLesson = { url: `/lecon/${annee}/${matiereSlug}/${chapIdx + 1}/0` };
  }
  // --- Fin de la logique ---

  if (!leconActuelle) {
    return <div className="lecon-container">Leçon non trouvée.</div>;
  }

  return (
    <div className="lecon-container">
      <div className="lecon-content">
        <h1 className="lecon-title">{leconActuelle}</h1>
        <p className="lecon-body">
          Le contenu de cette leçon est en cours de rédaction et sera bientôt disponible. 
          Cette page affichera toutes les explications, exemples et schémas nécessaires 
          pour une compréhension parfaite du sujet.
        </p>
        <LessonNavigator prevLesson={prevLesson} nextLesson={nextLesson} />
      </div>
    </div>
  );
};

export default LeconPage;