// core (MUI)
import { arSA as arSACore } from '@mui/material/locale';
// date pickers (MUI)

// data grid (MUI)
import { arSD as arSDDataGrid } from '@mui/x-data-grid/locales';

// ----------------------------------------------------------------------

export const allLangs = [
  {
    value: 'en',
    label: 'English',
    countryCode: 'GB',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
  },
  {
    value: 'fr',
    label: 'French',
    countryCode: 'FR',
    adapterLocale: 'fr',
    numberFormat: { code: 'fr-Fr', currency: 'EUR' },
  },
  {
    value: 'vi',
    label: 'Vietnamese',
    countryCode: 'VN',
    adapterLocale: 'vi',
    numberFormat: { code: 'vi-VN', currency: 'VND' },
  },
  {
    value: 'cn',
    label: 'Chinese',
    countryCode: 'CN',
    adapterLocale: 'zh-cn',
    numberFormat: { code: 'zh-CN', currency: 'CNY' },
  },
  {
    value: 'ar',
    label: 'Arabic',
    countryCode: 'SA',
    adapterLocale: 'ar-sa',
    numberFormat: { code: 'ar', currency: 'AED' },
    systemValue: {
      components: { ...arSACore.components, ...arSDDataGrid.components },
    },
  },
];

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
