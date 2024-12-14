

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Tooltip, Typography, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';
import { VideoPlayList } from 'src/sections/get-help/video-playlist';




// ----------------------------------------------------------------------

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const dialog = useBoolean();
  return (
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

    
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mt: 4,
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
            href="https://www.youtube.com/playlist?list=PLgffPJ6GjbaJBSp44lsF-7Mm5rtg9SvCP"
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
  );
}
