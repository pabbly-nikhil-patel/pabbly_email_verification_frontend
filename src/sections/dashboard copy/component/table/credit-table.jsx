import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Divider, CardHeader, Typography } from '@mui/material';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsBetween } from 'src/utils/format-time';

import { Scrollbar } from 'src/components/scrollbar';
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

import { CreditTableRow } from './credit-table-row';
import { CreditTableToolbar } from './credit-table-toolbar';
import { CreditTableFiltersResult } from './credit-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: 'statusdate',
    label: 'Status/Date',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'View the verification type and the date/time it occurred.',
  },

  {
    id: 'verificationsummary',
    label: 'Verification Summary',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'View whether a bulk email list or a single email address was verified.',
  },
  {
    id: 'credits',
    label: 'Credits',
    width: 'flex',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'View the email credits usage and allocation details.',
  },
];

const dataOn = [
  {
    dateCreatedOn: 'Oct 23, 2024 17:45:32',
    message: 'Pabbly_Sheet.csv',
    status: 'Bulk Verification',
    folder:'Organisation 1',
    credits: 'Consumed',
    noOfCredits: 9,
  },
  {
    dateCreatedOn: 'Oct 23, 2024 17:45:32',
    message: 'MagnetBrains_sheet.csv',
    status: 'Bulk Verification',
    credits: 'Consumed',
    folder:'Organisation 2',
    noOfCredits: 7,
  },
  {
    dateCreatedOn: 'Oct 23, 2024 17:45:32',
    message: 'ankit.mandli1@pabbly.com',
    status: 'Single Verification',
    // folder:'Organisation 1',
    credits: 'Consumed',
    noOfCredits: 1,
  },
  {
    dateCreatedOn: 'Oct 23, 2024 17:45:32',
    message: 'Email credits allotted',
    status: 'Email Credits Purchased',
    credits: 'Alloted',
    // folder:'Organisation 1',
    noOfCredits: 100,
  },
];

// ----------------------------------------------------------------------

export function CreditTable() {
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const [tableData, setTableData] = useState(dataOn);
  const theme = useTheme();

  const filters = useSetState({
    name: '',
    status: 'all',
  });

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

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  return (
    <Card>
      <CardHeader
        title={
          <Box display="inline-block">
            {/* <Tooltip
              arrow
              placement="top"
              disableInteractive
              title="View all the email verification logs here."
            > */}
              <Typography variant="h6">Email Verification Logs</Typography>
            {/* </Tooltip> */}
          </Box>
        }
        sx={{ pb: 3 }}
        subheader="View all email verification activities, including type, date, summary, and credit usage. Use filters or search to find specific logs."
      />
      <Divider />

      <CreditTableToolbar filters={filters} onResetPage={table.onResetPage} />

      {canReset && (
        <CreditTableFiltersResult
          filters={filters}
          totalResults={dataFiltered.length}
          onResetPage={table.onResetPage}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}

      <Box sx={{ position: 'relative' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              showCheckbox={false}
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
              {dataInPage
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row, index) => (
                  <CreditTableRow
                    key={index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                  />
                ))}

              <TableEmptyRows
                height={table.dense ? 56 : 56 + 20}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataOn.length)}
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

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;

  let filteredData = inputData;

  // Filter by message (name)
  if (name) {
    // console.log(name)
    filteredData = filteredData.filter(
      (order) => order.message && order.message.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter by status
  if (status !== 'all') {
    filteredData = filteredData.filter((order) => order.credits === status);
  }

  // Filter by date range
  if (!dateError) {
    if (startDate && endDate) {
      filteredData = filteredData.filter((order) =>
        fIsBetween(new Date(order.dateCreatedOn), startDate, endDate)
      );
    }
  }

  return filteredData;
}
