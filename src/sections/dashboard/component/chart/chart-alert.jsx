import { useDispatch } from 'react-redux';

import { Box, Alert, Button, Typography } from '@mui/material';

import { startVerification } from 'src/redux/slice/upload-slice';

export default function ChartAlert() {
  const dispatch = useDispatch();

  const handleStartVerification = () => {
    dispatch(startVerification()); // Dispatch action to reset isUploaded and start verification
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Stack items vertically
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center verticall
        mb: 1.5,
      }}
    >
      <Alert severity="success" variant="outlined" onClose={() => {}}>
        <Typography variant="body1" fontWeight={600}>
          Uploaded Successfully
        </Typography>
      </Alert>
      <Button color="primary" sx={{ mt: 2 }} onClick={handleStartVerification}>
        Start Verification
      </Button>
    </Box>
  );
}
