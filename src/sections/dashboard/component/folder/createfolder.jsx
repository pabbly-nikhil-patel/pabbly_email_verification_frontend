import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Alert,
  Dialog,
  Button,
  Divider,
  Snackbar,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';


export function CreateFolderDialog({ title, content, action, open, onClose, ...other }) {
  const [listName, setListName] = useState('');
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

    if (!listName.trim()) {
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

  const handleListNameChange = (event) => {
    setListName(event.target.value);
    if (event.target.value) {
      setError(false);
    }
  };

  // Reset list name when dialog is closed, but keep 'Home' as default category
  useEffect(() => {
    if (!open) {
      setListName('');
      setCategoryList('Home'); // Reset to Home when dialog is closed
    }
  }, [open]);

  // Sample data for folder options
  const folder = [
    'Home (0)',
    'Magnet Brains (2)',
    'Pabbly Hook (5)',
    'Pabbly Connect (10)',
    'Pabbly Subcription Billing (0)',
    'Pabbly Admin (50)',
    'Pabbly Chatflow (2)',
    'Pabbly Form Builder (0)',
    'Pabbly Email Marketing (2)',
    'Pabbly Plus (4)',
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
              value={listName}
              onChange={handleListNameChange}
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

           
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} color="primary" variant="contained">
            Create Folder
          </Button>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
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