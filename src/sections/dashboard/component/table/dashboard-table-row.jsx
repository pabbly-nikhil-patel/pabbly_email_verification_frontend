import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Box, Tooltip, IconButton, Typography } from '@mui/material';

import { startVerification } from 'src/redux/slice/upload-slice';
import { setSelectedListName } from 'src/redux/slice/listNameSlice';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

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
  const csvfilesname = [{ name: row.name, numberOfEmails: row.numberOfEmails }];
  const timezone = '(UTC+05:30) Asia/Kolkata';

  // Get the current file details based on the index
  const currentFile = csvfilesname[dashboardTableIndex % csvfilesname.length];
  const navigate = useNavigate();
  const popover = usePopover();
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
    onStartVerification(); // Update local state
    dispatch(startVerification()); // Start verification process

    // Simulate verification completion (remove in production)
    // setTimeout(() => {
    //   dispatch(finishVerification());
    // }, 3000);
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
              // title={csvfilesname[dashboardTableIndex % csvfilesname.length]}
              title={
                <>
                  List Name : {currentFile.name} ({currentFile.numberOfEmails})
                  {/* Number of Emails: {currentFile.numberOfEmails} */}
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
          <Stack spacing={2} direction="row" alignItems="center">
            <Tooltip
              arrow
              placement="top"
              disableInteractive
              title={`Date and Time of creation: ${timezone}`}
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
                : 'Wait for the verification.'
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
      {/* <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip title="Update connection." arrow placement="left">
            <MenuItem sx={{ color: 'secondary' }}>
              <Iconify icon="material-symbols:settings-b-roll-rounded" />
              Update
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />

          <Tooltip title="Delete connection." arrow placement="left">
            <MenuItem sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover> */}
    </>
  );

  return <>{renderPrimary}</>;
}
