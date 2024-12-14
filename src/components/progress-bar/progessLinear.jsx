import React, { useState, useEffect } from 'react';

import { Box, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';


export default function ProgessLinear() {
  const [percent, setPercent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false); // State to track 100% completion
  const [isVerificationStarted, setIsVerificationStarted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isUploadCompleted, setisUploadCompleted] = useState(false);
  const [isVerificationCompleted, setisVerificationCompleted] = useState(false);

  useEffect(() => {
    const handleStartVerification = () => {
      setPercent(0); // Reset progress
      setIsCompleted(false); // Reset completion state
      setisVerificationCompleted(true); // Indicate that verification has started
    };

    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent >= 100) {
          clearInterval(interval);
          setIsCompleted(true); // Set completion state when progress reaches 100%
          return 100; // Stop at 100%
        }
        return prevPercent + 1; // Increment percentage
      });
    }, 100); // Adjust speed (100ms per 1%)

    if (isVerificationStarted) {
      handleStartVerification(); // Trigger reset and restart progress if verification starts
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isVerificationStarted]); // Re-run effect when verification state changes

  return (
    <Box sx={{ p: 3 }}>
      <>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant="overline">
            {' '}
            {isVerificationStarted ? 'Processing' : 'Uploading'}
          </Typography>
          <Typography variant="subtitle1">{`${percent.toFixed(2)}%`}</Typography>
        </Box>

        <LinearProgress
          color={isVerificationStarted ? 'success' : 'warning'}
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
    </Box>
  );
}
