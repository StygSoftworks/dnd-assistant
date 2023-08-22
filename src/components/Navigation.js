import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';  // <-- Change for Characters
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';  // <-- Change for Classes
import GroupIcon from '@mui/icons-material/Group';    // <-- Change for Races
import NoteIcon from '@mui/icons-material/Note'; // Import the appropriate icon for Templates

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
      }}
    >
      <BottomNavigationAction
        icon={icon}
      />
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

const Navigation = () => {
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'green' }}>
      <BottomNavigation>
        <NavigationItem
          to="/"
          icon={<HomeIcon />}
          label="Home"
        />

        <NavigationItem
          to="/characters"
          icon={<PersonIcon />}
          label="Characters"
        />

        <NavigationItem
          to="/weapons"
          icon={<SecurityIcon />}
          label="Weapons"
        />

        <NavigationItem
          to="/classes"
          icon={<SchoolIcon />}
          label="Classes"
        />

        <NavigationItem
          to="/races"
          icon={<GroupIcon />}
          label="Races"
        />

        <NavigationItem
          to="/templates"
          icon={<NoteIcon />}
          label="Templates"
        />
      </BottomNavigation>
    </div>
  );
};

export default Navigation;