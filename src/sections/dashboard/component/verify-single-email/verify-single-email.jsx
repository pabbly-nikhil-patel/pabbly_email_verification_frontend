import React from 'react';

import {
  Box,
  Button,
  Divider,
  Tooltip,
  TextField,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';

export default function VerifySingleEmail({ onVerify, email, setEmail }) {
  return (
    <Box>
      <CardHeader
        sx={{
          pt: 3,
          px: 3,
          pb: 2,
        }}
        title={
          <Box display="inline-block">
            <Tooltip title="Easily verify a single email address here." arrow placement="top">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Verify Single Email
              </Typography>
            </Tooltip>
          </Box>
        }
        subheader="Verify single email to check email is valid or not"
      />
      <Divider />
      <CardContent sx={{ p: 3 }}>
        <TextField
          label="Enter Email"
          fullWidth
          placeholder="Enter an email address you want to verify"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="Enter an email address you want to verify"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            },
          }}
        />
      </CardContent>
      <Box
        sx={{
          px: 3,
          pb: 3,
          pt: 0,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onVerify}
          disabled={!email.trim()}
          sx={{
            minWidth: 120,
            borderRadius: 1,
          }}
        >
          Verify
        </Button>
      </Box>
    </Box>
  );
}
