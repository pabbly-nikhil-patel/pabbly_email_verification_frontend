import { memo, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Card, Dialog, Tooltip, IconButton } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

function ModalVideoView({
  getHelp=true,
  hideBackground,
  sx,
  videoLink,
  thumbnailName,
  isVideo = true,
  ...other
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imageSrc=`${CONFIG.site.basePath}/assets/images/${getHelp===false?'big-card-thumbhnails':'get-help-video-thumbnails'}/${thumbnailName}`
  
  return (
    <Box style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      {isVideo === true ? (
        <Tooltip disableInteractive title="Click to watch tutorial." arrow placement="top">
          <div>
          <Card onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
            <img
              width="100%"
              src={imageSrc}
              alt="Background"
            />
          </Card>
          <IconButton
            aria-label="play"
            onClick={handleClickOpen}
            sx={{
             
              padding: '0px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
             
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'translate(-50%, -50%) scale(1)',
                  boxShadow: '0 0 0 0 rgba(7, 141, 238, 0.7)',
                },
                '70%': {
                  transform: 'translate(-50%, -50%) scale(1.1)',
                  boxShadow: '0 0 0 10px rgba(7, 141, 238, 0)',
                },
                '100%': {
                  transform: 'translate(-50%, -50%) scale(1)',
                  boxShadow: '0 0 0 0 rgba(7, 141, 238, 0)',
                },
              },
            }}
          >
         <img width={50} src={`${CONFIG.site.basePath}/assets/icons/play-icons/play-icon.svg`} alt='sdsd'/>
          </IconButton>
          </div>
        </Tooltip>
      ) : (
        <Card>
          <img
            width="100%"
            src={imageSrc}
            alt="Background"
          />
        </Card>
      )}

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{ '& .MuiDialog-paper': { width: 1060, height: { xs: 224, md: 600 } } }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 5, right: 0, zIndex: 1, color: '#ffffff' }}
        >
          <Iconify icon="uil:times" style={{ width: 20, height: 20, cursor: 'pointer' }} />
        </IconButton>
        <Box
          component="iframe"
          src={videoLink} // Replace with your video ID
          sx={{ width: '100%', height: '100%', border: 'none' }}
        />
      </Dialog>
    </Box>
  );
}

export default memo(ModalVideoView);
