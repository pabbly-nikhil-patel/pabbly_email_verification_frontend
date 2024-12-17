import { Box, Card, Typography } from '@mui/material';

import VideoModal from '../video-modal/video-modal';

export default function BigCard({
  getHelp,
  isVideo,
  coverSrc,
  items,
  style,
  action,
  videoLink,
  thumbnailName,
  bigcardtitle,
  bigcardsubtitle,
  showNote = true,
  bigcardNote,
  keyword,
}) {
  return (
    <Card sx={{ p: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 0,
          gap: 3,
        }}
      >
        <Box>
          <Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h6">{bigcardtitle}</Typography>
              <Typography color="#637381" fontSize="14px" mt={1}>
                {bigcardsubtitle}
              </Typography>
            </Box>
            <Box component="ul" sx={style} p={1} pb={2}>
              {items.map((item, index) => (
                <li key={index}>
                  <Typography variant="body2" fontWeight={400} color="#637381">
                    {item}
                  </Typography>
                </li>
              ))}
            </Box>
            {/* {showNote && (
              <Typography color="#637381" fontSize="14px" mt={2} mb={2}>
                <span>
                  <strong>{keyword}&nbsp;</strong>
                  {bigcardNote}
                </span>
              </Typography>
            )} */}

            {action}
          </Box>
        </Box>{' '}
        <Box>
          <VideoModal
            getHelp={getHelp}
            isVideo={isVideo}
            videoLink={videoLink}
            thumbnailName={thumbnailName}
          />
        </Box>
      </Box>
    </Card>
  );
}
