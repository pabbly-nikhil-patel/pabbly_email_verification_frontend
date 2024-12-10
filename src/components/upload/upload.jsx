import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

const FileUpload = forwardRef(({ placeholder, error, disabled, sx, onFileUpload, selectedFile, ...other }, ref) => {
  const [localSelectedFile, setLocalSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    resetFile: () => {
      setLocalSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }));

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLocalSelectedFile(file);
      onFileUpload(file);
    }
    // Reset the file input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setLocalSelectedFile(file);
      onFileUpload(file);
    }
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        padding: '20px 20px 20px 20px',
        width: '100%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        alignItems: 'center',
        color: 'text.disabled',
        justifyContent: 'center',
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
        border: (theme) => `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
        ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
        ...(error && {
          color: 'error.main',
          borderColor: 'grey',
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
        }),
        '&:hover': { opacity: 0.72 },
        ...sx,
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        {...other}
      />
      <Button size="large" component="span" onClick={handleButtonClick} disabled={disabled}>
        {placeholder || 'Upload File'}
      </Button>
      {(selectedFile || localSelectedFile) && (
        <Typography
        variant="body1"
        sx={{
          width: '100%',  // Ensure it takes the full width of the container
          wordBreak: 'break-all',  // Break words if they are too long
          whiteSpace: 'normal',  // Allow text to wrap to the next line
         textAlign: 'center'
        }}
      >
        Selected file: {selectedFile ? selectedFile.name : localSelectedFile.name}
      </Typography>
      )}
    </Box>
  );
});

export default FileUpload;