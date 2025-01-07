import React, { useState } from 'react';

import {
  Box,
  Card,
  Link,
  Button,
  Divider,
  Tooltip,
  TextField,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';

const VerifySingleEmail = ({ onVerify }) => {
  const [email, setEmail] = useState(''); // email state here
  const [error, setError] = useState('');

  const validateEmail = (validemail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(validemail);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value); // updating the email state

    if (value && !validateEmail(value)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };

  const handleVerify = () => {
    if (validateEmail(email)) {
      onVerify(email); // pass email to onVerify
    } else {
      setError('Please enter a valid email address');
    }
  };

  return (
    <Card>
      <CardHeader
        sx={{ pt: 3, px: 3, pb: 2 }}
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Verify Single Email
            </Typography>
            <Tooltip title="Easily verify a single email address here" arrow placement="top">
              {/* <InfoIcon fontSize="small" color="action" /> */}
            </Tooltip>
          </Box>
        }
        subheader={
          <Box sx={{ mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Verify single email to check email is valid or not.{' '}
              <Link href="#" underline="always" onClick={(e) => e.preventDefault()}>
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
          value={email} // using email state
          onChange={handleEmailChange} // handling email input change
          error={!!error}
          helperText={
            error || (
              <span>
                Enter an email address you want to verify.{' '}
                <Link href="#" underline="always" onClick={(e) => e.preventDefault()}>
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
          }}
        >
          <Button
            variant="contained"
            onClick={handleVerify}
            color="primary"
            sx={{
              minWidth: 120,
              borderRadius: 1,
              // opacity: validateEmail(email) ? 1 : 0.7,
            }}
          >
            Verify
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VerifySingleEmail;
