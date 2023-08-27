import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigationAction, Typography } from '@mui/material';
import { activeStyles, iconTextContainerStyles } from './constants';

const NavigationItem = ({ to, icon, label }) => {
  const location = useLocation();

  return (
    <Link
      to={to}
      style={{
        ...iconTextContainerStyles,
        ...(location.pathname === to && activeStyles),
      }}
		>
      <BottomNavigationAction icon={icon}/>
      <Typography
        variant="caption"
        display="block"
        style={{
          paddingTop: '8px', // Add padding to separate the text from the icon
        }}
			>
        {label}
      </Typography>
    </Link>
  );
};

export default NavigationItem;
