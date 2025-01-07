import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';

const DeleteAction = ({ onDelete, tooltipTitle }) => (
  <Tooltip title={tooltipTitle} placement="bottom" arrow>
    <IconButton color="primary" onClick={onDelete}>
      <Iconify icon="solar:trash-bin-trash-bold" />
    </IconButton>
  </Tooltip>
);

DeleteAction.propTypes = {
  onDelete: PropTypes.func.isRequired, // Function to handle the delete action
  tooltipTitle: PropTypes.string.isRequired, // Dynamic tooltip text
};

export default DeleteAction;
