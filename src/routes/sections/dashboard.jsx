import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const DashboardPage = lazy(() => import('src/pages/app/dashboard'));
const ReportsPage = lazy(() => import('src/pages/app/reports'));
const GetHelpPage = lazy(() => import('src/pages/app/get-help'));
const Settings = lazy(() => import('src/pages/app/settings'));
const CreditsPage = lazy(() => import('src/sections/settings-page/credits'));
const TimeZone = lazy(() => import('src/sections/settings-page/time-zone'));
const Api = lazy(() => import('src/sections/settings-page/api'));
const TeamMembers = lazy(() => import('src/sections/settings-page/team-members'));

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
      // { path: 'credits', element: <CreditsPage /> },
      { path: 'gethelp', element: <GetHelpPage /> },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          // { element: <PageFour />, index: true },
          { path: 'credits', element: <CreditsPage /> },
          { path: 'timezone', element: <TimeZone /> },
          { path: 'api', element: <Api /> },
          { path: 'team-members', element: <TeamMembers /> },
        ],
      },
    ],
  },
];
