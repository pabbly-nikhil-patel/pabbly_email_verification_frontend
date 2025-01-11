// components/DashboardTable/index.jsx
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useState, useEffect, useCallback } from 'react';

import {
  Tab,
  Box,
  Tabs,
  Card,
  Table,
  Alert,
  Button,
  Divider,
  Tooltip,
  MenuList,
  MenuItem,
  Snackbar,
  TableBody,
  CardHeader,
  Typography,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { varAlpha } from 'src/theme/styles';
import { DASHBOARD_STATUS_OPTIONS } from 'src/_mock/_table/_dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomPopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/confirm-dialog';
import {
  useTable,
  rowInPage,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import { MoveToFolderPopover } from 'src/sections/dialog-boxes/move-to-folder-dailog';

import { DashboardTrashTableRow } from './dashboard-trash-table-row';
import { DashboardTrashTableToolbar } from './dashboard-trash-table-toolbar';
import { DashboardTrashTableFiltersResult } from './dashboard-trash-table-filters-result';

// constants/table.js
const STATUS_OPTIONS = [
  { value: 'all', label: 'All', tooltip: 'View all email lists that have been uploaded.' },
  ...DASHBOARD_STATUS_OPTIONS,
];

const TABLE_HEAD = [
  {
    id: 'filename',
    label: 'Status/Name/Date',
    width: 400,
    whiteSpace: 'nowrap',
    tooltip: 'View list status, name and date of creation here.',
  },
  {
    id: 'consumed',
    label: 'No. of Emails/Credits Used',
    width: 400,
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'Number of credits used by this list',
  },
  // {
  //   id: 'action',
  //   label: 'Action',
  //   width: 300,
  //   whiteSpace: 'nowrap',
  //   align: 'right',
  //   tooltip: 'Take actions on the list here.',
  // },
  { id: '', width: 10 },
];

// data/mockData.js
const dataOn = [
  {
    status: 'uploading',
    name: 'new_users_list',
    numberOfEmails: 128,
    creditconsumed: '0 Credit Consumed',
    date: 'Oct 23, 2024 17:45:32',
  },
  {
    status: 'Unverified',
    name: 'pabbly_connect_users_email_list',
    numberOfEmails: 65,
    creditconsumed: '65 Credit Consumed',
    date: 'Oct 23, 2024 17:45:32',
  },
  {
    status: 'processing',
    name: 'pabbly_chatflow_users_email_list',
    numberOfEmails: 65,
    creditconsumed: '65 Credit Consumed',
    date: 'Oct 23, 2024 17:45:32',
  },
  {
    status: 'Verified',
    name: 'clothing_users_email_list',
    numberOfEmails: 653343,
    creditconsumed: '653343 Credit Consumed',
    date: 'Oct 23, 2024 17:45:32',
  },
];

// utils/filterUtils.js
function applyFilter({ inputData, comparator, filters }) {
  const { status, name } = filters;

  let filteredData = [...inputData];

  if (name) {
    filteredData = filteredData.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (status !== 'all') {
    filteredData = filteredData.filter((item) => item.status === status);
  }

  const stabilizedThis = filteredData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

export function DashboardTrashTable() {
  const theme = useTheme();
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const [tableData, setTableData] = useState(
    dataOn.map((item, index) => ({
      ...item,
      id: index,
    }))
  );

  const filters = useSetState({
    name: '',
    status: 'all',
  });

  const [processingRowId, setProcessingRowId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const confirmDelete = useBoolean();
  const isStartVerification = useSelector((state) => state.fileUpload.isStartVerification);
  const isVerificationCompleted = useSelector((state) => state.fileUpload.isVerificationCompleted);

  // Effect Hooks
  useEffect(() => {
    if (isVerificationCompleted && processingRowId !== null) {
      setTableData((prevData) =>
        prevData.map((row) => (row.id === processingRowId ? { ...row, status: 'Verified' } : row))
      );
      setProcessingRowId(null);
    }
  }, [isVerificationCompleted, processingRowId]);

  // Handlers
  const handleStartVerification = (rowId) => {
    setProcessingRowId(rowId);
    setTableData((prevData) =>
      prevData.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            status: 'processing',
            creditconsumed: `${row.numberOfEmails} Credit Consumed`,
          };
        }
        return row;
      })
    );
  };

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  const handleOpenPopover = (event, row) => {
    if (row.status !== 'processing') {
      setAnchorEl(event.currentTarget);
      setSelectedRow(row);
    }
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarState((prev) => ({ ...prev, open: false }));
  };

  const handleConfirmDelete = () => {
    confirmDelete.onTrue();
    handleClosePopover();
  };

  const handleDelete = () => {
    confirmDelete.onFalse();
    setSnackbarState({
      open: true,
      message: 'Email list deleted successfully.',
      severity: 'success',
    });
  };

  const [openMoveFolder, setOpenMoveFolder] = useState(false);

  // Add this handler in DashboardTrashTable component
  const handleMoveToFolder = () => {
    setOpenMoveFolder(true);
    handleClosePopover();
  };

  // Computed values
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  return (
    <Card>
      <CardHeader
        title={
          <Box display="inline-block">
            {/* <Tooltip
              title="See all your uploaded files and their verification status"
              arrow
              placement="top"
            > */}
            <Typography variant="h6">Trash</Typography>
            {/* </Tooltip> */}
          </Box>
        }
        subheader="Deleted email list can be restored or permanently deleted from the trash folder."
        sx={{ pb: 3 }}
      />
      <Divider />

      <Tabs
        value={filters.state.status}
        onChange={handleFilterStatus}
        sx={{
          px: 2.5,
          boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
        }}
      >
        {STATUS_OPTIONS.map((tab) => (
          <Tab
            key={tab.value}
            iconPosition="end"
            value={tab.value}
            label={
              <Tooltip disableInteractive placement="top" arrow title={tab.tooltip}>
                <span>{tab.label}</span>
              </Tooltip>
            }
            icon={
              <Label
                variant={
                  ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                  'soft'
                }
                color={
                  (tab.value === 'Verified' && 'success') ||
                  (tab.value === 'processing' && 'info') ||
                  (tab.value === 'uploading' && 'warning') ||
                  (tab.value === 'Unverified' && 'error') ||
                  'default'
                }
              >
                {['Verified', 'processing', 'uploading', 'Unverified'].includes(tab.value)
                  ? tableData.filter((user) => user.status === tab.value).length
                  : tableData.length}
              </Label>
            }
          />
        ))}
      </Tabs>

      <DashboardTrashTableToolbar
        filters={filters}
        onResetPage={table.onResetPage}
        numSelected={table.selected.length}
      />

      {canReset && (
        <DashboardTrashTableFiltersResult
          filters={filters}
          totalResults={dataFiltered.length}
          onResetPage={table.onResetPage}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}

      <Box sx={{ position: 'relative' }}>
        {/* <DashboardTableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={dataFiltered.length}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(
              checked,
              dataFiltered.map((row) => row.id)
            )
          }
        /> */}
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom
              showCheckbox
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row, index) => (
                  <DashboardTrashTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onOpenPopover={(event) => handleOpenPopover(event, row)}
                    dashboardTableIndex={table.page * table.rowsPerPage + index}
                    onStartVerification={() => handleStartVerification(row.id)}
                    isProcessing={processingRowId === row.id && isStartVerification}
                    isCompleted={processingRowId === row.id && isVerificationCompleted}
                  />
                ))}

              <TableEmptyRows
                height={table.dense ? 56 : 56 + 20}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
              />

              {tableData.length === 0 ? (
                <TableNoData
                  title="Not Data Found"
                  description="No data found in the table"
                  notFound={notFound}
                />
              ) : (
                <TableNoData
                  title="Not Search Found"
                  description={`No search found with keyword "${filters.state.name}"`}
                  notFound={notFound}
                />
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </Box>

      <CustomPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          {selectedRow && selectedRow.status !== 'processing' && (
            <>
              <Tooltip title="Move to folder" arrow placement="left">
                <MenuItem onClick={handleMoveToFolder}>
                  <Iconify icon="fluent:folder-move-16-filled" />
                  Move to folder
                </MenuItem>
              </Tooltip>
              <Divider style={{ borderStyle: 'dashed' }} />
              <Tooltip title="Delete email list." arrow placement="left">
                <MenuItem onClick={handleConfirmDelete} sx={{ color: 'error.main' }}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                  Delete
                </MenuItem>
              </Tooltip>
            </>
          )}
        </MenuList>
      </CustomPopover>

      <MoveToFolderPopover
        open={openMoveFolder}
        onClose={() => {
          setOpenMoveFolder(false);
          setSelectedRow(null);
        }}
      />

      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Do you want to permanently delete the email list?"
        content="An email list once deleted cannot be restored in any case."
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete Permanently
          </Button>
        }
      />

      <Snackbar
        open={snackbarState.open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 8,
          zIndex: theme.zIndex.modal + 9999,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity}
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            '& .MuiAlert-icon': {
              color:
                snackbarState.severity === 'error'
                  ? theme.palette.error.main
                  : theme.palette.success.main,
            },
          }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>

      <TablePaginationCustom
        page={table.page}
        count={dataFiltered.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onChangeDense={table.onChangeDense}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </Card>
  );
}
