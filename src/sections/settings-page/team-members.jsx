import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { Box, Grid, Button, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
// import { listItems } from 'src/_mock/big-card/_dashboardBigCardListItems';

import { listItems } from 'src/_mock/big-card/_teamMembersBigCardListItems';

import { Iconify } from 'src/components/iconify';
import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';

import { TeamMemberDialog } from '../team-members/hooks/add-team-member';
import SharedbyYouTeamMemberTable from '../team-members/components/shared-by-you-table/team-member-table';
import SharedWithYouTeamMemberTable from '../team-members/components/shared-with-you-table/shared-with-you-table';

// ----------------------------------------------------------------------

const metadata = { title: `Team Members | ${CONFIG.site.name}` };
const { items, style } = listItems;

export default function TeamMembersPage() {
  const [selectedListItem, setSelectedListItem] = useState(0);

  const handleListItemSelect = (index) => {
    setSelectedListItem(index);
  };

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Custom handler to open dialog
  const [isTeamMemberDialogOpen, setDialogOpen] = useState(false);

  const handleConfigureTeamMember = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          // justifyContent: 'space-between',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              mb: 4,

              gap: 3,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
            }}
          >
            {/* Cards Section */}
            <Tooltip title="Team members added by you." arrow placement="top">
              <div>
                <StatsCards
                  cardtitle="Unique Team Members Added"
                  cardstats="20"
                  icon_name="unique.png"
                  icon_color="#1A76FF"
                  bg_gradient="#1A76FF"
                />
              </div>
            </Tooltip>
            <Tooltip
              title="Folder(s) shared by you with team members."
              arrow
              placement="top"
            >
              <div>
                <StatsCards
                  cardtitle="Folders Shared by You"
                  cardstats="10"
                  icon_name="byyou.png"
                  icon_color="#009C53"
                  bg_gradient="#009C53"
                />
              </div>
            </Tooltip>

            <Tooltip
              title="Folder(s) shared with you by admins."
              arrow
              placement="top"
            >
              <div>
                <StatsCards
                  cardtitle="Folders Shared With You"
                  cardstats="1,000"
                  icon_name="sharedwithyou.png"
                  icon_color="#009CBB"
                  bg_gradient="#009CBB"
                />
              </div>
            </Tooltip>
          </Box>
          <Grid xs={12} md={8}>
            <BigCard
               tooltip="View file upload guidelines for email verification."
               getHelp={false}
               isVideo
               bigcardtitle="Points To Remember!"
              //  bigcardsubtitle="Please adhere to the following guidelines when uploading your CSV file:"
               style={style}
               items={items}
               videoLink="https://www.youtube.com/embed/MIcaDmC_ngM?si=EJ1SGtn0tdF96b1y"
               thumbnailName="email-verication-video-thumbnail.jpg"
               keyword="Note:"
               bigcardNote="All data and reports older than 15 days will be permanently removed automatically. For reference, you can Download Sample File to guide you in formatting your data correctly."
               action={
                 <Tooltip
                   title="Start verifying email addresses from the list."
                   arrow
                   placement="top"
                   disableInteractive
                 >
                   <Button
                     startIcon={<Iconify icon="heroicons:plus-circle-16-solid" />}
                     
                  onClick={(()=> setDialogOpen(true))}
                     color="primary"
                     variant="outlined"
                     size="large"
                   >
                     Add Team Member
                   </Button>
                 </Tooltip>
               }/>

            {/* Separate Dialog */}
            <TeamMemberDialog open={isTeamMemberDialogOpen} onClose={() => setDialogOpen(false)} />
          </Grid>
          <SharedbyYouTeamMemberTable />
          <SharedWithYouTeamMemberTable />
        </Box>
      </Box>
    </>
  );
}
