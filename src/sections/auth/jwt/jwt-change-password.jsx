import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {Card, Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export const SignInSchema = zod
  .object({
    password: zod
      .string()
      .min(1, { message: 'Password is required!' })
      .min(6, { message: 'Password must be at least 6 characters!' }),
    confirmpassword: zod
      .string()
      .min(1, { message: 'Confirm Password is required!' }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ['confirmpassword'], // Where to show the error
    message: 'Passwords do not match!', // Error message
  });

// ----------------------------------------------------------------------

export function JwtConfirm() {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);

   

  };


  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();
  const confirmpassword = useBoolean();
  const theme = useTheme();


  // const defaultValues = {
  //   email: 'demo@minimals.cc',
  //   password: '@demo1',
  // };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    // defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await signInWithPassword({ email: data.email, password: data.password });
      // await checkUserSession?.();
      handleOpenSnackbar()

      setTimeout(()=>{
        router.push(paths.auth.jwt.signIn)
      },5000)
     

      

  

      // router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderHead = (
    <Stack spacing={0} sx={{ mb: 3 }}>
      <Typography variant="h5">Forgot Password</Typography>
    
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text
        name="password"
        label="Password"
        // placeholder="Enter Password"
        type={password.value ? 'text' : 'password'}
   
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={
                  password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      
      />
  
      <Field.Text
        name="confirmpassword"
        label="Re-enter Password"
        // placeholder="Confirm Password"
        type={confirmpassword.value ? 'text' : 'password'}
      
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={confirmpassword.onToggle} edge="end">
                <Iconify icon={confirmpassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}

      />
  
      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Login..."
      >
     Change Password
      </LoadingButton>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
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

          Your password has been changed successfully. Use your new password to <Link component={RouterLink}  href={paths.auth.jwt.signIn} >Login here</Link>
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
          Remember your password?
        </Typography>
        <Link
          component={RouterLink}
          href={paths.auth.jwt.signIn}
          variant="subtitle2"
          color="primary"
          sx={{ alignSelf: 'center' }} // Aligns this item to the center
        >
          Login
        </Link>
      </Stack>
    </Stack>
  );
  

  return (
  

    <Card sx={{p:4,textAlign:"center"}}>
    {renderHead}



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
