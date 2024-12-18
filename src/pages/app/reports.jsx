import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { Box, Card, Tooltip, CardHeader, useMediaQuery } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import { ReportsBarChart } from 'src/sections/reports/component/chart-view/reports-bar-chart';

// ----------------------------------------------------------------------

const metadata = { title: `Pabbly Email Verification | Reports` };

export default function Page() {
  // Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const selectedListName = useSelector((state) => state.listName.selectedListName);

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
            Subheading="Analyze your email verification data with a clear summary of Unknown, Accept-all, Undeliverable, Deliverable, and Total emails to enhance your email performance."
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
            cardtitle="Total Email"
            cardstats="32"
            icon_name="Processed.svg"
            icon_color="#7D6ADB"
            bg_gradient="#7D6ADB"
            tooltipTittle="Total numbers of Emails in the list"
          />
          <StatsCards
            cardtitle="Deliverable"
            cardstats="10"
            icon_name="2card.png"
            icon_color="#28A645"
            bg_gradient="#28A645"
            tooltipTittle="Total numbers of Deliverable Emails in the list"
          />
          <StatsCards
            cardtitle="Undeliverable"
            cardstats="30"
            icon_name="undeliverable.svg"
            icon_color="#FF5630"
            bg_gradient="#FF5630"
            tooltipTittle="Total numbers of Undeliverable Emails in the list"
          />
          <StatsCards
            cardtitle="Accept-all"
            cardstats="30"
            icon_name="accept-all.svg"
            icon_color="#00B8D9"
            bg_gradient="#00B8D9"
            tooltipTittle="Total numbers of Accept-all Emails in the list"
          />
          <StatsCards
            cardtitle="Unknown"
            cardstats="30"
            icon_name="unknown.svg"
            icon_color="#FFA92E"
            bg_gradient="#FFAB00"
            tooltipTittle="Total numbers of Unknown Emails in the list"
          />
        </Box>
        <Card>
          <CardHeader
            title={
              <Tooltip
                title="Bar chart showing the distribution of your email verification results"
                placement="top"
                arrow
              >
                <span>
                  {selectedListName
                    ? `${selectedListName} - Verification Summary`
                    : 'Verification Summary'}
                </span>
              </Tooltip>
            }
          />
          <ReportsBarChart
            chart={{
              categories: ['Total Emails', 'Deliverable', 'Undeliverable', 'Accept-all', 'Unknown'],
              series: [{ data: [2000, 1200, 300, 1500, 800] }],
            }}
          />
        </Card>
      </DashboardContent>
    </>
  );
}
