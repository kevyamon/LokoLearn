import React from 'react';
import { Link } from 'react-router-dom';
import './LessonNavigator.css';

const LessonNavigator = ({ prevLesson, nextLesson }) => {
  return (
    <div className="lesson-navigator">
      {prevLesson ? (
        <Link to={prevLesson.url} className="nav-button prev">
          &larr; Leçon Précédente
        </Link>
      ) : (
        <span className="nav-button disabled">&larr; Leçon Précédente</span>
      )}
      
      {nextLesson ? (
        <Link to={nextLesson.url} className="nav-button next">
          Leçon Suivante &rarr;
        </Link>
      ) : (
        <span className="nav-button disabled">Leçon Suivante &rarr;</span>
      )}
    </div>
  );
};

export default LessonNavigator;