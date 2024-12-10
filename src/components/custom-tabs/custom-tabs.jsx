import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { Box, Tab, Tabs, Tooltip } from '@mui/material';

import PageHeader from '../page-header/page-header';

export default function CustomTabs({
  tabs = [], // Default to an empty array if tabs is not passed
  defaultTab,
  defaultPath,
  dashboardContentProps = {},
  pageHeaderProps = {},
  tabsProps = {}
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // If no path matches, redirect to default tab
  React.useEffect(() => {
    if (!tabs.some((tab) => tab.path === location.pathname)) {
      navigate(defaultPath);
    }
  }, [location.pathname, navigate, tabs, defaultPath]);

  // Get current tab from URL or use default
  const currentTab =
    tabs.find((tabItem) => location.pathname === tabItem.path)?.value || defaultTab;

  const handleTabChange = (event, newValue) => {
    const selectedTab = tabs.find((tabItem) => tabItem.value === newValue);
    if (selectedTab) {
      navigate(selectedTab.path);
    }
  };

  const currentTabData = tabs.find((tabItem) => tabItem.value === currentTab);

  return (
    <Box {...dashboardContentProps}>
      <Box sx={{ mb: 0 }}>
        {currentTabData && (
          <PageHeader
            title={currentTabData.pageTitle}
            Subheading={currentTabData.pageSubheading}
            {...pageHeaderProps}
          />
        )}
      </Box>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{
          mt: 1,
          position: 'sticky',
          top: '64px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.mode === 'light' ? '#f1f7fb' : '#141a21f5',
          justifyContent: 'center',
          flexGrow: 1,
          paddingTop: '16px',
          '& .MuiTabs-indicator': {
            backgroundColor: 'background.currentColor',
            height: '2px',
          },
          ...tabsProps.sx
        }}
        {...tabsProps}
      >
        {tabs.map((tabItem) => (
          <Tab
            key={tabItem.value}
            value={tabItem.value}
            icon={
              <Tooltip disableInteractive title={tabItem.tooltip} arrow placement="top">
                <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
                  {tabItem.icon}
                  {tabItem.label}
                </Box>
              </Tooltip>
            }
          />
        ))}
      </Tabs>

      <Box sx={{ mt: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

// Prop type validation
CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      label: PropTypes.string.isRequired,
      tooltip: PropTypes.string.isRequired,
      pageTitle: PropTypes.string.isRequired,
      pageSubheading: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultTab: PropTypes.string.isRequired,
  defaultPath: PropTypes.string.isRequired,
  dashboardContentProps: PropTypes.shape({
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    sx: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),  // Accept either an object or a function
  }),
  pageHeaderProps: PropTypes.shape({
    title: PropTypes.string,
    Subheading: PropTypes.string,
    link_added: PropTypes.string,
  }),
  tabsProps: PropTypes.shape({
    sx: PropTypes,  // Allow any object for sx
    className: PropTypes.string,
  }),
};