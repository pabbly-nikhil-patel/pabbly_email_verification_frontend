/* eslint-disable consistent-return */
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { Box, Alert, Button, Tooltip, AlertTitle, useMediaQuery } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { listItems } from 'src/_mock/big-card/_dashboardBigCardListItems';

import { Iconify } from 'src/components/iconify';
import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import Upload from 'src/sections/dashboard/component/upload/upload-file';
import UploadDialog from 'src/sections/dashboard/hook/upload-file-dialog';
import { DashboardTable } from 'src/sections/dashboard/component/table/dashboard-table';
import { DashboardChart } from 'src/sections/dashboard/component/chart/dashboard-chart';
import VerifySingleEmail from 'src/sections/dashboard/component/verify-single-email/verify-single-email';

// ----------------------------------------------------------------------

const metadata = { title: `Pabbly Email Verification | Dashboard ` };
const { items, style } = listItems;

export default function Page() {
  const { isUploading } = useSelector((state) => state.fileUpload);
  const [addSubaccountDialogOpen, setAddSubaccountDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const handleAddSubaccountDialogClose = () => setAddSubaccountDialogOpen(false); // State for Add Subaccount dialog

  const [alertState, setAlertState] = useState({
    open: false,
    color: 'success',
    title: '',
    message: '',
    status: '',
  });

  const handleAlertClose = () => {
    setAlertState({
      open: false,
    });
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const buttonClick = () => {
    setAddSubaccountDialogOpen(true);
  };

  const handleAdd = () => {
    setAddSubaccountDialogOpen(false);
  };

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
      console.log(email);
      // Valid email
      setAlertState({
        open: true,
        color: 'success',
        status: 'Accept All',
        message: `The email "${email}" is valid!`,
        title: 'Verification Result',
      });
      setEmail(''); // Reset the text field
    } else {
      // Invalid email
      setAlertState({
        open: true,
        color: 'error',
        status: 'Undeliverable',
        message: `The email "${email}" is invalid!`,
        title: 'Verification Result',
      });
    }

    // Auto-hide the alert after 5 seconds
    setTimeout(() => {
      handleAlertClose();
    }, 3000);
  };
  function calculateStats(allottedCredits, consumedCredits) {
    const remainingCredits = allottedCredits - consumedCredits;
    return {
      allotted: allottedCredits,
      consumed: consumedCredits,
      remaining: remainingCredits,
    };
  }

  const allottedCredits = 10000; // Example value for allotted credits
  const consumedCredits = 32; // Example value for consumed credits

  const stats = calculateStats(allottedCredits, consumedCredits);
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
              Upload File
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
            cardstats={stats.allotted}
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
            tooltipTittle="Number of email verification credit alloted to you"
          />
          <StatsCards
            cardtitle="Email Verification Credits Consumed"
            cardstats={stats.consumed}
            icon_name="Processed.svg"
            icon_color="#10CBF3"
            bg_gradient="#10CBF3"
            tooltipTittle="Number of email verification credit comsumed by you"
          />
          <StatsCards
            cardtitle="Email Verification Credits Remaining"
            cardstats={stats.remaining}
            icon_name="Complete.svg"
            icon_color="#1D88FA"
            bg_gradient="#1D88FA"
            tooltipTittle="Number of email verification credit remaining"
          />
        </Box>
        <Box width="100%">
          <Box>
            <BigCard
              getHelp={false}
              isVideo
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
                  onClick={buttonClick}
                  startIcon={
                    <Iconify
                      icon="heroicons:plus-circle-16-solid"
                      style={{ width: 18, height: 18 }}
                    />
                  }
                  sx={{ mt: 3 }}
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Upload File
                </Button>
              }
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
            mt: 3,
          }}
        >
          <Box sx={{ width: '100%' }}>
            <VerifySingleEmail onVerify={handleVerify} email={email} setEmail={setEmail} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Upload />
          </Box>
        </Box>

        <Box
          sx={{
            mt: 3,
            width: '100%',
            display: 'flex',
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '75%' } }}>
            <DashboardTable />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '25%' } }}>
            <DashboardChart
              showAlert={showAlert}
              handleAlertClose={handleAlertClose}
              title="List_name.csv"
              subheader="Learn more about result codes"
              chart={{
                series: [
                  { label: 'Deliverable', value: 12244 },
                  { label: 'Undeliverable', value: 53345 },
                  { label: 'Accept-all', value: 44313 },
                  { label: 'Unknown', value: 78343 },
                ],
              }}
            />
          </Box>
        </Box>
      </DashboardContent>
      <UploadDialog
        addDialogOpen={addSubaccountDialogOpen}
        handleDialogClose={handleAddSubaccountDialogClose}
        action={
          <Button onClick={handleAdd} variant="contained" color="primary">
            Upload
          </Button>
        }
      />

      {alertState.open && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '10px',
            zIndex: 1000,
            width: '700px',
          }}
        >
          <Alert severity={alertState.color} onClose={handleAlertClose}>
            <AlertTitle sx={{ textTransform: 'capitalize' }}>{alertState.title}</AlertTitle>
            {alertState.message} — <strong>{alertState.status}</strong>
          </Alert>
        </div>
      )}
    </>
  );
}
