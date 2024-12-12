import React from 'react';

import { Alert, Box, Button, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';

const COLORS = ['success', 'warning'];

export default function ProgessLinear({ percent }) {
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column', // Stack items vertically
          alignItems: 'center', // Center horizontally
          justifyContent: 'center', // Center verticall
          mb: 1.5,
        }}
      >
        <Alert severity="success" variant="outlined" onClose={() => {}}>
          This is an alert — check it out!
        </Alert>
        <Button color="primary"  sx={{ mt: 2 }}>
          Start Verification
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="overline">Uploading</Typography>
        <Typography variant="subtittle"> 33.33%</Typography>
      </Box>

      <LinearProgress
        color="warning"
        variant="determinate"
        value={percent}
        sx={{
          width: 1,
          height: 6,
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
          [` .${linearProgressClasses.bar}`]: { opacity: 0.8 },
        }}
      />
    </Box>
  );
}
