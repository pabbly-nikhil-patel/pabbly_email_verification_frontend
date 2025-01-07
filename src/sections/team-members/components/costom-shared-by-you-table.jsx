import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Button,
  Tooltip,
  Divider,
  MenuList,
  MenuItem,
  IconButton,
  useMediaQuery,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import DateTime from 'src/components/custom-table/DateTime';
import CustomTable from 'src/components/custom-table/custom-table copy';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { TeamMemberDialog } from '../hooks/add-team-member';

// DeleteAction component
const DeleteAction = ({ onDelete }) => (
  <Tooltip title="Remove the selected access." placement="bottom" arrow>
    <IconButton color="primary" onClick={onDelete}>
      <Iconify icon="solar:trash-bin-trash-bold" />
    </IconButton>
  </Tooltip>
);

const workflows_folders_you_shareds = [
  'Client (A)',
  'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment or Add Lead in Salesforce on New Google Form Submission',
  'Create Invoice in QuickBooks after Stripe Payment',
  'Update Customer in Hubspot on New Sale in Shopify',
  'Main Folder',
];

// Custom tooltips for specific rows
const getWorkflowTooltip = (rowData) => {
  if (rowData.id === 'workflow-0') {
    return 'Folder Name: Client (A)';
  }
  if (rowData.id === 'workflow-5') {
    return 'Folder Name: Main Folder';
  }

  return `Workflow Name: ${rowData.workflows_folders_you_shared}`;
};

// Column definitions
const getTableColumns = () => [
  {
    id: 'sno',
    label: (
      <Tooltip title="Serial Number" arrow placement="top">
        <span
          style={{
            maxWidth: '250px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          S.No
        </span>
      </Tooltip>
    ),
    render: (row) => (
      <Box
        sx={{
          color: 'text.primary',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 250,
        }}
      >
        <Tooltip title={`Serial Number: ${row.sno}`} placement="top" arrow>
          {row.sno}
        </Tooltip>
      </Box>
    ),
  },

  /* Team Member Email */
  {
    id: 'workflowName',
    label: (
      <Tooltip title="Name of the workflow or folder shared." arrow placement="top">
        <span
          style={{
            maxWidth: '250px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Workflows and Folders You’ve Shared
        </span>
      </Tooltip>
    ),
    render: (row) => (
      <Box
        sx={{
          color: 'text.primary',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 250,
        }}
      >
        <Tooltip title={`Email: ${row.name}`} placement="top" arrow>
          {row.name}
        </Tooltip>
      </Box>
    ),
  },

  /* Workflows and Folders You've Shared  */
  {
    id: 'workflows_and_folders',
    label: (
      <Tooltip title="Name of the workflow or folder shared." arrow placement="top">
        <span
          style={{
            maxWidth: '500px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Workflows and Folders You’ve Shared
        </span>
      </Tooltip>
    ),
    render: (row) => (
      <Box
        sx={{
          color: 'text.primary',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 550,
        }}
      >
        <Tooltip title={getWorkflowTooltip(row)} placement="bottom" arrow>
          {row.workflows_folders_you_shared}
        </Tooltip>
      </Box>
    ),
  },

  /* Date and time when the workflow or folder was shared. */
  {
    id: 'shared_on',
    label: (
      <Tooltip title="Date and time when the workflow or folder was shared." arrow placement="top">
        <span className="truncate max-w-[120px]"> Shared On</span>
      </Tooltip>
    ),
    render: (row) => (
      <DateTime
        createdAt={row.date}
        tooltipText={`Execution Time: ${row.date}, (UTC+05:30) Asia/Kolkata`}
        tooltipPlacement="top" // Custom tooltip placement
        color="text.primary" // Custom color
      />
    ),
  },
];

// RowOptions component
const RowOptions = ({ row, actions }) => {
  const popover = usePopover();

  return (
    <>
      <Tooltip title="Click to see options." arrow placement="top">
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Tooltip>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          {actions.map((action, index) =>
            action.type === 'divider' ? (
              <Divider key={`divider-${index}`} sx={{ borderStyle: 'dashed', my: 1 }} />
            ) : (
              <Tooltip key={action.label} title={action.tooltip} arrow placement="left">
                <MenuItem
                  onClick={() => {
                    action.onClick(row);
                    popover.onClose();
                  }}
                  sx={{ color: action.color || 'text.primary', gap: 1 }}
                >
                  <Iconify icon={action.icon} />
                  {action.label}
                </MenuItem>
              </Tooltip>
            )
          )}
        </MenuList>
      </CustomPopover>
    </>
  );
};

// CustomToolbarButtons component
const CustomToolbarButtons = () => {
  // State for dialog
  const [teamMemberDialogOpen, setTeamMemberDialogOpen] = useState(false);

  // Dialog Handlers
  const handleTeamMemberDialogOpen = () => setTeamMemberDialogOpen(true);
  const handleTeamMemberDialogClose = () => setTeamMemberDialogOpen(false);

  // Media query
  const isBelow600px = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const toolbarbuttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    padding: '0 16px',
  };

  return (
    <>
      <Tooltip
        title="Add a team member and share workflow(s) or folder(s) with them."
        arrow
        placement="top"
      >
        <Button
          sx={{
            ...toolbarbuttonStyle,
            width: isBelow600px ? '188px' : '188px',
          }}
          size="large"
          color="primary"
          onClick={handleTeamMemberDialogOpen} // Open TeamMemberDialog
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
        >
          Add Team Member
        </Button>
      </Tooltip>

      <TeamMemberDialog
        open={teamMemberDialogOpen}
        onClose={handleTeamMemberDialogClose}
        title="Add Team Member"
        content="Define your team member details."
      />
    </>
  );
};

export function CustomSharedbyYouTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const tableColumns = getTableColumns();
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [filters, setFilters] = useState({
    state: {
      name: '',
      status: 'all',
    },
    setState: (newState) =>
      setFilters((prev) => ({ ...prev, state: { ...prev.state, ...newState } })),
  });

  const rows = [
    {
      id: 1,
      status: 'Success',
      sno: '1',
      date: 'Dec 18, 2024 10:35:35',
      name: 'anand.nayak@pabbly.com',
      folderName: 'Home',
      stepsWorkflow: 'Steps Workflow',
      workflows_folders_you_shared:
        'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
    },
    {
      id: 2,
      status: 'Success',
      sno: '1',
      date: 'Dec 18, 2024 10:35:35',
      name: 'nayak.anand@gmail.com',
      folderName: 'Home',
      stepsWorkflow: 'Steps Workflow',
      workflows_folders_you_shared:
        'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment',
    },
  ];

  /* RowOptions actions */
  const actions = (row) => [
    {
      label: 'Delete',
      icon: 'solar:trash-bin-trash-bold',
      onClick: (rowData) => console.log('Deleting task:', rowData),
      tooltip: 'Delete this task',
      color: 'error.main',
    },
  ];

  const handleRefresh = () => {
    console.log('Refreshing data...');
    // Add your refresh logic here
  };

  const handleFilterButtonClick = () => {
    setIsFilterApplied(!isFilterApplied);
  };

  const handleFilterIconClick = (e) => {
    e.stopPropagation();
    setIsFilterApplied(false);
  };

  const handleReExecute = () => {
    console.log('Re-executing selected workflows');
  };
  return (
    <CustomTable
      title="Team Members"
      titleTooltip="Add team members and share workflow(s) or folder(s) access with them."
      secondaryTitle="" // Custom secondary text if needed
      secondaryTitleTooltip="" // Custom secondary text Tooltip if needed
      columns={tableColumns}
      rows={rows}
      noDataProps={{
        title: 'No team member added!',
        subTitle:
          'You have not added any team members yet. You can add a team member and share access to workflows or folders with them.',
        learnMoreText: 'Learn more',
        learnMoreLink:
          'https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-connect-account.5336/#post-25220',
      }}
      filters={filters}
      searchPlaceholder="Search by Email..." // Custom placeholder
      // tabs={tabs} // Pass tabs here
      showTabs={false} // Hide tabs for this table & Explicitly show tabs (default behavior) showTabs={false} & showTabs={true}
      deleteAction={(onDelete) => <DeleteAction onDelete={onDelete} />}
      // ReExecuteAction={ReExecuteAction}
      renderRowOptions={(row) => <RowOptions row={row} actions={actions(row)} />}
      // toolbarButtons={CustomToolbarButtons}
      toolbarButtons={
        <CustomToolbarButtons
          isFilterApplied={isFilterApplied}
          isMobile={isMobile}
          handleFilterButtonClick={handleFilterButtonClick}
          handleFilterIconClick={handleFilterIconClick}
          handleRefresh={handleRefresh}
        />
      }
    />
  );
}
