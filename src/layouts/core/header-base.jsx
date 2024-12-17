import React from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';

import Searchbar from '../components/searchbar';
import { HeaderSection } from './header-section';
import { MenuButton } from '../components/menu-button';
import { AccountDrawer } from '../components/account-drawer';

const StyledDivider = styled('span')(({ theme }) => ({
  width: 1,
  height: 10,
  flexShrink: 0,
  display: 'none',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: theme.spacing(2.5),
  marginRight: theme.spacing(2.5),
  backgroundColor: 'currentColor',
  color: theme.vars.palette.divider,
  '&::before, &::after': {
    top: -5,
    width: 3,
    height: 3,
    content: '""',
    flexShrink: 0,
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: 'currentColor',
  },
  '&::after': { bottom: -5, top: 'auto' },
}));

export function HeaderBase({
  sx,
  data,
  slots,
  slotProps,
  onOpenNav,
  layoutQuery,

  slotsDisplay: {
    account = true,

    purchase = true,

    menuButton = true,
isNotUpgraded=true,
  } = {},

  ...other
}) {
  const theme = useTheme();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login'; // Adjust this path if your login route is different
  const isReportPage = location.pathname.includes('/app/reports');

  return (
    <HeaderSection
      sx={{
        backgroundColor: 'common.white',
        borderBottom: '1px dashed',
        borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
        ...sx,
      }}
      layoutQuery={layoutQuery}
      slots={{
        ...slots,
        leftAreaStart: slots?.leftAreaStart,
        leftArea: (
          <>
            {slots?.leftAreaStart}

            {menuButton && !isLoginPage && (
              <MenuButton
                data-slot="menu-button"
                onClick={onOpenNav}
                sx={{
                  mr: 1,
                  ml: -1,
                  [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                }}
              />
            )}

            {isLoginPage ? (
              <Logo data-slot="logo" />
            ) : (
              <>
                <Box
                  alt="logo"
                  component="img"
                  src={`${CONFIG.site.basePath}/assets/icons/navbar/PEV_logo.svg`}
                  width={120}
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    zIndex: theme.zIndex.drawer + 1,
                   
                  }}
                />
                <Logo
                  width={30}
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                  }}
                />
              </>
            )}

            {!isLoginPage && <StyledDivider data-slot="divider" />}

            {slots?.leftAreaEnd}
          </>
        ),
        rightArea: (
          <>
            {slots?.rightAreaStart}

            <Box
              data-area="right"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
              }}
            >
             


              {isReportPage && <Searchbar data-slot="searchbar" data={data?.nav} />}
              {isNotUpgraded && <Button variant='contained' size='small' color='error' href='https://www.pabbly.com/email-list-cleaning/#pricing' target='_blank'>Upgrade</Button>}

              {account && (
                <Tooltip title="Click here to see account details." arrow placement="bottom">
                  <span>
                    <AccountDrawer data-slot="account" data={data?.account} />
                  </span>
                </Tooltip>
              )}

              {purchase && (
                <Button
                  data-slot="purchase"
                  variant="contained"
                  rel="noopener"
                  target="_blank"
                  href={paths.minimalStore}
                  sx={{
                    display: 'none',
                    [theme.breakpoints.up(layoutQuery)]: {
                      display: 'inline-flex',
                    },
                  }}
                >
                  Purchase
                </Button>
              )}
            </Box>

            {slots?.rightAreaEnd}
          </>
        ),
      }}
      slotProps={slotProps}
      {...other}
    />
  );
}
