// video-playlist-card.jsx


import React, { useState } from 'react';

import { Box, Card, Button } from '@mui/material';

import { CONFIG } from 'src/config-global';
import VideoModal from '../video-modal/video-modal';


export default function VideoPlayListCards({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId,
  videoTime,
  ...other
}) {
  const [isOpen, setOpen] = useState(false);
  const coverSrc = `${CONFIG.site.basePath}/assets/background/${thumbnailimage}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
      }}
      {...other}
    >
      <Box sx={{ pt: 1, px: 1 }}>
        <VideoModal
          thumbnailimage={thumbnailimage}
          videoId={videoId}
          open={isOpen}
          onClose={handleClose}
          onOpen={handleClickOpen}
        />
      </Box>

      <Box sx={{ pt: 2.5, px: 2, ...sx }}>
        <Box
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'text.primary',
            pb: 1.5,
          }}
        >
          {Videotitle}
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            width="105px"
            sx={{ mb: 2 }}
            onClick={handleClickOpen}
          >
            View Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
