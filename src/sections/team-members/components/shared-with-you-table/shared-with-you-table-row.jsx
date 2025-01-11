import React, { useState } from 'react';

import {
  Box,
  Stack,
  Button,
  Tooltip,
  TableRow,
  Checkbox,
  MenuList,
  MenuItem,
  TableCell,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { AnimateLogo1 } from 'src/components/animate';
import { CustomPopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/confirm-dialog';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

export function SharedWithYouTeamMemberTableRow({ row, selected, onSelectRow, serialNumber }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirmDelete = () => {
    setConfirmDelete(true);
    handleClosePopover();
  };

  // Custom tooltips for specific rows
  const getFolderTooltip = (rowData) => {
    if (rowData.id === 'folder-0') {
      return `Folder Name: Client (A), ${rowData.folders_you_shared}`;
    }
    if (rowData.id === 'folder-4') {
      return `Folder Name: Main Folder' ${rowData.folders_you_shared}`;
    }

    return `Folder Name: ${rowData.folders_you_shared}`;
  };

  const getTooltip = (type, rowData) => {
    const tooltips = {
      folder: `Folder Name: ${rowData.folders_you_shared}`,
      sharedOn: `Folder Shared On: ${rowData.updatedAt} (UTC+05:30) Asia/Kolkata`,
      permission:
        rowData.permission === 'Full access'
          ? 'User has complete access to view, edit, and manage the folder contents'
          : 'User can only view the folder contents without making changes',
    };
    return tooltips[type];
  };

  /* Delete Success Snackbar */

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccessSnackbarOpen(false);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <>
      {isAnimating && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#f1f7fb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999999999, // High z-index to cover the entire page
          }}
        >
          <AnimateLogo1
            sx={{
              zIndex: 99999999999, // High z-index to cover the entire page
            }}
          />
        </Box>
      )}
      <TableRow
        hover
        selected={selected}
        sx={{
          '&:hover .copy-button': {
            opacity: 1,
          },
        }}
      >
        {/* checkbox */}
        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
          <Tooltip title="Select" arrow placement="top">
            <Checkbox
              checked={selected}
              onClick={onSelectRow}
              inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
            />
          </Tooltip>
        </TableCell>

        {/* Shared On */}
        <TableCell align="left">
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
              width: '200px',
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title={getTooltip('sharedOn', row)} arrow placement="top" disableInteractive>
              {row.createdAt}
            </Tooltip>
          </Stack>
        </TableCell>

        {/* Folders Shared By  */}
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                // color: '#078dee',
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Box
                component="span"
                sx={{
                  maxWidth: { xs: '530px', md: '800px' },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <Tooltip title={`Email: ${row.email}`} placement="top" arrow>
                  {row.email}
                </Tooltip>
              </Box>
              <Tooltip title={getFolderTooltip(row)} placement="bottom" arrow>
                <Box
                  component="span"
                  sx={{
                    color: 'text.disabled',
                    maxWidth: {
                      xs: '250px', // For extra small screens
                      sm: '650px', // For small screens
                      md: '700px', // For medium screens
                      lg: '750px', // For large screens
                      xl: '950px', // For extra large screens
                    },
                    display: 'inline-block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.folders_you_shared}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        {/* Permission */}
        <TableCell align="left">
           <Stack sx={{ width:'200px'}}>
          
          <Tooltip title={getTooltip('permission', row)} arrow placement="top" disableInteractive>
            {row.permission}
          </Tooltip>
          </Stack>
        </TableCell>

        {/* Shared On */}
        <TableCell align='right'>
        <Stack
            spacing={2}
            direction="row"
            justifyContent="flex-end" // Aligns content to the right
            sx={{ width: {xs: '200px', lg: '100%'} }} // Ensure Stack spans the full cell width
          >
         
           
              <Tooltip
                title="Click here to access folder(s) shared with you."
                arrow
                placement="top"
                disableInteractive
              >
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={isAnimating} // Optionally disable button during animation
                  >
                    Access Now
                  </Button>
                </Box>
              </Tooltip>
         
          </Stack>
        </TableCell>

        {/* Options */}
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Click to see options." arrow placement="top">
            <IconButton color={anchorEl ? 'inherit' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <CustomPopover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClosePopover}>
        <MenuList>
          <Tooltip title="Remove access to shared folders." arrow placement="left">
            <MenuItem onClick={handleOpenConfirmDelete} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Remove Access
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        disabled={isLoading}
        title=" Do you really want to remove folder(s) access?"
        content="You will no longer have access to the shared folder(s)."
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // Add your revoke tasks logic here
              handleCloseConfirmDelete(); // Close the dialog after revoking tasks
              setSuccessSnackbarOpen(true); // Show success snackbar
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Remove Access'}
          </Button>
        }
      />

      {/* Delete Success Snackbar */}
      <CustomSnackbar
        open={successSnackbarOpen}
        onClose={handleSuccessSnackbarClose}
        message="Access Removed Successfully!"
        severity="success"
      />
    </>
  );
}
