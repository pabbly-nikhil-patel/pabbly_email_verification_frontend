import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Alert,
  Button,
  Dialog,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  CardHeader,
  Typography,
  IconButton,
  DialogTitle,
  CardContent,
  DialogActions,
  DialogContent,
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

  // Dialog and Snackbar states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);

  // Alert state management
  const [alertState, setAlertState] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  // Form values state
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

  // Handlers for form inputs
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

  // Alert handlers
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertState((prev) => ({ ...prev, open: false }));
  };

  // Copy handlers
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

  // Dialog handlers
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Snackbar handlers
  const handleShareSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setShareSnackbarOpen(false);
  };

  // Generate token handler
  const handleGenerateToken = () => {
    handleDialogClose();
    // Add your token generation logic here
    setShareSnackbarOpen(true);
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
          bigcardtitle="Points To Remember"
          bigcardsubtitle="Please adhere to the following guidelines when uploading your CSV file:"
          style={style}
          items={items}
          videoLink="https://www.youtube.com/embed/MIcaDmC_ngM?si=EJ1SGtn0tdF96b1y"
          thumbnailName="email-verication-video-thumbnail.jpg"
          keyword="Note:"
          learnMoreLink='https://forum.pabbly.com/threads/api.26313/'
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
                  API
                </Typography>
              </Tooltip>
            </Box>
          }
          // subheader="Check Pabbly Email Verification Api"
        />
        <Divider />
        <CardContent>
          <Box>
            {/* <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
              API Key
            </Typography> */}
            <TextField
            fullWidth
              variant="outlined"
              type="text"
              label='API Key'
              value="●●●●●●●●●●●●●●●●●●"
              helperText={
                <>
                  Use the &apos;Copy&apos; button to securely copy it. Keep it private and don&apos;t share with others.{' '}
                  <a href="https://forum.pabbly.com/threads/api.26313/" target="_blank"
                  rel="noopener noreferrer" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                    Learn more
                  </a>
                </>
              }
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Copy API key" placement="top" arrow>
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
            {/* <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
              Secret Key
            </Typography> */}
            <TextField
            fullWidth
              variant="outlined"
              label="Secret Key"
              type="text"
              value="●●●●●●●●●●●●●●●●●●"
              helperText={
                <>
                  Use the &apos;Copy&apos; button to securely copy it. Keep it private and don&apos;t share with others.{' '}
                  <a href="https://forum.pabbly.com/threads/api.26313/" target="_blank"
                  rel="noopener noreferrer" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                    Learn more
                  </a>
                </>
              }
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Copy secret key" placement="top" arrow>
                      <IconButton onClick={() => handleCopy('secret')} edge="end">
                        <Iconify icon="solar:copy-bold" width={18} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: '24px' }}
            onClick={handleDialogOpen}
          >
            Generate Key 
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Generate Key </DialogTitle>
        <DialogContent>
          <Typography>
            Generating a new API and Secret key will invalidate your current key. Do you want to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGenerateToken} variant="contained" color="primary" autoFocus>
            Generate Key
          </Button>
          <Button onClick={handleDialogClose} color="inherit" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alerts and Snackbars */}
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

      <Snackbar
        open={shareSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleShareSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
        }}
      >
        <Alert
          onClose={handleShareSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          API key Generated Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
