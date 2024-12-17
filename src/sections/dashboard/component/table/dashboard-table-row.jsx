import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { startVerification } from 'src/redux/slice/upload-slice';
import { setSelectedListName } from 'src/redux/slice/listNameSlice';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function DashboardTableRow({ row, selected, dashboardTableIndex, onViewReport }) {
  const handleViewReport = () => {
    const listName = csvfilesname[dashboardTableIndex % csvfilesname.length];
    dispatch(setSelectedListName(listName)); // Dispatch the selected list name
  };

  const csvfilesname = [
    'inactive_email_list.csv (65)',
    'marketing_email_list.csv (656)',
    'newsletter_subscribers.csv (35)',
    'employee_contact_list.csv (64)',
  ];
  const navigate = useNavigate();
  const handelNavigate = () => {
    navigate('/app/reports');
  };

  const dispatch = useDispatch();

  const handleStartVerification = () => {
    dispatch(startVerification()); // Dispatch action to reset isUploaded and start verification
  };

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
                (row.status === 'unprocessed' && 'error') ||
                (row.status === 'completed' && 'success') ||
                (row.status === 'processing' && 'info') ||
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
        <Button
          variant="outlined"
          color="primary"
          disabled={row.status === 'processing'}
          onClick={
            row.status === 'processing' || row.status === 'completed'
              ? undefined
              : handleStartVerification
          }
        >
          {row.status === 'processing' || row.status === 'completed'
            ? 'Download'
            : 'Start Verification'}
        </Button>
      </TableCell>

      <TableCell width={140} align="right">
        <Button
          variant="outlined"
          color="success"
          disabled={row.status === 'unprocessed' || row.status === 'processing'}
          onClick={handelNavigate}
        >
          View Report
        </Button>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
