import { useTheme } from '@emotion/react';

import { Box, Link, Typography } from '@mui/material';

export default function PageHeader({ title, Subheading, link_added }) {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        {Subheading}{' '}
        <Link style={{ color: '#078DEE' }} underline="always" href={link_added} target="_blank">
          Learn more
        </Link>
      </Typography>
    </Box>
  );
}
