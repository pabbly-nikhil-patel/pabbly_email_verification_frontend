import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Card,  Button, Divider, SvgIcon } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';
import { signInWithPassword } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

const GoogleIcon = () => (
  <SvgIcon viewBox="0 0 48 48">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
    <path fill="none" d="M0 0h48v48H0z" />
  </SvgIcon>
);

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {


  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

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
    <Stack spacing={0} mb={1}>
      <Typography variant="h5">Login to Pabbly Account</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary',mb:2 }}>
          Login in seconds. No credit card required.
        </Typography>

      <Stack direction="row" mb={1.5}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            backgroundColor: 'white',
            border: '1px solid #747775',
            height: '40px',
            '&:hover': {
              boxShadow: '0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15)',
              backgroundColor: '#f8f9fa',
            },
          }}
        >
          Login with Google
        </Button>
      </Stack>
      <Divider>or</Divider>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2}>
      <Field.Text name="email" label="Email Address" />

      <Stack spacing={1.5}>
        {/* <Link
          component={RouterLink}
          href={paths.auth.jwt.forgotpassword}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          Forgot password?
        </Link> */}

        <Field.Text
          name="password"
          label="Password"
          // placeholder="Enter Password"
          type={password.value ? 'text' : 'password'}
        
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Login..."
      >
        Login
      </LoadingButton>
      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="center" // Centers content horizontally
        alignItems="center" // Centers content vertically
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Unable to login?
        </Typography>
        <Link
          component={RouterLink}
          href={paths.auth.jwt.forgotpassword}
          variant="subtitle2"
          color="primary"
          sx={{ alignSelf: 'center' }} // Aligns this item to the center
        >
          Forgot Password
        </Link>
      </Stack>
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
