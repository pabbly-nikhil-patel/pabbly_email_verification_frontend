import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
 reports: icon('ic-reports'),
  credits: icon('ic-credit'),
  dashboard: icon('ic-dashboard'),
  gethelp: icon('ic-gethelp'),
 
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview 6.0.0',
    items: [
      { title: 'Dashboard', path: paths.app.root, icon: ICONS.dashboard },
      { title: 'Reports', path: paths.app.reports, icon: ICONS.reports },
      { title: 'Credits', path: paths.app.credits, icon: ICONS.credits },
      { title: 'Get Help', path: paths.app.gethelp, icon: ICONS.gethelp },
    ],
  },
];
