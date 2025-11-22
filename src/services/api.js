// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/services/api.js
import axios from 'axios';

// Création de l'instance Axios avec la configuration de base
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTEUR : Ajoute le token JWT à chaque requête automatiquement
api.interceptors.request.use(
  (config) => {
    
    // 1. Vérification ADMIN (Priorité haute)
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      const parsedAdmin = JSON.parse(adminInfo);
      if (parsedAdmin.token) {
        config.headers.Authorization = `Bearer ${parsedAdmin.token}`;
        return config; // On a trouvé, on envoie !
      }
    }

    // 2. Vérification PROFESSEUR
    const profInfo = localStorage.getItem('profInfo');
    if (profInfo) {
      const parsedProf = JSON.parse(profInfo);
      if (parsedProf.token) {
        config.headers.Authorization = `Bearer ${parsedProf.token}`;
        return config;
      }
    }

    // 3. Vérification ÉTUDIANT
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      if (parsedUser.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
        return config;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;