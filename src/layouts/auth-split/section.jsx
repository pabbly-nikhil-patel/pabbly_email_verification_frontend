import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';

import { CarouselAutoplay } from 'src/sections/carousel/carousel-align';

export function Section({
  sx,
  method,
  layoutQuery,
  method1,
  method2,
  title = 'No Restrictions on Features!',
  subtitle = 'Scale & Grow Your Business with Pabbly.',
  ...other
}) {
  const theme = useTheme();

  const logo = `${CONFIG.site.basePath}/logo/Pabbly SVG.svg`;
  const AicpaImage = `${CONFIG.site.basePath}/assets/icons/platforms/image 11.svg`;
  const IsoImage = `${CONFIG.site.basePath}/assets/icons/platforms/image 10.svg`;

  // Remove `imgUrl` if it exists in `other`
  const { imgUrl, ...filteredOther } = other;

  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, 
        rgba(236, 255, 247, 0.5) 0%,   
        rgba(163, 228, 201, 0.65) 100% 
      )`,
        backgroundSize: 'cover',
        px: 3,
        pb: 0,
        width: '100%',
        maxWidth: 480,
        display: 'none',
        position: 'relative',
        pt: 'var(--layout-header-desktop-height)',
        [theme.breakpoints.up(layoutQuery)]: {
          gap: 2,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        },
        ...sx,
      }}
      {...filteredOther} // Spread the filtered props without `imgUrl`
    >
      <Box
        alignItems="left"
        justifyContent="left"
        position="fixed" // Set the position to relative for the box
      />

      <Box
        width="150px"
        height="42.65px"
        component="img"
        alt="Left"
        src={logo}
        sx={{
          position: 'absolute', // Make the SVG position absolute within the Box
          top: '16px', // Adjust the Y-axis (vertical) position
          left: '24px',
        }}
      />

      <Box>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>

        {subtitle && (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <CarouselAutoplay />

      <Box gap={5} display="flex">
        <Tooltip
          title={
            <Box sx={{ textAlign: 'left' }}>
              {`Pabbly's services are audited and certified for high standards of security, availability, and confidentiality, affirming our commitment to safeguard your data with integrity.`}
            </Box>
          }
          placement="top"
          arrow
        >
          <Box component="img" alt="Side Image" src={AicpaImage} sx={{ width: 80, height: 80 }} />
        </Tooltip>
        <Tooltip
          title={
            <Box sx={{ textAlign: 'left' }}>
              Pabbly adheres to rigorous information security standards, ensuring the protection and
              confidentiality of your data within our automation and integration solutions.
            </Box>
          }
          placement="top"
          arrow
        >
          <Box component="img" alt="Left" src={IsoImage} sx={{ width: 80, height: 80 }} />
        </Tooltip>
      </Box>
    </Box>
  );
}
