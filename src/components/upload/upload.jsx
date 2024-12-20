import { useDispatch } from 'react-redux';
import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

import { Box, IconButton, Typography } from '@mui/material';

import { varAlpha } from 'src/theme/styles';
import { startUpload, finishUpload, updateProgress } from 'src/redux/slice/upload-slice';

import { Iconify } from '../iconify';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

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
      setAlertState, // Add this prop
      ...other
    },
    ref
  ) => {
    const [localSelectedFile, setLocalSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
      resetFile: () => {
        setLocalSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
    }));

    const handleAlertClose = () => {
      setAlertState((prev) => ({ ...prev, open: false }));
    };

    const validateFile = (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setAlertState({
          open: true,
          color: 'error',
          title: 'Error',
          message: 'The selected file exceeds the maximum size limit of 10MB',
          status: 'Please choose a smaller file',
        });
        setTimeout(() => {
          handleAlertClose();
        }, 3000);
        return false;
      }
      if (allowedFileTypes && !allowedFileTypes.includes(file.type)) {
        setErrorMessage(fileErrorMessage);
        return false;
      }
      return true;
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (!validateFile(file)) {
          event.target.value = '';
          return;
        }

        setErrorMessage(null);
        setLocalSelectedFile(file);

        dispatch(startUpload());

        let progress = 0;

        const uploadSimulation = setInterval(() => {
          progress += 5;

          dispatch(updateProgress(progress));

          if (progress >= 100) {
            clearInterval(uploadSimulation);
            console.log('Dispatching finishUpload');

            dispatch(finishUpload());
          }
        }, 500);
        onFileUpload(file);
      }
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
        if (!validateFile(file)) {
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
          accept={allowedFileTypes.join(',')}
          style={{ display: 'none' }}
          {...other}
        />
        <IconButton size="large" component="span" onClick={handleButtonClick} disabled={disabled}>
          <Iconify width={32} icon="eva:cloud-upload-fill" />
        </IconButton>
        <Typography
          variant="span"
          sx={{
            width: '100%',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
            textAlign: 'center',
          }}
        >
          {uploadInformation.includes('Sample File') ? (
            <span>
              <Box display='flex' justifyContent='center' gap={0.6}>

             <Typography sx={{cursor:'pointer'}}  onClick={handleButtonClick}>Choose a file</Typography>
              
              or drag it here.
              </Box>
              Supports: CSV
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
