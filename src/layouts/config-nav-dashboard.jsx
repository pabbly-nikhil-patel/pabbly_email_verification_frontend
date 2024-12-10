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
      { title: 'One', path: paths.app.root, icon: ICONS.one },
      { title: 'Two', path: paths.app.two, icon: ICONS.two },
      { title: 'Three', path: paths.app.three, icon: ICONS.three },
    ],
  },

  {
    items: [
      {
        title: 'Settings',
        path: paths.app.settings.root,
        icon: ICONS.settings,
        children: [
          { title: 'Time Zone', path: paths.app.settings.timezone },
          { title: 'API', path: paths.app.settings.api },
  
        ],
      },
    ],
  },
];
