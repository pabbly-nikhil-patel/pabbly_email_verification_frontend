import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function CreditTableRow({ row, selected }) {
  return (
    <TableRow hover>
      <TableCell width={300}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Tooltip
            arrow
            placement="top"
            disableInteractive
            title={`Action occurred at: ${row.dateCreatedOn}`}
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

      <TableCell width={140}>
        <Tooltip arrow placement="top" disableInteractive title={`Action: ${row.action}`}>
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
            {row.action}
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
          <Label variant="soft" color={row.credits === 'Alloted' ? 'success' : 'error'}>
            {row.credits === 'Alloted' ? row.noOfCredits : `-${row.noOfCredits}`}
          </Label>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
