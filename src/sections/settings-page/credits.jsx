import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import { Box, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';

import StatsCards from 'src/components/stats-card/stats-card';

import { CreditTable } from 'src/sections/dashboard copy/component/table/credit-table';

// ----------------------------------------------------------------------

const metadata = { title: `Credits | ${CONFIG.site.name}` };

export default function ThreePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      {/* <DashboardContent maxWidth="xl"> */}

      <Box
        width="100%"
        sx={{
          mb: 4,
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
          tooltipTittle="Number of credits alloted to your account."
        />
        <StatsCards
          cardtitle="Email Credits Consumed"
          cardstats={stats.consumed}
          icon_name="Processed.svg"
          icon_color="#10CBF3"
          bg_gradient="#10CBF3"
          tooltipTittle="Number of credits consumed by your account."
        />
        <StatsCards
          cardtitle="Email Credits Remaining"
          cardstats={stats.remaining}
          icon_name="Complete.svg"
          icon_color="#1D88FA"
          bg_gradient="#1D88FA"
          tooltipTittle="Number of credits remaining to your account."
        />
      </Box>
      <CreditTable />
      {/* </DashboardContent> */}
    </>
  );
}
