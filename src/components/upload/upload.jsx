import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

import { Box, Link, IconButton, Typography } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from '../iconify';

const FileUpload = forwardRef(
  (
    {
      fileName,
      fileErrorMessage,
      placeholder,
      error,
      disabled,
      sx,
      onFileUpload,
      selectedFile,
      uploadInformation,
      allowedFileTypes,
      ...other
    },
    ref
  ) => {
    const [localSelectedFile, setLocalSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const fileInputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      resetFile: () => {
        setLocalSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
    }));

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (allowedFileTypes && !allowedFileTypes.includes(file.type)) {
          setErrorMessage(fileErrorMessage);
          return;
        }
        setErrorMessage(null);
        setLocalSelectedFile(file);
        onFileUpload(file);
      }
      event.target.value = ''; // Reset the file input value to allow selecting the same file again
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
        if (allowedFileTypes && !allowedFileTypes.includes(file.type)) {
          setErrorMessage(fileErrorMessage);
          return;
        }
        setErrorMessage(null);
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
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={allowedFileTypes.join(',')} // Enforce allowed file types in the file picker
          style={{ display: 'none' }}
          {...other}
        />
        <IconButton size="large" component="span" onClick={handleButtonClick} disabled={disabled}>
          <Iconify width={32} icon="eva:cloud-upload-fill" />
        </IconButton>
        <Typography
          variant="body1"
          sx={{
            width: '100%',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
            textAlign: 'center',
          }}
        >
          {uploadInformation.includes('Sample File') ? (
            <span>
              Upload File OR Drag and Drop file here (Only CSV files allowed).
              <br />
              <Box style={{ marginTop: '4px' }}>
                {' '}
                {/* Optional styling to add spacing */}
                Download{' '}
                <Link
                  href={`/src/assets/sample-files/${fileName}`} // Replace with the actual path to your sample CSV file
                  download
                  style={{ color: '#078DEE' }}
                >
                  Sample File
                </Link>{' '}
                here.
              </Box>
            </span>
          ) : (
            uploadInformation
          )}
        </Typography>

        {errorMessage && (
          <Typography
            variant="body1"
            sx={{
              color: 'error.main',
              textAlign: 'center',
              mt: 1,
            }}
          >
            {errorMessage}
          </Typography>
        )}
        {(selectedFile || localSelectedFile) && (
          <Typography
            variant="body1"
            sx={{
              width: '100%',
              wordBreak: 'break-all',
              whiteSpace: 'normal',
              textAlign: 'center',
            }}
          >
            Selected file: {selectedFile ? selectedFile.name : localSelectedFile.name}
          </Typography>
        )}
      </Box>
    );
  }
);

export default FileUpload;
