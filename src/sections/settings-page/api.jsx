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

import { listItems } from 'src/_mock/big-card/api';

import { Iconify } from 'src/components/iconify';
import BigCard from 'src/components/big-card/big-card';

// ----------------------------------------------------------------------

const metadata = { title: `Pabbly Email Verification | API ` };

export default function API() {
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const handleCopy = () => {
    navigator.clipboard.writeText(secretvalues.password);
    setOpenSnackbar(true);
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
          action={
            <Tooltip
              title="Start verifying email addresses from the list."
              arrow
              placement="top"
              disableInteractive
            >
              <Button
                startIcon={
                  <Iconify
                    icon="heroicons:plus-circle-16-solid"
                    style={{ width: 18, height: 18 }}
                  />
                }
                sx={{ mt: 3 }}
                variant="outlined"
                color="primary"
                size="large"
              >
                Upload File
              </Button>
            </Tooltip>
          }
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
              type="password"
              value={secretvalues.password}
              helperText='Use the "Copy" button to copy the key securely. Do not share this key with others.'
              InputProps={{
                readOnly: true, // Makes the field read-only
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(secretvalues.password);
                        // Optional: Add a toast notification for successful copy
                      }}
                      edge="end"
                    >
                      <Iconify icon="solar:copy-bold" width={24} />
                    </IconButton>
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
                  letterSpacing: '2px',
                  fontFamily: 'monospace',
                  '&::placeholder': {
                    letterSpacing: '2px',
                  },
                },
              }}
              variant="outlined"
              type="text"
              value={'•'.repeat(16)}
              helperText='Use the "Copy" button to securely copy it. Keep it private and secure.'
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Copy secret key" placement="top">
                      <IconButton onClick={handleCopy} edge="end">
                        <Iconify icon="solar:copy-bold" width={24} />
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
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Secret key copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}
