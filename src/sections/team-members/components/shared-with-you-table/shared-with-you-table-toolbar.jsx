import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import { Box, Stack, TextField, useMediaQuery, InputAdornment, Button, Popover, MenuList, MenuItem, Divider } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function OrderTableToolbar({
  filters,
  onResetPage,
  numSelected,
  noworkflowsorfoldersShared,
}) {
  const theme = useTheme();

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
          {/* <Tooltip title="Activate selected WhatsApp numbers." arrow placement="left"> */}
          {/* <MenuItem>
          <Iconify icon="ion:toggle-sharp" sx={{ mr: 2 }} />
          Enable
        </MenuItem> */}
          {/* </Tooltip> */}

          {/* <Tooltip title="Deactivate selected WhatsApp numbers." arrow placement="left"> */}
          {/* <MenuItem>
          <Iconify icon="ph:toggle-left-fill" sx={{ mr: 2 }} />
          Disable
        </MenuItem> */}
          {/* </Tooltip> */}
          {/* <Tooltip title="Click here to move whatsapp number to folder." arrow placement="left"> */}
          {/* <Tooltip title="Click here to move WhatsApp number to folder." arrow placement="left"> */}
          <MenuItem
          // onClick={() => {
          //   setMoveToFolderPopoverOpen(true); // Open the Move To Folder dialog
          //   popover.onClose();
          // }}
          >
            <Iconify icon="fluent:folder-move-16-filled" sx={{ mr: 2 }} />
            Move
          </MenuItem>
          {/* </Tooltip> */}
          {/* </Tooltip> */}

          <Divider style={{ borderStyle: 'dashed' }} />
          {/* <Tooltip title="Click here to delete selected whatsapp numbers." arrow placement="left"> */}
          <MenuItem
            sx={{ color: 'error.main' }}
            // onClick={() => {
            //   confirmDelete.onTrue();
            //   popover.onClose();
            // }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
          {/* </Tooltip> */}
        </MenuList>
      </Popover>
    </>
  );
}
