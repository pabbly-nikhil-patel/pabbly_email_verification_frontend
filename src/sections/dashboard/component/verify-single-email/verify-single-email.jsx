import React from 'react';

import {
  Box,
  Card,
  Button,
  Divider,
  Tooltip,
  TextField,
  CardHeader,
  Typography,
  CardActions,
  CardContent,
} from '@mui/material';

export default function VerifySingleEmail({ onVerify, email, setEmail }) {
  return (
    <Card>
      <CardHeader
        sx={{ pb: 3 }}
        title={
          <Box display="inline-block">
            <Tooltip title="Easily verify a single email address here." arrow placement="top">
              <Typography variant="h6">Verify Single Email</Typography>
            </Tooltip>
          </Box>
        }
        subheader="Verify single email to check email is valid or not."
      />
      <Divider />
      <CardContent>
        <TextField
          label="Enter Email"
          fullWidth
          placeholder="Enter an email address you want to verify"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="Enter an email address you want to verify"
        />
      </CardContent>
      <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Tooltip title="Click to verify the email address.">
          <Button
            variant="contained"
            color="primary"
            onClick={onVerify}
            disabled={!email.trim()} // Disable button if email is empty
          >
            Verify
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
