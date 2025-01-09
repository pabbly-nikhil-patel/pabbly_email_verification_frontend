import React from 'react';

import { Stack, Tooltip } from '@mui/material';

import { Label } from '../label';

const StatusLabel = ({ color, tooltip, icon, text }) => (
  <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
    <Tooltip title={tooltip} arrow placement="top">
      <Label variant="soft" color={color} startIcon={icon}>
        {text}
      </Label>
    </Tooltip>
  </Stack>
);

export default StatusLabel;
