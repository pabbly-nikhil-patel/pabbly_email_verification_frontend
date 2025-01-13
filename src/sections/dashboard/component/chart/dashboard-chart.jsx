import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import { Box, Alert, Dialog, Button, Tooltip, Typography, DialogTitle } from '@mui/material';

import { fNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Chart, useChart } from 'src/components/chart';
import { ChartLegends } from 'src/components/chart/chart-legends';
import ProgessLinear from 'src/components/progress-bar/progessLinear';
import LearnMoreLink from 'src/components/learn-more-link/learn-more-link';

import ChartAlert from './chart-alert';

export function DashboardChart({ title, subheader, showAlert, chart, handleAlertClose, ...other }) {
  const { isUploading, isUploaded, isStartVerification, isVerificationCompleted, progress } =
    useSelector((state) => state.fileUpload);
  const theme = useTheme();

  const [hasShownUploadAlert, setHasShownUploadAlert] = useState(false);
  const [hasShownVerificationAlert, setHasShownVerificationAlert] = useState(false);
  const [dialog, setDialog] = useState({
    open: false,
    mode: '',
  });
  const [selectedOption, setSelectedOption] = useState('all-results');

  const downloadActions = [
    {
      id: 'all-results',
      itemName: 'All Emails Result ',
      itemIcon: 'material-symbols:check-circle',
    },
    {
      id: 'deliverable',
      itemName: 'Deliverable Emails',
      itemIcon: 'ep:list',
    },
    {
      id: 'undeliverable',
      itemName: 'Undeliverable Emails',
      itemIcon: 'gridicons:cross-circle',
    },
  ];

  // Chart related setup
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

  // Dialog handlers
  const handleOpen = (mode) => {
    setDialog({ open: true, mode });
    setSelectedOption('all-results'); // Reset selection when opening dialog
  };

  const handleClose = () => {
    setDialog({ open: false, mode: '' });
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleDownload = () => {
    console.log(`Downloading ${selectedOption}`);
    handleClose();
  };

  // Alert effects
  useEffect(() => {
    let alertTimeout;

    if (isUploading && !hasShownUploadAlert) {
      showAlert(
        'info',
        'Notice',
        'The file "Untitled_spreadsheet_-_Sheet1" is under review and will be uploaded in 3-5 minutes. Once the upload is completed, click "Start Verification" to begin the email verification process.',
        'Uploading'
      );
      setHasShownUploadAlert(true);
      alertTimeout = setTimeout(handleAlertClose, 5000);
    } else if (isStartVerification && !hasShownVerificationAlert) {
      showAlert(
        'success',
        'Processing',
        'The email verification is in progress. The Verification in progress button will change to Download button once the verification is complete.',
        'Processing'
      );
      setHasShownVerificationAlert(true);
      alertTimeout = setTimeout(handleAlertClose, 5000);
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
    <Box gap={3}>
      <Scrollbar>
        <Card {...other}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              p: 2,
              width: '100%',
            }}
          >
            <CardHeader
              sx={{
                flex: 1,
                p: 0,
              }}
              title={
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '320px', // Adjust the width accordingly
                  }}
                  variant="h6"
                >
                  <Tooltip
                    arrow
                    placement="top"
                    disableInteractive
                    title={`Email List Name: ${title}`}
                  >
                    <span>{title.length > 30 ? `${title.slice(0, 30)}...` : title}</span>
                  </Tooltip>
                </Typography>
              }
            />
            {/* Only show download button when not uploading or processing */}
            {!isUploading && !isStartVerification && isVerificationCompleted && (
              <Tooltip arrow placement="top" disableInteractive title="Click to download report.">
                <Button
                  sx={{ mt: { xs: '10px', sm: '0px' } }}
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpen('download')}
                  startIcon={<Iconify width={24} icon="solar:download-minimalistic-bold" />}
                >
                  Download
                </Button>
              </Tooltip>
            )}
          </Box>
          <Divider />

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
                values={[156454, 12244, 43313, 53345, 78343]}
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
      </Scrollbar>
      <Alert
        sx={{
          mt: 3,
          // mb: 4,
          // color: 'success',
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        }}
        severity="warning"
      >
        All data and reports will be automatically deleted after 15 days. A copy of the report will
        be sent to your registered email before deletion.
      </Alert>

      <Dialog open={dialog.open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box sx={{ position: 'relative' }}>
          {dialog.mode === 'download' && (
            <>
              <DialogTitle sx={{ p: 2 }}>
                <Typography variant="h6">Download Verification Report</Typography>
                {/* <IconButton
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'text.secondary',
                  }}
                >
                  <Iconify icon="eva:close-fill" />
                </IconButton> */}
              </DialogTitle>
              <Divider sx={{ width: '100%', mb: 3 }} />
              <Box sx={{ px: 2 }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(2, 1fr)',
                      sm: 'repeat(3, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                    gap: 2,
                    mb: 4,
                    '& > button': {
                      aspectRatio: '1 / 1',
                      width: '100%',
                      height: 'auto',
                    },
                  }}
                >
                  {downloadActions.map((action) => (
                    <Tooltip
                      key={action.id}
                      title={
                        action.id === 'all'
                          ? 'Select to download the complete list of all verified emails, including deliverable, undeliverable, and unknown statuses.'
                          : action.id === 'deliverable'
                            ? 'Select to download the list of emails verified as valid and deliverable.'
                            : 'Select to download the list of emails that are invalid or undeliverable.'
                      }
                      arrow
                      placement="top"
                    >
                      <Button
                        onClick={() => handleOptionSelect(action.id)}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          p: 2,
                          border: 2,
                          borderColor: selectedOption === action.id ? 'primary.main' : 'divider',
                          borderRadius: 1,
                          bgcolor:
                            selectedOption === action.id ? 'primary.lighter' : 'background.paper',
                          '&:hover': {
                            borderColor:
                              selectedOption === action.id ? 'primary.main' : 'text.secondary',
                            bgcolor:
                              selectedOption === action.id ? 'primary.lighter' : 'action.hover',
                          },
                        }}
                      >
                        <Box>
                          <Iconify
                            icon={action.itemIcon}
                            width={24}
                            sx={{
                              color:
                                selectedOption === action.id ? 'primary.main' : 'text.secondary',
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            mt: 1,
                            color: selectedOption === action.id ? 'primary.main' : 'text.secondary',
                            fontWeight: selectedOption === action.id ? 500 : 400,
                          }}
                        >
                          {action.itemName}
                        </Typography>
                      </Button>
                    </Tooltip>
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  You can download email verification results by selecting one of the three tabs:
                  All Emails, Deliverable Emails, or Undeliverable Emails. Simply choose a tab and
                  click &quot;Download CSV&quot; to obtain the report.
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Note: The verified list and verification reports will be automatically deleted
                  after 15 days.{' '}
                  <LearnMoreLink link="https://forum.pabbly.com/threads/download-verification-report.26396/" />
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 1 }}>
                  <Tooltip
                    title="Click to download report."
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <Button variant="contained" onClick={handleDownload} color="primary">
                      Download CSV
                    </Button>
                  </Tooltip>
                  <Button variant="outlined" onClick={handleClose}>
                    Close
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}
