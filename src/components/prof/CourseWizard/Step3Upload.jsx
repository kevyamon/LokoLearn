import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Button, Alert } from '@mui/material';
import { CloudUpload, CheckCircle } from '@mui/icons-material';
// CORRECTION ICI : On remonte de 3 niveaux pour revenir à 'src', puis on va dans 'services'
import api from '../../../services/api';

const Step3Upload = ({ data, update }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Reset des états
    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Préparation du fichier pour l'envoi
    const formData = new FormData();
    formData.append('file', file);

    try {
      // --- APPEL API RÉEL ---
      const response = await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      // Récupération des infos du fichier uploadé
      const { url, format, bytes } = response.data;
      
      // Mise à jour du formulaire principal
      update('fileUrl', url);
      update('fileType', format);
      update('fileSize', (bytes / 1024 / 1024).toFixed(2) + ' MB');

    } catch (err) {
      console.error(err);
      // Gestion améliorée de l'erreur pour afficher le message du backend si dispo
      const message = err.response?.data?.message || "Échec de l'envoi. Vérifiez que le fichier fait moins de 10Mo.";
      setError(message);
      update('fileUrl', ''); // On vide l'URL en cas d'échec
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', py: 4, border: '2px dashed #ccc', borderRadius: 4, bgcolor: '#fafafa', position: 'relative' }}>
      <input
        accept=".pdf,.doc,.docx,.ppt,.pptx"
        style={{ display: 'none' }}
        id="upload-file-input"
        type="file"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <label htmlFor="upload-file-input" style={{ width: '100%', height: '100%', display: 'block', cursor: isUploading ? 'wait' : 'pointer' }}>
        
        {/* ÉTAT 1 : EN ATTENTE */}
        {!data.fileUrl && !isUploading && (
            <>
                <CloudUpload sx={{ fontSize: 60, color: '#9e9e9e', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                Cliquez ici pour déposer votre cours
                </Typography>
                <Typography variant="caption" display="block" mt={1} color="text.disabled">
                PDF, Word, PowerPoint (Max 10MB)
                </Typography>
            </>
        )}

        {/* ÉTAT 2 : UPLOAD EN COURS */}
        {isUploading && (
            <Box sx={{ width: '80%', mx: 'auto' }}>
                <Typography mb={1} fontWeight="bold" color="primary">Envoi vers le serveur...</Typography>
                <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 10, borderRadius: 5 }} />
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>{uploadProgress}%</Typography>
            </Box>
        )}

        {/* ÉTAT 3 : SUCCÈS */}
        {data.fileUrl && !isUploading && (
            <Box>
                <CheckCircle sx={{ fontSize: 60, color: '#2e7d32', mb: 1 }} />
                <Typography variant="h6" color="success.main" fontWeight="bold">
                    Document prêt !
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                   Type : {data.fileType?.toUpperCase()} • Taille : {data.fileSize}
                </Typography>
                <Button variant="outlined" color="warning" size="small" component="span">
                  Remplacer le fichier
                </Button>
            </Box>
        )}

        {/* ÉTAT 4 : ERREUR */}
        {error && (
            <Alert severity="error" sx={{ mt: 2, mx: 2 }}>{error}</Alert>
        )}
      </label>
    </Box>
  );
};

export default Step3Upload;