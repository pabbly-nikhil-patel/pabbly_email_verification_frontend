import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export const StyledLegend = styled(Box)(({ theme }) => ({
  gap: 8,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  padding: '8px 0',
}));

export const StyledDot = styled(Box)(() => ({
  width: 12,
  height: 12,
  flexShrink: 0,
  display: 'inline-block',
  borderRadius: '50%',
  backgroundColor: 'currentColor',
}));

// ----------------------------------------------------------------------

const tooltipDescriptions = {
  'Total Emails': 'Total number of emails processed in verification.',
  Deliverable: 'Total number of emails deliverable in verification.',
  'Accept-all': 'Total number of emails accepted in verification.',
  Undeliverable: 'Total number of emails undeliverable in verification.',
  Unknown: 'Total number of emails unknown in verification.',
};

export function ChartLegends({ labels = [], colors = [], values = [], totalEmails, ...other }) {
  const allLabels = ['Total Emails', ...labels];
  const allValues = [totalEmails, ...values];

  return (
    <Stack spacing={0} width="100%" px={3} {...other}>
      {allLabels?.map((label, index) => (
        <StyledLegend
          sx={{
            borderBottom: index === 0 ? '1px dashed' : 'none',
            borderColor: 'divider',
            pb: index === 0 ? 2 : 1,
            pt: index === 1 ? 2 : 1,
          }}
        >
          <Tooltip key={label} title={tooltipDescriptions[label] || ''} arrow placement="left">
            <Box display="flex" alignItems="center" gap={1}>
              {index !== 0 && <StyledDot sx={{ color: colors[index - 1] }} />}
              <Typography fontSize="14px" fontWeight={index === 0 ? 800 : 600}>
                {label}
              </Typography>
            </Box>
          </Tooltip>
          <Typography fontSize="14px" fontWeight={index === 0 ? 800 : 400}>
            {allValues[index]?.toLocaleString()}
          </Typography>
        </StyledLegend>
      ))}
    </Stack>
  );
}
