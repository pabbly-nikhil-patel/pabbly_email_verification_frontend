import { useState } from 'react';

import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Tooltip, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog, { dialogClasses } from '@mui/material/Dialog';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { SearchNotFound } from 'src/components/search-not-found';

import { ResultItem } from './result-item';

// ----------------------------------------------------------------------
const data = [
  { title: 'List 1' },
  { title: 'List 2'},
  { title: 'List 3' },
  { title: 'List 4' },
  { title: 'List 5' },
];
export default function Searchbar({ sx, ...other }) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (item) => {
    // onSelectItem(item); // Call parent function to update card title
    handleClose();
  };

  const renderItems = () => (
    <Box component="ul">
      {filteredData.map((item) => (
        <Box
          component="li"
          key={item.title} // Use title for unique key instead of item.path
          sx={{ display: 'flex' }}
          onClick={() => handleItemClick(item)} // Update title when item is clicked
        >
          <ResultItem
            title={item.title}
            groupLabel={searchQuery && 'Filtered'}
            searchQuery={searchQuery}
          />
        </Box>
      ))}
    </Box>
  );
 const renderButton = (
    <Tooltip title="Search Lists to see reports." arrow placement="bottom">
      <Box
        display="flex"
        alignItems="center"
        onClick={handleOpen}
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: 'grey.600',
          pr: { sm: 1 },
          borderRadius: { sm: 1.5 },
          cursor: { sm: 'pointer' },
          bgcolor: { sm: varAlpha(theme.vars.palette.grey['500Channel'], 0.08) },
          ...sx,
        }}
        {...other}
      >
        <Box display="flex" alignItems="center">
          <IconButton disableRipple>
            <SvgIcon sx={{ width: 20, height: 20 }}>
              <path
                fill="currentColor"
                d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42M5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6"
              />
            </SvgIcon>
          </IconButton>
        </Box>

        <Typography fontWeight={500} fontSize={14} ml={1} py={1}>
          Search Report
        </Typography>

        <Label
          sx={{
            ml: 1,
            fontSize: 12,
            color: 'grey.800',
            bgcolor: 'common.white',
            boxShadow: theme.customShadows.z1,
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          List Name
        </Label>
      </Box>
    </Tooltip>
  );

  return (
    <>
      {renderButton}

      <Dialog
        fullWidth
        disableRestoreFocus
        open={isOpen}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: 0,
        }}
        PaperProps={{ sx: { mt: 15, overflow: 'unset' } }}
        sx={{
          [`& .${dialogClasses.container}`]: { alignItems: 'flex-start' },
        }}
      >
        {/* Dialog Content */}
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.vars.palette.divider}` }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={
              <Label
                sx={{ letterSpacing: 1, color: 'text.secondary', cursor: 'pointer' }}
                onClick={handleClose}
              >
                esc
              </Label>
            }
            inputProps={{ sx: { typography: 'h6' } }}
          />
        </Box>

        {filteredData.length === 0 ? (
          <SearchNotFound query={searchQuery} sx={{ py: 15 }} />
        ) : (
          <Scrollbar sx={{ px: 3, pb: 3, pt: 2, height: 400 }}>{renderItems()}</Scrollbar>
        )}
      </Dialog>
    </>
  );
}

