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
        <Stack spacing={1}>
          {' '}
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
            <Tooltip arrow placement="top" disableInteractive title={`${row?.status==="Single Verification" ? "Email address":"List"}: ${row.message}`}>
              <span>{row.message}</span>
            </Tooltip>
          </Box>
        </Stack>
        <Stack>
          <Box
            component="span"
            sx={{
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '300px',
              display: 'inline-block',
              fontSize: '0.875rem',
            }}
          >
            {row.status === 'Single Verification' ? (
              <Tooltip
                arrow
                placement="top"
                disableInteractive
                title="Email address"
              >
                <span>Email address</span>{' '}
              </Tooltip>
            ) : (
              <Tooltip
                arrow
                placement="top"
                disableInteractive
                title={`Folder Name: ${row.folder}`}
              >
                <span>{row.folder}</span>{' '}
              </Tooltip>
            )}
          </Box>
        </Stack>
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
