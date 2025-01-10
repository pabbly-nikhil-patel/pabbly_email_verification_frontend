import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Button,
  Popover,
  Tooltip,
  MenuList,
  MenuItem,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/confirm-dialog';

export function SharedWithYouTeamMemberTableToolbar({
  filters,
  onResetPage,
  numSelected,
  nofoldersShared,
}) {
  const theme = useTheme();
  const confirmDelete = useBoolean();
  const popover = usePopover();

  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilterEmail = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ email: event.target.value }); // Set the email filter based on the search input
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    padding: '0 16px',
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems="center"
        direction={isBelow600px ? 'column' : 'row'}
        sx={{ p: 2.5, width: '100%' }}
      >
        <Box sx={{ width: '100%' }}>
          <TextField
            disabled={nofoldersShared} // Disabled When No Team Members Added
            fullWidth
            value={filters.state.email}
            onChange={handleFilterEmail} // Handle changes for search input
            placeholder="Search by email or folder name..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'row',
            width: isBelow600px ? '100%' : 'auto',
            justifyContent: 'flex-end',
          }}
        >
          {numSelected > 0 && (
            <Button
              endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              onClick={handlePopoverOpen}
              // variant="outlined"
              color="primary"
              sx={{
                ...buttonStyle,
                width: '200px',
              }}
            >
              Select Action
            </Button>
          )}
        </Box>
      </Stack>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuList>
          <Tooltip title="Remove access to shared folders." arrow placement="left">
          <MenuItem
            sx={{ color: 'error.main' }}
            onClick={() => {
              confirmDelete.onTrue();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
            Remove Access
          </MenuItem>
          </Tooltip>
        </MenuList>
      </Popover>
      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Do you wish to remove access?"
        content="You won't be able to revert this!"
        action={
          <Button variant="contained" color="error">
            Remove Access
          </Button>
        }
      />
    </>
  );
}
