// src/components/prof/CourseWizard/Step3Upload.jsx
import React, { useCallback, useState } from 'react';
import { Box, Typography, LinearProgress, Button } from '@mui/material';
import { CloudUpload, PictureAsPdf, Description } from '@mui/icons-material';
// Tu peux installer 'react-dropzone' pour un vrai drag & drop: npm install react-dropzone

const Step3Upload = ({ data, update }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Simulation d'upload pour la démo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    // update('file', file);
    // update('fileType', file.name.split('.').pop());
    // update('fileSize', (file.size / 1024 / 1024).toFixed(2) + ' MB');

    // Simulation de progression
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        // Simulation retour Cloudinary
        update('fileUrl', 'https://fake-cloudinary-url.com/moncours.pdf');
      }
    }, 200);
  };

  return (
    <Box sx={{ textAlign: 'center', py: 4, border: '2px dashed #ccc', borderRadius: 4, bgcolor: '#fafafa', cursor: 'pointer', '&:hover': { borderColor: '#1976d2', bgcolor: '#f0f7ff' } }}>
      <input
        accept=".pdf,.doc,.docx,.ppt,.pptx"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file" style={{ width: '100%', height: '100%', display: 'block' }}>
        
        {!data.fileUrl && !isUploading && (
            <>
                <CloudUpload sx={{ fontSize: 60, color: '#9e9e9e', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                Glissez votre fichier ici ou cliquez pour parcourir
                </Typography>
                <Typography variant="caption" display="block" mt={1}>
                PDF, Word, PowerPoint acceptés (Max 10MB)
                </Typography>
            </>
        )}

        {isUploading && (
            <Box sx={{ width: '80%', mx: 'auto' }}>
                <Typography mb={1}>Téléchargement en cours...</Typography>
                <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 10, borderRadius: 5 }} />
                <Typography variant="caption">{uploadProgress}%</Typography>
            </Box>
        )}

        {data.fileUrl && !isUploading && (
            <Box>
                <PictureAsPdf sx={{ fontSize: 50, color: '#d32f2f', mb: 1 }} />
                <Typography variant="h6" color="success.main" fontWeight="bold">
                    Fichier prêt !
                </Typography>
                <Button color="warning" size="small" sx={{ mt: 1 }}>Changer de fichier</Button>
            </Box>
        )}
      </label>
    </Box>
  );
};

export default Step3Upload;