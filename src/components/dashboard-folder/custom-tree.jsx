import React from 'react';

import { Tooltip, IconButton, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { StyledTreeItem } from './style';

export const CustomTreeItem = React.forwardRef((props, ref) => {
  const {
    fullLabel,
    label,
    expanded,
    onToggle,
    id,
    onHomeClick,
    onFolderClick,
    hideEllipsis,
    ...other
  } = props;

  const handleItemClick = (event) => {
    if (id === '0') {
      onHomeClick();
    } else {
      onFolderClick(label);
      onToggle?.(event);
    }
  };

  return (
    <StyledTreeItem
      ref={ref}
      label={
        <>
          <Tooltip title={`Folder Name: ${label}`} arrow placement="top">
            <Typography
              fontSize={14}
              fontWeight={500}
              sx={{
                mr: 'auto',
                cursor: 'pointer',
                width: '100%',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              onClick={handleItemClick}
            >
              {label}
            </Typography>
          </Tooltip>

          {!hideEllipsis && id !== '1' && (
            <IconButton size="small">
              <Tooltip title="Click to see options." arrow placement="top">
                <Iconify icon="eva:more-vertical-fill" width={16} height={16} sx={{ ml: 'auto' }} />
              </Tooltip>
            </IconButton>
          )}
        </>
      }
      {...other}
    />
  );
});
