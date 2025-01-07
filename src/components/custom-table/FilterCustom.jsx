import React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Stack,
  Button,
  Tooltip,
  Popover,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';

import { Iconify } from '../iconify';

const FilterComponent = ({
  open,
  anchorEl,
  onClose,
  headerTitle,
  onApplyFilter,
  workflows,
  taskstatus,
  executionstatus,
  workflowexecution,
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  selectedWorkflowName,
  setSelectedWorkflowName,
  selectedTaskStatus,
  setSelectedTaskStatus,
  selectedExecutionStatus,
  setSelectedExecutionStatus,
  footerButtonLabel = 'Apply Filter',
}) => (
  <Popover
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: '100%',
          md: 850,
        },
      }}
    >
      {/* Filter Header */}
      <Box
        sx={{
          borderBottom: '1px dashed #919eab33',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          <Tooltip title="Apply filters to find specific tasks." arrow>
            {headerTitle}
          </Tooltip>
        </Typography>
        <Iconify
          icon="uil:times"
          onClick={onClose}
          sx={{
            width: 20,
            height: 20,
            cursor: 'pointer',
            color: '#637381',
          }}
        />
      </Box>

      {/* Filter Options */}
      <Box sx={{ p: 2 }}>
        {/* Date Range Section */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Date Range</Typography>
          <Stack direction="row" spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                sx={{ width: '50%' }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                sx={{ width: '50%' }}
              />
            </LocalizationProvider>
          </Stack>
        </Box>

        {/* Workflow Name */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Workflow Name</Typography>
          <Autocomplete
            options={workflows}
            value={selectedWorkflowName}
            onChange={(e, value) => setSelectedWorkflowName(value)}
            renderInput={(params) => <TextField {...params} label="Select Workflow" />}
          />
        </Box>

        {/* Task Status */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Task Status</Typography>
          <Autocomplete
            options={taskstatus}
            value={selectedTaskStatus}
            onChange={(e, value) => setSelectedTaskStatus(value)}
            renderInput={(params) => <TextField {...params} label="Select Status" />}
          />
        </Box>

        {/* Execution Status */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Execution Status</Typography>
          <Autocomplete
            options={executionstatus}
            value={selectedExecutionStatus}
            onChange={(e, value) => setSelectedExecutionStatus(value)}
            renderInput={(params) => <TextField {...params} label="Select Execution Status" />}
          />
        </Box>
      </Box>

      {/* Filter Footer */}
      <Box
        sx={{
          borderTop: '1px dashed #919eab33',
          p: 2,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant="contained" onClick={onApplyFilter}>
          {footerButtonLabel}
        </Button>
      </Box>
    </Box>
  </Popover>
);

export default FilterComponent;
