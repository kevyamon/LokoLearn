// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/contexts/ConfirmContext.jsx
import React, { createContext, useContext, useState, useRef } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Typography, Button, Box 
} from '@mui/material';
import { Warning, Info } from '@mui/icons-material';

const ConfirmContext = createContext();

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({
    title: '',
    message: '',
    type: 'confirm', // 'confirm' (Oui/Non) ou 'alert' (OK seulement)
    severity: 'warning' // 'warning', 'info', 'error'
  });

  // On utilise une référence pour stocker la promesse (resolve)
  // C'est ce qui permet d'attendre la réponse de l'utilisateur
  const resolver = useRef();

  const confirm = (title, message, severity = 'warning') => {
    setOptions({ title, message, type: 'confirm', severity });
    setOpen(true);
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const alertInfo = (title, message, severity = 'info') => {
    setOptions({ title, message, type: 'alert', severity });
    setOpen(true);
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const handleClose = () => {
    setOpen(false);
    if (resolver.current) resolver.current(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    if (resolver.current) resolver.current(true);
  };

  // Couleurs dynamiques selon la sévérité
  const getColor = () => {
    switch (options.severity) {
      case 'error': return '#ef5350';
      case 'warning': return '#ff9800';
      case 'success': return '#4caf50';
      default: return '#2196f3';
    }
  };

  return (
    <ConfirmContext.Provider value={{ confirm, alertInfo }}>
      {children}
      
      {/* LA MODALE STYLISÉE */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: '#1e1e1e', // Fond sombre LokoLearn
            color: 'white',
            borderRadius: 3,
            minWidth: 320,
            borderTop: `6px solid ${getColor()}`
          }
        }}
      >
        <Box sx={{ textAlign: 'center', pt: 3 }}>
          {options.severity === 'warning' || options.severity === 'error' ? 
            <Warning sx={{ fontSize: 50, color: getColor(), mb: 1 }} /> : 
            <Info sx={{ fontSize: 50, color: getColor(), mb: 1 }} />
          }
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.4rem', p: 1 }}>
            {options.title}
          </DialogTitle>
        </Box>

        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography color="rgba(255,255,255,0.8)">
            {options.message}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
          {options.type === 'confirm' && (
            <Button 
              onClick={handleClose} 
              variant="outlined" 
              sx={{ 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.3)', 
                borderRadius: 50,
                px: 3
              }}
            >
              Annuler
            </Button>
          )}
          <Button 
            onClick={handleConfirm} 
            variant="contained" 
            autoFocus
            sx={{ 
              bgcolor: getColor(), 
              borderRadius: 50,
              px: 4,
              fontWeight: 'bold',
              '&:hover': { filter: 'brightness(1.1)', bgcolor: getColor() }
            }}
          >
            {options.type === 'confirm' ? 'Confirmer' : 'D\'accord'}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmContext.Provider>
  );
};