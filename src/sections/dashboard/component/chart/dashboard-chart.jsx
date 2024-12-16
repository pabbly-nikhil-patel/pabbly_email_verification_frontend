/* eslint-disable consistent-return */
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import {
  Box,
  Link,
  Dialog,
  Button,
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
    if (isUploading) {
      showAlert(
        'info',
        'Notice',
        'The file "Untitled_spreadsheet_-_Sheet1.csv" is under review and will be uploaded in 3-5 minutes. Once the upload is completed, click "Start Verification" to begin the email verification process.',
        'Uploading'
      );
    } else if (isStartVerification) {
      showAlert(
        'success',
        'Processing',
        'We have started the cleaning process of list named as Untitled_spreadsheet_-_Sheet1.csv. You will receive an email notification from our end once the cleaning process is done.',
        'Processing'
      );
    } else if (isUploaded) {
      // Close the alert automatically when both `isUploading` and `isProcessing` are false
      handleAlertClose();
    }
  }, [isUploading, isStartVerification, showAlert, isUploaded, handleAlertClose]);

  return (
    <>
      <Card {...other}>
        <Box sx={{ display: 'flex', justifyContent: 'spaced-between', alignItems: 'center' }}>
          <CardHeader
            title={<Typography variant="h6">{title}</Typography>}
            subheader={
              <Link variant="body2" href="#">
                {subheader}
              </Link>
            }
          />
          {!showChartAlert && !showProgressLinear && showChart && (
            <Box>
              <IconButton onClick={() => handleOpen('download')}>
                <Iconify width={24} icon="solar:download-minimalistic-bold" />
              </IconButton>
              <IconButton onClick={() => handleOpen('delete')}>
                <Iconify width={24} icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Box>
          )}
        </Box>

        {showChart && (
          <>
            <Chart
              type="donut"
              series={chartSeries}
              options={chartOptions}
              width={{ xs: 240, xl: 260 }}
              height={{ xs: 240, xl: 260 }}
              sx={{ my: 6, mx: 'auto' }}
            />
            <Divider sx={{ borderStyle: 'dashed' }} />
            <ChartLegends
              labels={chartOptions.labels}
              colors={chartOptions.colors}
              sx={{ p: 3, justifyContent: 'center', flexDirection: 'column' }}
            />
          </>
        )}
        {showChartAlert && <ChartAlert />}
        {showProgressLinear && <ProgessLinear />}
      </Card>
      <Dialog open={dialog.open} onClose={handleClose}  >
        <DialogTitle>
          {dialog.mode === 'download' ? (
            <>
              <Typography variant="h6">Download Verification Result</Typography>
              <Typography variant="body2">
                Please note all data and reports associated with this list will be permanently
                removed automatically after 15 days.
              </Typography>
            </>
          ) : (
            <Typography variant="h6">Confirm Deletion</Typography>
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
              <Typography variant='body2'>
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
