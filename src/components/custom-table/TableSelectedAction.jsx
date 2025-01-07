import React from 'react';
import PropTypes from 'prop-types';

import { Box, Checkbox, Typography } from '@mui/material';

const TableSelectedAction = ({ dense, numSelected, rowCount, onSelectAllRows, action }) => {
  if (numSelected === 0) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: dense ? 52 : 72,
        left: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        bgcolor: 'primary.lighter',
      }}
    >
      <Checkbox
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={(event) => onSelectAllRows(event.target.checked)}
      />
      <Typography sx={{ ml: 2 }}>{numSelected} selected</Typography>
      <Box sx={{ flexGrow: 1 }} />
      {action}
    </Box>
  );
};

TableSelectedAction.propTypes = {
  dense: PropTypes.bool,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
  action: PropTypes.node,
};

export default TableSelectedAction;
