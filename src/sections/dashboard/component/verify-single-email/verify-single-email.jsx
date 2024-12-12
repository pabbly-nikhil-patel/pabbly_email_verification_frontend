import React from 'react';

import {
  Card,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardActions,
  CardContent,
} from '@mui/material';

export default function VerifySingleEmail({ onVerify, email, setEmail }) {
  return (
    <Card sx={{ mt: 3 }}>
        <CardHeader
          sx={{ pb: 3 }}
          title={<Typography variant="h6">Verify Single Email</Typography>}
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
        <CardActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onVerify}
            disabled={!email.trim()} // Disable button if email is empty
          >
            Verify
          </Button>
        </CardActions>
      </Card>
  );
}
