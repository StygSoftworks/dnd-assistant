import React from 'react';
import { Box, Typography } from '@mui/material';
import { globalContent } from '../../content';

const {home: homeContent} = globalContent;

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" height="100vh">
      <Box marginTop="10vh" textAlign="center">
        <div style={{ width: '25vh', height: '25vh' }}>
          <img src={process.env.PUBLIC_URL + '/logoLarge.png'} alt="DnD Assistant Logo" style={{ width: '100%', height: '100%' }} />
        </div>
      </Box>
      <Box textAlign="center" marginTop="4vh">
        <Typography variant="h4">{homeContent.title}</Typography>
				{homeContent.description.map((desc, index) => (
					<Typography key={index} variant="body1">
						{desc}
					</Typography>
				))}
      </Box>
    </Box>
  );
};

export default Home;
