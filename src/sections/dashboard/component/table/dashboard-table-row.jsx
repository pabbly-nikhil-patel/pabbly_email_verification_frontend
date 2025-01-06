import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {
  Box,
  Drawer,
  Tooltip,
  IconButton,
  Typography,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { startVerification } from 'src/redux/slice/upload-slice';
import { setSelectedListName } from 'src/redux/slice/listNameSlice';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import { DashboardChart } from '../chart/dashboard-chart';

// Custom backdrop for transparent background
const CustomBackdrop = (props) => (
  <MuiBackdrop {...props} sx={{ backgroundColor: 'transparent' }} />
);

export function DashboardTableRow({
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

  const handleViewReport = () => {
    dispatch(setSelectedListName(currentFile.name)); // Dispatch selected list name
    setIsDrawerOpen(true); // Open the drawer
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleStartVerification = () => {
    onStartVerification();
    dispatch(startVerification());
  };

  const renderPrimary = (
    <>
      <TableRow hover selected={selected}>
        <TableCell width={300}>
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
              title={`${
                (row.status === 'unprocessed' && 'List is Unprocessed.') ||
                (row.status === 'completed' && 'List is Completed.') ||
                (row.status === 'processing' && 'List is Processing.')
              }`}
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

        <TableCell width={200}>
          <Tooltip
            title={
              row.status === 'processing'
                ? 'Verification in progress. Please wait.'
                : row.status === 'completed'
                  ? 'Click to download list'
                  : 'Click to start verification on list'
            }
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
                  ? row.status === 'completed'
                    ? 'Download'
                    : 'Verification In Progress'
                  : 'Start Verification'}
              </Button>
            </span>
          </Tooltip>
        </TableCell>

        <TableCell width={140} align="right">
          <Tooltip
            title={
              row.status === 'completed'
                ? 'Click to view report of list.'
                : 'Verification in progress. Please wait.'
            }
            arrow
            placement="top"
            disableInteractive
          >
            <span>
              <Button
                variant="outlined"
                color="success"
                disabled={row.status === 'unprocessed' || row.status === 'processing'}
                onClick={handleViewReport}
              >
                View Report
              </Button>
            </span>
          </Tooltip>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Click for more options." arrow placement="top">
            <IconButton
              color={popover.open ? 'inherit' : 'default'}
              onClick={(event) => onOpenPopover(event)}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
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
          <Typography variant="h6">Upload Report</Typography>
          <IconButton
            onClick={handleCloseDrawer}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <DashboardChart
          showAlert={showAlert}
          handleAlertClose={handleAlertClose}
          title="List_name.csv"
          chart={{
            series: [
              { label: 'Deliverable', value: 12244 },
              { label: 'Undeliverable', value: 53345 },
              { label: 'Accept-all', value: 44313 },
              { label: 'Unknown', value: 78343 },
            ],
          }}
        />
        <Box pt={3} px={3} alignSelf='end' >
          <Tooltip arrow placement="top" disableInteractive title="Click to download report.">
            <Button
              variant="outlined"
              color="primary"
              // onClick={() => handleOpen('download')}
              startIcon={<Iconify width={24} icon="solar:download-minimalistic-bold" />}
            >
              Download Report
            </Button>
          </Tooltip>
        </Box>
      </Drawer>
    </>
  );

  return renderPrimary;
}
