import React from 'react';
import { useTheme } from '@emotion/react';

import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { Box, Card, Button, Tooltip, Typography } from '@mui/material';

import { varAlpha } from 'src/theme/styles';
import { ITEMS, ITEMS2, HOMEITEMS } from 'src/_mock/folder/_folderStructure';

import { Iconify } from 'src/components/iconify';

import { CustomTreeItem } from './custom-tree';

export default function DashboardFolder({
  sx,
  icon,
  title,
  total,
  color = 'warning',
  onTrashClick,
  onHomeClick,
  ...other
}) {
  const theme = useTheme();

  return (
    <Card sx={{ width: '346px', p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2.6,
          pb: 2.6,
          borderBottom: '1px dashed',
          borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
        }}
      >
        <Typography variant="h6" component="div">
          <Tooltip
            title="You can create folders and manage WhatsApp numbers inside them."
            arrow
            placement="top"
          >
            Folders
          </Tooltip>
        </Typography>

        <Tooltip title="Create a new folder." arrow placement="top">
          <Button
            sx={{
              mb: 0,
              p: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: 0,
            }}
            color="primary"
            variant="contained"
          >
            <Iconify icon="fa6-solid:plus" />
          </Button>
        </Tooltip>
      </Box>

      <Box sx={{ minHeight: '100%', width: '100%' }}>
        {[
          { items: HOMEITEMS, defaultExpandedItems: ['25'] },
          { items: ITEMS, defaultExpandedItems: ['0'] },
        ].map(({ items, defaultExpandedItems }, index) => (
          <RichTreeView
            key={index}
            onClick={onHomeClick}
            defaultExpandedItems={defaultExpandedItems}
            sx={{ overflowX: index === 0 ? 'hidden' : 'visible', minHeight: 'auto' }}
            slots={{
              item: (props) => <CustomTreeItem {...props} onHomeClick={onHomeClick} />,
            }}
            items={items}
          />
        ))}
      </Box>

      <Box
        sx={{
          minHeight: '100%',
          width: '100%',
          pt: '21px',
          mt: '21px',
          borderTop: '1px dashed',
          borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
        }}
      >
        <RichTreeView
          onClick={onTrashClick}
          defaultExpandedItems={['24']}
          sx={{ overflowX: 'hidden', minHeight: 'auto', width: '100%' }}
          slots={{
            item: (props) => (
              <CustomTreeItem
                {...props}
                hideEllipsis
                label={
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Typography variant="body2" sx={{ display: 'flex', flexGrow: 1, mr: 'auto' }}>
                      {props.label}
                    </Typography>
                    <Iconify
                      mr="3.1px"
                      icon="solar:trash-bin-trash-bold"
                      sx={{ height: '18px', color: '#6c757d' }}
                    />
                  </Box>
                }
                onHomeClick={onHomeClick}
              />
            ),
          }}
          items={ITEMS2}
        />
      </Box>
    </Card>
  );
}
