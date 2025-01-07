// import React from 'react';

// import { Stack, Tooltip } from '@mui/material';

// import { Label } from '../label';
// import { Iconify } from '../iconify';

// const StatusLabel = ({ status }) => {
//   const normalizedStatus = status.toLowerCase();

//   return (
//     <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
//       {normalizedStatus === 'success' && (
//         <Tooltip title="Task execution was fully successful." arrow placement="top">
//           <Label
//             variant="soft"
//             color="success"
//             startIcon={<Iconify icon="heroicons:check-circle-16-solid" />}
//           >
//             Success
//           </Label>
//         </Tooltip>
//       )}
//       {normalizedStatus === 'partial failed' && (
//         <Tooltip title="Task execution failed due to partial failure." placement="top" arrow>
//           <Label
//             variant="soft"
//             color="warning"
//             startIcon={<Iconify icon="ant-design:close-circle-filled" />}
//           >
//             Partial Failed
//           </Label>
//         </Tooltip>
//       )}
//       {normalizedStatus === 'failed' && (
//         <Tooltip title="Task execution failed due to an error." arrow placement="top">
//           <Label
//             variant="soft"
//             color="error"
//             startIcon={<Iconify icon="ant-design:close-circle-filled" />}
//           >
//             Failed
//           </Label>
//         </Tooltip>
//       )}
//     </Stack>
//   );
// };

// export default StatusLabel;

import React from 'react';

import { Stack, Tooltip } from '@mui/material';

import { Label } from '../label';

const StatusLabel = ({ color, tooltip, icon, text }) => (
  <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
    <Tooltip title={tooltip} arrow placement="top">
      <Label variant="soft" color={color} startIcon={icon}>
        {text}
      </Label>
    </Tooltip>
  </Stack>
);

export default StatusLabel;
