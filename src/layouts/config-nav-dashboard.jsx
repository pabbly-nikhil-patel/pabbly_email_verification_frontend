import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {

  settings: icon('ic-user'),
 
  two: icon('ic-ecommerce'),
  three: icon('ic-analytics'),
  one: icon('ic-user'),
 
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview 6.0.0',
    items: [
      { title: 'Dashboard', path: paths.app.root, icon: ICONS.one },
      { title: 'Reports', path: paths.app.reports, icon: ICONS.two },
      { title: 'Credits', path: paths.app.credits, icon: ICONS.three },
      { title: 'Get Help', path: paths.app.gethelp, icon: ICONS.three },
    ],
  },
];
