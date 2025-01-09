import { useTheme } from '@emotion/react';
import React, { useState, useCallback } from 'react';

import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Tooltip,
  Divider,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  CardHeader,
  useMediaQuery,
  TableContainer,
  InputAdornment,
  TablePagination,
} from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { Label } from '../label';
import { Iconify } from '../iconify';
import { TableNoData } from '../table';
import { Scrollbar } from '../scrollbar';
import { TableFiltersResult } from './table-filters-result';

const TableSelectedAction = ({ numSelected, rowCount, onSelectAllRows, action }) => (
  <Stack
    direction="row"
    alignItems="center"
    sx={{
      pl: 1,
      pr: 2,
      top: 0,
      left: 0,
      width: '100%',
      position: 'absolute',
      height: '58px',
      bgcolor: 'primary.lighter',
      zIndex: 1,
    }}
  >
    <Checkbox
      indeterminate={numSelected > 0 && numSelected < rowCount}
      checked={rowCount > 0 && numSelected === rowCount}
      onChange={(event) => onSelectAllRows(event.target.checked)}
    />

    <Typography
      variant="subtitle1"
      sx={{
        ml: 2,
        flexGrow: 1,
        color: 'primary.main',
        fontSize: '14px',
      }}
    >
      {numSelected} selected
    </Typography>

    {action}
  </Stack>
);

const CustomTable = ({
  columns,
  rows = [],
  tabs,
  showTabs = true, // New prop to control tab visibility

  emptyRows,

  onTabChange,
  filters,
  title,
  titleTooltip,
  secondaryTitle = 'Secondary Title Text', // New prop for secondary text if needed
  secondaryTitleTooltip,
  onDeleteRows,
  deleteAction,
  ReExecuteAction,
  toolbarButtons,
  renderRowOptions,
  noDataProps, // New prop for custom TableNoData configuration
  searchPlaceholder = 'Search...', // New prop for placeholder text
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const theme = useTheme();
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredRows = rows.filter((row) => {
    const normalizedRowStatus = row.status.toLowerCase();
    const normalizedFilterStatus = filters.state.status.toLowerCase();

    const statusMatch =
      normalizedFilterStatus === 'all' ||
      (normalizedFilterStatus === 'active' && normalizedRowStatus === 'active') ||
      (normalizedFilterStatus === 'success' && normalizedRowStatus === 'success') ||
      (normalizedFilterStatus === 'inactive' && normalizedRowStatus === 'inactive') ||
      (normalizedFilterStatus === 'partial failed' && normalizedRowStatus === 'partial failed') ||
      (normalizedFilterStatus === 'failed' && normalizedRowStatus === 'failed');

    const nameMatch =
      !filters.state.name ||
      row.workflowName.toLowerCase().includes(filters.state.name.toLowerCase()) ||
      row.folderName.toLowerCase().includes(filters.state.name.toLowerCase()) ||
      row.taskHistoryID.toLowerCase().includes(filters.state.name.toLowerCase());

    return statusMatch && nameMatch;
  });

  const handleSelectAllClick = useCallback(
    (checked) => {
      if (checked) {
        const newSelected = filteredRows.map((row) => row.id);
        setSelected(newSelected);
      } else {
        setSelected([]);
      }
    },
    [filteredRows]
  );

  const handleSelectRow = useCallback((id) => {
    setSelected((prevSelected) => {
      const selectedIndex = prevSelected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = [...prevSelected, id];
      } else {
        newSelected = [
          ...prevSelected.slice(0, selectedIndex),
          ...prevSelected.slice(selectedIndex + 1),
        ];
      }

      return newSelected;
    });
  }, []);

  const handleDeleteSelected = () => {
    if (onDeleteRows) {
      onDeleteRows(selected);
      setSelected([]);
    }
  };

  const handleFilterName = useCallback(
    (event) => {
      filters.setState({ ...filters.state, name: event.target.value });
      setPage(0);
    },
    [filters]
  );

  const handleRowClick = useCallback((event, row) => {
    if (!event.target.closest('td[data-checkbox-cell="true"]') && !event.target.closest('button')) {
      console.log('Row clicked:', row);
    }
  }, []);

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        width: '100%',
        overflow: 'hidden',
        mt: 4,
      }}
    >
      {title && (
        <CardHeader
          sx={{ p: 3 }}
          title={
            <Box>
              <Typography variant="subtitle2" fontSize={18} fontWeight={600}>
                <Tooltip title={titleTooltip} arrow placement="top">
                  {title}
                </Tooltip>
              </Typography>
              <Typography variant="body2" fontSize={14} color="text.secondary">
                <Tooltip title={secondaryTitleTooltip} arrow placement="bottom">
                  {secondaryTitle} {/* Use the subtitleText prop */}
                </Tooltip>
              </Typography>
            </Box>
          }
        />
      )}
      <Divider />

      {showTabs && tabs && (
        <Tabs
          value={filters.state.status}
          onChange={onTabChange}
          sx={{
            px: 2.5,
            boxShadow: (theme1) =>
              `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {tabs.options.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={
                <Tooltip title={tab.tooltip} arrow placement="top">
                  <span>{tab.label}</span>
                </Tooltip>
              }
              icon={
                <Label
                  variant={
                    ((tab.value === 'all' || tab.value === tabs.value) && 'filled') || 'soft'
                  }
                  color={
                    (tab.value === 'active' && 'success') ||
                    (tab.value === 'success' && 'success') ||
                    (tab.value === 'inactive' && 'warning') ||
                    (tab.value === 'partial failed' && 'warning') ||
                    (tab.value === 'failed' && 'error') ||
                    'default'
                  }
                >
                  {tab.count}
                </Label>
              }
            />
          ))}
        </Tabs>
      )}

      <Stack
        spacing={2}
        alignItems="center"
        direction={isBelow600px ? 'column' : 'row'}
        sx={{ p: 2.5 }}
      >
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName}
            disabled={rows.length === 0} // Disable when rows are empty
            // placeholder="Search"
            placeholder={searchPlaceholder} // Use the new prop
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'row',
            width: isBelow600px ? '100%' : 'auto',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {ReExecuteAction && (
            <ReExecuteAction
              numSelected={selected.length}
              onReExecute={() => {
                console.log('Re-executing selected items:', selected);
              }}
            />
          )}
          {toolbarButtons}
        </Box>
      </Stack>

      {/* {filters.state.status !== 'all' && (
        <TableFiltersResult
          filters={filters}
          totalResults={filteredRows.length}
          onResetPage={() => {
            filters.setState({ ...filters.state, status: 'all', name: '' });
            onTabChange(null, 'all');
          }}
          sx={{ p: '0px 20px 20px 20px' }}
        />
      )} */}

      {filters.state.status !== 'all' && (
        <TableFiltersResult
          filters={filters}
          totalResults={filteredRows.length}
          onResetPage={() => {
            filters.setState((prevState) => ({
              ...prevState,
              status: 'all',
              name: '',
            }));
            setPage(0); // Reset pagination to the first page
            if (typeof onTabChange === 'function') {
              onTabChange(null, 'all');
            }
          }}
          sx={{ p: '0px 20px 20px 20px' }}
        />
      )}

      <TableContainer>
        <Box sx={{ position: 'relative' }}>
          {selected.length > 0 && (
            <TableSelectedAction
              numSelected={selected.length}
              rowCount={filteredRows.length}
              onSelectAllRows={handleSelectAllClick}
              action={deleteAction(handleDeleteSelected)}
            />
          )}

          <Scrollbar sx={{ minHeight: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" data-checkbox-cell="true">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < filteredRows.length}
                      checked={filteredRows.length > 0 && selected.length === filteredRows.length}
                      onChange={(e) => handleSelectAllClick(e.target.checked)}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                  <TableCell align="right">{}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.length === 0 ? (
                  <TableNoData {...noDataProps} notFound />
                ) : filteredRows.length === 0 ? (
                  <TableNoData
                    title="No Results Found!"
                    subTitle={
                      <span>
                        No results found for <strong>{`"${filters.state.name}"`}</strong>
                      </span>
                    }
                    notFound
                  />
                ) : (
                  filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        selected={selected.includes(row.id)}
                        onClick={(e) => handleRowClick(e, row)}
                      >
                        <TableCell padding="checkbox" data-checkbox-cell="true">
                          <Checkbox
                            checked={selected.includes(row.id)}
                            onChange={() => handleSelectRow(row.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell key={column.id}>
                            {column.render ? column.render(row) : row[column.id]}
                          </TableCell>
                        ))}
                        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                          {renderRowOptions && renderRowOptions(row)}
                        </TableCell>
                      </TableRow>
                    ))
                )}
                <TableNoData />
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Card>
  );
};

export default CustomTable;