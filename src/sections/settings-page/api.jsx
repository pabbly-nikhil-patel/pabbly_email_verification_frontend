import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Alert,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  CardHeader,
  Typography,
  IconButton,
  CardContent,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { CONFIG } from 'src/config-global';
import { listItems } from 'src/_mock/big-card/api';

import { Iconify } from 'src/components/iconify';
import BigCard from 'src/components/big-card/big-card';

// ----------------------------------------------------------------------

const metadata = { title: `API | ${CONFIG.site.name}` };

export default function API() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Updated alert state management
  const [alertState, setAlertState] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const [apivalues, setapiValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const [secretvalues, setsecretValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const { items, style } = listItems;

  const handleChangeapi = (prop) => (event) => {
    setapiValues({ ...apivalues, [prop]: event.target.value });
  };

  const handleChangesecret = (prop) => (event) => {
    setsecretValues({ ...secretvalues, [prop]: event.target.value });
  };

  const handleShowapiPassword = useCallback(() => {
    setapiValues({ ...apivalues, showPassword: !apivalues.showPassword });
  }, [apivalues]);

  const handleShowsecretPassword = useCallback(() => {
    setsecretValues({ ...secretvalues, showPassword: !secretvalues.showPassword });
  }, [secretvalues]);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertState((prev) => ({ ...prev, open: false }));
  };

  const handleCopy = (type) => {
    if (type === 'api') {
      navigator.clipboard.writeText(apivalues.password);
      setAlertState({
        open: true,
        severity: 'success',
        message: 'API key copied to clipboard!',
      });
    } else {
      navigator.clipboard.writeText(secretvalues.password);
      setAlertState({
        open: true,
        severity: 'success',
        message: 'Secret key copied to clipboard!',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <Box width="100%">
        <BigCard
          tooltip="View file upload guidelines for email verification."
          getHelp={false}
          isVideo
          bigcardtitle="Upload Guidelines"
          bigcardsubtitle="Please adhere to the following guidelines when uploading your CSV file:"
          style={style}
          items={items}
          videoLink="https://www.youtube.com/embed/MIcaDmC_ngM?si=EJ1SGtn0tdF96b1y"
          thumbnailName="email-verication-video-thumbnail.jpg"
          keyword="Note:"
          bigcardNote="All data and reports older than 15 days will be permanently removed automatically. For reference, you can Download Sample File to guide you in formatting your data correctly."
        />
      </Box>
      <Card sx={{ mt: 3 }}>
        <CardHeader
          sx={{
            pt: 3,
            px: 3,
            pb: 2,
          }}
          title={
            <Box display="inline-block">
              <Tooltip title="Easily verify a single email address here." arrow placement="top">
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Pabbly Email Verification API
                </Typography>
              </Tooltip>
            </Box>
          }
          subheader="Check Pabbly Email Verification Api"
        />
        <Divider />
        <CardContent>
          <Box>
            <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
              API Key
            </Typography>
            <TextField
              sx={{ width: '700px' }}
              variant="outlined"
              type="text"
              value="●●●●●●●●●●●●●●●●●●"
              helperText='Use the "Copy" button to copy the key securely. Do not share this key with others.'
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Copy API key" placement="top">
                      <IconButton onClick={() => handleCopy('api')} edge="end">
                        <Iconify icon="solar:copy-bold" width={18} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
              Secret Key
            </Typography>
            <TextField
              sx={{
                width: '700px',
                '& .MuiInputBase-input': {
                  // letterSpacing: '2px',
                  fontFamily: 'monospace',
                  '&::placeholder': {
                    letterSpacing: '2px',
                  },
                },
              }}
              variant="outlined"
              type="text"
              value="●●●●●●●●●●●●●●●●●●"
              helperText='Use the "Copy" button to securely copy it. Keep it private and secure.'
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Copy secret key" placement="top">
                      <IconButton onClick={() => handleCopy('secret')} edge="end">
                        <Iconify icon="solar:copy-bold" width={18} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button variant="contained" sx={{ mt: '24px' }} size="large" color="primary">
            Regenerate
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={alertState.open}
        autoHideDuration={2500}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          zIndex: theme.zIndex.modal + 9999,
        }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertState.severity}
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            '& .MuiAlert-icon': {
              color:
                alertState.severity === 'error'
                  ? theme.palette.error.main
                  : theme.palette.success.main,
            },
          }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </>
  );
}
