// /* eslint-disable consistent-return */
// import { useSelector } from 'react-redux';
// import React, { useState, useEffect } from 'react';

// import Card from '@mui/material/Card';
// import Divider from '@mui/material/Divider';
// import { useTheme } from '@mui/material/styles';
// import CardHeader from '@mui/material/CardHeader';
// import {
//   Box,
//   Link,
//   Dialog,
//   Button,
//   Tooltip,
//   IconButton,
//   Typography,
//   DialogTitle,
//   ListItemText,
//   DialogActions,
//   ListItemButton,
// } from '@mui/material';

// import { fNumber } from 'src/utils/format-number';

// import { Iconify } from 'src/components/iconify';
// import { Chart, useChart, ChartLegends } from 'src/components/chart';
// import ProgessLinear from 'src/components/progress-bar/progessLinear';

// import ChartAlert from './chart-alert';

// // ----------------------------------------------------------------------

// export function DashboardChart({ title, subheader, showAlert, chart, handleAlertClose, ...other }) {
//   const { isUploading, isUploaded, isStartVerification, isVerificationCompleted, progress } =
//     useSelector((state) => state.fileUpload);
//   const theme = useTheme();

//   const [hasShownUploadAlert, setHasShownUploadAlert] = useState(false);
//   const [hasShownVerificationAlert, setHasShownVerificationAlert] = useState(false);

//   const [selectedValue, setSelectedValue] = useState(downloadActions[1]);

//   const showChart =
//     (!isUploading && !isUploaded && !isStartVerification && !isVerificationCompleted) ||
//     isVerificationCompleted;

//   const showProgressLinear = isUploading || (isStartVerification && !isVerificationCompleted);

//   const showChartAlert =
//     !isUploading && isUploaded && !isStartVerification && !isVerificationCompleted;

//   const chartColors = chart.colors ?? [
//     theme.palette.success.main,
//     theme.palette.error.main,
//     theme.palette.info.main,
//     theme.palette.warning.main,
//   ];

//   const chartSeries = chart.series.map((item) => item.value);

//   const chartOptions = useChart({
//     chart: { sparkline: { enabled: true } },
//     colors: chartColors,
//     labels: chart.series.map((item) => item.label),
//     stroke: { width: 0 },
//     tooltip: {
//       y: {
//         formatter: (value) => fNumber(value),
//         title: { formatter: (seriesName) => `${seriesName}` },
//       },
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: '72%',
//           labels: {
//             value: { formatter: (value) => fNumber(value) },
//             total: {
//               formatter: (w) => {
//                 const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
//                 return fNumber(sum);
//               },
//             },
//           },
//         },
//       },
//     },
//     ...chart.options,
//   });
//   useEffect(() => {
//     let alertTimeout;

//     if (isUploading && !hasShownUploadAlert) {
//       showAlert(
//         'info',
//         'Notice',
//         'The file "Untitled_spreadsheet_-_Sheet1.csv" is under review and will be uploaded in 3-5 minutes. Once the upload is completed, click "Start Verification" to begin the email verification process.',
//         'Uploading'
//       );
//       setHasShownUploadAlert(true);

//       alertTimeout = setTimeout(() => {
//         handleAlertClose();
//       }, 5000);
//     } else if (isStartVerification && !hasShownVerificationAlert) {
//       showAlert(
//         'success',
//         'Processing',
//         'The email verification is in progress. The Verification in progress button will change to Download button once the verification is complete.',
//         'Processing'
//       );
//       setHasShownVerificationAlert(true);

//       alertTimeout = setTimeout(() => {
//         handleAlertClose();
//       }, 5000);
//     }

//     return () => {
//       if (alertTimeout) {
//         clearTimeout(alertTimeout);
//       }
//     };
//   }, [
//     isUploading,
//     isStartVerification,
//     showAlert,
//     handleAlertClose,
//     hasShownUploadAlert,
//     hasShownVerificationAlert,
//   ]);

//   useEffect(() => {
//     if (isVerificationCompleted) {
//       setHasShownUploadAlert(false);
//       setHasShownVerificationAlert(false);
//     }
//   }, [isVerificationCompleted]);

//   const downloadActions = [
//     {
//       id: 'all-results',
//       itemName: 'All Result',
//       itemIcon: 'ci:check-all',
//     },
//     {
//       id: 'deliverable',
//       itemName: 'Deliverable',
//       itemIcon: 'charm:tick',
//     },
//     {
//       id: 'undeliverable',
//       itemName: 'Undeliverable',
//       itemIcon: 'charm:cross',
//     },
//   ];
//   const [selectedOption, setSelectedOption] = useState('all-results');

//   const [dialog, setDialog] = useState({
//     open: false,
//     mode: '', // 'delete' or 'download'
//   });

//   const handleOpen = (mode) => {
//     setDialog({ open: true, mode });
//     // Reset selected option to default when opening dialog
//     setSelectedOption('all-results');
//   };

//   const handleClose = () => {
//     setDialog({ open: false, mode: '' });
//   };

//   // New handler for option selection
//   const handleOptionSelect = (optionId) => {
//     setSelectedOption(optionId);
//   };

//   // New handler for download
//   const handleDownload = () => {
//     console.log(`Downloading ${selectedOption}`);
//     handleClose();
//   };

//   return (
//     <>
//       <Card {...other}>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             p: 2,
//             width: '100%',
//           }}
//         >
//           <CardHeader
//             sx={{
//               flex: 1,
//               p: 0,
//             }}
//             title={
//               <Typography
//                 sx={{
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                   whiteSpace: 'nowrap',
//                   maxWidth: '320px',
//                 }}
//                 variant="h6"
//               >
//                 <Tooltip
//                   arrow
//                   placement="top"
//                   disableInteractive
//                   title={`Summary of email verification results for ${title}`}
//                 >
//                   <span>{title}</span>
//                 </Tooltip>
//               </Typography>
//             }
//             subheader={
//               <>
//                 View verification report for this list.{' '}
//                 <Link href="#" target="_blank" rel="noopener noreferrer" underline="always">
//                   Learn more
//                 </Link>
//               </>
//             }
//           />
//           <Tooltip arrow placement="top" disableInteractive title="Click to download report.">
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={() => handleOpen('download')}
//               startIcon={<Iconify width={24} icon="solar:download-minimalistic-bold" />}
//             >
//               Download Report
//             </Button>
//           </Tooltip>
//         </Box>
//         <Divider />

//         {showChart && (
//           <>
//             <Chart
//               type="donut"
//               series={chartSeries}
//               options={{
//                 ...chartOptions,
//                 tooltip: {
//                   y: {
//                     formatter: (value) => fNumber(value),
//                     title: { formatter: (seriesName) => `${seriesName}` },
//                   },
//                 },
//               }}
//               width={{ xs: 240, xl: 260 }}
//               height={{ xs: 240, xl: 260 }}
//               sx={{ my: 6, mx: 'auto' }}
//             />
//             <Divider sx={{ borderStyle: 'dashed' }} />
//             <ChartLegends
//               labels={chartOptions.labels}
//               colors={chartOptions.colors}
//               values={[156454, 12244, 43313, 53345, 78343]} // Add the email counts here
//               totalEmails={188245}
//               sx={{
//                 py: 2,
//                 flexDirection: 'column',
//                 borderTop: '1px dashed',
//                 borderColor: 'divider',
//               }}
//             />
//           </>
//         )}
//         {showChartAlert && <ChartAlert />}
//         {showProgressLinear && <ProgessLinear />}
//       </Card>
//       {/* <Dialog open={dialog.open} onClose={handleClose}>
//         <DialogTitle>
//           {dialog.mode === 'download' && (
//             <>
//               <Typography variant="h6">Download Verification Result</Typography>
//               <Typography variant="body2">
//                 Please note all data and reports associated with this list will be permanently
//                 removed automatically after 15 days.
//               </Typography>
//             </>
//           )}
//         </DialogTitle>

//         {dialog.mode === 'download' && (
//           <Box component="ul" sx={{ mb: 3, listStyleType: 'none', p: 0 }}>
//             {downloadActions.map((downloads) => (
//               <Box key={downloads} component="li" sx={{ display: 'flex' }}>
//                 <ListItemButton onClick={() => handleClose()}>
//                   <IconButton sx={{ mr: 2 }}>
//                     <Iconify width={32} icon="simple-icons:ticktick" />
//                   </IconButton>
//                   <ListItemText primary={downloads} />
//                 </ListItemButton>
//               </Box>
//             ))}
//           </Box>
//         )}

//         {dialog.mode === 'delete' && (
//           <>
//             <DialogTitle>
//               <Typography variant="body2">
//                 The list &quot;Untitled_spreadsheet_-_Sheet1.csv&quot; will be deleted permanently
//                 and cannot be recovered back. Do you want to continue?
//               </Typography>
//             </DialogTitle>
//             <DialogActions>
//               <Button onClick={handleClose} color="inherit">
//                 Cancel
//               </Button>
//               <Button onClick={() => console.log('Item Deleted')} color="error" variant="contained">
//                 Delete
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog> */}
//       <Dialog open={dialog.open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <Box sx={{ position: 'relative', p: 2 }}>
//           {dialog.mode === 'download' && (
//             <>
//               <DialogTitle sx={{ p: 0, mb: 2 }}>
//                 <Typography variant="h6">Download Verification Result</Typography>
//                 <IconButton
//                   onClick={handleClose}
//                   sx={{
//                     position: 'absolute',
//                     right: 8,
//                     top: 8,
//                     color: 'text.secondary',
//                   }}
//                 >
//                   <Iconify icon="eva:close-fill" />
//                 </IconButton>
//               </DialogTitle>

//               <Box sx={{ px: 1 }}>
//                 <Box
//                   sx={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(3, 1fr)',
//                     gap: 2,
//                     mb: 4,
//                   }}
//                 >
//                   {downloadActions.map((action) => (
//                     <Button
//                       key={action.id}
//                       onClick={() => handleOptionSelect(action.id)}
//                       sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         p: 2,
//                         border: 2,
//                         borderColor: selectedOption === action.id ? 'primary.main' : 'divider',
//                         borderRadius: 1,
//                         bgcolor:
//                           selectedOption === action.id ? 'primary.lighter' : 'background.paper',
//                         '&:hover': {
//                           borderColor:
//                             selectedOption === action.id ? 'primary.main' : 'text.secondary',
//                           bgcolor:
//                             selectedOption === action.id ? 'primary.lighter' : 'action.hover',
//                         },
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           p: 1.5,
//                           borderRadius: '50%',
//                           bgcolor:
//                             selectedOption === action.id ? 'background.paper' : 'action.hover',
//                           boxShadow: selectedOption === action.id ? 1 : 0,
//                         }}
//                       >
//                         <Iconify
//                           icon={action.itemIcon}
//                           width={24}
//                           sx={{
//                             color: selectedOption === action.id ? 'primary.main' : 'text.secondary',
//                           }}
//                         />
//                       </Box>
//                       <Typography
//                         sx={{
//                           mt: 1,
//                           color: selectedOption === action.id ? 'primary.main' : 'text.secondary',
//                           fontWeight: selectedOption === action.id ? 500 : 400,
//                         }}
//                       >
//                         {action.itemName}
//                       </Typography>
//                     </Button>
//                   ))}
//                 </Box>

//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                   Please note all data and reports associated with this list will be permanently
//                   removed automatically after 15 days.
//                 </Typography>

//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                   <Button variant="contained" onClick={handleDownload}>
//                     Download CSV
//                   </Button>
//                 </Box>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Dialog>
//     </>
//   );
// }

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import {
  Box,
  Link,
  Dialog,
  Button,
  Tooltip,
  IconButton,
  Typography,
  DialogTitle,
} from '@mui/material';

import { fNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Chart, useChart, ChartLegends } from 'src/components/chart';
import ProgessLinear from 'src/components/progress-bar/progessLinear';

import ChartAlert from './chart-alert';

export function DashboardChart({ title, subheader, showAlert, chart, handleAlertClose, ...other }) {
  const { isUploading, isUploaded, isStartVerification, isVerificationCompleted, progress } =
    useSelector((state) => state.fileUpload);
  const theme = useTheme();

  const [hasShownUploadAlert, setHasShownUploadAlert] = useState(false);
  const [hasShownVerificationAlert, setHasShownVerificationAlert] = useState(false);
  const [dialog, setDialog] = useState({
    open: false,
    mode: '',
  });
  const [selectedOption, setSelectedOption] = useState('all-results');

  const downloadActions = [
    {
      id: 'all-results',
      itemName: 'All Result',
      itemIcon: 'ci:check-all',
    },
    {
      id: 'deliverable',
      itemName: 'Deliverable',
      itemIcon: 'charm:tick',
    },
    {
      id: 'undeliverable',
      itemName: 'Undeliverable',
      itemIcon: 'charm:cross',
    },
  ];

  // Chart related setup
  const showChart =
    (!isUploading && !isUploaded && !isStartVerification && !isVerificationCompleted) ||
    isVerificationCompleted;
  const showProgressLinear = isUploading || (isStartVerification && !isVerificationCompleted);
  const showChartAlert =
    !isUploading && isUploaded && !isStartVerification && !isVerificationCompleted;

  const chartColors = chart.colors ?? [
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.info.main,
    theme.palette.warning.main,
  ];

  const chartSeries = chart.series.map((item) => item.value);
  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chart.series.map((item) => item.label),
    stroke: { width: 0 },
    tooltip: {
      y: {
        formatter: (value) => fNumber(value),
        title: { formatter: (seriesName) => `${seriesName}` },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            value: { formatter: (value) => fNumber(value) },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              },
            },
          },
        },
      },
    },
    ...chart.options,
  });

  // Dialog handlers
  const handleOpen = (mode) => {
    setDialog({ open: true, mode });
    setSelectedOption('all-results'); // Reset selection when opening dialog
  };

  const handleClose = () => {
    setDialog({ open: false, mode: '' });
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleDownload = () => {
    console.log(`Downloading ${selectedOption}`);
    handleClose();
  };

  // Alert effects
  useEffect(() => {
    let alertTimeout;

    if (isUploading && !hasShownUploadAlert) {
      showAlert(
        'info',
        'Notice',
        'The file "Untitled_spreadsheet_-_Sheet1.csv" is under review and will be uploaded in 3-5 minutes. Once the upload is completed, click "Start Verification" to begin the email verification process.',
        'Uploading'
      );
      setHasShownUploadAlert(true);
      alertTimeout = setTimeout(handleAlertClose, 5000);
    } else if (isStartVerification && !hasShownVerificationAlert) {
      showAlert(
        'success',
        'Processing',
        'The email verification is in progress. The Verification in progress button will change to Download button once the verification is complete.',
        'Processing'
      );
      setHasShownVerificationAlert(true);
      alertTimeout = setTimeout(handleAlertClose, 5000);
    }

    return () => {
      if (alertTimeout) {
        clearTimeout(alertTimeout);
      }
    };
  }, [
    isUploading,
    isStartVerification,
    showAlert,
    handleAlertClose,
    hasShownUploadAlert,
    hasShownVerificationAlert,
  ]);

  useEffect(() => {
    if (isVerificationCompleted) {
      setHasShownUploadAlert(false);
      setHasShownVerificationAlert(false);
    }
  }, [isVerificationCompleted]);

  return (
    <>
      <Card {...other}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            width: '100%',
          }}
        >
          <CardHeader
            sx={{
              flex: 1,
              p: 0,
            }}
            title={
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '320px',
                }}
                variant="h6"
              >
                <Tooltip
                  arrow
                  placement="top"
                  disableInteractive
                  title={`Summary of email verification results for ${title}`}
                >
                  <span>{title}</span>
                </Tooltip>
              </Typography>
            }
            subheader={
              <>
                View verification report for this list.{' '}
                <Link href="#" target="_blank" rel="noopener noreferrer" underline="always">
                  Learn more
                </Link>
              </>
            }
          />
          <Tooltip arrow placement="top" disableInteractive title="Click to download report.">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleOpen('download')}
              startIcon={<Iconify width={24} icon="solar:download-minimalistic-bold" />}
            >
              Download Report
            </Button>
          </Tooltip>
        </Box>
        <Divider />

        {showChart && (
          <>
            <Chart
              type="donut"
              series={chartSeries}
              options={{
                ...chartOptions,
                tooltip: {
                  y: {
                    formatter: (value) => fNumber(value),
                    title: { formatter: (seriesName) => `${seriesName}` },
                  },
                },
              }}
              width={{ xs: 240, xl: 260 }}
              height={{ xs: 240, xl: 260 }}
              sx={{ my: 6, mx: 'auto' }}
            />
            <Divider sx={{ borderStyle: 'dashed' }} />
            <ChartLegends
              labels={chartOptions.labels}
              colors={chartOptions.colors}
              values={[156454, 12244, 43313, 53345, 78343]}
              totalEmails={188245}
              sx={{
                py: 2,
                flexDirection: 'column',
                borderTop: '1px dashed',
                borderColor: 'divider',
              }}
            />
          </>
        )}
        {showChartAlert && <ChartAlert />}
        {showProgressLinear && <ProgessLinear />}
      </Card>

      <Dialog open={dialog.open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box sx={{ position: 'relative', p: 2 }}>
          {dialog.mode === 'download' && (
            <>
              <DialogTitle sx={{ p: 0, mb: 2 }}>
                <Typography variant="h6">Download Verification Result</Typography>
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'text.secondary',
                  }}
                >
                  <Iconify icon="eva:close-fill" />
                </IconButton>
              </DialogTitle>

              <Box sx={{ px: 1 }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                    gap: 2,
                    mb: 4,
                    '& > button': {
                      aspectRatio: '1 / 1',
                      width: '100%',
                      height: 'auto',
                    },
                  }}
                >
                  {downloadActions.map((action) => (
                    <Button
                      key={action.id}
                      onClick={() => handleOptionSelect(action.id)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 2,
                        border: 2,
                        borderColor: selectedOption === action.id ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        bgcolor:
                          selectedOption === action.id ? 'primary.lighter' : 'background.paper',
                        '&:hover': {
                          borderColor:
                            selectedOption === action.id ? 'primary.main' : 'text.secondary',
                          bgcolor:
                            selectedOption === action.id ? 'primary.lighter' : 'action.hover',
                        },
                      }}
                    >
                      <Box>
                        <Iconify
                          icon={action.itemIcon}
                          width={24}
                          sx={{
                            color: selectedOption === action.id ? 'primary.main' : 'text.secondary',
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          mt: 1,
                          color: selectedOption === action.id ? 'primary.main' : 'text.secondary',
                          fontWeight: selectedOption === action.id ? 500 : 400,
                        }}
                      >
                        {action.itemName}
                      </Typography>
                    </Button>
                  ))}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Please note all data and reports associated with this list will be permanently
                  removed automatically after 15 days.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" onClick={handleDownload}>
                    Download CSV
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
}
