import { useState, useCallback } from 'react';

// MUI imports
import {
  Box,
  Stack,
  Alert,
  Button,
  Tooltip,
  Popover,
  Divider,
  MenuItem,
  useTheme,
  Snackbar,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

// Hooks
import { useBoolean } from 'src/hooks/use-boolean';

// Components
import { Iconify } from 'src/components/iconify';

import { DeleteDialog } from 'src/sections/dialog-boxes/confirm-delete-dialog';
import { MoveToFolderPopover } from 'src/sections/dialog-boxes/move-to-folder-dailog';

// Constants
const BUTTON_STYLES = (isBelow600px) => ({
  fontSize: '15px',
  height: '48px',
  textTransform: 'none',
  padding: isBelow600px ? '0px 10px 0px 10px' : '16px',
});

// Folder structure data
const FOLDER_STRUCTURE = [
  'None',
  'Home',
  'Organization 1',
  'Organization 2',
  'Organization 3',
  'Organization 4',
  'Organization 5',
  'Organization 6',
  'Organization 7',
  'Organization 8',
  'Organization 9',
];

export function DashboardTableToolbar({ filters, onResetPage, numSelected, onDeleteSelected }) {
  const theme = useTheme();
  const isBelow600px = useMediaQuery('(max-width:600px)');

  // States
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [moveFolderOpen, setMoveFolderOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
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

  const handleDeleteOpen = (event) => setAnchorEl(event.currentTarget);

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

  const handleDelete = () => {
    setDeleteOpen(true);
    handleActionsClose();
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarState((prev) => ({ ...prev, open: false }));
  };

  const handleConfirmDelete = () => {
    setDeleteOpen(false);
    setSnackbarState({
      open: true,
      message: 'Email list(s) deleted successfully.',
      severity: 'success',
    });
  };

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
        <Tooltip title="Click here to move and delete email lists." arrow placement="top">
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
          <Tooltip title="Move to folder" arrow placement="left">
            <MenuItem onClick={handleMoveToFolder}>
              <Iconify icon="fluent:folder-move-16-filled" sx={{ mr: 1 }} />
              Move to Folder
            </MenuItem>
          </Tooltip>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Tooltip title="Delete email lists" arrow placement="left">
            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </Tooltip>
        </Popover>

        <MoveToFolderPopover
          open={moveFolderOpen}
          onClose={handleMoveFolderClose}
          title="Move to Folder"
          folder={FOLDER_STRUCTURE}
        />

        <DeleteDialog
          title="Do you really want to delete the email list(s)?"
          content="Note that when an email list is deleted it is moved to the trash folder."
          open={deleteOpen}
          onClose={handleDeleteClose}
          action={
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>
              Delete
            </Button>
          }
        />
        <Snackbar
          open={snackbarState.open}
          autoHideDuration={3500}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
            mt: 8,
            zIndex: theme.zIndex.modal + 9999,
          }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarState.severity}
            sx={{
              width: '100%',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              '& .MuiAlert-icon': {
                color:
                  snackbarState.severity === 'error'
                    ? theme.palette.error.main
                    : theme.palette.success.main,
              },
            }}
          >
            {snackbarState.message}
          </Alert>
        </Snackbar>
      </>
    );

  const renderFilterButton = () => (
    <Tooltip
      title={
        isFilterApplied
          ? "Click the 'X' to clear all applied filters."
          : 'Filter lists based on list status and folder.'
      }
      arrow
      placement="top"
    >
      <Button
        sx={{
          ...BUTTON_STYLES(isBelow600px),
          width: isFilterApplied ? '156px' : '104.34px',
          position: 'relative',
          '& .MuiButton-startIcon': {
            pointerEvents: 'auto',
            marginRight: '8px',
            display: 'flex',
          },
        }}
        variant={isFilterApplied ? 'contained' : ''}
        color="primary"
        startIcon={!isFilterApplied && <Iconify icon="mdi:filter" />}
        endIcon={
          isFilterApplied && (
            <Box
              component="span"
              onClick={handleFilterIconClick}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify
                icon="uil:times"
                style={{
                  width: 22,
                  height: 22,
                  cursor: 'pointer',
                }}
              />
            </Box>
          )
        }
        onClick={handleFilterButtonClick}
      >
        {isFilterApplied ? 'Filter Applied' : 'Filters'}
      </Button>
    </Tooltip>
  );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      <Stack direction="row" alignItems="center" spacing={1} flexGrow={1} sx={{ width: 1 }}>
        {renderSearchField()}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',

            justifyContent: 'flex-end',
          }}
        >
          {renderActionButton()}
          {/* {renderFilterButton()} */}
        </Box>
        <Tooltip title=" Click here to refresh data." arrow placement="top" disableInteractive>
          <Iconify
            icon="tabler:refresh"
            sx={{ width: '24px', height: '24px', mr: '10px', color: 'text.primary' }}
            cursor="pointer"
          />
        </Tooltip>
      </Stack>
    </Stack>
  );
}
