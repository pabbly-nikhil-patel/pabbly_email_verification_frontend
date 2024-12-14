import { Box, Alert, Button, Typography } from '@mui/material';

export default function ChartAlert( {onStartVerification }) {
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
      <Button color="primary" sx={{ mt: 2 }} onClick={onStartVerification}>
        Start Verification
      </Button>
    </Box>
  );
}
