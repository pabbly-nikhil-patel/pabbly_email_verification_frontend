import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export function ChartColumnSingle({ chart }) {
  const theme = useTheme();

  const chartColors = [
    hexAlpha(theme.palette.primary.main, 0.8),
    hexAlpha(theme.palette.secondary.main, 0.8),
    hexAlpha(theme.palette.error.main, 0.8),
    hexAlpha(theme.palette.success.main, 0.8),
    hexAlpha(theme.palette.warning.main, 0.8),
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 0 },
    xaxis: { categories: chart.categories },
    tooltip: {
      y: {
        formatter: (value) => `${value} thousands`,
        title: { formatter: () => '' },
      },
    },
    plotOptions: { bar: { columnWidth: '40%', distributed: true } },
  });

  return <Chart type="bar" series={chart.series} options={chartOptions} height={320} />;
}
