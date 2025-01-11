import React, { useState } from 'react';

import {
  Box,
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
import { CustomPopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/confirm-dialog';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';

export function SharedbyYouTeamMemberTableRow({ row, selected, onSelectRow, serialNumber }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenPopover = (event) => setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const handleOpenConfirmDelete = () => {
    setConfirmDelete(true);
    handleClosePopover();
  };
  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason !== 'clickaway') setSuccessSnackbarOpen(false);
  };
  const handleCloseConfirmDelete = () => setConfirmDelete(false);

  const getTooltip = (type, rowData) => {
    const tooltips = {
      folder: `Folder Name: ${rowData.folders_you_shared}`,
      sharedOn: `Folder Shared On: ${rowData.updatedAt} (UTC+05:30) Asia/Kolkata`,
      permission:
        row.permission === 'Write Access'
          ? 'Team members can upload email lists, start verification, and download verification reports. They cannot create new folders, delete folders, or remove email lists.'
          : 'Team members can only download verification reports.',
    };
    return tooltips[type];
  };

  return (
    <>
      <TableRow hover selected={selected} sx={{ '&:hover .copy-button': { opacity: 1 } }}>
        {/* Checkbox */}
        <TableCell padding="checkbox">
          <Tooltip title="Select" arrow placement="top" disableInteractive>
            <Checkbox
              checked={selected}
              onClick={onSelectRow}
              inputProps={{ 'aria-label': 'Row checkbox' }}
            />
          </Tooltip>
        </TableCell>

        {/* Shared On */}
        <TableCell align="left">
          <Tooltip title={getTooltip('sharedOn', row)} arrow placement="top" disableInteractive>
            {row.createdAt}
          </Tooltip>
        </TableCell>

        {/* Email */}
        <TableCell >
          <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <Tooltip title={`Email: ${row.email}`} arrow placement="top" disableInteractive>
              {row.email}
            </Tooltip>
          </Box>
        </TableCell>

        {/* Workflows */}
        <TableCell >
          <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <Tooltip title={getTooltip('folder', row)} arrow placement="top" disableInteractive>
              {row.folders_you_shared}
            </Tooltip>
          </Box>
        </TableCell>

        {/* Permission */}
        <TableCell align='right'>
          <Tooltip title={getTooltip('permission', row)} arrow placement="top" disableInteractive>
            {row.permission}
          </Tooltip>
        </TableCell>

        {/* Options */}
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Click to see options." arrow placement="top" disableInteractive>
            <IconButton onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      {/* Popover */}
      <CustomPopover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClosePopover}>
        <MenuList>
          <MenuItem onClick={handleOpenConfirmDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Remove Access
          </MenuItem>
        </MenuList>
      </CustomPopover>

      {/* Confirm Dialog */}
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
              handleCloseConfirmDelete();
              setSuccessSnackbarOpen(true);
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Remove Access'}
          </Button>
        }
      />

      {/* Success Snackbar */}
      <CustomSnackbar
        open={successSnackbarOpen}
        onClose={handleSuccessSnackbarClose}
        message="Access Removed Successfully!"
        severity="success"
      />
    </>
  );
}
