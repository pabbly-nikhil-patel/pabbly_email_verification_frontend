import { z as zod } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Card, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';
import { signInWithPassword } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
 
});

// ----------------------------------------------------------------------

export function JwtForgotpassword() {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);

    router.push(paths.auth.jwt.confirm)

  };

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: '@demo1',
  };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderHead = (
    <Stack spacing={0} sx={{ mb: 3 }}>
      <Typography variant="h5">Forgot Password</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Don&apos;t worry. We&apos;ll email reset link.
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2}>
      <Field.Text name="email" label="Email Address" />

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        // type="submit"
        variant="contained"
        // loading={isSubmitting}
        // href={paths.auth.jwt.rest}
        onClick={handleOpenSnackbar}
        // loadingIndicator="Reset password..."
      >
        Reset Link
      </LoadingButton>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{mt:6}}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            
            width: {xs:'100%',sm:'60%',md:'60%'},
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
            color: theme.palette.text.primary,
            textAlign:"left"
          }}
        >
          <Typography 
          variant='body2'>

          If your email is in our database, you&apos;ll receive a password recovery link
          shortly.
          </Typography>
    
        </Alert>
      </Snackbar>

      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="center" // Centers content horizontally
        alignItems="center" // Centers content vertically
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Remember your password? <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
          Login
        </Link>
        </Typography>

        
      </Stack>
      {/* <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="body2"
          color="inherit"
          sx={{ alignSelf: 'center' }}>
         return to sign in
        </Link>  */}
    </Stack>
  );

  return (
    <Card sx={{p:4,textAlign:"center"}}>
      {renderHead}

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use <strong>demo@pabbly.com</strong>
        {' with password '}
        <strong>{defaultValues.password}</strong>
      </Alert> */}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
      </Card>
  );
}
