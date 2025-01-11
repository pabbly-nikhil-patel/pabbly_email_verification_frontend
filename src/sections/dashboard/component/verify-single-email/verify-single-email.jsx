import React, { useState } from 'react';

import {
  Box,
  Card,
  Link,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';

const VerifySingleEmail = ({ onVerify, email, setEmail, onClose }) => {
  const [error, setError] = useState('');

  const validateEmail = (validemail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(validemail);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };

  const handleVerify = () => {
    if (validateEmail(email)) {
      onVerify(email);
    } else {
      setError('Please enter a valid email address');
    }
  };

  return (
    <Card>
      <CardHeader
        sx={{ pt: 3, px: 3, pb: 2 }}
        title={
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Verify Single Email
              </Typography>
            </Box>
          </Box>
        }
        subheader={
          <Box sx={{ mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Check if an email address is valid and deliverable.{' '}
              <Link
                href="https://forum.pabbly.com/threads/verify-single-email.26319/"
                target="_blank"
                underline="always"
              >
                Learn more
              </Link>
            </Typography>
          </Box>
        }
      />
      <Divider />
      <CardContent sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Enter Email"
          placeholder="Enter an email address you want to verify"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={!!error}
          helperText={
            error || (
              <span>
                Enter an email address you want to verify.{' '}
                <Link
                  href="https://forum.pabbly.com/threads/verify-single-email.26319/"
                  underline="always"
                  target="_blank"
                >
                  Learn more
                </Link>
              </span>
            )
          }
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            },
          }}
        />
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Button variant="contained" onClick={handleVerify} color="primary">
            Verify
          </Button>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VerifySingleEmail;
