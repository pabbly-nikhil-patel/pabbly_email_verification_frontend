/* eslint-disable consistent-return */
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import {
  Box,
  Alert,
  Button,
  Dialog,
  Popover,
  Tooltip,
  Divider,
  Snackbar,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
  DialogTitle,
  useMediaQuery,
  DialogContent,
  Link,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { listItems } from 'src/_mock/big-card/_dashboardBigCardListItems';

import { Iconify } from 'src/components/iconify';
import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import Upload from 'src/sections/dashboard/component/upload/upload-file';
import FolderCard from 'src/sections/dashboard/component/folder/dashboardfolder';
import { DashboardTable } from 'src/sections/dashboard/component/table/dashboard-table';
import VerifySingleEmail from 'src/sections/dashboard/component/verify-single-email/verify-single-email';

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard | Pabbly Email Verification` };
const { items, style } = listItems;

export default function Page() {
  const [anchorEl, setAnchorEl] = useState(null);

  const [email, setEmail] = useState('');

  const [alertState, setAlertState] = useState({
    open: false,
    severity: 'success',
    title: '',
    message: '',
    status: '',
  });

  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const showAlert = (color, title, message, status) => {
    setAlertState({
      open: true,
      color,
      title,
      message,
      status,
    });
  };

  const handleVerify = () => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      // Valid email
      setAlertState({
        open: true,
        severity: 'success',
        status: 'Accept All',
        message: `The email "${email}" is valid!`,
        title: 'Verification Result',
      });
    } else {
      // Invalid email
      setAlertState({
        open: true,
        severity: 'error',
        status: 'Undeliverable',
        message: `The email "${email}" is invalid!`,
        title: 'Verification Result',
      });
    }
    setEmail('');
  };

  function calculateStats(allottedCredits, consumedCredits) {
    const remainingCredits = allottedCredits - consumedCredits;
    return {
      allotted: allottedCredits,
      consumed: consumedCredits,
      remaining: remainingCredits,
    };
  }

  const allottedCredits = 10000;
  const consumedCredits = 32;

  const stats = calculateStats(allottedCredits, consumedCredits);

  const [dialogState, setDialogState] = useState({
    singleEmail: false,
    bulkEmail: false,
  });

  const handleMenuItemClick = (type) => {
    setDialogState((prev) => ({
      ...prev,
      [type]: true,
    }));
    handlePopoverClose();
  };

  const handleDialogClose = (type) => {
    setDialogState((prev) => ({
      ...prev,
      [type]: false,
    }));
  };

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            mb: 0,
          }}
        >
          <PageHeader
            title="Dashboard"
            Subheading="Enhance your email list quality with advanced verification tools, reducing bounce rates and maximizing deliverability."
            link_added="https://forum.pabbly.com/forums/general-discussions.39/"
          />
          <Tooltip
            title="Start verifying email addresses from the list."
            arrow
            placement="top"
            disableInteractive
          >
            <Button
              startIcon={<Iconify icon="heroicons:plus-circle-16-solid" />}
              endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
              onClick={handlePopoverOpen}
              color="primary"
              variant="contained"
              size="large"
            >
              Verify Email
            </Button>
          </Tooltip>
        </Box>
        <Box
          width="100%"
          sx={{
            mt: '40px',
            mb: '24px',
            gap: 3,
            display: 'grid',
            flexWrap: 'wrap',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          <StatsCards
            cardtitle="Email Credits Allotted"
            cardstats={stats.allotted}
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
            tooltipTittle="Number of Emails credits alloted to your account."
          />
          <StatsCards
            cardtitle="Email Credits Consumed"
            cardstats={stats.consumed}
            icon_name="Processed.svg"
            icon_color="#10CBF3"
            bg_gradient="#10CBF3"
            tooltipTittle="Number of Emails credits consumed by your account."
          />
          <StatsCards
            cardtitle="Email Credits Remaining"
            cardstats={stats.remaining}
            icon_name="Complete.svg"
            icon_color="#1D88FA"
            bg_gradient="#1D88FA"
            tooltipTittle="Number of Emails credits remaining in your account."
          />
        </Box>
        <Box
          width="100%"
          sx={{
            gap: 3,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'stretch',
          }}
        >
          <Box>
            <FolderCard />
          </Box>
          <Box gap={3}>
            <BigCard
              tooltip="View file upload guidelines for email verification."
              getHelp={false}
              isVideo
              bigcardtitle="Verification Guidelines"
              bigcardsubtitle="Please adhere to the following guidelines when uploading your CSV file:"
              style={style}
              items={items}
              videoLink="https://www.youtube.com/embed/MIcaDmC_ngM?si=EJ1SGtn0tdF96b1y"
              thumbnailName="email-verication-video-thumbnail.jpg"
              keyword="Note:"
              bigcardNote="All data and reports older than 15 days will be permanently removed automatically. For reference, you can Download Sample File to guide you in formatting your data correctly."
              action={
                <Tooltip
                  title="Start verifying email addresses from the list."
                  arrow
                  placement="top"
                  disableInteractive
                >
                  <Button
                    startIcon={<Iconify icon="heroicons:plus-circle-16-solid" />}
                    endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                    onClick={handlePopoverOpen}
                    color="primary"
                    variant="outlined"
                    size="large"
                  >
                    Upload File
                  </Button>
                </Tooltip>
              }
            />
            <Box sx={{ mt: 3 }}>
              <DashboardTable />
            </Box>
          </Box>
        </Box>
      </DashboardContent>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 3,
          flexDirection: { xs: 'column', md: 'row' },
          mt: 3,
        }}
      >
        <Dialog
          open={dialogState.singleEmail}
          onClose={() => handleDialogClose('singleEmail')}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              maxWidth: 'sm',
            },
          }}
        >
          <DialogContent sx={{ p: 0 }}>
            <VerifySingleEmail
              onVerify={() => {
                handleVerify();
                handleDialogClose('singleEmail');
              }}
              email={email}
              setEmail={setEmail}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={dialogState.bulkEmail}
          onClose={() => handleDialogClose('bulkEmail')}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h6">Upload Email List</Typography>
              <Typography mt="4px" fontSize="14px" color="text.secondary">
                Upload the email list you want to verify.{' '}
                <Link href="#" underline="always">
                  Learn more
                </Link>
              </Typography>
            </Box>
            <IconButton onClick={() => handleDialogClose('bulkEmail')}>
              <Iconify icon="eva:close-fill" style={{ cursor: 'pointer' }} />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ pt: 3 }}>
            <Upload setAlertState={setAlertState} />
          </DialogContent>
        </Dialog>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuList>
          <MenuItem onClick={() => handleMenuItemClick('singleEmail')}>
            Verify Single Email
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('bulkEmail')}>Verify Bulk Emails</MenuItem>
        </MenuList>
      </Popover>

      <Snackbar
        open={alertState.open}
        autoHideDuration={2500}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          zIndex: theme.zIndex.modal + 9999,
        }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertState.severity}
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            '& .MuiAlert-icon': {
              color:
                alertState.severity === 'error'
                  ? theme.palette.error.main
                  : theme.palette.success.main,
            },
          }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </>
  );
}
