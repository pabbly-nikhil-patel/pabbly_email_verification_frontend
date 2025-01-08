import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Alert,
  Dialog,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  DialogTitle,
  Autocomplete,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function CreateFolderDialog({ title, content, action, open, onClose, ...other }) {
  const [workflowName, setWorkflowName] = useState('');
  const [error, setError] = useState(false);
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [contactList, setContactList] = useState('Pabbly_Connect_list');

  // Change initial state to 'Home'
  const [categorylist, setCategoryList] = useState('Home');
  const [categoryError, setCategoryError] = useState(false);

  const handleChangeCategoryList = useCallback((event, value) => {
    setCategoryList(value);
    if (value) {
      setCategoryError(false);
    }
  }, []);

  const handleAdd = () => {
    let hasError = false;

    if (!workflowName.trim()) {
      setError(true);
      hasError = true;
    }

    if (!categorylist) {
      setCategoryError(true);
      hasError = true;
    }

    if (!hasError) {
      setSnackbarOpen(true);
      setError(false);
      setCategoryError(false);
      onClose();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleWorkflowNameChange = (event) => {
    setWorkflowName(event.target.value);
    if (event.target.value) {
      setError(false);
    }
  };

  // Reset workflow name when dialog is closed, but keep 'Home' as default category
  useEffect(() => {
    if (!open) {
      setWorkflowName('');
      setCategoryList('Home'); // Reset to Home when dialog is closed
    }
  }, [open]);

  // Sample data for folder options
  const folder = [
    'None',
    'Home',
    'Organization 1',
    'Organization 2',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
    'Organization 3',
    'Organization 4',
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        {...other}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '600', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          Create Folder
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} mt={0} mb={0}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Folder Name"
              placeholder="Enter folder name here."
              value={workflowName}
              onChange={handleWorkflowNameChange}
              error={error}
              helperText={
                error ? (
                  'Enter folder name here.'
                ) : (
                  <span>
                    Enter the name of the folder here.{' '}
                    <Link
                      href="https://forum.pabbly.com/threads/folders.20987/"
                      style={{ color: '#078DEE' }}
                      underline="always"
                      target="_blank"
                    >
                      Learn more
                    </Link>
                  </span>
                )
              }
            />

            <Autocomplete
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '14px',
                },
                '& .MuiInputLabel-root': {
                  fontSize: '14px',
                },
              }}
              options={folder}
              value={categorylist}
              onChange={handleChangeCategoryList}
              defaultValue="None"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <Tooltip
                      title="Select the parent folder where the folder will be created."
                      arrow
                      placement="top"
                    >
                      <span>Select Parent Folder </span>
                    </Tooltip>
                  }
                  helperText={
                    <span>
                      {categoryError ? (
                        'Please select a folder.'
                      ) : (
                        <>
                          Select the parent folder where you want to create the folder.{' '}
                          <Link
                            href="https://forum.pabbly.com/threads/folders.20987/"
                            style={{ color: '#078DEE' }}
                            underline="always"
                            target="_blank"
                          >
                            Learn more
                          </Link>
                        </>
                      )}
                    </span>
                  }
                  error={categoryError}
                />
              )}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} color="primary" variant="contained">
            Create Folder
          </Button>
          {/* <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button> */}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        Z-index={999}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 7,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          Folder created successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
