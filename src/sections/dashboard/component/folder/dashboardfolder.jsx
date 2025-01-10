// import React, { useState } from 'react';
// import { useTheme } from '@emotion/react';
// import { Link, useNavigate } from 'react-router-dom';

// import { styled } from '@mui/material/styles';
// import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
// import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
// import {
//   Box,
//   Card,
//   Button,
//   Tooltip,
//   Divider,
//   MenuItem,
//   MenuList,
//   IconButton,
//   Typography,
//   CardContent,
// } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { varAlpha, stylesMode } from 'src/theme/styles';

// import { Iconify } from 'src/components/iconify';
// import { CustomPopover } from 'src/components/custom-popover';
// import { ConfirmDialog } from 'src/components/confirm-dialog';

// import { CreateFolderDialog } from './createfolder';
// import { RenameFolderDialog } from './rename_folder-dailog';

// // Simplified LABELS
// const LABELS = {
//   home: 'Home (0)',
//   organisation1: 'Magnet Brains (2)',
//   organisation2: 'Pabbly Hook (5)',
//   organisation3: 'Pabbly Connect (10)',
//   organisation4: 'Pabbly Subcription Billing (0)',
//   organisation5: 'Pabbly Admin (50)',
//   organisation6: 'Pabbly Chatflow (2)',
//   organisation7: 'Pabbly Form Builder (0)',
//   organisation8: 'Pabbly Email Marketing (2)',
//   organisation9: 'Pabbly Plus (4)',
//   trash: 'Trash',
// };

// const truncateLabel = (label, maxLength = 25) =>
//   label.length > maxLength ? `${label.slice(0, maxLength)}...` : label;

// const processItems = (items) =>
//   items.map((item) => ({
//     ...item,
//     fullLabel: item.label,
//     label: truncateLabel(item.label),
//   }));

// const HOMEITEMS = processItems([{ id: '25', label: LABELS.home }]);

// const ITEMS = processItems([
//   { id: '0', label: LABELS.organisation1 },
//   { id: '1', label: LABELS.organisation2 },
//   { id: '2', label: LABELS.organisation3 },
//   { id: '3', label: LABELS.organisation4 },
//   { id: '4', label: LABELS.organisation5 },
//   { id: '5', label: LABELS.organisation6 },
//   { id: '6', label: LABELS.organisation7 },
//   { id: '7', label: LABELS.organisation8 },
//   { id: '8', label: LABELS.organisation9 },
// ]);

// const ITEMS2 = processItems([{ id: '24', label: LABELS.trash }]);

// const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
//   color: theme.vars.palette.grey[800],
//   [stylesMode.dark]: { color: theme.vars.palette.grey[200] },
//   [`& .${treeItemClasses.content}`]: {
//     borderRadius: theme.spacing(0.5),
//     padding: theme.spacing(0.8, 1),
//     margin: theme.spacing(0.2, 0),
//     [`& .${treeItemClasses.label}`]: {
//       fontSize: '14px',
//       fontWeight: 500,
//       display: 'flex',
//       alignItems: 'center',
//       '& > svg': {
//         marginRight: theme.spacing(1),
//       },
//     },
//   },
//   [`& .${treeItemClasses.iconContainer}`]: {
//     borderRadius: '50%',
//   },
//   [`& .${treeItemClasses.groupTransition}`]: {
//     marginLeft: 15,
//     paddingLeft: 18,
//     borderLeft: `1px dashed ${varAlpha(theme.vars.palette.text.primaryChannel, 0.4)}`,
//   },
// }));

// const CustomTreeItem = React.forwardRef((props, ref) => {
//   const { fullLabel, label, id, onHomeClick, onFolderClick, hideEllipsis, ...other } = props;
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [folderDialogOpen, setFolderDialogOpen] = useState(false);
//   const [renameDialogOpen, setRenameDialogOpen] = useState(false);
//   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
//   const [selectedFolderName, setSelectedFolderName] = useState('');
//   const navigate = useNavigate();

//   // Check if the item is Home based on its ID (25) or label
//   const isHome = id === '25' || label === LABELS.home;
//   const shouldShowEllipsis = !hideEllipsis && !isHome && id !== '0';

//   const handleNavigateToTeamMembers = () => {
//     navigate('settings/team-members');
//   };

//   const handleIconClick = (event) => {
//     event.stopPropagation();
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = (event) => {
//     event.stopPropagation();
//     setAnchorEl(null);
//   };

//   const handleCreateFolderClick = (event) => {
//     setFolderDialogOpen(true);
//     handleMenuClose(event);
//   };

//   const handleRenameFolderClick = (event) => {
//     setSelectedFolderName(fullLabel || label);
//     setRenameDialogOpen(true);
//     handleMenuClose(event);
//   };

//   const handleDeleteClick = (event) => {
//     setConfirmDeleteOpen(true);
//     handleMenuClose(event);
//   };

//   const handleFolderDialogClose = () => {
//     setFolderDialogOpen(false);
//   };

//   const handleRenameFolderClose = () => {
//     setRenameDialogOpen(false);
//   };

//   const handleConfirmDeleteClose = () => {
//     setConfirmDeleteOpen(false);
//   };

//   return (
//     <>
//       <StyledTreeItem
//         ref={ref}
//         label={
//           <>
//             <Tooltip title={`Folder Name: ${fullLabel || label}`} arrow placement="top">
//               <Box sx={{ mr: 'auto', cursor: 'pointer', width: '100%' }}>
//                 <span>{label}</span>
//               </Box>
//             </Tooltip>
//             {shouldShowEllipsis && (
//               <IconButton onClick={handleIconClick} size="small">
//                 <Tooltip title="Click to see options." arrow placement="top">
//                   <Iconify
//                     icon="eva:more-vertical-fill"
//                     width={16}
//                     height={16}
//                     sx={{ ml: 'auto' }}
//                   />
//                 </Tooltip>
//               </IconButton>
//             )}

//             <CustomPopover
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//               PopperProps={{
//                 modifiers: [
//                   {
//                     name: 'offset',
//                     options: {
//                       offset: [0, 8],
//                     },
//                   },
//                 ],
//               }}
//               sx={{
//                 '& .MuiPaper-root': {
//                   borderRadius: 1,
//                   boxShadow: 3,
//                   '&::before': {
//                     content: '""',
//                     position: 'absolute',
//                     top: 0,
//                     right: 0,
//                     borderWidth: '6px',
//                     borderStyle: 'solid',
//                     borderColor: 'transparent transparent white transparent',
//                     transform: 'translateY(-100%) translateX(100%)',
//                     transformOrigin: 'bottom left',
//                   },
//                 },
//               }}
//             >
//               <MenuList>
//                 <Tooltip title="Change the folder's name." arrow placement="left">
//                   <MenuItem onClick={handleRenameFolderClick}>
//                     <Iconify icon="fluent:rename-16-filled" />
//                     Rename
//                   </MenuItem>
//                 </Tooltip>
//                 <Tooltip
//                   title="Click here to share the folder with team member , this will open the team member settings page"
//                   arrow
//                   placement="left"
//                 >
//                   <MenuItem onClick={handleNavigateToTeamMembers}>
//                     <Iconify icon="jam:share-alt-f" />
//                     Share
//                   </MenuItem>
//                 </Tooltip>
//                 <Divider style={{ borderStyle: 'dashed' }} />
//                 <Tooltip title="Delete the folder." arrow placement="left">
//                   <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
//                     <Iconify icon="solar:trash-bin-trash-bold" />
//                     Delete
//                   </MenuItem>
//                 </Tooltip>
//               </MenuList>
//             </CustomPopover>
//           </>
//         }
//         {...other}
//       />
//       <CreateFolderDialog open={folderDialogOpen} onClose={handleFolderDialogClose} />
//       <RenameFolderDialog
//         open={renameDialogOpen}
//         onClose={handleRenameFolderClose}
//         workflowName={selectedFolderName}
//       />
//       <ConfirmDialog
//         open={confirmDeleteOpen}
//         onClose={handleConfirmDeleteClose}
//         title="Do you really want to delete the folder?"
//         content={
//           <>
//             Note that when a folder is deleted its email lists are moved to the home folder.{' '}
//             <Link
//               href="/learn-more"
//               target="_blank"
//               style={{ color: '#078DEE' }}
//               rel="noopener noreferrer"
//             >
//               Learn more
//             </Link>
//           </>
//         }
//         action={
//           <Button variant="contained" color="error" onClick={handleConfirmDeleteClose}>
//             Delete
//           </Button>
//         }
//       />
//     </>
//   );
// });

// export default function FolderCard({ sx, onTrashClick, onHomeClick, onFolderClick, ...other }) {
//   const theme = useTheme();
//   const folderDialog = useBoolean();

//   return (
//     <Card
//       sx={{
//         boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
//         height: 'auto',
//         backgroundColor: 'common.white',
//         width: { xs: '100%', md: 'auto' },
//         borderRadius: '16px',
//         p: 0,
//         ...sx,
//       }}
//       {...other}
//     >
//       <CardContent>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 2.6,
//           }}
//         >
//           <Box
//             sx={{
//               minHeight: '100%',
//               width: '100%',
//               borderBottom: '1px dashed',
//               borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
//             }}
//           >
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 mb: 2.6,
//               }}
//             >
//               <Tooltip
//                 title="You can create folders and manage lists inside them."
//                 arrow
//                 placement="top"
//               >
//                 <Typography variant="h6" component="div">
//                   Folders
//                 </Typography>
//               </Tooltip>

//               <Tooltip title="Create a new folder." arrow placement="top">
//                 <Button
//                   sx={{
//                     mb: '0px',
//                     p: 1,
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     minWidth: 0,
//                   }}
//                   onClick={folderDialog.onTrue}
//                   color="primary"
//                   variant="contained"
//                 >
//                   <Iconify icon="fa6-solid:plus" />
//                 </Button>
//               </Tooltip>
//             </Box>
//           </Box>
//         </Box>

//         <Box sx={{ minHeight: '100%', width: '100%' }}>
//           <RichTreeView
//             onClick={onHomeClick}
//             defaultExpandedItems={['25']}
//             sx={{ overflowX: 'hidden', minHeight: 'auto' }}
//             slots={{
//               item: (props) => (
//                 <CustomTreeItem
//                   {...props}
//                   onFolderClick={onFolderClick}
//                   onHomeClick={onHomeClick}
//                 />
//               ),
//             }}
//             items={HOMEITEMS}
//           />
//           <RichTreeView
//             defaultExpandedItems={['0']}
//             sx={{ overflowX: 'hidden', minHeight: 'auto' }}
//             slots={{
//               item: (props) => (
//                 <CustomTreeItem
//                   {...props}
//                   onFolderClick={onFolderClick}
//                   onHomeClick={onHomeClick}
//                 />
//               ),
//             }}
//             items={ITEMS}
//           />
//         </Box>

//         <Box
//           sx={{
//             minHeight: '100%',
//             width: '100%',
//             pt: '21px',
//             mt: '21px',
//             borderTop: '1px dashed',
//             borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
//           }}
//         >
//           <RichTreeView
//             onClick={onTrashClick}
//             defaultExpandedItems={['24']}
//             sx={{
//               overflowX: 'hidden',
//               minHeight: 'auto',
//               width: '100%',
//             }}
//             slots={{
//               item: (props) => (
//                 <CustomTreeItem
//                   {...props}
//                   hideEllipsis
//                   label={
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         width: '100%',
//                       }}
//                     >
//                       <Typography
//                         variant="body2"
//                         fontWeight={500}
//                         sx={{
//                           display: 'flex',
//                           flexGrow: 1,
//                           mr: 'auto',
//                         }}
//                       >
//                         {props.label}
//                       </Typography>

//                       {/* <Iconify
//                         mr="3.1px"
//                         icon="solar:trash-bin-trash-bold"
//                         style={{
//                           height: '18px',
//                           color: '#6c757d',
//                         }}
//                       /> */}
//                     </Box>
//                   }
//                   onHomeClick={onHomeClick}
//                 />
//               ),
//             }}
//             items={ITEMS2}
//           />
//         </Box>
//       </CardContent>
//       <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
//     </Card>
//   );
// }

import { memo, useState } from 'react';
import { useNavigate } from 'react-router';

import { styled } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import {
  Box,
  Card,
  Button,
  Divider,
  Tooltip,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { ConfirmDialog } from './confirm-dialog';
import { CreateFolderDialog } from './createfolder';
import { RenameFolderDialog } from './rename_folder-dailog';

// Simplified folder items without nested structure
const ITEMS = [
  { id: '12', label: 'Home (0)' },
  { id: '18', label: 'Pabbly Connect (0)' },
  { id: '1', label: 'Main Folder (0)' },
  { id: '13', label: 'Pabbly Subscription Billing (0)' },
  { id: '14', label: 'Pabbly Email Marketing (0)' },
  { id: '17', label: 'Pabbly Form Builder (0)' },
  { id: '15', label: 'Pabbly Hook (0)' },
];

const ITEMS1 = [{ id: '16', label: 'Trash (0)' }];

const StyledTreeItem = styled((props) => {
  const { label, onTrashClick, onHomeClick, ...rest } = props;
  const confirm = useBoolean();
  const popover = usePopover();
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);

  const handleItemClick = (event) => {
    if (label.includes('Trash')) {
      event.preventDefault();
      onTrashClick?.();
    } else if (label.includes('Home')) {
      event.preventDefault();
      onHomeClick?.();
    }
  };

  const handleIconClick = (event) => {
    event.stopPropagation();
    popover.onOpen(event);
  };

  const handleCreateFolderOpen = () => {
    setCreateFolderOpen(true);
    popover.onClose();
  };

  const handleRenameFolderClick = () => {
    setRenameDialogOpen(true);
    popover.onClose();
  };

  const handleCreateFolderClose = () => setCreateFolderOpen(false);
  const handleRenameFolderClose = () => setRenameDialogOpen(false);
  const navigate = useNavigate()
  const handleNavigateToTeamMembers = () => {
    navigate('settings/team-members');
  };

  return (
    <>
      <TreeItem
        {...rest}
        onClick={handleItemClick}
        label={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              pr: 1,
            }}
          >
            <Tooltip title={`Folder Name: ${label}`} placement="top" arrow>
              <Typography
                component="span"
                fontSize={14}
                fontWeight={500}
                sx={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Typography>
            </Tooltip>

            {!label.includes('Home') && !label.includes('Trash') && (
              <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Click to see options." disableInteractive arrow placement="top">
                  <IconButton
                    onClick={handleIconClick}
                    size="small"
                    sx={{
                      padding: 0.5,
                      '&:hover': { backgroundColor: 'action.hover' },
                    }}
                  >
                    <Iconify icon="eva:more-vertical-fill" width={16} height={16} />
                  </IconButton>
                </Tooltip>
              </Box>
            )}

            <CustomPopover
              open={popover.open}
              onClose={popover.onClose}
              anchorEl={popover.anchorEl}
            >
              <MenuList>
                <Tooltip title="Change the folder's name." arrow placement="left">
                  <MenuItem onClick={handleRenameFolderClick}>
                    <Iconify icon="fluent:rename-16-filled" />
                    Rename
                  </MenuItem>
                </Tooltip>
                <Tooltip
                  title="Click here to share the folder with team member , this will open the team member settings page"
                  arrow
                  placement="left"
                >
                  <MenuItem onClick={handleNavigateToTeamMembers}>
                    <Iconify icon="jam:share-alt-f" />
                    Share
                  </MenuItem>
                </Tooltip>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Tooltip title="Click to delete connection." arrow placement="left">
                  <MenuItem
                    onClick={() => {
                      confirm.onTrue();
                      popover.onClose();
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                  </MenuItem>
                </Tooltip>
              </MenuList>
            </CustomPopover>
          </Box>
        }
      />
      <CreateFolderDialog open={createFolderOpen} onClose={handleCreateFolderClose} />
      <RenameFolderDialog open={renameDialogOpen} onClose={handleRenameFolderClose} />
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Do you really want to delete the folder?"
        content={
          <>
            Note that when a folder is deleted its email lists are moved to the home folder.{' '}
            {/* <Link
              href="/learn-more"
              target="_blank"
              style={{ color: '#078DEE' }}
              rel="noopener noreferrer"
            >
              Learn more
            </Link> */}
          </>
        }
        action={
          <Button variant="contained" color="error" onClose={confirm.onFalse}>
            Delete
          </Button>
        }
      />
    </>
  );
})(({ theme }) => ({
  color: theme.palette.grey[800],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.8, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '14px',
      fontWeight: 500,
      width: '100%',
      '& > svg': {
        marginRight: theme.spacing(1),
      },
    },
  },
}));

const CustomStyling = ({ onTrashClick, onHomeClick }) => (
  <>
    <RichTreeView
      aria-label="customized"
      items={ITEMS}
      sx={{ overflowX: 'hidden', width: 1 }}
      slots={{
        item: (props) => (
          <StyledTreeItem {...props} onTrashClick={onTrashClick} onHomeClick={onHomeClick} />
        ),
      }}
    />
    <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
    <RichTreeView
      aria-label="customized"
      items={ITEMS1}
      sx={{ overflowX: 'hidden', width: 1 }}
      slots={{
        item: (props) => (
          <StyledTreeItem {...props} onTrashClick={onTrashClick} onHomeClick={onHomeClick} />
        ),
      }}
    />
  </>
);

const FolderSection = memo(({ onTrashClick, onHomeClick }) => {
  const createFolder = useBoolean();

  return (
    <Card sx={{ pl: 3, pr: 3, pt: 3, pb: 3 }}>
      <Typography variant="h6">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tooltip
            disableInteractive
            title={
              <div style={{ textAlign: 'center' }}>
                You can create folders and manage connections within them.
              </div>
            }
            arrow
            placement="top"
          >
            <span>Folders</span>
          </Tooltip>

          <Tooltip title="Create a new folder." disableInteractive arrow placement="top">
            <Button
              sx={{
                mr: 1,
                mb: 1,
                p: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 0,
              }}
              onClick={createFolder.onTrue}
              color="primary"
              variant="contained"
            >
              <Iconify icon="fa6-solid:plus" />
            </Button>
          </Tooltip>
        </Box>
      </Typography>
      <Divider sx={{ borderStyle: 'dashed', mb: 0.6, mt: 1 }} />
      <CustomStyling onTrashClick={onTrashClick} onHomeClick={onHomeClick} />
      <CreateFolderDialog open={createFolder.value} onClose={createFolder.onFalse} />
      
    </Card>
  );
});

FolderSection.displayName = 'FolderSection';

export { FolderSection };
