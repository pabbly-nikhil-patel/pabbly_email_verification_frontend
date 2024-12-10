import { Box, Card, Tooltip, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { SvgColor } from '../svg-color';

export default function StatsCards({
  sx,
  cardtitle,
  cardstats,
  icon_name,
  icon_color,
  bg_gradient,
  ...other
}) {
  return (
    <Tooltip title="Number of WhatsApp message alloted to you." arrow placement="top" disableInteractive>
      <div>
        <Card
          sx={{
            boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
            py: 3,
            pl: 3,
            pr: 2.5,
            ...sx,
          }}
          {...other}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ typography: 'h3' }}>{cardstats}</Box>
            <Typography noWrap variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
              {cardtitle}
            </Typography>
          </Box>

          <SvgColor
            src={`${CONFIG.site.basePath}/assets/icons/stats-card/${icon_name}`}
            sx={{
              top: 24,
              right: 20,
              width: 36,
              height: 36,
              position: 'absolute',
              background: icon_color,
            }}
          />

          <Box
            // icon={`${CONFIG.site.basePath}/assets/icons/courses/whatsapp-icon.svg`}
            sx={{
              top: -44,
              width: 160,
              zIndex: -1,
              height: 160,
              right: -104,
              opacity: 0.12,
              borderRadius: 3,
              position: 'absolute',
              transform: 'rotate(40deg)',
              background: `linear-gradient(120deg,${bg_gradient} 0%, #FFFFFF 100%)`,
            }}
          />
        </Card>
      </div>
    </Tooltip>
  );
}
