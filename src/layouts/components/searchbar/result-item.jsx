import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function ResultItem({ title,folderItems, groupLabel, onClickItem, searchQuery = '' }) {
  // Ensure searchQuery is always a string
  const safeSearchQuery = (searchQuery || '').toLowerCase(); // Default to empty string if undefined

  // Handle the case where title is a string or array of objects
  const titleParts = Array.isArray(title)
    ? title
    : [{ text: title, subtext:folderItems, highlight: title && title.toLowerCase().includes(safeSearchQuery) }];

    console.log(titleParts)
  return (
    <ListItemButton
      onClick={onClickItem}
      sx={{
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'transparent',
        borderBottomColor: (theme) => theme.vars.palette.divider,
        '&:hover': {
          borderRadius: 1,
          borderColor: (theme) => theme.vars.palette.primary.main,
          backgroundColor: (theme) =>
            varAlpha(
              theme.vars.palette.primary.mainChannel,
              theme.vars.palette.action.hoverOpacity
            ),
        },
      }}
    >
      <ListItemText
        primaryTypographyProps={{ typography: 'subtitle2',  }}
        secondaryTypographyProps={{ typography: 'caption', noWrap: true }}
        primary={titleParts.map((part, index) => (
          <Box
            key={index}
            component="span"
            sx={{ color: 'text.primary' }}
          >
            {part.text}
          </Box>
          
        ))}

        secondary={titleParts.map((part, index) => (
          <Box
            key={index}
            component="span"
            // sx={{ color: 'text.primary' }}
          >
            Email List Uploaded: {part.subtext}
          </Box>
          
        ))}
      />
     
      
      {groupLabel && <Label color="info">{groupLabel}</Label>}
    </ListItemButton>
  );
}
