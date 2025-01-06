import { useState } from 'react';

import { styled } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { Tooltip, Divider, MenuList, MenuItem, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// Sample folder items
const ITEMS = [
  { id: '12', label: 'Home (0)' },
  { id: '18', label: 'Pabbly Connect (0)' },
  {
    id: '1',
    label: 'Main Folder (2)',
    children: [
      { id: '2', label: 'Child Folder 1-Subscrip..(0)' },
      {
        id: '3',
        label: 'Child Folder 2 (3)',
        children: [
          { id: '6', label: 'Child Folder 1-Subscrip..(0)' },
          {
            id: '7',
            label: 'Grand Child (4)',
            children: [
              { id: '9', label: 'Folder 1' },
              { id: '10', label: 'Folder 2' },
              { id: '11', label: 'Folder 3' },
            ],
          },
          { id: '8', label: 'Child Folder 3' },
        ],
      },
      { id: '4', label: 'Child Folder 4 (0)' },
      { id: '5', label: 'Child Folder 4 (2)' },
    ],
  },
  { id: '13', label: 'Pabbly Subcription Billi..(0)' },
  { id: '14', label: 'Pabbly Email Marketing (0)' },
  { id: '17', label: 'Pabbly Form Bulider (0)' },
  { id: '15', label: 'Pabbly Hook (0)' },
];
const ITEMS1 = [{ id: '16', label: 'Trash (0)' }];

const StyledTreeItem = styled((props) => {
  const { label, onTrashClick, onHomeClick, ...rest } = props;
  const confirm = useBoolean();
  const popover = usePopover();
  const [anchorEl, setAnchorEl] = useState(null);
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
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

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

  return (
    <TreeItem
      {...rest}
      onClick={handleItemClick} // Custom handling of click events
      label={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tooltip title={`Folder Name: ${label}`} placement="top" arrow>
            <span>{label}</span>
          </Tooltip>
          {!label.includes('Home') && !label.includes('Trash') && (
            <Tooltip title="Click to see options." disableInteractive arrow placement="top">
              <IconButton onClick={handleIconClick}>
                <Iconify icon="eva:more-vertical-fill" width={16} height={16} />
              </IconButton>
            </Tooltip>
          )}
          <CustomPopover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            slotProps={{ arrow: { placement: 'right-top' } }}
          >
            <MenuList>
              <Tooltip title="Create a new folder." arrow placement="left">
                <MenuItem onClick={handleCreateFolderOpen}>
                  <Iconify icon="mingcute:add-fill" />
                  Create Folder
                </MenuItem>
              </Tooltip>
              <Tooltip title="Change the folder's name." arrow placement="left">
                <MenuItem onClick={handleRenameFolderClick}>
                  <Iconify icon="fluent:edit-20-filled" />
                  Rename
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
        </div>
      }
    />
  );
})(({ theme }) => ({
  color: theme.vars.palette.grey[800],
  [`& .${treeItemClasses.content}`]: {
    /* Tree item styles */
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    /* Group transition styles */
  },
}));

export function CustomStyling({ onTrashClick, onHomeClick }) {
  return (
    <>
      <RichTreeView
        aria-label="customized"
        defaultExpandedItems={['1']}
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
        defaultExpandedItems={['16']}
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
}
