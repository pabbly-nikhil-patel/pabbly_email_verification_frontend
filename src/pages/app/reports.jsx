import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import {
  Box,
  Card,
  Dialog,
  Button,
  Tooltip,
  Divider,
  CardHeader,
  IconButton,
  Typography,
  DialogTitle,
  ListItemText,
  useMediaQuery,
  DialogActions,
  ListItemButton,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import { ReportsBarChart } from 'src/sections/reports/component/chart-view/reports-bar-chart';

// ----------------------------------------------------------------------

const metadata = { title: `Reports | Pabbly Email Verification` };

export default function Page() {
  // Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const selectedListName = useSelector((state) => state.listName.selectedListName);
  const downloadActions = ['All Result', 'Deliverable', 'Undeliverable'];
  const [dialog, setDialog] = useState({
    open: false,
    mode: '', // 'delete' or 'download'
  });

  const handleOpen = (mode) => {
    setDialog({ open: true, mode });
  };

  const handleClose = () => {
    setDialog({ open: false, mode: '' });
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
            title="Reports"
            Subheading="Analyze your email verification data with a clear summary of unknown, accept-all, undeliverable, deliverable, and total emails to enhance your email performance."
            link_added="#"
          />
        </Box>
        <Box
          width="100%"
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
            cardtitle="Total Emails"
            cardstats="32"
            icon_name="Processed.svg"
            icon_color="#7D6ADB"
            bg_gradient="#7D6ADB"
            tooltipTittle="Total numbers of Emails in the list"
          />
          <StatsCards
            cardtitle="Deliverable Emails"
            cardstats="10"
            icon_name="2card.png"
            icon_color="#28A645"
            bg_gradient="#28A645"
            tooltipTittle="Total numbers of Deliverable Emails in the list"
          />
          <StatsCards
            cardtitle="Undeliverable Emails"
            cardstats="30"
            icon_name="undeliverable.svg"
            icon_color="#FF5630"
            bg_gradient="#FF5630"
            tooltipTittle="Total numbers of Undeliverable Emails in the list"
          />
          <StatsCards
            cardtitle="Accept-all Emails"
            cardstats="30"
            icon_name="accept-all.svg"
            icon_color="#00B8D9"
            bg_gradient="#00B8D9"
            tooltipTittle="Total numbers of Accept-all Emails in the list"
          />
          <StatsCards
            cardtitle="Unknown Emails"
            cardstats="30"
            icon_name="unknown.svg"
            icon_color="#FFA92E"
            bg_gradient="#FFAB00"
            tooltipTittle="Total numbers of Unknown Emails in the list"
          />
        </Box>
        <Card>
          <Box display='flex' justifyContent='space-between' flexWrap='wrap' alignItems='center' alignContent='center'>
            <CardHeader
              title={
                <Tooltip
                  title="Bar chart showing the distribution of your email verification results"
                  placement="top"
                  arrow
                >
                  <span>
                    {selectedListName
                      ? `Verification Summary - ${selectedListName} `
                      : 'Verification Summary'}
                  </span>
                </Tooltip>
              }
              subheader="Here you can see the verification summary of the list."
            />
            <Box pt={3} px={3}>

            <Tooltip arrow placement="top" disableInteractive title="Download List">
              <Button variant='outlined' color='primary' onClick={() => handleOpen('download')} startIcon={<Iconify width={24} icon="solar:download-minimalistic-bold" />}>Download Report</Button>
              
            </Tooltip>
            </Box>
          </Box>
          <Divider sx={{ mt: 3 }} />
          <ReportsBarChart
            chart={{
              categories: [
                'Total Emails',
                'Deliverable Emails',
                'Undeliverable Emails',
                'Accept-All Emails',
                'Unknown Emails',
              ],
              series: [{ data: [2000, 1200, 300, 1500, 800] }],
            }}
          />
        </Card>
      </DashboardContent>
      <Dialog open={dialog.open} onClose={handleClose}>
        <DialogTitle>
          {dialog.mode === 'download' && (
            <>
              <Typography variant="h6">Download Verification Result</Typography>
              <Typography variant="body2">
                Please note all data and reports associated with this list will be permanently
                removed automatically after 15 days.
              </Typography>
            </>
          )}
        </DialogTitle>

        {dialog.mode === 'download' && (
          <Box component="ul" sx={{ mb: 3, listStyleType: 'none', p: 0 }}>
            {downloadActions.map((downloads) => (
              <Box key={downloads} component="li" sx={{ display: 'flex' }}>
                <ListItemButton onClick={() => handleClose()}>
                  <IconButton sx={{ mr: 2 }}>
                    <Iconify width={32} icon="simple-icons:ticktick" />
                  </IconButton>
                  <ListItemText primary={downloads} />
                </ListItemButton>
              </Box>
            ))}
          </Box>
        )}

        {dialog.mode === 'delete' && (
          <>
            <DialogTitle>
              <Typography variant="body2">
                The list &quot;Untitled_spreadsheet_-_Sheet1.csv&quot; will be deleted permanently
                and cannot be recovered back. Do you want to continue?
              </Typography>
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button onClick={() => console.log('Item Deleted')} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
