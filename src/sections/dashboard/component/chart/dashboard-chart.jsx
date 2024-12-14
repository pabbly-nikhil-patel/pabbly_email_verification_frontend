/* eslint-disable consistent-return */
import { useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import { Box, Link, IconButton, Typography } from '@mui/material';

import { fNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Chart, useChart, ChartLegends } from 'src/components/chart';
import ProgessLinear from 'src/components/progress-bar/progessLinear';

import ChartAlert from './chart-alert';

// ----------------------------------------------------------------------

export function DashboardChart({ title, subheader, chart, ...other }) {
  const { isUploading, isUploaded, isStartVerification, isVerificationCompleted, progress } =
    useSelector((state) => state.fileUpload);
  const theme = useTheme();

  // const isChartVisible = isVerificationCompleted === isUploadCompleted;

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

  return (
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
        <Box>
          <IconButton>
            <Iconify width={24} icon="solar:download-minimalistic-bold" />
          </IconButton>
          <IconButton>
            <Iconify width={24} icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Box>
      </Box>

      {!isUploading && !isUploaded && !isStartVerification && !isVerificationCompleted &&  (
        <>
          <Chart
            type="donut"
            series={chartSeries}
            options={chartOptions}
            width={{ xs: 240, xl: 260 }}
            height={{ xs: 240, xl: 260 }}
            sx={{ my: 6, mx: 'auto' }}
          />
          <ChartLegends
            labels={chartOptions.labels}
            colors={chartOptions.colors}
            sx={{ p: 3, justifyContent: 'center', flexDirection: 'column' }}
          />
        </>
      )}
      {isUploading && <ProgessLinear />}
      {!isUploading && isUploaded && !isStartVerification && <ChartAlert />}
      {isStartVerification && !isVerificationCompleted && <ProgessLinear />}

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}
