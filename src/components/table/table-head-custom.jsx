import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import { Tooltip, Checkbox } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

// ----------------------------------------------------------------------

export function TableHeadCustom({
  sx,
  order,
  onSort,
  orderBy,
  headLabel,
  rowCount = 0,
  numSelected = 0,
  onSelectAllRows,
  showCheckbox = true,
}) {
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow>
        {showCheckbox && onSelectAllRows && (
          <TableCell
            hover
            padding="checkbox"
            sx={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#0000000',
              // bgcolor: '#ffffff',
            }}
          >
            <Tooltip title="Select All" arrow placement="top">
              <Checkbox
                indeterminate={!!numSelected && numSelected < rowCount}
                checked={!!rowCount && numSelected === rowCount}
                onChange={(event) => onSelectAllRows(event.target.checked)}
                inputProps={{
                  name: 'select-all-rows',
                  'aria-label': 'select all rows',
                }}
              />
            </Tooltip>
          </TableCell>
        )}

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: headCell.width,
              minWidth: headCell.minWidth,
              // bgcolor: '#ffffff',
            }}
          >
            <Tooltip title={headCell.tooltip || ''} arrow placement="top">
              <span>
                {onSort ? (
                  <TableSortLabel
                    hideSortIcon
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => onSort(headCell.id)}
                  >
                    {headCell.label}

                    {orderBy === headCell.id ? (
                      <Box sx={{ ...visuallyHidden }}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                ) : (
                  headCell.label
                )}
              </span>
            </Tooltip>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
