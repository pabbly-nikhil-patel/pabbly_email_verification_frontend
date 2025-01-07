import React from 'react';

import { Box, Tooltip } from '@mui/material';

// Utility to format the date and time in 24-hour format
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Ensure 24-hour format
  });
};

const DateTime = ({
  createdAt,
  tooltipText,
  color = 'text.disabled', // Default text color
  tooltipPlacement = 'bottom', // New prop for tooltip placement
}) => {
  // New color prop with default value
  if (!createdAt) return null;

  const formattedTime = formatDateTime(createdAt);
  const tooltipContent =
    tooltipText || `Execution Time: ${formattedTime}, (UTC+05:30) Asia/Kolkata`;

  return (
    <Box
      sx={{
        typography: 'body2',
        color, // Use the shorthand syntax
        mt: 0.5,
        whiteSpace: 'nowrap',
      }}
    >
      <Tooltip title={tooltipContent} placement={tooltipPlacement} arrow>
        {formattedTime}
      </Tooltip>
    </Box>
  );
};

export default DateTime;
