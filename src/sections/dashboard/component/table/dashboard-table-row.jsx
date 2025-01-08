import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {
  Box,
  Link,
  Drawer,
  Tooltip,
  Checkbox,
  IconButton,
  Typography,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { startVerification } from 'src/redux/slice/upload-slice';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import { DashboardChart } from '../chart/dashboard-chart';

// Custom backdrop for transparent background
const CustomBackdrop = (props) => (
  <MuiBackdrop {...props} sx={{ backgroundColor: 'transparent' }} />
);

export function DashboardTableRow({
  onSelectRow,
  row,
  selected,
  dashboardTableIndex,
  onOpenPopover,
  onViewReport,
  onStartVerification,
  isProcessing,
  isCompleted,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [alertState, setAlertState] = useState(null);

  const csvfilesname = [{ name: row.name, numberOfEmails: row.numberOfEmails }];
  const timezone = '(UTC+05:30) Asia/Kolkata';
  const currentFile = csvfilesname[dashboardTableIndex % csvfilesname.length];
  const navigate = useNavigate();
  const popover = usePopover();
  const dispatch = useDispatch();

  const showAlert = (type, title, message) => {
    console.log(`Alert Type: ${type}, Title: ${title}, Message: ${message}`);
  };

  const handleAlertClose = () => {
    console.log('Alert closed');
  };

  const handleStartVerification = () => {
    onStartVerification();
    dispatch(startVerification());
  };

  const handleAction = () => {
    switch (row.status) {
      case 'unprocessed':
        onStartVerification();
        dispatch(startVerification());
        setIsDrawerOpen(true);
        break;
      case 'completed':
        setIsDrawerOpen(true);
        break;
      case 'processing':
      case 'uploading':
        setIsDrawerOpen(true); // Show progress drawer for both states
        break;
      default:
        break;
    }
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'info';
      case 'uploading':
        return 'warning';
      case 'unprocessed':
        return 'error';
      default:
        return 'default';
    }
  };

  // Button text mapping
  const getButtonText = (status) => {
    switch (status) {
      case 'completed':
        return 'View Report';
      case 'processing':
        return 'Verification In Progress';
      case 'uploading':
        return 'Uploading';
      case 'unprocessed':
        return 'Start Verification';
      default:
        return '';
    }
  };

  const renderPrimary = (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
          <Tooltip title="Select Row" arrow placement="top">
            <Checkbox
              checked={selected}
              onClick={onSelectRow}
              inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
            />
          </Tooltip>
        </TableCell>
        <TableCell width={400}>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title={
                row.status === 'processing'
                  ? 'Click to view verification progress'
                  : row.status === 'uploading'
                    ? 'Click to view upload progress'
                    : row.status === 'completed'
                      ? 'View Report'
                      : 'Click to start verification'
              }
              arrow
              placement="top"
              disableInteractive
            >
              <Label variant="soft" color={getStatusColor(row.status)}>
                {row.status}
              </Label>
            </Tooltip>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <Tooltip
              title={
                <>
                  List Name: {currentFile.name} ({currentFile.numberOfEmails})
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
                  mt: '4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '300px',
                }}
              >
                {currentFile.name} ({currentFile.numberOfEmails})
              </Typography>
            </Tooltip>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            <Tooltip
              arrow
              placement="top"
              disableInteractive
              title={`List Uploaded: ${row.date}, ${timezone}`}
            >
              <Box
                component="span"
                sx={{
                  color: 'text.secondary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '300px',
                  display: 'inline-block',
                }}
              >
                {row.date}
              </Box>
            </Tooltip>
          </Stack>
        </TableCell>
        <TableCell width={400}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Tooltip
              title={<>Number of Emails: ({currentFile.numberOfEmails})</>}
              arrow
              placement="top"
              disableInteractive
            >
              <Typography
                component="span"
                fontSize={14}
                sx={{
                  mt: '4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '300px',
                }}
              >
                {currentFile.numberOfEmails} Emails
              </Typography>
            </Tooltip>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            {(row.status === 'processing' || row.status === 'completed') && (
              <Tooltip
                arrow
                placement="top"
                disableInteractive
                title="Credits consumed for verification"
              >
                <Typography
                  component="span"
                  sx={{
                    color: 'success.main',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '300px',
                    display: 'inline-block',
                    fontSize: '14px',
                  }}
                >
                  {row.creditconsumed || `${currentFile.numberOfEmails} Credit Consumed`}
                </Typography>
              </Tooltip>
            )}
          </Stack>
        </TableCell>
        <TableCell width={300} align="right" sx={{ pr: 1 }}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Tooltip
              title={
                row.status === 'processing'
                  ? 'Verification in progress. Please wait.'
                  : row.status === 'completed'
                    ? 'View Report'
                    : 'Click to start verification'
              }
              arrow
              placement="top"
              disableInteractive
            >
              <span>
                <Button variant="outlined" color="primary" onClick={handleAction}>
                  {getButtonText(row.status)}
                </Button>
              </span>
            </Tooltip>
          </Stack>
        </TableCell>
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip
            title={
              row.status === 'processing' || row.status === 'uploading'
                ? 'Actions unavailable during verification'
                : 'Click for more options.'
            }
            arrow
            placement="top"
          >
            <span>
              <IconButton
                color={popover.open ? 'inherit' : 'default'}
                onClick={(event) => onOpenPopover(event)}
                disabled={row.status === 'processing' || row.status === 'uploading'}
                sx={{
                  '&.Mui-disabled': {
                    opacity: 0.5,
                  },
                }}
              >
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </span>
          </Tooltip>
        </TableCell>
      </TableRow>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: {
              xs: '100%',
              md: '600px',
            },
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6">
              {/* {row.status === 'completed' ? 'Verification Report' : 'Verification Progress'} */}
              Verification Report
            </Typography>
            <Typography variant="h8">
              <span>
                Check the full details of email verification here.{' '}
                <Link
                  href="https://forum.pabbly.com/threads/verification-report.26340/"
                  style={{ color: '#078DEE' }}
                  underline="always"
                  target="_blank"
                >
                  Learn more
                </Link>
              </span>
            </Typography>
          </Box>

          <IconButton onClick={() => setIsDrawerOpen(false)}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <DashboardChart
          showAlert={showAlert}
          handleAlertClose={handleAlertClose}
          title={currentFile.name}
          chart={{
            series: [
              { label: 'Deliverable Emails', value: 12244 },
              { label: 'Undeliverable Emails', value: 53345 },
              { label: 'Accept-all Emails', value: 44313 },
              { label: 'Unknown Emails', value: 78343 },
            ],
          }}
        />
      </Drawer>
    </>
  );

  return renderPrimary;
}
