import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Button,
  Tooltip,
  Popover,
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

import { TeamMemberDialog } from '../../hooks/add-team-member';

export function OrderTableToolbar({ filters, onResetPage, numSelected, nomemberAdded }) {
  const theme = useTheme();
   const confirmDelete = useBoolean();
    const popover = usePopover();
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [teamMemberDialogOpen, setTeamMemberDialogOpen] = useState(false); // State for TeamMemberDialog

  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));
  const confirm = useBoolean();

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [operator, setOperator] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  const workflowstatus = ['All Statuses', 'On', 'Off'];

  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);

  const handleApplyFilter = () => {
    console.log('Applying filter:', { column: selectedColumn, operator, value: filterValue });
    filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
    onResetPage();
    handleFilterClose();
  };
  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    padding: '0 16px',
  };

  const handleFilterEmail = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ email: event.target.value }); // Set the email filter based on the search input
  };

  // Dialog Handlers
  const handleTeamMemberDialogOpen = () => setTeamMemberDialogOpen(true);
  const handleTeamMemberDialogClose = () => setTeamMemberDialogOpen(false);

  const toolbarbuttonStyle = {
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
            fullWidth
            value={filters.state.email}
            onChange={handleFilterEmail} // Handle changes for search input
            placeholder="Search by folder name..."
            disabled={nomemberAdded} // Disabled When No Team Members Added
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
          <Tooltip title="Add a team member and share folder(s) with them." arrow placement="top">
            <Button
              sx={{
                ...toolbarbuttonStyle,
                width: isBelow600px ? '188px' : '188px',
              }}
              size="large"
              color="primary"
              disabled={nomemberAdded} // Disabled When No Team Members Added
              onClick={handleTeamMemberDialogOpen} // Open TeamMemberDialog
              startIcon={
                <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
              }
            >
              Add Team Member
            </Button>
          </Tooltip>

          <TeamMemberDialog
            open={teamMemberDialogOpen}
            onClose={handleTeamMemberDialogClose}
            title="Add Team Member"
            content="Define your team member details."
          />
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
          <Tooltip title="Remove access to shared folder." arrow placement="left">
          <MenuItem
            sx={{ color: 'error.main' }}
            onClick={() => {
              confirmDelete.onTrue();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
            Remove access
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
