/* eslint-disable consistent-return */
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import {
  Box,
  Grid,
  Alert,
  Button,
  Tooltip,
  Snackbar,
  AlertTitle,
  useMediaQuery,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { listItems } from 'src/_mock/big-card/_dashboardBigCardListItems';

import { Iconify } from 'src/components/iconify';
import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';
import CustomTable from 'src/components/table/table_view/table';

import AddDialog from 'src/sections/one/components/dialog/add-dialog';
import Upload from 'src/sections/dashboard/component/upload/upload-file';
import { AppCurrentDownload } from 'src/sections/dashboard/component/chart/app-current-download';
import VerifySingleEmail from 'src/sections/dashboard/component/verify-single-email/verify-single-email';

// ----------------------------------------------------------------------

const metadata = { title: `Pabbly Email Verification | Dashboard ` };
const { items, style } = listItems;

export default function Page() {
  const [addSubaccountDialogOpen, setAddSubaccountDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [alertInfo, setAlertInfo] = useState(null);
  const handleAddSubaccountDialogClose = () => setAddSubaccountDialogOpen(false); // State for Add Subaccount dialog
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [alertState, setAlertState] = useState({
    open: false,
    color: 'success',
    title: '',
    message: '',
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarState((prev) => ({ ...prev, open: false }));
  };

  const handleAlertClose = () => {
    setAlertState((prev) => ({ ...prev, open: false }));
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const buttonClick = () => {
    setAddSubaccountDialogOpen(true);
  };

  const handleAdd = () => {
    // Validate fields

    // Only proceed if no validation errors

    setSnackbarState({
      open: true,
      message: 'Successfull messgae',
      severity: 'success',
    });

    setAddSubaccountDialogOpen(false);
  };

  const handleVerify = () => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      // Valid email
      setAlertState({
        open: true,
        color: 'success',
        title: 'Accept All',
        message: `The email "${email}" is valid!`,
      });
      setEmail(''); // Reset the text field
    } else {
      // Invalid email
      setAlertState({
        open: true,
        color: 'error',
        title: 'Undeliverable',
        message: `The email "${email}" is invalid!`,
      });
    }

    // Auto-hide the alert after 5 seconds
    setTimeout(() => {
      handleAlertClose();
    }, 5000);
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
            link_added="#"
          />
          <Tooltip
            title="Click here to Upload the csv file which contains the emails list."
            arrow
            placement="top"
            disableInteractive
          >
            <Button
              onClick={buttonClick}
              sx={{ mt: isMobile ? 2 : 0 }}
              startIcon={
                <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
              }
              size="large"
              variant="contained"
              color="primary"
            >
              Upload
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
            cardtitle="Email Verification Credits Allotted"
            cardstats="10"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
          <StatsCards
            cardtitle="Email Verification Credits Consumed"
            cardstats="32"
            icon_name="Processed.svg"
            icon_color="#10CBF3"
            bg_gradient="#10CBF3"
          />
          <StatsCards
            cardtitle="Email Verification Credits Remaining"
            cardstats="30"
            icon_name="Complete.svg"
            icon_color="#1D88FA"
            bg_gradient="#1D88FA"
          />
        </Box>
        <Box width="100%">
          <Box>
            <BigCard
              bigcardtitle="Upload Guidelines"
              bigcardsubtitle="Please adhere to the following guidelines when uploading your CSV file:"
              style={style}
              items={items}
              videoLink="https://www.youtube.com/embed/S-gpjyxqRZo?si=RraJU_Q1ht71Pk2T"
              thumbnailName="dashboard-big-card-thumbnail.png"
              keyword="Note:"
              bigcardNote="All data and reports older than 15 days will be permanently removed automatically. For reference, you can Download Sample File to guide you in formatting your data correctly."
              action={
                <Button
                  startIcon={
                    <Iconify
                      icon="heroicons:plus-circle-16-solid"
                      style={{ width: 18, height: 18 }}
                    />
                  }
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Upload
                </Button>
              }
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', gap: 3 }}>
          <Box sx={{ width: '50%' }}>
            <Upload />
          </Box>
          <Box sx={{ width: '50%' }}>
            <VerifySingleEmail onVerify={handleVerify} email={email} setEmail={setEmail} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box>
            <CustomTable />
          </Box>
          <Grid xs={12} md={6} lg={4} mt={3}>
            <AppCurrentDownload
              title="Current download"
              subheader="Downloaded by operating system"
              chart={{
                series: [
                  { label: 'Mac', value: 12244 },
                  { label: 'Window', value: 53345 },
                  { label: 'iOS', value: 44313 },
                  { label: 'Android', value: 78343 },
                ],
              }}
            />
          </Grid>
        </Box>
      </DashboardContent>
      <AddDialog
        addDialogOpen={addSubaccountDialogOpen}
        handleDialogClose={handleAddSubaccountDialogClose}
        action={
          <Button onClick={handleAdd} variant="contained" color="primary">
            Action
          </Button>
        }
      />
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          // mt: 13,
          zIndex: theme.zIndex.modal + 9999,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity}
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary, // Keeping text color consistent
            '& .MuiAlert-icon': {
              color:
                snackbarState.severity === 'error'
                  ? theme.palette.error.main
                  : theme.palette.success.main,
            },
          }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>

      {alertState.open && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '10px',
            zIndex: 1000,
          }}
        >
          <Alert severity={alertState.color} onClose={handleAlertClose}>
            <AlertTitle sx={{ textTransform: 'capitalize' }}>Verification Result</AlertTitle>
            {alertState.message} — <strong>{alertState.title}</strong>
          </Alert>
        </div>
      )}
    </>
  );
}
