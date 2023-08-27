import React, { createContext, useState } from 'react';

const WeaponsContext = createContext();

export const WeaponsProvider = ({ children }) => {
  const [weapons, setWeapons] = useState([]);

  const addWeapon = (weapon) => {
    setWeapons([...weapons, weapon]);
  };

  return (
    <WeaponsContext.Provider value={{ weapons, addWeapon }}>
      {children}
    </WeaponsContext.Provider>
  );
};
