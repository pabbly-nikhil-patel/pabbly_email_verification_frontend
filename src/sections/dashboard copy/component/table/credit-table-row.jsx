import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function CreditTableRow({ row, selected }) {
  const timezone = ', (UTC+05:30) Asia/Kolkata';
  return (
    <TableRow hover>
      <TableCell width={300}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Tooltip
            arrow
            placement="top"
            disableInteractive
            title={`Action occurred at: ${row.status} ${timezone}`}
          >
            <Label variant="soft" color={row.credits === 'Alloted' ? 'success' : 'error'}>
              {row.status}
            </Label>
          </Tooltip>
        </Stack>
        <Stack spacing={2} direction="row" alignItems="center" mt="4px">
          <Tooltip
            arrow
            placement="top"
            disableInteractive
            title={`Action occurred at: ${row.dateCreatedOn} ${timezone}`}
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
              {row.dateCreatedOn}
            </Box>
          </Tooltip>
        </Stack>
      </TableCell>

      <TableCell width={200}>
        <Tooltip
          arrow
          placement="top"
          disableInteractive
          title={`Message for the action: ${row.message}`}
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
            {row.message}
          </Box>
        </Tooltip>
      </TableCell>
      <TableCell width={140} align="right">
        <Tooltip
          arrow
          placement="top"
          disableInteractive
          title={`Status: ${row.credits === 'Alloted' ? `Credits Alloted ${row.noOfCredits}` : `Credits Consumed ${row.noOfCredits}`}`}
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
            {row.credits === 'Alloted' ? row.noOfCredits : `-${row.noOfCredits}`}
          </Box>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
