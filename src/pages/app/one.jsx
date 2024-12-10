import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import { Box, Alert, Button, Tooltip, Snackbar, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { listItems } from 'src/_mock/big-card/_dashboardBigCardListItems';

import { Iconify } from 'src/components/iconify';
import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';
import CustomTable from 'src/components/table/table_view/table';
import DashboardFolder from 'src/components/dashboard-folder/dashboard-folder';

import AddDialog from 'src/sections/one/components/dialog/add-dialog';


// ----------------------------------------------------------------------

const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };
const { items, style } = listItems;

export default function Page() {
  const [addSubaccountDialogOpen, setAddSubaccountDialogOpen] = useState(false);
  const handleAddSubaccountDialogClose = () => setAddSubaccountDialogOpen(false); // State for Add Subaccount dialog
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarState((prev) => ({ ...prev, open: false }));
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
            title="Page Heading"
            Subheading="Subheading of the page showcasing the features of this page in relation to the entire application."
            link_added="#"
          />
          <Tooltip
            title="Click here to add WhatsApp Number."
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
              Add Button
            </Button>
          </Tooltip>
        </Box>
        <Box
          sx={{
            mt: '40px',
            mb: '24px',
            gap: 3,
            display: 'grid',
            flexWrap: 'wrap',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' },
          }}
        >
          <StatsCards
            cardtitle="WhatsApp Message"
            cardstats="10,000"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
          <StatsCards
            cardtitle="WhatsApp Message "
            cardstats="10,000"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
          <StatsCards
            cardtitle="WhatsApp Message"
            cardstats="10,000"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
          <StatsCards
            cardtitle="WhatsApp "
            cardstats="10,000"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
          <StatsCards
            cardtitle="WhatsApp Message"
            cardstats="10,000"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
        </Box>
        <Box display="flex" gap={3} width="100%">
          <Box>
            <DashboardFolder />
          </Box>
          <Box width="100%">
            <Box>
              <BigCard
                buttontitle="Add WhatsApp Number"
                style={style}
                items={items}
                videoLink="https://www.youtube.com/embed/S-gpjyxqRZo?si=RraJU_Q1ht71Pk2T"
                thumbnailName="Pabbly Plus-3-min.png"
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
                    Action Button
                  </Button>
                }
              />
            </Box>
            <Box>
              <CustomTable />
            </Box>
          </Box>
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
    </>
  );
}
