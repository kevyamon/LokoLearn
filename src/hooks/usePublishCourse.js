// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/hooks/usePublishCourse.js
import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
// IMPORT DES DONNÉES DE SECOURS
import { FALLBACK_FILIERES, FALLBACK_SUBJECTS } from '../data/fallbackData';

export const usePublishCourse = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    filiere: '',
    niveau: '',
    matiere: '',
    typeCours: 'COURS',
    titre: '',
    description: '',
    file: null,
    fileUrl: '',
    fileType: '',
    fileSize: ''
  });

  const [availableFilieres, setAvailableFilieres] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // On tente de charger depuis le serveur
        const { data } = await api.get('/api/courses/form-data');
        
        if (!data.filieres || data.filieres.length === 0) {
            setAvailableFilieres(FALLBACK_FILIERES);
        } else {
            setAvailableFilieres(data.filieres);
        }

        if (!data.subjects || data.subjects.length === 0) {
            setAvailableSubjects(FALLBACK_SUBJECTS);
        } else {
            setAvailableSubjects(data.subjects);
        }

      } catch (error) {
        console.warn("API inaccessible, utilisation des données locales.");
        setAvailableFilieres(FALLBACK_FILIERES);
        setAvailableSubjects(FALLBACK_SUBJECTS);
      }
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

        alert("Cours publié avec succès !");
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