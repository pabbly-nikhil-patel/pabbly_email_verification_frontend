import React from 'react';
import { useTheme } from '@emotion/react';

import { Box, Stack, TextField, useMediaQuery, InputAdornment } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function OrderTableToolbar({ filters, onResetPage, noworkflowsorfoldersShared }) {
  const theme = useTheme();

  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilterEmail = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ email: event.target.value }); // Set the email filter based on the search input
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={isBelow600px ? 'column' : 'row'}
      sx={{ p: 2.5, width: '100%' }}
    >
      <Box sx={{ width: '100%' }}>
        <TextField
          disabled={noworkflowsorfoldersShared} // Disabled When No Team Members Added
          fullWidth
          value={filters.state.email}
          onChange={handleFilterEmail} // Handle changes for search input
          placeholder="Search by Email..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Stack>
  );
}
