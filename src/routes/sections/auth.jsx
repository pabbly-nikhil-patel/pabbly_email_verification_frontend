import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

/** **************************************
 * Jwt
 *************************************** */
const Jwt = {
  SignInPage: lazy(() => import('src/pages/auth/jwt/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/jwt/sign-up')),
  ForgotPasswordPage: lazy(() => import('src/pages/auth/jwt/forgot-password')),
  ChangePaswordPage: lazy(() => import('src/pages/auth/jwt/changepassword')),

};

const authJwt = {
  path: 'jwt',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthSplitLayout section={{ title: 'No Restrictions on Features!' }}>
            <Jwt.SignInPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <GuestGuard>
          <AuthSplitLayout>
            <Jwt.SignUpPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'forgot-password',
      element: (
        <GuestGuard>
          <AuthSplitLayout section={{ title: 'No Restrictions on Features!' }}>
            <Jwt.ForgotPasswordPage/>
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'confirm',
      element: (
        <GuestGuard>
           <AuthSplitLayout section={{ title: 'No Restrictions on Features!' }}>
            <Jwt.ChangePaswordPage/>
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },

  ],
};

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [authJwt],
  },
];
