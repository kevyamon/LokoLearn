import React from 'react';
import { useParams } from 'react-router-dom';
import { programmeData } from 'data/programmeData';
// On s'assure que le chemin d'import se termine bien par .jsx
import { leconContentData } from 'data/leconContentData.jsx'; 
import LessonNavigator from 'components/common/LessonNavigator';
import CompletionCheckbox from 'components/common/CompletionCheckbox';
import GlossaryTerm from 'components/common/GlossaryTerm';
import './LeconPage.css';

const LeconPage = () => {
  const { annee, matiereSlug, chapitreIndex, leconIndex } = useParams();
  
  const lessonId = `lecon-${annee}-${matiereSlug}-${chapitreIndex}-${leconIndex}`;

  const matiereName = matiereSlug.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const programmeKey = `${matiereName}-${annee}`;
  const programme = programmeData[programmeKey] || programmeData['Default'];
  
  const chapIdx = parseInt(chapitreIndex);
  const leconIdx = parseInt(leconIndex);
  
  const chapitreActuel = programme.chapitres[chapIdx];
  const leconActuelleTitre = chapitreActuel?.lecons[leconIdx];

  const leconActuelleContenu = leconContentData[lessonId] || leconContentData['default'];

  // --- Logique pour Précédent/Suivant ---
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

  if (!leconActuelleTitre) {
    return <div className="lecon-container">Leçon non trouvée.</div>;
  }

  return (
    <div className="lecon-container">
      <div className="lecon-content">
        <h1 className="lecon-title">{leconActuelleTitre}</h1>
        <div className="lecon-body">
          {leconActuelleContenu}
        </div>
        <CompletionCheckbox itemId={lessonId} />
        <LessonNavigator prevLesson={prevLesson} nextLesson={nextLesson} />
      </div>
    </div>
  );
};

export default LeconPage;