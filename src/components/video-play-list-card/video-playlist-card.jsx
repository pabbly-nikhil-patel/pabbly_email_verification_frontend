// video-playlist-card.jsx

import React from 'react';

import { Box, Card } from '@mui/material';

import VideoModal from '../video-modal/video-modal';

export default function VideoPlayListCards({
  sx,
  Videotitle,
  cardstats,
  thumbnailname,
  buttonText,
  videoId,
  videoTime,
  ...other
}) {


  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
      }}
      {...other}
    >
      <Box sx={{ pt: 1, px: 1 }}>
        <VideoModal videoLink={videoId} getHelp thumbnailName={thumbnailname} />
      </Box>

      <Box sx={{ pt: 2.5, px: 2, ...sx }}>
        <Box
          sx={{
            fontSize: '14px',
            fontWeight: '700',
            color: 'text.primary',
            pb: 1.5,
          }}
        >
          {Videotitle}
        </Box>
      </Box>
    </Card>
  );
}
