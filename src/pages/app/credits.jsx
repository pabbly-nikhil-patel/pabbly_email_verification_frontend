import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import { Box, useMediaQuery } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import { CreditTable } from 'src/sections/dashboard copy/component/table/credit-table';

// ----------------------------------------------------------------------

const metadata = { title: `Pabbly Email Verification | Credits ` };

export default function ThreePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
            title="Credits Summary"
            Subheading="Monitor your credit activity for email verification with insights into credits added, purchased, used, and available."
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
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          <StatsCards
            cardtitle="Email Verification Credits Allotted"
            cardstats="32"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
            tooltipTittle="Total Emails in the list"
          />
          <StatsCards
            cardtitle="Email Verification Credits Consumed"
            cardstats="10"
            icon_name="Processed.svg"
            icon_color="#10CBF3"
            bg_gradient="#10CBF3"
            tooltipTittle="Total Deliverable Emails in the list"
          />
          <StatsCards
            cardtitle="Email Verification Credits Remaining"
            cardstats="30"
            icon_name="Complete.svg"
            icon_color="#1D88FA"
            bg_gradient="#1D88FA"
            tooltipTittle="Total Undeliverable Emails in the list"
          />
        </Box>
        <CreditTable />
      </DashboardContent>
    </>
  );
}
