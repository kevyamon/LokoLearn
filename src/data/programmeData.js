// Exemple de structure de données pour le programme
export const programmeData = {
  'Microbiologie-1': { // Clé unique: nomMatiere-annee
    titre: 'Programme de Microbiologie - 1ère Année',
    chapitres: [
      {
        titre: 'Chapitre 1: Introduction à la Microbiologie',
        lecons: [
          'Histoire de la microbiologie et ses domaines',
          'Les grands groupes de micro-organismes',
          'La cellule procaryote et eucaryote',
        ],
      },
      {
        titre: 'Chapitre 2: Bactériologie',
        lecons: [
          'Structure et morphologie des bactéries',
          'La croissance bactérienne et sa mesure',
          'Métabolisme bactérien',
          'Classification des bactéries',
        ],
      },
      {
        titre: 'Chapitre 3: Virologie',
        lecons: [
          'Structure et classification des virus',
          'Le cycle de réplication viral',
        ],
      },
    ],
  },
  // On ajoutera les autres matières et années ici...
  'Default': { // Un programme par défaut si rien n'est trouvé
      titre: 'Programme en cours de rédaction',
      chapitres: [
          {
              titre: 'Le contenu de cette section sera bientôt disponible.',
              lecons: []
          }
      ]
  }
};