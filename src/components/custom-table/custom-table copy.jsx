// import { useTheme } from '@emotion/react';
// import React, { useState, useCallback } from 'react';

// import {
//   Box,
//   Tab,
//   Tabs,
//   Card,
//   Table,
//   Stack,
//   Tooltip,
//   Divider,
//   TableRow,
//   Checkbox,
//   TableBody,
//   TableCell,
//   TableHead,
//   TextField,
//   Typography,
//   CardHeader,
//   useMediaQuery,
//   TableContainer,
//   InputAdornment,
//   TablePagination,
// } from '@mui/material';

// import { varAlpha } from 'src/theme/styles';

// import { Label } from '../label';
// import { Iconify } from '../iconify';
// import { TableNoData } from '../table';
// import { TableFiltersResult } from './table-filters-result';

// const CustomTable = ({
//   columns,
//   rows = [],
//   onResetPage,
//   tabs,
//   total,
//   numSelected,
//   publish,
//   onChangePublish,
//   onTabChange,
//   filters,
//   actions,
//   table,
//   title,
//   color = 'warning',
// }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState([]);
//   const theme = useTheme();
//   const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

//   // Filtered Rows
//   const filteredRows = rows.filter((row) =>
//     row.name.toLowerCase().includes(filters.state.name.toLowerCase())
//   );

//   // Handlers for pagination
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Handlers for selection
//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = filteredRows.map((row) => row.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleSelectRow = (id) => {
//     setSelected((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((selectedId) => selectedId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   // Filter Handlers
//   const handleFilterName = useCallback(
//     (event) => {
//       filters.setState({ ...filters.state, name: event.target.value });
//       setPage(0); // Reset to the first page when searching
//     },
//     [filters]
//   );

//   // Modify these conditions at the top of your component
//   const noRowsExist = rows.length === 0; // Check if no rows exist at all
//   const noFilterResults = filteredRows.length === 0 && filters.state.name !== ''; // Check if search filter results in no rows

//   return (
//     <Card
//       sx={{
//         boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
//         width: '100%',
//         overflow: 'hidden',
//         mt: 4,
//       }}
//     >
//       {/* Title */}
//       {title && (
//         <CardHeader
//           sx={{
//             p: 3,
//           }}
//           title={
//             <Box>
//               <Typography variant="subtitle2" fontSize={18} fontWeight={600}>
//                 {title}
//               </Typography>
//               <Typography variant="body2" fontSize={14} color="text.secondary">
//                 (Sep 20, 2024 - Oct 05, 2024)
//               </Typography>
//             </Box>
//           }
//         />
//       )}
//       <Divider />

//       {/* Tabs */}
//       <Tabs
//         value={tabs.value}
//         onChange={onTabChange}
//         sx={{
//           px: 2.5,
//           boxShadow: (theme1) =>
//             `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
//         }}
//       >
//         {tabs.options.map((tab) => (
//           <Tab
//             key={tab.value}
//             iconPosition="end"
//             value={tab.value}
//             label={
//               <Tooltip title={tab.tooltip} arrow placement="top">
//                 <span>{tab.label}</span>
//               </Tooltip>
//             }
//             icon={
//               <Label
//                 variant={((tab.value === 'all' || tab.value === tabs.value) && 'filled') || 'soft'}
//                 color={
//                   (tab.value === 'live' && 'success') ||
//                   (tab.value === 'partialfailed' && 'warning') ||
//                   (tab.value === 'failed' && 'error') ||
//                   'default'
//                 }
//               >
//                 {tab.count}
//               </Label>
//             }
//           />
//         ))}
//       </Tabs>

//       {/* Search Input */}
//       <Stack
//         spacing={2}
//         alignItems="center"
//         direction={isBelow600px ? 'column' : 'row'}
//         sx={{ p: 2.5 }}
//       >
//         <Box sx={{ width: '100%' }}>
//           <TextField
//             fullWidth
//             value={filters.state.name}
//             onChange={handleFilterName}
//             placeholder="Search task history..."
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//       </Stack>

//       {/* Filters Result */}
//       <TableFiltersResult
//         filters={filters}
//         totalResults={filteredRows.length}
//         onResetPage={onResetPage}
//         sx={{ p: '0px 20px 20px 20px' }}
//       />

//       {/* Table */}
//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   indeterminate={selected.length > 0 && selected.length < filteredRows.length}
//                   checked={filteredRows.length > 0 && selected.length === filteredRows.length}
//                   onChange={handleSelectAllClick}
//                 />
//               </TableCell>
//               {columns.map((column) => (
//                 <TableCell key={column.id}>{column.label}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           {/* <TableBody>
//             {filteredRows.length === 0 ? (
//               <TableNoData
//                 title="Search Not Found!"
//                 subTitle={`No results found for "${filters.state.name}"`}
//                 notFound
//               />
//             ) : nowebhookAdded ? (
//               <TableNoData
//                 title="No webhook URL added!"
//                 subTitle="Set up webhooks and receive notification for different events."
//                 learnMoreText="Learn more"
//                 learnMoreLink="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&ab_channel=Pabbly"
//                 // tooltipTitle="Buy agency tasks plan to assign agency tasks to other Pabbly Connect accounts."
//                 notFound
//               />
//             ) : noFilterResults ? (
//               <TableNoData
//                 title="No Results Found!"
//                 subTitle="No tasks match your current filter criteria."
//                 tooltipTitle="Adjust your filters to view agency tasks."
//                 notFound
//               />
//             ) : (
//               filteredRows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => (
//                   <TableRow
//                     key={row.id}
//                     hover
//                     selected={selected.includes(row.id)}
//                     onClick={() => handleSelectRow(row.id)}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox checked={selected.includes(row.id)} />
//                     </TableCell>
//                     {columns.map((column) => (
//                       <TableCell key={column.id}>{row[column.id]}</TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//             )}
//           </TableBody> */}

//           <TableBody>
//             {noRowsExist ? (
//               <TableNoData
//                 title="No webhook URL added!"
//                 subTitle="Set up webhooks and receive notification for different events."
//                 learnMoreText="Learn more"
//                 learnMoreLink="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&ab_channel=Pabbly"
//                 notFound
//               />
//             ) : noFilterResults ? (
//               <TableNoData
//                 title="No Results Found!"
//                 subTitle={`No tasks match your search for "${filters.state.name}"`}
//                 notFound
//               />
//             ) : filteredRows.length === 0 ? (
//               <TableNoData
//                 title="Search Not Found!"
//                 subTitle={`No results found for "${filters.state.name}"`}
//                 notFound
//               />
//             ) : (
//               filteredRows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => (
//                   <TableRow
//                     key={row.id}
//                     hover
//                     selected={selected.includes(row.id)}
//                     onClick={() => handleSelectRow(row.id)}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox checked={selected.includes(row.id)} />
//                     </TableCell>
//                     {columns.map((column) => (
//                       <TableCell key={column.id}>{row[column.id]}</TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 20]}
//         component="div"
//         count={filteredRows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Card>
//   );
// };

// export default CustomTable;

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
import { TableFiltersResult } from './table-filters-result';

const CustomTable = ({
  columns,
  rows = [],
  onResetPage,
  tabs,
  total,
  numSelected,
  publish,
  onChangePublish,
  onTabChange,
  filters,
  actions,
  table,
  title,
  color = 'warning',
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const theme = useTheme();
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));

  // Filtered Rows
  // const filteredRows = rows.filter((row) => {
  //   // Filter by status tab
  //   const statusMatch =
  //     filters.state.status === 'all' ||
  //     (filters.state.status === 'live' && row.status === 'Active') ||
  //     (filters.state.status === 'partialfailed' && row.status === 'Inactive') ||
  //     (filters.state.status === 'failed' && row.status === 'Inactive');

  //   // Filter by name search
  //   const nameMatch =
  //     !filters.state.name || row.name.toLowerCase().includes(filters.state.name.toLowerCase());

  //   return statusMatch && nameMatch;
  // });

  // const filteredRows = rows.filter((row) => {
  //   // Filter by status tab
  //   const statusMatch =
  //     filters.state.status === 'all' ||
  //     (filters.state.status === 'active' && row.status === 'Active') ||
  //     (filters.state.status === 'inactive' && row.status === 'Inactive') ||
  //     (filters.state.status === 'failed' && row.status === 'Failed');

  //   // Filter by name search
  //   const nameMatch =
  //     !filters.state.name || row.name.toLowerCase().includes(filters.state.name.toLowerCase());

  //   return statusMatch && nameMatch;
  // });

  // const filteredRows = rows.filter((row) => {
  //   // Normalize status for comparison
  //   const normalizedRowStatus = row.status.toLowerCase();
  //   const normalizedFilterStatus = filters.state.status;

  //   // Filter by status tab with more flexible matching
  //   const statusMatch =
  //     normalizedFilterStatus === 'all' ||
  //     (normalizedFilterStatus === 'active' &&
  //       (normalizedRowStatus === 'active' || normalizedRowStatus === 'success')) ||
  //     (normalizedFilterStatus === 'inactive' &&
  //       (normalizedRowStatus === 'inactive' || normalizedRowStatus === 'partial failed')) ||
  //     (normalizedFilterStatus === 'failed' && normalizedRowStatus === 'failed');

  //   // Filter by name search
  //   const nameMatch =
  //     !filters.state.name || row.name.toLowerCase().includes(filters.state.name.toLowerCase());

  //   return statusMatch && nameMatch;
  // });

  // const filteredRows = rows.filter((row) => {
  //   // Normalize status for comparison
  //   const normalizedRowStatus = row.status.toLowerCase();
  //   const normalizedFilterStatus = filters.state.status.toLowerCase();

  //   // Filter by status tab with more flexible matching
  //   const statusMatch =
  //     normalizedFilterStatus === 'all' ||
  //     (normalizedFilterStatus === 'active' &&
  //       (normalizedRowStatus === 'active' || normalizedRowStatus === 'success')) ||
  //     (normalizedFilterStatus === 'inactive' &&
  //       (normalizedRowStatus === 'inactive' || normalizedRowStatus === 'partial failed')) ||
  //     (normalizedFilterStatus === 'failed' && normalizedRowStatus === 'failed');

  //   // Filter by name search
  //   const nameMatch =
  //     !filters.state.name || row.name.toLowerCase().includes(filters.state.name.toLowerCase());

  //   return statusMatch && nameMatch;
  // });

  const filteredRows = rows.filter((row) => {
    // Normalize status for comparison
    const normalizedRowStatus = row.status.toLowerCase();
    const normalizedFilterStatus = filters.state.status.toLowerCase();

    // Filter by status tab with more specific matching
    const statusMatch =
      normalizedFilterStatus === 'all' ||
      (normalizedFilterStatus === 'active' &&
        (normalizedRowStatus === 'active' || normalizedRowStatus === 'active')) ||
      (normalizedFilterStatus === 'success' &&
        (normalizedRowStatus === 'success' || normalizedRowStatus === 'success')) ||
      (normalizedFilterStatus === 'inactive' &&
        (normalizedRowStatus === 'inactive' || normalizedRowStatus === 'inactive')) ||
      (normalizedFilterStatus === 'partial failed' &&
        (normalizedRowStatus === 'partial failed' || normalizedRowStatus === 'partial failed')) ||
      (normalizedFilterStatus === 'failed' && normalizedRowStatus === 'failed');

    // Filter by name search
    const nameMatch =
      !filters.state.name || row.name.toLowerCase().includes(filters.state.name.toLowerCase());

    return statusMatch && nameMatch;
  });

  // Handlers for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handlers for selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectRow = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  // Filter Handlers
  const handleFilterName = useCallback(
    (event) => {
      filters.setState({ ...filters.state, name: event.target.value });
      setPage(0); // Reset to the first page when searching
    },
    [filters]
  );

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        width: '100%',
        overflow: 'hidden',
        mt: 4,
      }}
    >
      {/* Title */}
      {title && (
        <CardHeader
          sx={{
            p: 3,
          }}
          title={
            <Box>
              <Typography variant="subtitle2" fontSize={18} fontWeight={600}>
                {title}
              </Typography>
              <Typography variant="body2" fontSize={14} color="text.secondary">
                (Sep 20, 2024 - Oct 05, 2024)
              </Typography>
            </Box>
          }
        />
      )}
      <Divider />

      {/* Tabs */}
      <Tabs
        value={filters.state.status}
        onChange={(event, newValue) => {
          filters.setState({ ...filters.state, status: newValue });
          onTabChange(event, newValue);
        }}
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
                variant={((tab.value === 'all' || tab.value === tabs.value) && 'filled') || 'soft'}
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

      {/* Search Input */}
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
            placeholder="Search task history..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>

      {/* Filters Result */}
      <TableFiltersResult
        filters={filters}
        totalResults={filteredRows.length}
        onResetPage={onResetPage}
        sx={{ p: '0px 20px 20px 20px' }}
      />

      {/* Table */}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < filteredRows.length}
                  checked={filteredRows.length > 0 && selected.length === filteredRows.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableNoData
                title="No webhook URL added!"
                subTitle="Set up webhooks and receive notification for different events."
                learnMoreText="Learn more"
                learnMoreLink="https://www.youtube.com/watch?v=Lv9Rnzoh-vY&ab_channel=Pabbly"
                notFound
              />
            ) : filteredRows.length === 0 ? (
              <TableNoData
                title="No Results Found!"
                subTitle={`No tasks match your search for "${filters.state.name}"`}
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
                    onClick={() => handleSelectRow(row.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={selected.includes(row.id)} />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    ))}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default CustomTable;
