// import { useSelector } from 'react-redux';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import {
  Table,
  Tooltip,
  Divider,
  TableBody,
  CardHeader,
  useMediaQuery,
  CircularProgress,
  // CircularProgress,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/confirm-dialog';
// import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomSnackbar } from 'src/components/custom-snackbar-alert/custom-snackbar-alert';
import {
  useTable,
  rowInPage,
  TableNoData,
  getComparator,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import { _teammember } from './_teammember';
import { OrderTableRow } from './team-member-table-row';
import { OrderTableToolbar } from './team-member-table-toolbar';
import { OrderTableFiltersResult } from './team-member-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No', width: 'flex', whiteSpace: 'nowrap', tooltip: 'Serial Number' },
  {
    id: 'team_member_email',
    label: 'Team Member Email',
    width: '250',
    tooltip: 'Email address of the team member with whom the folder is shared.',
  },

  {
    id: 'folders',
    label: 'Folders You’ve Shared',
    width: '200',
    tooltip: 'Name of the folder shared.',
  },
  {
    id: 'shared_on',
    label: 'Shared On',
    width: '200',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'Date and time when the folder was shared.',
  },
  { id: '', width: 50 },
];

// ----------------------------------------------------------------------

export default function SharedbyYouTeamMemberTable({
  sx,
  icon,
  title,
  total,
  color = 'warning',
  ...other
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const confirm = useBoolean();
  const [tableData, setTableData] = useState(_teammember);

  const filters = useSetState({
    email: '', // Initialize email filter state
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset = !!filters.state.email || filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleConfirmDelete = () => {
    confirm.onFalse(); // Close the dialog after confirming
    handleDeleteRow(confirm.rowToDelete);
  };

  /* Delete Success Snackbar */

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [confirmDialogProps, setConfirmDialogProps] = useState({});

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccessSnackbarOpen(false);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };

  const handleOpenConfirmDialog = (action) => {
    setConfirmDialogProps(action); // Sets the props but never uses them
    setConfirmDelete(true);
  };

  // Modify these conditions at the top of your component
  const nomemberAdded = tableData.length === 0; // When no tasks exist at all
  const noSearchResults = dataFiltered.length === 0 && filters.state.email; // When search returns no results

  // const { DataStatus, DataError } = useSelector((state) => state.member);   /* Table CircularProgress loading */

  // LoadingButton
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {/* Table */}
      <Card
        sx={{
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
          mt: 4,
        }}
      >
        <CardHeader
          title={
            <Box>
              <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>
                <Tooltip
                  title="Add team members and share folder(s) access with them."
                  arrow
                  placement="bottom"
                >
                  Team Members
                </Tooltip>
              </Box>
            </Box>
          }
          action={total && <Label color={color}>{total}</Label>}
          sx={{
            p: 3,
          }}
        />
        <Divider />

        <OrderTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          dateError={dateError}
          numSelected={table.selected.length}
          nomemberAdded={nomemberAdded}
        />

        {canReset && (
          <OrderTableFiltersResult
            filters={filters}
            totalResults={dataFiltered.length}
            onResetPage={table.onResetPage}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <Box sx={{ position: 'relative' }}>
          {/* <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={dataFiltered.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                dataFiltered.map((row) => row.id)
              )
            }
            action={
              <Tooltip title=" Remove the selected access.">
                <IconButton
                  color="primary"
                  onClick={() =>
                    handleOpenConfirmDialog({
                      onConfirm: () => handleDeleteRow(),
                    })
                  }
                >
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          /> */}

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              {/* Table CircularProgress loading */}
              {/* {DataStatus === 'loading' && ( */}
              {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
                <CircularProgress />
              </Box> */}
              {/* )} */}
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
              {nomemberAdded ? (
                <TableNoData
                  title="No team members added!"
                  subTitle="You have not added any team members yet. You can add a team member and share access to folders with them."
                  learnMoreText="Learn more"
                  learnMoreLink="https://forum.pabbly.com/threads/how-do-add-team-members-in-pabbly-connect-account.5336/#post-25220"
                  // tooltipTitle="Buy agency tasks plan to assign agency tasks to other Pabbly Connect accounts."
                  notFound
                />
              ) : noSearchResults ? (
                <TableNoData
                  title="Search Not Found!"
                  subTitle={
                    <span>
                      No results found for &#34;<strong>{filters.state.email}</strong>&#34;
                    </span>
                  }
                  notFound
                />
              ) : (
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row, index) => (
                      <OrderTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() =>
                          handleOpenConfirmDialog({
                            onConfirm: () => handleDeleteRow(row.id),
                          })
                        }
                        serialNumber={table.page * table.rowsPerPage + index + 1}
                      />
                    ))}

                  {/* <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  /> */}

                  <TableNoData />
                </TableBody>
              )}
            </Table>
          </Scrollbar>
        </Box>

        <TablePaginationCustom
          disabled={nomemberAdded} // Disabled When No Team Members Added
          page={table.page}
          dense={table.dense}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={handleCloseConfirmDelete}
        title="Do you wish to remove selected access?"
        content="You won't be able to revert this!"
        action={
          <Button
            variant="contained"
            color="error"
            disabled={isLoading}
            onClick={() => {
              confirmDialogProps.onConfirm?.(); // Call the stored callback
              handleCloseConfirmDelete();
              setSuccessSnackbarOpen(true);
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Remove Access'}
          </Button>
        }
      />

      {/* Delete Success Snackbar */}
      <CustomSnackbar
        open={successSnackbarOpen}
        onClose={handleSuccessSnackbarClose}
        message="Successfully removed the selected access."
        severity="success"
      />
    </>
  );
}

function applyFilter({ inputData, filters }) {
  const { email } = filters;

  // Filter by email (search)
  if (email) {
    inputData = inputData.filter((variable) =>
      variable.email.toLowerCase().includes(email.toLowerCase())
    );
  }

  return inputData;
}
