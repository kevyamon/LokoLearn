// src/hooks/usePublishCourse.js
import { useState, useEffect } from 'react';
import api from '../services/api'; // Ton instance Axios configurée
import { useNavigate } from 'react-router-dom';

export const usePublishCourse = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    filiere: '',
    niveau: '',
    matiere: '',
    typeCours: 'COURS', // COURS, TD, TP
    titre: '',
    description: '',
    file: null, // Le fichier brut
    fileUrl: '', // L'URL après upload Cloudinary
    fileType: '',
    fileSize: ''
  });

  // Données dynamiques (chargées depuis le backend)
  const [availableFilieres, setAvailableFilieres] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  useEffect(() => {
    // Charger les filières et matières au démarrage
    const fetchData = async () => {
        // TODO: Décommenter quand le backend sera relié
        // const { data } = await api.get('/api/courses/form-data');
        // setAvailableFilieres(data.filieres);
        // setAvailableSubjects(data.subjects);
        
        // Mock pour dev immédiat
        setAvailableFilieres([
            { _id: '1', name: 'IGL', type: 'LMD' }, 
            { _id: '2', name: 'RIT', type: 'LMD' },
            { _id: '3', name: 'AD', type: 'BTS' }
        ]);
        setAvailableSubjects([
            { _id: 's1', name: 'Algorithmique', hasTP: true },
            { _id: 's2', name: 'Droit', hasTP: false }
        ]);
    };
    fetchData();
  }, []);

  const nextStep = () => setStep((p) => p + 1);
  const prevStep = () => setStep((p) => p - 1);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
        // 1. Upload du fichier sur Cloudinary (si pas déjà fait)
        // Note: Idéalement, on fait l'upload à l'étape 3 et on récupère l'URL.
        // Ici on suppose que l'URL est déjà dans formData.fileUrl grâce au composant d'upload.

        // 2. Envoi des données au Backend
        await api.post('/api/courses', {
            title: formData.titre,
            description: formData.description,
            subject: formData.matiere,
            filiere: formData.filiere,
            level: formData.niveau,
            type: formData.typeCours,
            fileUrl: formData.fileUrl,
            fileType: formData.fileType,
            fileSize: formData.fileSize
        });

        // 3. Succès
        navigate('/prof/dashboard');
    } catch (error) {
        console.error("Erreur publication", error);
        alert("Erreur lors de la publication.");
    } finally {
        setLoading(false);
    }
  };

  return {
    step, nextStep, prevStep,
    formData, updateField,
    loading, handlePublish,
    availableFilieres, availableSubjects
  };
};