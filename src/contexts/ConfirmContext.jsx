// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/contexts/ConfirmContext.jsx
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Typography, Button, Box, LinearProgress 
} from '@mui/material';
import { Warning, Info, CheckCircle } from '@mui/icons-material';

const ConfirmContext = createContext();

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(3); // Pour le compte à rebours
  const [options, setOptions] = useState({
    title: '',
    message: '',
    type: 'confirm', // 'confirm', 'alert', ou 'timer'
    severity: 'warning'
  });

  const resolver = useRef();

  // 1. Confirmation Oui/Non
  const confirm = (title, message, severity = 'warning') => {
    setOptions({ title, message, type: 'confirm', severity });
    setOpen(true);
    return new Promise((resolve) => { resolver.current = resolve; });
  };

  // 2. Alerte simple (OK)
  const alertInfo = (title, message, severity = 'info') => {
    setOptions({ title, message, type: 'alert', severity });
    setOpen(true);
    return new Promise((resolve) => { resolver.current = resolve; });
  };

  // 3. NOUVEAU : Succès avec Timer (Redirection auto)
  const alertSuccessTimer = (title, message, duration = 3) => {
    setOptions({ title, message, type: 'timer', severity: 'success' });
    setSeconds(duration);
    setOpen(true);
    return new Promise((resolve) => { resolver.current = resolve; });
  };

  // Gestion du Compte à Rebours
  useEffect(() => {
    let interval;
    if (open && options.type === 'timer' && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (open && options.type === 'timer' && seconds === 0) {
      // Quand le temps est écoulé, on ferme et on valide
      setOpen(false);
      if (resolver.current) resolver.current(true);
    }
    return () => clearInterval(interval);
  }, [open, options.type, seconds]);

  const handleClose = () => {
    // On empêche la fermeture manuelle si c'est un timer (pour forcer l'attente ou pas, ici on laisse fermer)
    if (options.type === 'timer') return; 
    setOpen(false);
    if (resolver.current) resolver.current(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    if (resolver.current) resolver.current(true);
  };

  const getColor = () => {
    switch (options.severity) {
      case 'error': return '#ef5350';
      case 'warning': return '#ff9800';
      case 'success': return '#4caf50';
      default: return '#2196f3';
    }
  };

  const getIcon = () => {
    if (options.severity === 'success') return <CheckCircle sx={{ fontSize: 50, color: getColor(), mb: 1 }} />;
    if (options.severity === 'warning' || options.severity === 'error') return <Warning sx={{ fontSize: 50, color: getColor(), mb: 1 }} />;
    return <Info sx={{ fontSize: 50, color: getColor(), mb: 1 }} />;
  };

  return (
    <ConfirmContext.Provider value={{ confirm, alertInfo, alertSuccessTimer }}>
      {children}
      
      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: '#1e1e1e',
            color: 'white',
            borderRadius: 3,
            minWidth: 320,
            borderTop: `6px solid ${getColor()}`,
            textAlign: 'center'
          }
        }}
      >
        <Box sx={{ pt: 3 }}>
          {getIcon()}
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.4rem', p: 1 }}>
            {options.title}
          </DialogTitle>
        </Box>

        <DialogContent>
          <Typography color="rgba(255,255,255,0.8)" sx={{ mb: 2 }}>
            {options.message}
          </Typography>
          
          {/* Affichage spécifique pour le Timer */}
          {options.type === 'timer' && (
            <Box sx={{ width: '100%', mt: 2 }}>
               <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                 {seconds}
               </Typography>
               <Typography variant="caption" color="text.secondary">
                 Redirection automatique...
               </Typography>
               <LinearProgress 
                 variant="determinate" 
                 value={(seconds / 3) * 100} // Barre qui diminue (basée sur 3s par défaut)
                 sx={{ mt: 2, height: 6, borderRadius: 3 }} 
               />
            </Box>
          )}
        </DialogContent>

        {/* On cache les boutons si c'est un Timer */}
        {options.type !== 'timer' && (
          <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
            {options.type === 'confirm' && (
              <Button onClick={handleClose} variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', borderRadius: 50, px: 3 }}>
                Annuler
              </Button>
            )}
            <Button onClick={handleConfirm} variant="contained" autoFocus sx={{ bgcolor: getColor(), borderRadius: 50, px: 4, fontWeight: 'bold', '&:hover': { bgcolor: getColor(), filter: 'brightness(1.1)' } }}>
              {options.type === 'confirm' ? 'Confirmer' : 'D\'accord'}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </ConfirmContext.Provider>
  );
};