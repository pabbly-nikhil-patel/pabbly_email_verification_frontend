import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { Box, Typography } from '@mui/material';

export default function PageHeader({ title, Subheading, link_added }) {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        {Subheading}{' '}
        <Link style={{ color: '#078DEE' }} underline="always" to={link_added}>
          Learn more
        </Link>
      </Typography>
    </Box>
  );
}
