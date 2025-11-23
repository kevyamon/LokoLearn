// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/ChoixMatierePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MatiereCard from '../components/MatiereCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import api from '../services/api';
import { FALLBACK_SUBJECTS } from '../data/fallbackData';
import './ChoixMatierePage.css';

const ChoixMatierePage = () => {
  const { annee } = useParams(); 
  const [isLoading, setIsLoading] = useState(true);
  const [matieresDisplay, setMatieresDisplay] = useState([]);

  const filiereName = localStorage.getItem('selectedFiliereName');
  const filiereType = localStorage.getItem('selectedFiliereType'); 
  const niveauTechnique = filiereType ? `${filiereType}${annee}` : `L${annee}`; 

  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        // 1. On récupère TOUS les cours
        const { data } = await api.get(`/api/courses`, {
            params: { 
                filiere: filiereName,
                level: niveauTechnique 
            }
        });

        // 2. REGROUPEMENT INTELLIGENT PAR MATIÈRE
        // On utilise un objet Map pour stocker les infos uniques
        const matieresMap = new Map();

        data.forEach(cours => {
            // Comme le backend nettoie le nom, "Microbiologie" est la clé unique
            const nomMatiere = cours.subject; 
            
            if (!matieresMap.has(nomMatiere)) {
                matieresMap.set(nomMatiere, {
                    name: nomMatiere,
                    hasTP: false, // Par défaut faux
                    source: 'db'
                });
            }

            // DÉTECTION TP : Si CE cours est un TP, alors la matière a des TP !
            if (cours.type === 'TP') {
                matieresMap.get(nomMatiere).hasTP = true;
            }
        });

        // 3. Conversion en tableau
        let displayList = Array.from(matieresMap.values());

        // 4. Ajout des matières statiques (Fallback)
        // Seulement si elles ne sont pas déjà dans la liste DB
        FALLBACK_SUBJECTS.forEach(defaut => {
            // On vérifie si le nom existe déjà (insensible à la casse pour être sûr)
            const exists = displayList.some(m => m.name.toLowerCase() === defaut.name.toLowerCase());
            if (!exists) {
                displayList.push({ 
                    name: defaut.name, 
                    hasTP: false, 
                    source: 'static' 
                });
            }
        });

        setMatieresDisplay(displayList);

      } catch (error) {
        console.error("Erreur chargement matières", error);
        setMatieresDisplay(FALLBACK_SUBJECTS.map(s => ({...s, hasTP:false})));
      } finally {
        setIsLoading(false);
      }
    };

    if (filiereName) {
        fetchMatieres();
    } else {
        setMatieresDisplay(FALLBACK_SUBJECTS.map(s => ({...s, hasTP:false})));
        setIsLoading(false);
    }
  }, [annee, filiereName, niveauTechnique]);

  return (
    <div className="choix-matiere-container">
      <div style={{textAlign:'center', marginBottom:'2rem'}}>
        <h1 className="choix-matiere-title">
            Matières - {filiereName || "Général"}
        </h1>
        <span className="niveau-badge-large">Niveau {niveauTechnique}</span>
      </div>

      <div className="matiere-grid">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : (
          matieresDisplay.map((matiere, index) => (
            <MatiereCard 
              key={index}
              name={matiere.name}
              hasTP={matiere.hasTP} // Ceci sera TRUE si un prof a uploadé un TP !
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChoixMatierePage;