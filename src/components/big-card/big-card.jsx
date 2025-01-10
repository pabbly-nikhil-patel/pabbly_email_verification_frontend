import { Box, Card, Link, Tooltip, Typography } from '@mui/material';

import VideoModal from '../video-modal/video-modal';

export default function BigCard({
  getHelp,
  isVideo,
  coverSrc,
  items,
  style,
  action,
  videoLink,
  tooltip,
  thumbnailName,
  bigcardtitle,
  bigcardsubtitle,
  showNote = true,
  bigcardNote,
  keyword,
  learnMoreLink = '#', // Added default prop for learn more link
}) {
  return (
    <Card sx={{ p: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 0,
          gap: 3,
        }}
      >
        <Box width="60%">
          <Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h6">
                <Tooltip arrow placement="top" title={tooltip}>
                 <span>
                  {bigcardtitle}

                 </span>
                </Tooltip>
              </Typography>

              <Typography color="#637381" fontSize="14px" fontWeight={500} mt={1}>
                {bigcardsubtitle}
              </Typography>
            </Box>
            <Box component="ul" sx={style} p={1} pb={2}>
              {items.map((item, index) => (
                <li key={index}>
                  <Typography variant="body2" fontWeight={500} color="#637381">
                    {item}{' '}
                    {index === items.length - 1 && (
                      <Link
                        href={learnMoreLink}
                        style={{ color: '#078DEE', cursor: 'pointer' }}
                        underline="always"
                        // Use href for external links
                        target="_blank" // Opens in a new tab
                        rel="noopener noreferrer"
                      >
                       Learn more
                      </Link>
                    )}
                  </Typography>
                </li>
              ))}
            </Box>

            {action}
          </Box>
        </Box>
        <Box >
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