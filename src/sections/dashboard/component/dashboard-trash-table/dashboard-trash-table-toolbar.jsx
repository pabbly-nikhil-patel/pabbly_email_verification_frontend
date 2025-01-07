// import { useState, useCallback } from 'react';

// import {
//   Box,
//   Stack,
//   Button,
//   Tooltip,
//   useTheme,
//   TextField,
//   useMediaQuery,
//   InputAdornment,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { Iconify } from 'src/components/iconify';

// export function DashboardTrashTableToolbar({ filters, onResetPage, numSelected }) {
//   const theme = useTheme();
//   const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
//   const confirm = useBoolean();

//   const isBelow600px = useMediaQuery('(max-width:600px)');
//   const buttonStyle = {
//     fontSize: '15px',
//     height: '48px',
//     textTransform: 'none',
//     // padding: '0 16px',
//     padding: isBelow600px ? '0px 10px 0px 10px' : '16px',
//   };

//   // Snackbar states
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   // Add states for tracking filter selections
//   const [selectedSort, setSelectedSort] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState(null);
//   const [selectedFolder, setSelectedFolder] = useState(null);

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [filterAnchorEl, setFilterAnchorEl] = useState(null);
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [operator, setOperator] = useState('contains');
//   const [filterValue, setFilterValue] = useState('');

//   const handleFilterName = useCallback(
//     (event) => {
//       onResetPage();
//       filters.setState({ name: event.target.value });
//     },
//     [filters, onResetPage]
//   );

//   const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
//   const handlePopoverClose = () => setAnchorEl(null);

//   const confirmDelete = useBoolean(); // For ConfirmDialog
//   const moveFolderPopover = useBoolean(); // For MoveToFolderPopover
//   const [isFilterApplied, setFilterApplied] = useState(false); // Local filter state

//   const handleFilterIconClick = (e) => {
//     e.stopPropagation();
//     if (isFilterApplied) {
//       handleFilterClose();
//       resetFilters(); // This will clear all Autocomplete selections
//       setFilterApplied(false);
//     }
//   };

//   // Check if any filter is selected
//   const hasAnyFilterSelected = Boolean(selectedSort || selectedStatus || selectedFolder);

//   const resetFilters = () => {
//     setSelectedSort(null);
//     setSelectedStatus(null);
//     setSelectedFolder(null);
//     filters.setState({}); // Clear filters
//     setFilterApplied(false); // Remove filter applied state
//     console.log('Filters reset:', {
//       selectedSort,
//       selectedStatus,
//       selectedFolder,
//       filtersState: filters.state,
//     });
//   };

//   const handleFilterButtonClick = (e) => {
//     if (!isFilterApplied || e.target.tagName !== 'svg') {
//       setFilterAnchorEl(e.currentTarget);
//     }
//   };

//   const handleFilterClose = () => {
//     setFilterAnchorEl(null);
//     // Reset all Autocomplete selections if filters weren't applied
//     // if (!isFilterApplied) {
//     //   setSelectedSort(null);
//     //   setSelectedStatus(null);
//     //   setSelectedFolder(null);
//     // }
//   };

//   const handleApplyFilter = () => {
//     filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
//     onResetPage();
//     handleFilterClose();
//     setFilterApplied(true);
//   };

//   const handleDeleteRows = () => {
//     confirmDelete.onFalse(); // Close the dialog after deleting
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleWorkflowAction = (action) => {
//     if (action === 'enable') {
//       setSnackbarMessage('Your workflow has been successfully activated.');
//       setSnackbarSeverity('success');
//     } else if (action === 'disable') {
//       setSnackbarMessage('Your workflow has been successfully deactivated.');
//       setSnackbarSeverity('success');
//     }
//     setSnackbarOpen(true);
//   };

//   return (
//     <Stack
//       spacing={2}
//       alignItems={{ xs: 'flex-end', md: 'center' }}
//       direction={{ xs: 'column', md: 'row' }}
//       sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
//     >
//       <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
//         <TextField
//           fullWidth
//           value={filters.state.name}
//           onChange={handleFilterName}
//           placeholder="Search by file name..."
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <Box
//           sx={{
//             display: 'flex',
//             gap: isBelow600px ? '12px' : '16px',
//             flexDirection: 'row',
//             width: isBelow600px ? '100%' : 'auto',
//             justifyContent: 'flex-end', // Aligns buttons to the right
//           }}
//         >
//           {numSelected > 0 && (
//             <Tooltip
//               title="Click here to modify workflows status, or to move and delete workflows."
//               arrow
//               placement="top"
//             >
//               <Button
//                 endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
//                 onClick={handlePopoverOpen}
//                 color="primary"
//                 sx={{
//                   ...buttonStyle,
//                   // p: isBelow600px ? '0px 8px 0px 8px' : '16px',

//                   width: isBelow600px ? '145px' : '155px',
//                 }}
//               >
//                 Select Action
//               </Button>
//             </Tooltip>
//           )}

//           <Tooltip
//             title={
//               isFilterApplied
//                 ? "Click the 'X' to clear all applied filters."
//                 : 'Filter workflows based on workflow status and folder.'
//             }
//             arrow
//             placement="top"
//           >
//             <Button
//               sx={{
//                 ...buttonStyle,
//                 // width: isBelow600px ? '158px' : '158px',
//                 // width: isBelow600px ? (numSelected > 0 ? '104.34px' : '104.34px') : '104.34px', // Fixed width for "Filters"
//                 width: isFilterApplied ? '156px' : '104.34px', // Changes width based on filter state

//                 // p: isBelow600px ? '0px 8px 0px 8px' : '16px',
//                 position: 'relative',
//                 '& .MuiButton-startIcon': {
//                   pointerEvents: 'auto',
//                   marginRight: '8px',
//                   display: 'flex',
//                 },
//               }}
//               variant={isFilterApplied ? 'contained' : ''}
//               color="primary"
//               startIcon={!isFilterApplied && <Iconify icon="mdi:filter" />}
//               endIcon={
//                 isFilterApplied && (
//                   <Box
//                     component="span"
//                     onClick={handleFilterIconClick}
//                     sx={{
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Iconify
//                       icon="uil:times"
//                       // onClick={handleFilterClose}
//                       style={{
//                         width: 22,
//                         height: 22,
//                         cursor: 'pointer',
//                       }}
//                     />
//                   </Box>
//                 )
//               }
//               onClick={handleFilterButtonClick}
//             >
//               {isFilterApplied ? 'Filter Applied' : 'Filters'}
//             </Button>
//           </Tooltip>
//         </Box>
//       </Stack>
//     </Stack>
//   );
// }

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

// Constants
const BUTTON_STYLES = (isBelow600px) => ({
  fontSize: '15px',
  height: '48px',
  textTransform: 'none',
  padding: isBelow600px ? '0px 10px 0px 10px' : '16px',
});

export function DashboardTrashTableToolbar({
  filters,
  onResetPage,
  numSelected,
  onDeleteSelected,
}) {
  const theme = useTheme();
  const isBelow600px = useMediaQuery('(max-width:600px)');

  // States
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [isFilterApplied, setFilterApplied] = useState(false);
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

  // Render functions
  const renderSearchField = () => (
    <TextField
      fullWidth
      value={filters.state.name}
      onChange={handleFilterName}
      placeholder="Search by file name..."
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
          <MenuItem>
            <Iconify icon="fluent:folder-move-16-filled" sx={{ mr: 1 }} />
            Move to Folder
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 1 }} />
            Delete Selected
          </MenuItem>
        </Popover>
      </>
    );

  const renderFilterButton = () => (
    <Tooltip
      title={
        isFilterApplied
          ? "Click the 'X' to clear all applied filters."
          : 'Filter workflows based on workflow status and folder.'
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
          {renderFilterButton()}
        </Box>
      </Stack>
    </Stack>
  );
}
