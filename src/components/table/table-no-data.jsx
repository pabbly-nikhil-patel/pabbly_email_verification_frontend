import { Box } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { EmptyContent } from '../empty-content';

// ----------------------------------------------------------------------

export function TableNoData({ notFound, sx ,title,description}) {
  return (
    <TableRow sx={{width:'100%',display: 'flex', justifyContent: 'center'}}>
      {notFound ? (
        <TableCell sx={{width:'100%'}} colSpan={12}>
          <Box >
          <EmptyContent title={title} description={description} filled sx={{ py: 10, ...sx,width:'100%'}} />
          </Box>
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
