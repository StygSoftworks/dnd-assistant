import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" height="100vh">
      <Box marginTop="10vh" textAlign="center">
        <div style={{ width: '25vh', height: '25vh' }}>
          <img src={process.env.PUBLIC_URL + '/logoLarge.png'} alt="DnD Assistant Logo" style={{ width: '100%', height: '100%' }} />
        </div>
      </Box>
      <Box textAlign="center" marginTop="4vh">
        <Typography variant="h4">Welcome to DnD Assistant</Typography>
        <Typography variant="body1">
          This is a platform designed to help players quickly access and lookup Dungeons & Dragons information.
        </Typography>
				<Typography variant="body1">
          Whether you need details about weapons, classes, or other game elements, we've got you covered!
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
