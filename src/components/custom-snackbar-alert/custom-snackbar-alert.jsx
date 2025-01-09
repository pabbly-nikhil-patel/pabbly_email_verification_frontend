import React from 'react';

import Alert from '@mui/material/Alert';
import { Portal, Snackbar, useTheme } from '@mui/material';

export function CustomSnackbar({ sx, open, onClose, message, severity }) {
  const theme = useTheme();

  return (
    <Portal>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          // mt: 13,
          zIndex: theme.zIndex.modal + 999, // Ensure it is on top
          ...sx,
        }}
      >
        <Alert
          onClose={onClose}
          severity={severity}
          sx={{
            fontFamily: 'Public Sans',
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Portal>
  );
}
