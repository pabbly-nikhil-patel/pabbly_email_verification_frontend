import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import {
  Alert,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  Autocomplete,
  useMediaQuery,
  DialogContent,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function MoveToFolderPopover({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [categoryList, setCategoryList] = useState(''); // Initialize empty for validation
  const [categoryError, setCategoryError] = useState(false); // State to manage error message

  const handleChangeCategoryList = useCallback((event, value) => {
    setCategoryList(value);
    if (value) {
      setCategoryError(false); // Reset error when valid selection is made
    }
  }, []);

  const folder = [
    'Home',
    'Pabbly Connect',
    'Main Folder',
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
    'Pabbly Subscription Billing',
    'Pabbly Email Marketing',
    'Pabbly Form Builder',
    'Pabbly Email Verification',
    'Pabbly Hook',
    'Client (A)',
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
  ];

  const handleAdd = () => {
    if (!categoryList) {
      setCategoryError(true); // Show error if no folder is selected
      return;
    }
    setSnackbarOpen(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDialogClose = () => {
    setSnackbarOpen(false); // Reset the Snackbar state when the dialog is closed
    setCategoryList(''); // Reset category list on close
    setCategoryError(false); // Reset error state on close
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      {...other}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
    >
      <DialogTitle
        sx={{ fontWeight: '600', display: 'flex', justifyContent: 'space-between' }}
        onClick={() => {}}
      >
        Move To Folder{' '}
        <Iconify
          onClick={handleDialogClose}
          icon="uil:times"
          style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        />
      </DialogTitle>
      <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

      <DialogContent>
        <Autocomplete
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '14px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '14px',
            },
            mt: 1.2,
          }}
          options={folder}
          value={categoryList} // Set the value of Autocomplete
          onChange={handleChangeCategoryList}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <Tooltip
                  title="Select folder to which the workflow needs to be moved."
                  arrow
                  placement="top"
                >
                  <span>Select Folder</span>
                </Tooltip>
              }
              helperText={
                <span>
                  {categoryError ? (
                    'Please select a required folder.'
                  ) : (
                    <>
                      Select the folder or subfolder where you want to move the workflow(s).{' '}
                      <Link
                        href="https://forum.pabbly.com/threads/folders.20987/"
                        style={{ color: '#078DEE' }}
                        underline="always"
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
      </DialogContent>

      <DialogActions>
        {action}
        <Button onClick={handleAdd} variant="contained" color="primary">
          Move
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        Z-index={100}
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
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          The workflow(s) moved successfully.
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
