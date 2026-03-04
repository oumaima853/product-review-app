'use client';
import { useTheme } from '@emotion/react';


import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Button,
  ListItem,
  ListItemIcon,
  List,
  Paper,
  Chip
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const DragAndDrop = () => {
    /*state to display file information */
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Files received successfully:", acceptedFiles);
    
    // Create preview URLs for files
    const filesWithPreview = acceptedFiles.map((file) => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    
    setFiles(filesWithPreview);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
     
    },
    multiple: false,
    maxFiles: 1      
  });

  // Clean up preview URLs when component unmounts
  const clearFiles = () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);
  };

  // Function to view file
  const viewFile = (file) => {
    if (file.type.startsWith('image/')) {
      // Open image in new tab
      window.open(file.preview, '_blank');
    } 
    
    /*else {
      // For non-images, download the file
      const link = document.createElement('a');
      link.href = file.preview;
      link.download = file.name;
      link.click();
    }*/
  };


  const muiTheme = useTheme();

  return (
    <Box sx={{ width: "100%",  mx: 'auto', p: 2 , border:"2px solid red",}}>
      {/* Dropzone Area */}
      <Paper
        {...getRootProps()}
        elevation={0}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragActive ? 'rgba(25, 118, 210, 0.04)' : 'grey.700',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'rgba(25, 118, 210, 0.08)'
          }
        }}
      >
        <input {...getInputProps()} />
        
        <UploadFileIcon 
          sx={{ 
            fontSize: 48, 
            color: isDragActive ? 'primary.main' : 'grey.500', 
            mb: 2 
          }} 
        />
        
        {isDragActive ? (
          <Typography variant="h6" color="primary">
            Drop file here...
          </Typography>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Drag & drop files here
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or <b style={{ color: '#1976d2' }}>click to browse</b>
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Supports images : .png , .jpg , .jpeg , .gif
            </Typography>
          </>
        )}
      </Paper>

      {/* Uploaded Files Display */}
      {files.length > 0 && (
        <Paper sx={{ mt: 3, p: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Uploaded File
            </Typography>
            <Button 
              variant="outlined" 
              size="small" 
              color="error"
              onClick={clearFiles}
            >
              Clear All
            </Button>
          </Box>

          <List>
            {files.map((file, index) => (
              <Paper 
                key={index}
                variant="outlined"
                sx={{ 
                  p: 2, 
                  mb: 1, 
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    {file.type.startsWith('image/') ? (
                      <Box
                        component="img"
                        src={file.preview}
                        alt={file.name}
                        sx={{ width: 40, height: 40, borderRadius: 1, objectFit: 'cover' }}
                      />
                    ) : (
                      <InsertDriveFileIcon color="primary" sx={{ fontSize: 40 }} />
                    )}
                  </ListItemIcon>
                  
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {file.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(file.size / 1024).toFixed(2)} KB • {file.type}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label={file.type.split('/')[0].toUpperCase()} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => viewFile(file)}
                    sx={{ textTransform: 'none' }}
                  >
                    View
                  </Button>
                </Box>
              </Paper>
            ))}
          </List>

          {/* Summary Info */}
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            bgcolor: 'success.light', 
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="body2" color="success.contrastText">
               File uploaded successfully!
            </Typography>
            <Typography variant="caption" color="success.contrastText">
              {files.length} file{files.length > 1 ? 's' : ''}
            </Typography>
          </Box>
        </Paper>
      )}

    
   
    </Box>
  );
};

export default DragAndDrop;