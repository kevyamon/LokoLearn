// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/services/authService.js

// Durée de validité en millisecondes (24h)
const SESSION_DURATION = 24 * 60 * 60 * 1000;

export const authService = {
  // Sauvegarder la session avec un timestamp
  login: (role, data) => {
    const session = {
      data: data,
      role: role, // 'student', 'prof', 'admin'
      timestamp: new Date().getTime()
    };
    
    // On nettoie tout avant de sauvegarder
    localStorage.removeItem('userInfo');
    localStorage.removeItem('profInfo');
    localStorage.removeItem('adminInfo');
    localStorage.removeItem('lokoSession');

    localStorage.setItem('lokoSession', JSON.stringify(session));
    
    // On garde aussi les anciennes clés pour compatibilité avec le reste du code existant
    if (role === 'student') localStorage.setItem('userInfo', JSON.stringify(data));
    if (role === 'prof') localStorage.setItem('profInfo', JSON.stringify(data));
    if (role === 'admin') localStorage.setItem('adminInfo', JSON.stringify(data));
  },

  // Déconnecter
  logout: () => {
    localStorage.clear(); // Radical mais propre
  },

  // Vérifier la session
  checkSession: () => {
    const sessionStr = localStorage.getItem('lokoSession');
    if (!sessionStr) return null;

    try {
      const session = JSON.parse(sessionStr);
      const now = new Date().getTime();

      // Vérification Expiration (24h)
      if (now - session.timestamp > SESSION_DURATION) {
        authService.logout();
        return { expired: true };
      }

      return { 
        valid: true, 
        role: session.role, 
        data: session.data 
      };
    } catch (e) {
      return null;
    }
  }
};