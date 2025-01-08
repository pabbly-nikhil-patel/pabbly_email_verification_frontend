import { useState, useCallback } from 'react';

import {
  Box,
  Stack,
  Button,
  Tooltip,
  Popover,
  Divider,
  MenuItem,
  useTheme,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import { MoveToFolderPopover } from 'src/sections/dialog-boxes/move-to-folder-dailog';

// Constants
const BUTTON_STYLES = (isBelow600px) => ({
  fontSize: '15px',
  height: '48px',
  textTransform: 'none',
  padding: isBelow600px ? '0px 10px 0px 10px' : '16px',
});

export function DashboardTableToolbar({ filters, onResetPage, numSelected, onDeleteSelected }) {
  const theme = useTheme();
  const isBelow600px = useMediaQuery('(max-width:600px)');

  // States
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [moveFolderOpen, setMoveFolderOpen] = useState(false);
  const confirmDelete = useBoolean();

  // Computed values
  const isActionsOpen = Boolean(anchorEl);

  // Handlers
  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleActionsOpen = (event) => setAnchorEl(event.currentTarget);
  const handleActionsClose = () => setAnchorEl(null);

  const handleDelete = () => {
    if (onDeleteSelected) {
      onDeleteSelected();
    }
    handleActionsClose();
  };

  const handleFilterIconClick = (e) => {
    e.stopPropagation();
    if (isFilterApplied) {
      handleFilterClose();
      resetFilters();
      setFilterApplied(false);
    }
  };

  const resetFilters = () => {
    filters.setState({});
    setFilterApplied(false);
  };

  const handleFilterButtonClick = (e) => {
    if (!isFilterApplied || e.target.tagName !== 'svg') {
      setFilterAnchorEl(e.currentTarget);
    }
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleMoveToFolder = () => {
    setMoveFolderOpen(true);
    handleActionsClose();
  };

  const handleMoveFolderClose = () => {
    setMoveFolderOpen(false);
  };

  const folder = [
    'Pabbly Connect',
    'Main Folder',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
    'Pabbly Subscription Billing',
    'Pabbly Email Marketing',
    'Pabbly Form Builder',
    'Pabbly Email Verification',
    'Pabbly Hook',
    'Client (A)',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
  ];

  // Render functions
  const renderSearchField = () => (
    <TextField
      fullWidth
      value={filters.state.name}
      onChange={handleFilterName}
      placeholder="Search by list name..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
    />
  );

  const renderActionButton = () =>
    numSelected > 0 && (
      <>
        <Tooltip
          title="Click here to modify workflows status, or to move and delete workflows."
          arrow
          placement="top"
        >
          <Button
            endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            onClick={handleActionsOpen}
            color="primary"
            sx={{
              ...BUTTON_STYLES(isBelow600px),
              width: isBelow600px ? '145px' : '155px',
            }}
          >
            Select Action
          </Button>
        </Tooltip>

        <Popover
          open={isActionsOpen}
          anchorEl={anchorEl}
          onClose={handleActionsClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MenuItem onClick={handleMoveToFolder}>
            <Iconify icon="fluent:folder-move-16-filled" sx={{ mr: 1 }} />
            Move to Folder
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 1 }} />
            Delete Selected
          </MenuItem>
        </Popover>
        <MoveToFolderPopover
          open={moveFolderOpen}
          onClose={handleMoveFolderClose}
          title="Move to Folder"
          folder={folder}
        />
      </>
    );

  // const renderFilterButton = () => (
  //   <Tooltip
  //     title={
  //       isFilterApplied
  //         ? "Click the 'X' to clear all applied filters."
  //         : 'Filter workflows based on workflow status and folder.'
  //     }
  //     arrow
  //     placement="top"
  //   >
  //     <Button
  //       sx={{
  //         ...BUTTON_STYLES(isBelow600px),
  //         width: isFilterApplied ? '156px' : '104.34px',
  //         position: 'relative',
  //         '& .MuiButton-startIcon': {
  //           pointerEvents: 'auto',
  //           marginRight: '8px',
  //           display: 'flex',
  //         },
  //       }}
  //       variant={isFilterApplied ? 'contained' : ''}
  //       color="primary"
  //       startIcon={!isFilterApplied && <Iconify icon="mdi:filter" />}
  //       endIcon={
  //         isFilterApplied && (
  //           <Box
  //             component="span"
  //             onClick={handleFilterIconClick}
  //             sx={{
  //               cursor: 'pointer',
  //               display: 'flex',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //             }}
  //           >
  //             <Iconify
  //               icon="uil:times"
  //               style={{
  //                 width: 22,
  //                 height: 22,
  //                 cursor: 'pointer',
  //               }}
  //             />
  //           </Box>
  //         )
  //       }
  //       onClick={handleFilterButtonClick}
  //     >
  //       {isFilterApplied ? 'Filter Applied' : 'Filters'}
  //     </Button>
  //   </Tooltip>
  // );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        {renderSearchField()}
        <Box
          sx={{
            display: 'flex',
            gap: isBelow600px ? '12px' : '16px',
            flexDirection: 'row',
            width: isBelow600px ? '100%' : 'auto',
            justifyContent: 'flex-end',
          }}
        >
          {renderActionButton()}
          {/* {renderFilterButton()} */}
        </Box>
      </Stack>
    </Stack>
  );
}
