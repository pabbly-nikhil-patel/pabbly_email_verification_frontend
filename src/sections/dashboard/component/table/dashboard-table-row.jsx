import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function DashboardTableRow({ row, selected, dashboardTableIndex }) {

  // const commonIcon = <Iconify icon="heroicons:document-text" sx={{ mr: 1 }} />;

  const csvfilesname = [
    'inactive_email_list.csv (65)',
    'marketing_email_list.csv (656)',
    'newsletter_subscribers.csv (35)',
    'employee_contact_list.csv (64)',
  ];

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell width={300}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Label
              variant="soft"
              color={
                (row.status === 'completed' && 'success') ||
                (row.status === 'processing' && 'info') ||
                (row.status === 'unprocessed' && 'error') ||
                'default'
              }
            >
              {row.status}
            </Label>
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
              {csvfilesname[dashboardTableIndex % csvfilesname.length]}
              {/* {commonIcon} */}
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={200}>
      <Button variant="outlined" color="primary">
          Start Verification
        </Button>
      </TableCell>

      <TableCell width={140} align='right'>
        <Button variant="outlined" color="primary" disabled>
          View Report
        </Button>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
