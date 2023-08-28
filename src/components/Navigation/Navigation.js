import React from 'react';
import { BottomNavigation } from '@mui/material';
import NavigationItem from './NavigationItem';
import { navigationContent } from './constants';

const Navigation = () => {
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'green' }}>
      <BottomNavigation>
        {navigationContent.map((nav, index) => (
					<NavigationItem
						key={index}
						to={nav.route}
						icon={nav.component}
						label={nav.label}
					/>
				))}
      </BottomNavigation>
    </div>
  );
};

export default Navigation;