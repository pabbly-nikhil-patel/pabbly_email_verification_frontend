import React from 'react';
import PropTypes from 'prop-types';

import { Stack, Avatar, Tooltip, AvatarGroup } from '@mui/material';

const AvatarCustom = ({ title, icons = [], totalApps = null }) => (
  <Stack spacing={3} direction="row" alignItems="center">
    <Tooltip title={title} placement="top" arrow>
      <AvatarGroup variant="rounded">
        {/* Map through the icons array and render avatars */}
        {icons.map((icon, index) => (
          <Avatar
            key={index}
            alt={`app-${index}`}
            sx={{
              padding: 1,
              width: '24px',
              height: '24px',
              backgroundColor: '#EDEFF2',
            }}
            src={icon}
          />
        ))}

        {/* Render extra number avatar if totalApps is provided */}
        {totalApps && (
          <Avatar
            alt={totalApps}
            sx={{
              padding: 1,
              width: '24px',
              height: '24px',
              backgroundColor: '#EDEFF2',
              color: '#078dee',
              fontWeight: '900',
            }}
          >
            {totalApps}
          </Avatar>
        )}
      </AvatarGroup>
    </Tooltip>
  </Stack>
);

AvatarCustom.propTypes = {
  title: PropTypes.string, // Tooltip title
  icons: PropTypes.arrayOf(PropTypes.string), // Array of image URLs for the icons
  totalApps: PropTypes.string, // Additional number avatar (e.g., "+4")
};

AvatarCustom.defaultProps = {
  title: 'Integrated applications',
  icons: [],
  totalApps: null,
};

export default AvatarCustom;
