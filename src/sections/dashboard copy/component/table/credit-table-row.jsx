import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function CreditTableRow({ row, selected }) {
  const timezone = ', (UTC+05:30) Asia/Kolkata';

  const getStatusTooltip = (status, dateTime) => {
    switch (status) {
      case 'Single Verification':
        return `Single email address was checked for verification.`;
      case 'Bulk Verification':
        return `Email list was uploaded and checked for verification.`;
      case 'Email Credits Purchased':
        return `Customer has purchased email credits for email verification`;
      default:
        return '';
    }
  };

  return (
    <TableRow hover>
      <TableCell width={300}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Tooltip
            arrow
            placement="top"
            disableInteractive
            title={getStatusTooltip(row.status, row.status)}
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
                color: 'text.disabled',
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
            <Tooltip
              arrow
              placement="top"
              disableInteractive
              title={
                row.status === 'Email Credits Purchased'
                  ? 'Credits Alloted'
                  : `${row.status === 'Single Verification' ? 'Email address' : 'List'}: ${row.message}`
              }
            >
              <span>{row.message}</span>
            </Tooltip>
          </Box>
        </Stack>
        <Stack>
          <Box
            component="span"
            sx={{
              color: 'text.disabled',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '300px',
              display: 'inline-block',
              fontSize: '0.875rem',
            }}
          >
            {row.status === 'Single Verification' ? (
              <Tooltip arrow placement="top" disableInteractive title="Email address">
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
          title={`${row.credits === 'Alloted' ? `Email credits alloted to the account.` : `Email credits consumed for verifying email.`}`}
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
