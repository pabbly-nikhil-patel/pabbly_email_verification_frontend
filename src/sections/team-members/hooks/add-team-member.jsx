import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Chip,
  Alert,
  Button,
  Dialog,
  Divider,
  Snackbar,
  TextField,
  DialogTitle,
  Autocomplete,
  useMediaQuery,
  DialogActions,
  DialogContent,
  CircularProgress,
  Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

export function TeamMemberDialog({ open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const [selectedItems, setSelectedItems] = useState([]);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [autocompleteError, setAutocompleteError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [categoryList, setCategoryList] = useState(null);
  const [categoryError, setCategoryError] = useState(false);

  const folder = ['Read Access', 'Write Access'];
  const folders = ['Pabbly Connect', 'Main Folder', 'Folder 1', 'Folder 2', 'Folder 3'];

  const handleClose = () => {
    setEmail('');
    setSelectedItems([]);
    setEmailError(false);
    setAutocompleteError(false);
    setCategoryList(null);
    setCategoryError(false);
    onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const ALLOWED_EMAILS = [
    'hardik@pabbly.com',
    'kamal.kumar@pabbly.com',
    'anand.nayak@pabbly.com',
    // ... other allowed emails
  ];
  const commonBoxStyle = { ml: '9px' };
  const commonTypographyStyle = { fontSize: '14px', color: 'grey.800', mt: 1, mb: 1, ml: '5px' };
  const commonUlStyle = { paddingLeft: '20px', color: 'grey.600', fontSize: '12px' };
  const commonLiStyle = {
    marginBottom: '8px',
    fontWeight: '500',
    listStyleType: 'disc',
    listStylePosition: 'outside',
    color: '#637381',
  };

  const isEmailValid = (email1) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email1);
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(!value || !isEmailValid(value));
  };

  const handleChangeCategoryList = (event, newValue) => {
    setCategoryList(newValue);
    setCategoryError(!newValue);
  };

  const handleAdd = () => {
    let hasError = false;

    // Validate email
    if (!email || !isEmailValid(email)) {
      setEmailError(true);
      hasError = true;
    }

    // Validate folder selection
    if (selectedItems.length === 0) {
      setAutocompleteError(true);
      hasError = true;
    }

    // Validate permissions
    if (!categoryList) {
      setCategoryError(true);
      hasError = true;
    }

    if (hasError) return;

    // Check if email is in allowed list
    if (!ALLOWED_EMAILS.includes(email)) {
      setSnackbar({
        open: true,
        message: 'This email is not registered with Pabbly',
        severity: 'error',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: 'Team member added successfully!',
        severity: 'success',
      });
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
        <DialogTitle sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}>
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
              label="Pabbly Email Address"
              placeholder="sample@example.com"
              value={email}
              onChange={handleChangeEmail}
              error={emailError}
              helperText={
                emailError ? (
                  email ? (
                    'Please enter a valid email address.'
                  ) : (
                    'Email address is required.'
                  )
                ) : (
                  <span>
                    Ensure that the email address is already registered with Pabbly.{' '}
                    <LearnMoreLink link="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-email-verification-account.26333/" />
                  </span>
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
                  error={autocompleteError}
                  helperText={
                    autocompleteError ? (
                      'Please select at least one folder.'
                    ) : (
                      <span>
                        Select folders to be shared.{' '}
                        <LearnMoreLink link="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-email-verification-account.26333/" />
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
                    color="primary"
                  />
                ))
              }
              value={selectedItems}
              onChange={(event, newValue) => {
                setAutocompleteError(false);
                setSelectedItems(newValue);
              }}
            />

            <Autocomplete
              options={folder}
              value={categoryList}
              onChange={handleChangeCategoryList}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Permission"
                  error={categoryError}
                  helperText={
                    categoryError ? (
                      'Please select a permission level.'
                    ) : (
                      <span>
                        Select the permission level for shared folders.{' '}
                        <LearnMoreLink link="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-email-verification-account.26333/" />
                      </span>
                    )
                  }
                />
              )}
            />
            {/* Points to Remember Section */}
            <Box sx={commonBoxStyle}>
              <Typography variant="subtitle1" sx={commonTypographyStyle}>
                Points To Remember!
              </Typography>
              <ul style={commonUlStyle}>
                <li style={commonLiStyle}>
                  <span>
                  You can share multiple folders with team members.
                  </span>
                </li>
                <li style={commonLiStyle}>
                  <span>
                  Team members can be granted either &quot;Write&quot; or &quot;View&quot; access.
                  </span>
                </li>
                <li style={commonLiStyle}>
                  <span>
                  With &quot;Write&quot; access, they can upload email lists for verification, while &ldquo;View&ldquo; access allows them only to download verification reports.
                  </span>
                </li>
                <li style={commonLiStyle}>
                  <span>
                  Team members do not have access to the &quot;Settings&quot; section, any billing information, or the &quot;Trash&quot; folder.
                  </span>
                </li>
              </ul>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAdd} disabled={isLoading} variant="contained" color="primary">
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add'}
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          zIndex: theme.zIndex.modal + 9999,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary, // Keeping text color consistent
            '& .MuiAlert-icon': {
              color:
                snackbar.severity === 'error'
                  ? theme.palette.error.main
                  : theme.palette.success.main,
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
