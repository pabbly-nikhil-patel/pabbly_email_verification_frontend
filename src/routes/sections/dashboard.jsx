import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';


// ----------------------------------------------------------------------

const DashboardPage = lazy(() => import('src/pages/app/dashboard'));
const ReportsPage = lazy(() => import('src/pages/app/reports'));
const CreditsPage = lazy(() => import('src/pages/app/credits'));
const GetHelpPage = lazy(() => import('src/pages/app/credits'));



// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'app',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <DashboardPage />, index: true },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'credits', element: <CreditsPage /> },
      { path: 'gethelp', element: <GetHelpPage /> },

   
    ],
  },
];
