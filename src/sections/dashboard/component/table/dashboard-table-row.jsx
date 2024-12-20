import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Tooltip, Typography } from '@mui/material';

import { startVerification } from 'src/redux/slice/upload-slice';
import { setSelectedListName } from 'src/redux/slice/listNameSlice';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function DashboardTableRow({ row, selected, dashboardTableIndex, onViewReport }) {
  const csvfilesname = [
    { name: 'inactive_email_list.csv', numberOfEmails: 65 },
    { name: 'marketing_email_list.csv', numberOfEmails: 656 },
    { name: 'newsletter_subscribers.csv', numberOfEmails: 35 },
    { name: 'employee_contact_list.csv', numberOfEmails: 64 },
  ];

  // Get the current file details based on the index
  const currentFile = csvfilesname[dashboardTableIndex % csvfilesname.length];
  const navigate = useNavigate();
  const handleViewReport = () => {
    const listName = csvfilesname[dashboardTableIndex % csvfilesname.length];
    dispatch(setSelectedListName(currentFile.name));
    navigate('/app/reports');
  };
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
            <Tooltip
              title={`Email verification process is ${
                (row.status === 'unprocessed' && 'unprocessed') ||
                (row.status === 'completed' && 'completed') ||
                (row.status === 'processing' && 'processing')
              }.`}
              arrow
              placement="top"
              disableInteractive
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
            </Tooltip>
            <Tooltip
              // title={csvfilesname[dashboardTableIndex % csvfilesname.length]}
              title={
                <>
                  Filename: {currentFile.name} <br />
                  Number of Emails: {currentFile.numberOfEmails}
                </>
              }
              arrow
              placement="top"
              disableInteractive
            >
              <Typography
                component="span"
                fontSize={14}
                sx={{
                  mt: '5px',
                  // color: 'text.disabled',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '300px',
                }}
              >
                {currentFile.name} ({currentFile.numberOfEmails}){/* {commonIcon} */}
              </Typography>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={200}>
        <Tooltip
          title={`Click here to ${
            row.status === 'processing' || row.status === 'completed'
              ? 'Download'
              : 'Start Verification'
          }`}
          arrow
          placement="top"
          disableInteractive
        >
          <span>
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
          </span>
        </Tooltip>
      </TableCell>

      <TableCell width={140} align="right">
        <Tooltip title="Click here to view report" arrow placement="top" disableInteractive>
          <span>
          <Button
            variant="outlined"
            color="success"
            disabled={row.status === 'unprocessed' || row.status === 'processing'}
            onClick={handleViewReport} // Updated to use the new handler
          >
            View Report
          </Button>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
