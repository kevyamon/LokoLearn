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
    // On vérifie si c'est un étudiant connecté
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      if (parsedUser.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
        return config;
      }
    }

    // Sinon, on vérifie si c'est un prof connecté
    const profInfo = localStorage.getItem('profInfo');
    if (profInfo) {
      const parsedProf = JSON.parse(profInfo);
      if (parsedProf.token) {
        config.headers.Authorization = `Bearer ${parsedProf.token}`;
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