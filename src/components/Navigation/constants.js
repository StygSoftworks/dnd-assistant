import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';  // <-- Change for Characters
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';  // <-- Change for Classes
import GroupIcon from '@mui/icons-material/Group';    // <-- Change for Races
import NoteIcon from '@mui/icons-material/Note'; // Import the appropriate icon for Templates

export const iconTextContainerStyles = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '8px', // Add padding to create a larger clickable area
	transition: 'background-color 0.3s, color 0.3s', // Add transition for smooth hover and click effect
	textDecoration: 'none', // Add text decoration to make the text clickable
	cursor: 'pointer', // Add cursor pointer for clickable effect
};

export const activeStyles = {
	backgroundColor: 'lightgray', // Change to your preferred active background color
	color: 'black', // Change to your preferred active text color
};

export const navigationContent = [
	{route: '/', component: <HomeIcon />, label: 'Home'},
	{route: '/characters', component: <PersonIcon />, label: 'Characters'},
	{route: '/weapons', component: <SecurityIcon />, label: 'Weapons'},
	{route: '/classes', component: <SchoolIcon />, label: 'Classes'},
	{route: '/races', component: <GroupIcon />, label: 'Races'},
	{route: '/templates', component: <NoteIcon />, label: 'Templates'}
];
