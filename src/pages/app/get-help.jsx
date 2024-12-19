import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Tooltip, Typography, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';
import { listItems } from 'src/_mock/big-card/_dashboardBigCardListItems';

import BigCard from 'src/components/big-card/big-card';
import PageHeader from 'src/components/page-header/page-header';

import { VideoPlayList } from 'src/sections/get-help/video-playlist';

const { items, style } = listItems;

// ----------------------------------------------------------------------

const metadata = { title: `Get Help | Pabbly Email Verification` };

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const dialog = useBoolean();
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
            mb: 4,
          }}
        >
          <PageHeader
            title="Help & Tutorials"
            Subheading="Tell us about your problem, and we’ll find you a solution."
            link_added="#"
          />
        </Box>
        <BigCard
          getHelp={false}
          isVideo={false}
          bigcardtitle="Points To Remember!"
          style={style}
          items={items}
          thumbnailName="get-help-photo.png"
          keyword="Note:"
          bigcardNote="All data and reports older than 15 days will be permanently removed automatically. For reference, you can Download Sample File to guide you in formatting your data correctly."
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <Typography variant="h4">Tutorials</Typography>
          <Tooltip
            title="Click here to access over 10000+ detailed tutorials on our YouTube channel."
            arrow
            placement="top"
          >
            <Button
              onClick={dialog.onTrue}
              sx={{ mt: isMobile ? 2 : 0 }}
              size="large"
              variant="outlined"
              color="primary"
              href="https://youtube.com/@pabbly?si=TUdac5e7gpDi3fXX"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Videos
            </Button>
          </Tooltip>
        </Box>
        <VideoPlayList />

        {/* Table */}
      </DashboardContent>
    </>
  );
}
