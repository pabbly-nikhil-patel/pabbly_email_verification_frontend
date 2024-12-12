import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import { Box, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';
// ----------------------------------------------------------------------

const metadata = { title: `Page Two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  // Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [addSubaccountDialogOpen, setAddSubaccountDialogOpen] = useState(false);

  // Handlers
  const handleAddSubaccountDialogClose = () => setAddSubaccountDialogOpen(false);
  const buttonClick = () => setAddSubaccountDialogOpen(true);

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
          />
          <StatsCards
            cardtitle="Deliverable"
            cardstats="10"
            icon_name="2card.png"
            icon_color="#28A645"
            bg_gradient="#28A645"
          />
          <StatsCards
            cardtitle="Undeliverable"
            cardstats="30"
            icon_name="undeliverable.svg"
            icon_color="#FF5630"
            bg_gradient="#FF5630"
          />
          <StatsCards
            cardtitle="Accept-all"
            cardstats="30"
            icon_name="accept-all.svg"
            icon_color="#00B8D9"
            bg_gradient="#00B8D9"
          />
          <StatsCards
            cardtitle="Unknown"
            cardstats="30"
            icon_name="unknown.svg"
            icon_color="#FFA92E"
            bg_gradient="#FFAB00"
          />
        </Box>
      </DashboardContent>
    </>
  );
}
