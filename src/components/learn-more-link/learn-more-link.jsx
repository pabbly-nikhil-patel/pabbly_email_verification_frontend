import React from 'react';

import { Link } from '@mui/material'; // Update this import based on your library or framework

const LearnMoreLink = ({ link }) => {
  if (!link) return null; // Render nothing if `link` is not provided

  return (
    <Link
      style={{ color: '#078DEE', cursor: 'pointer' }}
      underline="always"
      href={link} // Use href for external links
      target="_blank" // Opens in a new tab
      rel="noopener noreferrer" // Ensures security for external links
    >
      Learn more
    </Link>
  );
};

export default LearnMoreLink;
