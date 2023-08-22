import React, { createContext, useState } from 'react';

export const ClassesContext = createContext();

export const ClassesProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);

  const addClass = (newClass) => {
    setClasses([...classes, newClass]);
  };

  return (
    <ClassesContext.Provider value={{ classes, addClass }}>
      {children}
    </ClassesContext.Provider>
  );
};
