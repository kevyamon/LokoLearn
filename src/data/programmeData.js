// On met à jour avec les vrais chapitres et leçons du PDF
export const programmeData = {
  'Microbiologie-1': { 
    titre: 'Programme de Microbiologie - 1er Niveau',
    chapitres: [
      {
        titre: 'Chapitre 1: Fondamentaux de la Microbiologie Alimentaire',
        lecons: [
          'Taxonomie et Caractérisation du Monde Microbien', // [cite: 4]
          'Cartographie de l\'Impact Microbien en IAA', // [cite: 85]
        ],
      },
      {
        titre: 'Chapitre 2: Maîtrise de la Croissance Microbienne',
        lecons: [
          'Les 6 Facteurs de Croissance (FAT TOM)', // [cite: 209]
        ],
      },
      {
        titre: 'Chapitre 3: Pathogènes Majeurs et HACCP',
        lecons: [
          'Monographies des Bactéries Pathogènes Clés', // [cite: 382]
          'Philosophie et Concepts Clés du HACCP', // [cite: 459]
        ],
      },
    ],
  },
  // On peut déjà préparer la structure pour la matière "Qualité"
  'Qualité-2': {
    titre: 'Programme de Qualité - 2ème Niveau',
    chapitres: [
        {
            titre: 'Chapitre 1: Les Piliers de la Qualité et le Cadre Normatif',
            lecons: [
                'Déconstruction de la "Qualité" en IAA', // [cite: 142]
                'Le Langage de la Conformité : Normalisation, Certification, Accréditation', // [cite: 167]
            ]
        }
    ]
  },
  'Default': {
      titre: 'Programme en cours de rédaction',
      chapitres: [
          {
              titre: 'Le contenu de cette section sera bientôt disponible.',
              lecons: []
          }
      ]
  }
};