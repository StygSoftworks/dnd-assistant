import React, { createContext, useState } from 'react';

const RacesContext = createContext();

export const RacesProvider = ({ children }) => {
  const [races, setRaces] = useState([]);

  const addRace = (newRace) => {
    setRaces([...races, newRace]);
  };

  return (
    <RacesContext.Provider value={{ races, addRace }}>
      {children}
    </RacesContext.Provider>
  );
};
