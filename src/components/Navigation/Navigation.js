import React from 'react';
import { BottomNavigation } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';  // <-- Change for Characters
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';  // <-- Change for Classes
import GroupIcon from '@mui/icons-material/Group';    // <-- Change for Races
import NoteIcon from '@mui/icons-material/Note'; // Import the appropriate icon for Templates
import NavigationItem from './NavigationItem';

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