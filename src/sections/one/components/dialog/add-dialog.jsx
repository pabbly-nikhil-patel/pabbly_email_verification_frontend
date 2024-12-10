import { Box, Link, List, MenuItem, TextField, Typography } from "@mui/material";

import { CustomDialog } from "src/components/custom-dialog/custom-dialog";

export default function AddDialog({addDialogOpen,handleDialogClose,action}){
    
    const commonTypographyStyle = {
        fontSize: '14px',
        // color: 'grey.800',
        '[data-mui-color-scheme="light"] &': {
          color: 'grey.800',
        },
        '[data-mui-color-scheme="dark"] &': {
          color: 'var(--palette-text-secondary)',
        },
        mt: 1,
        ml: '0px',
      };
    
      // Define common styles
      const commonListStyle = {
        paddingLeft: '8px',
        // color: 'grey.600',
        '[data-mui-color-scheme="light"] &': {
          color: 'grey.600',
        },
        '[data-mui-color-scheme="dark"] &': {
          color: 'var(--palette-text-secondary)',
        },
        fontSize: '12px',
      };
    
      const commonListItemStyle = {
        marginBottom: '8px',
        fontSize: '12px',
        fontWeight: '500',
        listStyleType: 'disc',
        listStylePosition: 'outside',
        color: 'grey.800',
      };
      const commonBoxStyle = { ml: '14px' };
    return(
        <CustomDialog
        open={addDialogOpen}
        onClose={handleDialogClose}
        title="Dialog"
        content={
          <>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                autoFocus
                fullWidth
                type="email"
                margin="dense"
                variant="outlined"
                label="Email Address"
                helperText={
                  <span>
                    Ensure that the email address is already registered with Pabbly.{' '}
                    <Link href="#" style={{ color: '#078DEE' }} underline="always">
                      Learn more
                    </Link>
                  </span>
                }
              />
              <TextField
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label="Number of tasks to be allotted"
                helperText={
                  <span>
                    Enter the total number of tasks that should be assigned to the team.{' '}
                    <Link href="#" style={{ color: '#078DEE' }} underline="always">
                      Learn more
                    </Link>
                  </span>
                }
              />
              <TextField
                sx={{ width: '100%' }}
                id="select-currency-label-x"
                variant="outlined"
                select
                fullWidth
                label="Task Type"
                helperText="Task type is required"
              >
                {[
                  { value: 'Select', label: 'Select' },
                  { value: 'Revocable', label: 'Revocable' },
                  { value: 'Non-Revocable', label: 'Non-Revocable' },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <span>
              <Box sx={commonBoxStyle}>
                <Typography variant="subtitle1" sx={commonTypographyStyle}>
                  Points To Remember!
                </Typography>

                <List sx={{ ...commonListStyle, mb: 0 }}>
                  <ul style={commonListStyle}>
                    {[
                      'Revocable means the task assigned can be revoked.',
                      'Non-revocable means the task assigned cannot be revoked.',
                      'Tasks will be deduct from your account immediately once you assign task to sub- accounts.',
                      'The task will reset at 1st of every month for the sub-account holders.',
                      'If you revoke the tasks from any sub-accounts, those tasks will be added to your account from the start of next month.',
                    ].map((text, index) => (
                      <li key={index} style={commonListItemStyle}>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </List>
              </Box>
            </span>
          </>
        }
        action={action}
      />
    )
}