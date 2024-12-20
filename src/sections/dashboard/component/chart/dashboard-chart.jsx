/* eslint-disable consistent-return */
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import {
  Box,
  Link,
  Dialog,
  Button,
  Tooltip,
  IconButton,
  Typography,
  DialogTitle,
  ListItemText,
  DialogActions,
  ListItemButton,
} from '@mui/material';

import { fNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Chart, useChart, ChartLegends } from 'src/components/chart';
import ProgessLinear from 'src/components/progress-bar/progessLinear';

import ChartAlert from './chart-alert';

// ----------------------------------------------------------------------

export function DashboardChart({ title, subheader, showAlert, chart, handleAlertClose, ...other }) {
  const { isUploading, isUploaded, isStartVerification, isVerificationCompleted, progress } =
    useSelector((state) => state.fileUpload);
  const theme = useTheme();
  // const dialog = useBoolean();
  const downloadActions = ['All Result', 'Deliverable', 'Undeliverable'];
  const [dialog, setDialog] = useState({
    open: false,
    mode: '', // 'delete' or 'download'
  });

  const [hasShownUploadAlert, setHasShownUploadAlert] = useState(false);
  const [hasShownVerificationAlert, setHasShownVerificationAlert] = useState(false);

  const handleOpen = (mode) => {
    setDialog({ open: true, mode });
  };

  const handleClose = () => {
    setDialog({ open: false, mode: '' });
  };

  const [selectedValue, setSelectedValue] = useState(downloadActions[1]);

  const showChart =
    (!isUploading && !isUploaded && !isStartVerification && !isVerificationCompleted) ||
    isVerificationCompleted;

  const showProgressLinear = isUploading || (isStartVerification && !isVerificationCompleted);

  const showChartAlert =
    !isUploading && isUploaded && !isStartVerification && !isVerificationCompleted;

  const chartColors = chart.colors ?? [
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.info.main,
    theme.palette.warning.main,
  ];

  const chartSeries = chart.series.map((item) => item.value);

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chart.series.map((item) => item.label),
    stroke: { width: 0 },
    tooltip: {
      y: {
        formatter: (value) => fNumber(value),
        title: { formatter: (seriesName) => `${seriesName}` },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            value: { formatter: (value) => fNumber(value) },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              },
            },
          },
        },
      },
    },
    ...chart.options,
  });
  useEffect(() => {
    let alertTimeout;

    if (isUploading && !hasShownUploadAlert) {
      showAlert(
        'info',
        'Notice',
        'The file "Untitled_spreadsheet_-_Sheet1.csv" is under review and will be uploaded in 3-5 minutes. Once the upload is completed, click "Start Verification" to begin the email verification process.',
        'Uploading'
      );
      setHasShownUploadAlert(true);

      // Close the alert after 3 seconds
      alertTimeout = setTimeout(() => {
        handleAlertClose();
      }, 5000);
    } else if (isStartVerification && !hasShownVerificationAlert) {
      showAlert(
        'success',
        'Processing',
        'We have started the cleaning process of list named as Untitled_spreadsheet_-_Sheet1.csv. You will receive an email notification from our end once the cleaning process is done.',
        'Processing'
      );
      setHasShownVerificationAlert(true);

      // Close the alert after 3 seconds
      alertTimeout = setTimeout(() => {
        handleAlertClose();
      }, 5000);
    }

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (alertTimeout) {
        clearTimeout(alertTimeout);
      }
    };
  }, [
    isUploading,
    isStartVerification,
    showAlert,
    handleAlertClose,
    hasShownUploadAlert,
    hasShownVerificationAlert,
  ]);

  // Reset alert states when the process completes
  useEffect(() => {
    if (isVerificationCompleted) {
      setHasShownUploadAlert(false);
      setHasShownVerificationAlert(false);
    }
  }, [isVerificationCompleted]);

  const EMAIL_DETAILS = [
    {
      header: 'Total Emails',
      numberOfEmails: 156454,
      tooltip: 'Total email addresses.',
    },
    {
      header: 'Deliverable Emails',
      numberOfEmails: 12244,
      tooltip: 'The email address exists and accepts emails.',
    },
    {
      header: 'Accept-all Emails',
      numberOfEmails: 43313,
      tooltip:
        'The addresses cannot be verified as their mail server accepts both valid and invalid addresses.',
    },
    {
      header: 'Undeliverable Emails',
      numberOfEmails: 53345,
      tooltip: 'The email address either does not exist or does not accept emails.',
    },
    {
      header: 'Unknown Emails',
      numberOfEmails: 78343,
      tooltip:
        'The emails could not be verified as their mail servers were unreachable during the process. Unknown addresses are tested multiple times from different locations before this result.',
    },
  ];

  return (
    <>
      <Card {...other}>
        <Box
          sx={{ display: 'flex', justifyContent: 'spaced-between', alignItems: 'center', px: 1 }}
        >
          <CardHeader
            sx={{ width: '100%', px: 2 }}
            title={
              <Tooltip arrow placement="top" disableInteractive title={title}>
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '320px',
                  }}
                  variant="h6"
                >
                  {title}
                </Typography>
              </Tooltip>
            }
          />
          {!showChartAlert && !showProgressLinear && showChart && (
            <Box display="flex">
              <Tooltip arrow placement="top" disableInteractive title="Download List">
                <IconButton onClick={() => handleOpen('download')}>
                  <Iconify width={24} icon="solar:download-minimalistic-bold" />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="top" disableInteractive title="Delete List">
                <IconButton onClick={() => handleOpen('delete')}>
                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        {showChart && (
          <>
            <Chart
              type="donut"
              series={chartSeries}
              options={{
                ...chartOptions,
                tooltip: {
                  y: {
                    formatter: (value) => fNumber(value),
                    title: { formatter: (seriesName) => `${seriesName}` },
                  },
                },
              }}
              width={{ xs: 240, xl: 260 }}
              height={{ xs: 240, xl: 260 }}
              sx={{ my: 6, mx: 'auto' }}
            />
            <Divider sx={{ borderStyle: 'dashed' }} />
            <ChartLegends
              labels={chartOptions.labels}
              colors={chartOptions.colors}
              sx={{ py: 2, px: 0, justifyContent: 'center', flexDirection: 'row' }}
            />
            <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />
            <Link
              display="flex"
              justifyContent="center"
              variant="body2"
              target="_blank"
              href="https://forum.pabbly.com/threads/understanding-email-verification-results.23111/"
            >
              Learn more about result codes
            </Link>
            <Box px={4} pb={2} pt={2}>
              {EMAIL_DETAILS.map((email_details) => (
                <React.Fragment key={email_details.header}>
                  {' '}
                  {/* Adding key here */}
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <Box py={1} display="flex" justifyContent="space-between">
                    <Tooltip arrow placement="top" disableInteractive title={email_details.tooltip}>
                      <Typography fontWeight={600}>{email_details.header}</Typography>
                    </Tooltip>
                    <Typography>{email_details.numberOfEmails}</Typography>
                  </Box>
                </React.Fragment>
              ))}
            </Box>
          </>
        )}
        {showChartAlert && <ChartAlert />}
        {showProgressLinear && <ProgessLinear />}
      </Card>
      <Dialog open={dialog.open} onClose={handleClose}>
        <DialogTitle>
          {dialog.mode === 'download' && (
            <>
              <Typography variant="h6">Download Verification Result</Typography>
              <Typography variant="body2">
                Please note all data and reports associated with this list will be permanently
                removed automatically after 15 days.
              </Typography>
            </>
          )}
        </DialogTitle>

        {dialog.mode === 'download' && (
          <Box component="ul" sx={{ mb: 3, listStyleType: 'none', p: 0 }}>
            {downloadActions.map((downloads) => (
              <Box key={downloads} component="li" sx={{ display: 'flex' }}>
                <ListItemButton onClick={() => handleClose()}>
                  <IconButton sx={{ mr: 2 }}>
                    <Iconify width={32} icon="simple-icons:ticktick" />
                  </IconButton>
                  <ListItemText primary={downloads} />
                </ListItemButton>
              </Box>
            ))}
          </Box>
        )}

        {dialog.mode === 'delete' && (
          <>
            <DialogTitle>
              <Typography variant="body2">
                The list &quot;Untitled_spreadsheet_-_Sheet1.csv&quot; will be deleted permanently
                and cannot be recovered back. Do you want to continue?
              </Typography>
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button onClick={() => console.log('Item Deleted')} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
