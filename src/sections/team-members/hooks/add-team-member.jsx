import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Chip,
  Button,
  Dialog,
  Divider,
  TextField,
  DialogTitle,
  Autocomplete,
  useMediaQuery,
  DialogActions,
  DialogContent,
  CircularProgress,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

export function TeamMemberDialog({ open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const [selectedItems, setSelectedItems] = useState([]);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [autocompleteError, setAutocompleteError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const folders = [
    'Pabbly Connect',
    'Main Folder',
    '-Child Folder 1 - Subscription Billing',
    '-- Child Folder 2',
    '--- Grand child 1',
    '--- Grand child 2',
    'Folder 1',
    'Folder 2',
    'Folder 3',
    
  ];

  const handleClose = () => {
    setEmail('');
    setSelectedItems([]);
    setEmailError(false);
    setAutocompleteError(false);
    onClose();
  };

  const ALLOWED_EMAILS = [
    'hardik@pabbly.com',
    'kamal.kumar@pabbly.com',
    'anand.nayak@pabbly.com',
    // ... other allowed emails
  ];

  const isEmailValid = (email1) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email1);
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(!value || !isEmailValid(value));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setErrorSnackbarOpen(false);
    setSuccessSnackbarOpen(false);
  };

  const handleAdd = () => {
    if (!email || !isEmailValid(email)) {
      setEmailError(true);
      return;
    }

    if (selectedItems.length === 0) {
      setAutocompleteError(true);
      return;
    }

    if (!ALLOWED_EMAILS.includes(email)) {
      setErrorSnackbarOpen(true);
      return;
    }

    setIsLoading(true);
    setSuccessSnackbarOpen(true);

    setTimeout(() => {
      handleClose();
      setIsLoading(false);
    }, 1200);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        {...other}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
        >
          Add Team Member
          <Iconify
            onClick={handleClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              autoFocus
              fullWidth
              type="email"
              margin="dense"
              variant="outlined"
              label="Email Address"
              placeholder="sample@example.com"
              value={email}
              onChange={handleChangeEmail}
              error={emailError}
              helperText={
                emailError ? (
                  email ? 'Please enter a valid email address.' : 'Email address is required.'
                ) : (
                  <span>Ensure that the email address is already registered with Pabbly. </span>
                )
              }
            />

            <Autocomplete
              multiple
              options={folders}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Folder"
                  placeholder="Select"
                  required
                  error={autocompleteError}
                  helperText={
                    autocompleteError ? (
                      'Please select at least one folder.'
                    ) : (
                      <span>
                        Select folders to be shared.{' '}
                        <LearnMoreLink link="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-connect-account.5336/#post-25220/" />
                      </span>
                    )
                  }
                />
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                    variant="soft"
                  />
                ))
              }
              value={selectedItems}
              onChange={(event, newValue) => {
                setAutocompleteError(false);
                setSelectedItems(newValue);
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} disabled={isLoading} variant="contained" color="primary">
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <CustomSnackbar
        open={errorSnackbarOpen}
        onClose={handleSnackbarClose}
        message="Enter a valid email address."
        severity="error"
      />

      <CustomSnackbar
        open={successSnackbarOpen}
        onClose={handleSnackbarClose}
        message="Team Member Added Successfully!"
        severity="success"
      />
    </>
  );
}