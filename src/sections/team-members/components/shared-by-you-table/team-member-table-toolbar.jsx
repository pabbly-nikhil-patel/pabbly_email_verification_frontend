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
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import { TeamMemberDialog } from '../../hooks/add-team-member';

export function OrderTableToolbar({ filters, onResetPage, nomemberAdded }) {
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
  );
}
