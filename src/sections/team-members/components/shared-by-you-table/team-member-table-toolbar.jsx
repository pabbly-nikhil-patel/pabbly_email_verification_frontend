import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Stack,
  Button,
  Tooltip,
  TextField,
  useMediaQuery,
  InputAdornment,
  Popover,
  MenuList,
  MenuItem,
  Divider,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import { TeamMemberDialog } from '../../hooks/add-team-member';

export function OrderTableToolbar({ filters, onResetPage, numSelected, nomemberAdded }) {
  const theme = useTheme();
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
            placeholder="Search by Email..."
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
          <Tooltip
            title="Add a team member and share workflow(s) or folder(s) with them."
            arrow
            placement="top"
          >
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
