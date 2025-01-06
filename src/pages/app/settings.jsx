import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import CustomTabs from 'src/components/custom-tabs/custom-tabs';

// ----------------------------------------------------------------------
const metadata = { title: `Page Settings | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const EXAMPLE_TABS = [
    {
      value: 'credits',
      path: '/app/settings/credits',
      icon: <Iconify icon="icons8:tasks" width={24} />,
      label: 'Credits Summary',
      tooltip: 'Click to view credit summary.',
      pageTitle: 'Credits Summary',
      pageSubheading: 'View a summary of your email verification credits.',
    },
    {
      value: 'api',
      path: '/app/settings/api',
      icon: <Iconify icon="icon-park-solid:api" width={24} />,
      label: 'API',
      tooltip: 'View credit activity based on your time zone here.',
      pageTitle: 'API',
      pageSubheading: 'Manage your account time zone settings.',
    },
    {
      value: 'timzone',
      path: '/app/settings/timezone',
      icon: <Iconify icon="icons8:tasks" width={24} />,
      label: 'Time Zone',
      tooltip: 'View credit activity based on your time zone here.',
      pageTitle: 'Time Zone',
      pageSubheading: 'Manage your account time zone settings.',
    },
  ];
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <DashboardContent maxWidth="xl">
        <CustomTabs
          tabs={EXAMPLE_TABS}
          defaultTab="timezone"
          defaultPath="/app/settings/timezone"
          dashboardContentProps={{ maxWidth: 'xl' }}
        />
      </DashboardContent>
    </>
  );
}
