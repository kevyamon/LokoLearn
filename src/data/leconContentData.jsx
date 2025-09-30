import React from 'react';
import GlossaryTerm from '../components/common/GlossaryTerm';

// La clé est l'ID unique de la leçon (lecon-annee-matiere-chapitre-lecon)
// La valeur est le contenu de la leçon au format JSX
export const leconContentData = {
  'lecon-1-microbiologie-0-0': (
    <div>
      <p>
        La <GlossaryTerm term="microbiologie" /> alimentaire est la science qui étudie les micro-organismes ayant un impact sur les aliments, qu'il soit bénéfique, délétère ou pathogène. Une compréhension approfondie de la biologie fondamentale de ces entités invisibles est le prérequis indispensable à leur maîtrise.
      </p>
      
      <h3>Les Bactéries : Le Règne des Procaryotes</h3>
      <p>
        Les <GlossaryTerm term="bactérie" /> sont des organismes unicellulaires <GlossaryTerm term="procaryote" />, ce qui signifie qu'elles sont dépourvues de noyau délimité par une membrane. Leur matériel génétique (un chromosome circulaire unique) baigne directement dans le cytoplasme.
      </p>
      <h4>Morphologie et Structure</h4>
      <p>
        La morphologie bactérienne, observée au microscope, est un premier critère d'identification. On distingue principalement des formes sphériques (les cocci ou coques), cylindriques (les bacilles ou bâtonnets), et spiralées (les spirilles). La structure la plus déterminante est la paroi cellulaire, qui permet de classer les bactéries en deux grands groupes via la coloration de Gram :
      </p>
      <ul>
        <li>
          <strong>Bactéries à Gram positif :</strong> Elles possèdent une paroi épaisse constituée majoritairement de peptidoglycane. Cette paroi retient le colorant violet et apparaît mauve au microscope.
        </li>
        <li>
          <strong>Bactéries à Gram négatif :</strong> Leur paroi est plus fine en peptidoglycane et est entourée d'une membrane externe riche en lipopolysaccharides (LPS), aussi connus comme endotoxines. Elles ne retiennent pas le premier colorant et apparaissent roses.
        </li>
      </ul>
      <p>
        D'autres structures sont cruciales : les flagelles pour la mobilité, la capsule pour la protection et la formation de biofilms, et les endospores. L'endospore est une forme de survie extrême produite par certains genres comme Bacillus et Clostridium, capable de résister à la chaleur et aux agents chimiques. Sa destruction est l'objectif des procédés de stérilisation.
      </p>

      {/* On peut ajouter les autres sections du PDF ici (Levures, Moisissures, Virus...) */}
    </div>
  ),

  // Les autres leçons afficheront ce message par défaut pour l'instant
  'default': (
    <p>Le contenu détaillé de cette leçon est en cours de rédaction et sera bientôt disponible.</p>
  )
};