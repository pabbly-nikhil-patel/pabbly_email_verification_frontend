import { Box, Card, Typography } from '@mui/material';

import VideoModal from '../video-modal/video-modal';

export default function BigCard({ coverSrc, items, style, action,videoLink ,thumbnailName}) {
  return (
    <Card sx={{ p: 5 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems:'center',
          mb: 0,
        }}
      >
        <Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6">Points To Remember</Typography>
          </Box>
          <Box component="ul" sx={style} mb={2} p={1}>
            {items.map((item, index) => (
              <li key={index}>
                <Typography variant="body2" fontWeight={400} color="#637381">
                  {item}
                </Typography>
              </li>
            ))}
          </Box>
          {action}
        </Box>{' '}
        <Box >
          <VideoModal videoLink={videoLink} thumbnailName={thumbnailName} />
        </Box>
      </Box>
    </Card>
  );
}
