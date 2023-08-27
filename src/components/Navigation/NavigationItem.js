import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigationAction, Typography } from '@mui/material';

const NavigationItem = ({ to, icon, label }) => {
  const iconTextContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px', // Add padding to create a larger clickable area
    transition: 'background-color 0.3s, color 0.3s', // Add transition for smooth hover and click effect
    textDecoration: 'none', // Add text decoration to make the text clickable
    cursor: 'pointer', // Add cursor pointer for clickable effect
  };

  const activeStyles = {
    backgroundColor: 'lightgray', // Change to your preferred active background color
    color: 'black', // Change to your preferred active text color
  };

  const location = useLocation();

  return (
    <Link
      to={to}
      style={{
        ...iconTextContainerStyles,
        ...(location.pathname === to && activeStyles),
      }}>
      <BottomNavigationAction icon={icon}/>
      <Typography
        variant="caption"
        display="block"
        style={{
          paddingTop: '8px', // Add padding to separate the text from the icon
        }}>
        {label}
      </Typography>
    </Link>
  );
};

export default NavigationItem;
