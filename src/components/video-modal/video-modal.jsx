import { memo, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Card, Dialog, Tooltip, IconButton } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

function ModalVideoView({ hideBackground, sx,videoLink, thumbnailName,...other }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <Tooltip disableInteractive title="Click to watch tutorial." arrow placement="top">
        <Card  onClick={handleClickOpen} sx={{cursor:'pointer'}}>
          <img
          width='100%'
            src={`${CONFIG.site.basePath}/assets/images/big-card-thumbhnails/${thumbnailName}`}
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
            color: '#078DEE',
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
          <Iconify icon="icon-park-solid:play" width={50} height={50} />
        </IconButton>
      </Tooltip>


      {/* Dialog */}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{ '& .MuiDialog-paper': { width: 1060, height:{xs: 224,md:600} } }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 5, right:0, zIndex: 1, color:'#ffffff' }}
        >
       <Iconify
         
          icon="uil:times"
          style={{ width: 20, height: 20, cursor: 'pointer', }}
        />
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
