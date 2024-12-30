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
  const downloadActions = ['All Result', 'Deliverable', 'Undeliverable'];
  const [dialog, setDialog] = useState({
    open: false,
    mode: '',
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

      alertTimeout = setTimeout(() => {
        handleAlertClose();
      }, 5000);
    } else if (isStartVerification && !hasShownVerificationAlert) {
      showAlert(
        'success',
        'Processing',
        'The email verification is in progress. The Verification in progress button will change to Download button once the verification is complete.',
        'Processing'
      );
      setHasShownVerificationAlert(true);

      alertTimeout = setTimeout(() => {
        handleAlertClose();
      }, 5000);
    }

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

  useEffect(() => {
    if (isVerificationCompleted) {
      setHasShownUploadAlert(false);
      setHasShownVerificationAlert(false);
    }
  }, [isVerificationCompleted]);

  return (
    <>
      <Card {...other}>
        <Box
          sx={{ display: 'flex', justifyContent: 'spaced-between', alignItems: 'center', px: 1 }}
        >
          <CardHeader
            sx={{ width: '100%', px: 2 }}
            title={
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '320px',
                }}
                variant="h6"
              >
                <Tooltip
                  arrow
                  placement="top"
                  disableInteractive
                  title="Summary of email verification results for all lists."
                >
                  All Lists Summary
                </Tooltip>
              </Typography>
            }
            subheader={
              <>
                View summary of all the lists.{' '}
                <Link href="#" target="_blank" rel="noopener noreferrer" underline="always">
                  Learn more
                </Link>
              </>
            }
          />
        </Box>
        <Divider sx={{ mt: 3 }} />

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
              values={[156454, 12244, 43313, 53345, 78343]} // Add the email counts here
              totalEmails={188245}
              sx={{
                py: 2,
                flexDirection: 'column',
                borderTop: '1px dashed',
                borderColor: 'divider',
              }}
            />
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
