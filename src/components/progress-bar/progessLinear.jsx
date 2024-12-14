import React, { useState, useEffect } from 'react';

import { Box, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';

import ChartAlert from 'src/sections/dashboard/component/chart/chart-alert';


export default function ProgessLinear() {
  const [percent, setPercent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false); // State to track 100% completion

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent >= 100) {
          clearInterval(interval);
          setIsCompleted(true); // Set completion state when progress reaches 100%
          return 100; // Stop at 100%
        }
        return prevPercent + 1; // Increment percentage
      });
    }, 50); // Adjust speed (50ms per 1%)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {!isCompleted ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="overline">Uploading</Typography>
            <Typography variant="subtitle1">{`${percent.toFixed(2)}%`}</Typography>
          </Box>

          <LinearProgress
            color="warning"
            variant="determinate"
            value={percent}
            sx={{
              width: 1,
              height: 8,
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
              [`& .${linearProgressClasses.bar}`]: { opacity: 0.8 },
            }}
          />
        </>
      ) : (
        <ChartAlert /> // Render ChartAlert when progress is 100%
      )}
    </Box>
  );
}
