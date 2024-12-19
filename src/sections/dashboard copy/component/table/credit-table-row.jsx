import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function CreditTableRow({ row, selected, creditTableIndex }) {
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

  const credits = [9000, 1000, -2, -10, -20];

  const currentCredit = credits[creditTableIndex % credits.length];

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell width={300}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Tooltip
            arrow
            placement="top"
            disableInteractive
            title={`Action occured at: ${date[creditTableIndex % date.length]}`}
          >
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
          </Tooltip>
        </Stack>
      </TableCell>

      <TableCell width={200}>
        <Tooltip
          arrow
          placement="top"
          disableInteractive
          title={`Message for the action: ${message[creditTableIndex % message.length]}`}
        >
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
        </Tooltip>
      </TableCell>

      <TableCell width={140}>
        <Tooltip
          arrow
          placement="top"
          disableInteractive
          title={`Action: ${actions[creditTableIndex % actions.length]}`}
        >
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
        </Tooltip>
      </TableCell>
      <TableCell width={140} align="right">
        <Tooltip
          arrow
          placement="top"
          disableInteractive
          title={`Status: ${
            (currentCredit > 0 && 'Email credits alloted.') ||
            (currentCredit < 0 && 'Email credits consumed.')
          }`}
        >
          <Label
            variant="soft"
            color={(currentCredit > 0 && 'success') || (currentCredit < 0 && 'error')}
          >
            {currentCredit}
          </Label>
        </Tooltip>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
