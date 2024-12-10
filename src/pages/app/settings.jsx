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
      value: 'timzone',
      path: '/app/settings/timezone',
      icon: <Iconify icon="icons8:tasks" width={24} />,
      label: 'Time Zone',
      tooltip: 'Choose time zone',
      pageTitle: 'Time Zone',
      pageSubheading: 'Manage your account time zone settings.',
    },
    {
      value: 'api',
      path: '/app/settings/api',
      icon: <Iconify icon="icons8:tasks" width={24} />,
      label: 'API',
      tooltip: 'View the API',
      pageTitle: 'API',
      pageSubheading: 'You can obtain your Pabbly API token from here.',
    },

    // ... more tabs
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
