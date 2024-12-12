import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export function ChartColumnSingle({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const chartColors = [
    hexAlpha('#7D6ADB', 1),
    hexAlpha('#28A645', 1),
    hexAlpha('#FF5630', 1),
    hexAlpha('#00B8D9', 1),
    hexAlpha('#FFA92E', 1),
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 0 },
    xaxis: { categories: chart.categories },
    legend: {
      show: true,
      markers: {
        shape: 'circle',
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        distributed: true,
      },
    },
  });

  return (
    <Chart
      type="bar"
      series={chart.series}
      options={{
        ...chartOptions,
        tooltip: {
          y: {
            formatter: (value) => `${value} thousands`,
            title: { formatter: () => '' },
          },
        },
      }}
      height={364}
      sx={{ py: 2.5, pl: 1, pr: 2.5 }}
    />
  );
}
