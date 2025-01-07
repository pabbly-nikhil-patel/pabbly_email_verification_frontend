// import { useCallback } from 'react';

// import Chip from '@mui/material/Chip';

// import { fDateRangeShortLabel } from 'src/utils/format-time';

// import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// export function CustomTableFiltersResult({ filters, totalResults, onResetPage, sx }) {
//   const handleRemoveKeyword = useCallback(() => {
//     filters.setState({
//       ...filters.state,
//       name: '',
//     });
//   }, [filters]);

//   const handleRemoveStatus = useCallback(() => {
//     filters.setState({
//       ...filters.state,
//       status: 'all',
//     });
//   }, [filters]);

//   const handleRemoveDate = useCallback(() => {
//     filters.setState({
//       ...filters.state,
//       startDate: null,
//       endDate: null,
//     });
//   }, [filters]);

//   const handleReset = useCallback(() => {
//     filters.setState({
//       ...filters.state,
//       name: '',
//       status: 'all',
//       startDate: null,
//       endDate: null,
//     });
//     // Reset page when clearing all filters
//     onResetPage?.();
//   }, [filters, onResetPage]);

//   return (
//     <FiltersResult
//       totalResults={totalResults}
//       clearType="search"
//       onReset={handleReset} // This connects to the Clear button
//       sx={sx}
//     >
//       <FiltersBlock label="Status:" isShow={filters.state.status !== 'all'}>
//         <Chip
//           {...chipProps}
//           label={filters.state.status}
//           onDelete={handleRemoveStatus}
//           sx={{ textTransform: 'capitalize' }}
//         />
//       </FiltersBlock>

//       <FiltersBlock
//         label="Date:"
//         isShow={Boolean(filters.state.startDate && filters.state.endDate)}
//       >
//         <Chip
//           {...chipProps}
//           label={fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)}
//           onDelete={handleRemoveDate}
//         />
//       </FiltersBlock>

//       <FiltersBlock label="Keyword:" isShow={!!filters.state.name}>
//         <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveKeyword} />
//       </FiltersBlock>
//     </FiltersResult>
//   );
// }

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

export function CustomTableFiltersResult({ filters, totalResults, onResetPage, sx }) {
  const handleRemoveKeyword = useCallback(() => {
    filters.setState({ name: '' }); // Clear the name filter
    onResetPage(); // Reset pagination
  }, [filters, onResetPage]);

  const handleRemoveStatus = useCallback(() => {
    filters.setState({ status: 'all' }); // Clear the status filter
    onResetPage(); // Reset pagination
  }, [filters, onResetPage]);

  const handleRemoveDate = useCallback(() => {
    filters.setState({ startDate: null, endDate: null }); // Clear the date filters
    onResetPage(); // Reset pagination
  }, [filters, onResetPage]);

  const handleReset = useCallback(() => {
    filters.onResetState(); // Reset all filters to their initial state
    onResetPage(); // Reset pagination
  }, [filters, onResetPage]);

  return (
    <FiltersResult totalResults={totalResults} clearType="search" onReset={handleReset} sx={sx}>
      <FiltersBlock label="Status:" isShow={filters.state.status !== 'all'}>
        <Chip
          {...chipProps}
          label={filters.state.status}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>

      <FiltersBlock
        label="Date:"
        isShow={Boolean(filters.state.startDate && filters.state.endDate)}
      >
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)}
          onDelete={handleRemoveDate}
        />
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!filters.state.name}>
        <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
