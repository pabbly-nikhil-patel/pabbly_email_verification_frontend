import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function CreditTableRow({ row, selected, creditTableIndex }) {
  // const commonIcon = <Iconify icon="heroicons:document-text" sx={{ mr: 1 }} />;

  const date = [
    'Oct 23, 2024 17:45:32',
    'Oct 24, 2024 17:45:32',
    'Oct 25, 2024 17:45:32',
    'Oct 26, 2024 17:45:32',
    'Oct 27, 2024 17:45:32',
  ];

  const message = [
    'Email credits added by Admin',
    'Email credits added by Admin',
    'Used in verifying "Untitled_spreadsheet_-_Sheet1.csv" list',
    'Used in verifying email: ayush.bisen@pabbly.com',
    'Used in verifying email: ayushbisen0912@gmail.com',
  ];

  const actions = ['Added', 'Added', 'Verified Email', 'Verifying List', 'Verifying List'];

  const label = ['500', '100', '500', '50', '100'];

  const currentLabel = label[creditTableIndex % label.length];

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell width={300}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Box
            component="span"
            sx={{
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '300px',
              display: 'inline-block',
            }}
          >
            {date[creditTableIndex % date.length]}
          </Box>
        </Stack>
      </TableCell>

      <TableCell width={200}>
        <Box
          component="span"
          sx={{
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '300px',
            display: 'inline-block',
          }}
        >
          {message[creditTableIndex % message.length]}
        </Box>
      </TableCell>

      <TableCell width={140}>
        <Box
          component="span"
          sx={{
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '300px',
            display: 'inline-block',
          }}
        >
          {actions[creditTableIndex % actions.length]}
        </Box>
      </TableCell>
      <TableCell width={140} align="right">
        <Label
          variant="soft"
          color={
            (currentLabel === '500' && 'success') ||
            (currentLabel === '100' && 'info') ||
            (currentLabel === '50' && 'error') ||
            'default'
          }
        >
          {label[creditTableIndex % label.length]}
        </Label>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}