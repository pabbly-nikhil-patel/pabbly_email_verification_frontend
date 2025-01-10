import { styled } from '@mui/material/styles';
import { Box, Stack, Tooltip, Typography } from '@mui/material';

const StyledLegend = styled(Box)(({ theme }) => ({
  gap: 8,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  padding: '8px 0',
}));

const StyledDot = styled(Box)(() => ({
  width: 12,
  height: 12,
  flexShrink: 0,
  display: 'inline-block',
  borderRadius: '50%',
  backgroundColor: 'currentColor',
}));

const getTooltipDescription = (label) => {
  const descriptions = {
    'Total Emails': 'Total number of emails processed in verification',
    'Deliverable Emails': ' These emails are verified as valid and are safe for sending.',
    'Undeliverable Emails': 'These emails are invalid. Remove them from your list to avoid bounces.',
    'Accept-all Emails': 'The domain accepts all emails but does not guarantee individual validity.',
    'Unknown Emails': 'Unable to verify these emails due to technical limitations or domain restrictions.'
  };
  
  return descriptions[label] || `Statistics for ${label}`;
};

export function ChartLegends({ labels = [], colors = [], values = [], totalEmails, ...other }) {
  const allLabels = ['Total Emails', ...labels];
  const allValues = [totalEmails, ...values];

  return (
    <Stack spacing={0} width="100%" px={3} {...other}>
      {allLabels?.map((label, index) => (
        <Tooltip 
          key={label} 
          title={getTooltipDescription(label)}
          arrow 
          placement="left"
        >
          <StyledLegend
            sx={{
              borderBottom: index === 0 ? '1px dashed' : 'none',
              borderColor: 'divider',
              pb: index === 0 ? 2 : 1,
              pt: index === 1 ? 2 : 1,
              '&:hover': {
                bgcolor: 'action.hover',
                cursor: 'pointer',
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              {index !== 0 && <StyledDot sx={{ color: colors[index - 1] }} />}
              <Typography 
                fontSize="14px" 
                fontWeight={index === 0 ? 800 : 600}
              >
                {label}
              </Typography>
            </Box>
            <Typography 
              fontSize="14px" 
              fontWeight={index === 0 ? 800 : 400}
            >
              {allValues[index]?.toLocaleString()}
            </Typography>
          </StyledLegend>
        </Tooltip>
      ))}
    </Stack>
  );
}