import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Tooltip, IconButton, Typography } from '@mui/material';

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
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Tooltip
                title={`${
                  (row.status === 'unprocessed' && 'The email verification has not yet started on the uploaded email list.') ||
                  (row.status === 'completed' && 'The email verification is process is completed on the uploaded email list.') ||
                  (row.status === 'processing' && 'The email verification is started processing on the uploaded email list.')
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
            title={`Click here to ${row.status === 'processing' || row.status === 'completed'
                  ? row.status === 'completed'
                    ? 'Download'
                    : 'Verification In Progress'
                  : 'Start Verification'}`}
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
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Click to see options." arrow placement="top">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={(event) => onOpenPopover(event)}>
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
