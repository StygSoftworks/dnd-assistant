import React, { createContext, useState } from 'react';

export const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);

  const addClass = (newClass) => {
    setCharacters([...characters, newClass]);
  };

  return (
    <CharactersContext.Provider value={{ characters, addClass }}>
      {children}
    </CharactersContext.Provider>
  );
};
