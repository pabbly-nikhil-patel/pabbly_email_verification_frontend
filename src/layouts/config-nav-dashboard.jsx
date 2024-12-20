import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  reports: icon('ic-reports'),
  credits: icon('ic-credit'),
  gethelp: icon('ic-gethelp'),
  settings: icon('ic-settings'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    items: [
      { title: 'Dashboard', path: paths.app.root, icon: ICONS.dashboard },
      { title: 'Reports', path: paths.app.reports, icon: ICONS.reports },
      // { title: 'Credits', path: paths.app.credits, icon: ICONS.credits },
    ],
  },
  {
    items: [
      {
        title: 'Settings',
        path: paths.app.settings.root,
        icon: ICONS.settings,
        children: [
          { title: 'Credits Summary', path: paths.app.settings.credits },
          { title: 'Time Zone', path: paths.app.settings.timezone },
        ],
      },
    ],
  },
  {
    items: [{ title: 'Get Help', path: paths.app.gethelp, icon: ICONS.gethelp }],
  },
];
