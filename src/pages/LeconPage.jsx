import React from 'react';
import { useParams } from 'react-router-dom';
import { programmeData } from '../data/programmeData';
import LessonNavigator from '../components/common/LessonNavigator';
import GlossaryTerm from '../components/common/GlossaryTerm';
import CompletionCheckbox from '../components/common/CompletionCheckbox';
import './LeconPage.css';

const LeconPage = () => {
  const { annee, matiereSlug, chapitreIndex, leconIndex } = useParams();
  
  // On crée un identifiant unique pour chaque leçon (ex: "lecon-1-microbiologie-1-0")
  const lessonId = `lecon-${annee}-${matiereSlug}-${chapitreIndex}-${leconIndex}`;

  const matiereName = matiereSlug.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const programmeKey = `${matiereName}-${annee}`;
  const programme = programmeData[programmeKey] || programmeData['Default'];
  
  const chapIdx = parseInt(chapitreIndex);
  const leconIdx = parseInt(leconIndex);
  
  const chapitreActuel = programme.chapitres[chapIdx];
  const leconActuelle = chapitreActuel?.lecons[leconIdx];

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

  if (!leconActuelle) {
    return <div className="lecon-container">Leçon non trouvée.</div>;
  }

  return (
    <div className="lecon-container">
      <div className="lecon-content">
        <h1 className="lecon-title">{leconActuelle}</h1>

        <p className="lecon-body">
          Le contenu de cette leçon est en cours de rédaction. 
          Ici, nous parlerons de la <GlossaryTerm term="glycolyse" />, un processus fondamental
          pour les cellules <GlossaryTerm term="procaryote" /> et <GlossaryTerm term="eucaryote" />.
          Nous verrons aussi comment un <GlossaryTerm term="autoclave" /> est utilisé pour 
          stériliser le matériel en éliminant toute <GlossaryTerm term="bactérie" />.
        </p>
        
        {/* On ajoute la checkbox en lui passant l'ID unique de la leçon */}
        <CompletionCheckbox itemId={lessonId} />
        
        <LessonNavigator prevLesson={prevLesson} nextLesson={nextLesson} />
      </div>
    </div>
  );
};

export default LeconPage;