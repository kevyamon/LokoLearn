import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import './CompletionCheckbox.css';

const CompletionCheckbox = ({ itemId }) => {
  // On utilise notre hook pour savoir si l'élément est déjà terminé
  const { isCompleted, toggleCompletion } = useProgress();
  const completed = isCompleted(itemId);

  return (
    <div className="completion-container">
      <label className={`completion-label ${completed ? 'completed' : ''}`}>
        <input 
          type="checkbox"
          checked={completed}
          onChange={() => toggleCompletion(itemId)}
        />
        {/* On change le texte en fonction de l'état */}
        {completed ? '✔️ Marqué comme terminé' : 'Marquer comme terminé'}
      </label>
    </div>
  );
};

export default CompletionCheckbox;