import 'simplebar-react/dist/simplebar.min.css';

import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';

import {
  Box,
  List,
  Link,
  Popover,
  Divider,
  Tooltip,
  ListItem,
  TextField,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

const applications = [
  {
    title: 'View All Applications',
    icon: '/assets/icons/appsicon/allapps.svg',
    tooltip: 'Click here to see all Pabbly applications.',
    link: 'https://accounts.pabbly.com/apps',
  },
  {
    title: 'Pabbly Connect',
    icon: '/assets/icons/appsicon/connect.svg',
    tooltip: 'Integrate different applications and start automating your work.',
    link: 'https://accounts.pabbly.com/backend/access?project=connect',
  },
  {
    title: 'Pabbly Subscription Billing',
    icon: '/assets/icons/appsicon/billing 2.svg',
    tooltip: 'Start accepting one-time and recurring subscription payments.',
    link: 'https://accounts.pabbly.com/backend/access?project=pabbly-subscriptions',
  },
  {
    title: 'Pabbly Email Marketing',
    icon: '/assets/icons/appsicon/pem 2.svg',
    tooltip: 'Send email newsletters to your subscribers and customers.',
    link: 'https://accounts.pabbly.com/backend/access?project=mailget',
  },
  {
    title: 'Pabbly Form Builder',
    icon: '/assets/icons/appsicon/pfb 2.svg',
    tooltip: 'Create professional forms for your business with no code builder.',
    link: 'https://accounts.pabbly.com/backend/access?project=formget',
  },
  {
    title: 'Pabbly Email Verification',
    icon: '/assets/icons/appsicon/pev 2.svg',
    tooltip: 'Verify your email list to remove invalid and bad emails.',
    link: 'https://accounts.pabbly.com/backend/access?project=emailverify',
  },
  {
    title: 'Pabbly Hook',
    icon: '/assets/icons/appsicon/hook 1.svg',
    tooltip: 'Webhook event handling for scalable applications.',
    link: 'https://accounts.pabbly.com/backend/access?project=hooks',
  },
  {
    title: 'Pabbly Chatflow',
    icon: '/assets/icons/appsicon/chatflow.svg',
    tooltip: 'Automate WhatsApp conversation effortlessly.',
    link: 'https://accounts.pabbly.com/backend/access?project=chatflow',
  },
];

export default function PabblyAppsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm(''); // Clear search when closing popover
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredApplications = applications.filter((app) =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const open = Boolean(anchorEl);
  const id = open ? 'pabbly-popover' : undefined;

  return (
    <>
      <Tooltip title="Click here to access other apps from pabbly." arrow placement="bottom">
        <IconButton
          onClick={handleClick}
          sx={{
            width: 40,
            height: 40,
            mr: 0,
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Iconify icon="bi:grid-3x3-gap-fill" style={{ width: 22, height: 22 }} />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          // maxHeight: 500,
          mt: 1.5,
          ml: 0.75,
          width: 'auto',
          '& .MuiPopover-paper': {
            width: 300,
            backgroundColor: 'background.paper',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column', // Added to enable proper sticky header
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
          {/* Fixed Header Section */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              // backgroundColor: 'background.paper',
              zIndex: 1,
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
          >
            <Box sx={{ px: 2, pb: 1.5 }}>
              <Tooltip
                title=" Search and access any Pabbly application instantly."
                arrow
                placement="left"
              >
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    fontSize: '15px',
                    padding: '16px 16px 16px 0px',
                  }}
                >
                  Search Application
                </Typography>
              </Tooltip>
              <TextField
                fullWidth
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify
                        icon="eva:search-fill"
                        sx={{ color: 'text.disabled', width: 20, height: 20 }}
                      />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 1,
                    '& fieldset': {
                      borderColor: (theme) => theme.palette.divider,
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>
            <Divider />
          </Box>

          {/* Scrollable Content Section */}
          <SimpleBar style={{ overflow: 'auto', flexGrow: 1, maxHeight: 400 }}>
            <List sx={{ mt: 1, mb: 1 }}>
              {filteredApplications.map((app, index) => (
                <Tooltip
                  key={`${app.title}-${index}`} // Added key here
                  title={app.tooltip}
                  placement="left"
                  arrow
                  disableInteractive
                >
                  <Link
                    sx={{
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'none', // Ensures no underline on hover
                      },
                    }}
                    href={app.link}
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer" // Improves security
                  >
                    <ListItem
                      key={index}
                      sx={{
                        mb: '4px',
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: 'action.hover',
                          cursor: 'pointer',
                        },
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <ListItemIcon>
                        <Box
                          component="img"
                          src={app.icon}
                          alt={app.title}
                          sx={{
                            width: 26,
                            height: 26,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={app.title}
                        sx={{
                          '& .MuiTypography-root': {
                            fontWeight: 600,
                            fontSize: 14,
                            color: 'text.primary',
                          },
                        }}
                      />
                    </ListItem>
                  </Link>
                </Tooltip>
              ))}

              {filteredApplications.length === 0 && (
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                    py: 2,
                  }}
                >
                  No application found
                </Typography>
              )}
            </List>
          </SimpleBar>
        </Box>
      </Popover>
    </>
  );
}
