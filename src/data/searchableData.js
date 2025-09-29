import { programmeData } from './programmeData';
import { tpData } from './tpData';

const searchableContent = [];

// On traite les données du programme (les leçons)
for (const key in programmeData) {
  if (key !== 'Default') {
    const [matiereName, annee] = key.split('-');
    programmeData[key].chapitres.forEach((chapitre, chapIndex) => {
      chapitre.lecons.forEach((lecon, leconIndex) => {
        searchableContent.push({
          type: 'Leçon',
          title: lecon,
          category: `${matiereName} - Niveau ${annee}`,
          url: `/lecon/${annee}/${matiereName.toLowerCase().replace(/ /g, '-')}/${chapIndex}/${leconIndex}`,
        });
      });
    });
  }
}

// On traite les données des TP
for (const key in tpData) {
    if (key !== 'default') {
        const [matiereSlug, annee] = key.split('-');
        const matiereName = matiereSlug.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
        tpData[key].forEach(tp => {
            searchableContent.push({
                type: 'TP',
                title: `${tp.title}: ${tp.description}`,
                category: `${matiereName} - Niveau ${annee}`,
                url: `/tp/${annee}/${matiereSlug}/${tp.id}`
            });
        });
    }
}


export default searchableContent;