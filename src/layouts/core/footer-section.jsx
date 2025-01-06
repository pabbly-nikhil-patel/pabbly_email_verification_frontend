import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import { layoutClasses } from '../classes';

export function FooterSection({
  sx,
  slots,
  slotProps,
  disableOffset,
  disableElevation,
  layoutQuery = 'md',
  ...other
}) {
  const theme = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <AppBar
      position="sticky"
      className={layoutClasses.header}
      sx={{
        zIndex: 'var(--layout-header-zIndex)',
        ...sx,
      }}
      {...other}
    >
      {slots?.topArea}

      <Container
        {...slotProps?.container}
        sx={{
          height: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        Pabbly © {currentYear}. All Rights Reserved.
      </Container>

      {slots?.bottomArea}
    </AppBar>
  );
}
