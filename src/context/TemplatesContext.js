import React, { createContext, useState } from 'react';

const TemplatesContext = createContext();

export const TemplatesProvider = ({ children }) => {
  const [templates, setTemplates] = useState([]);

  const addTemplate = (newTemplates) => {
    setTemplates([...templates, newTemplates]);
  };

  return (
    <TemplatesContext.Provider value={{ templates, addTemplate }}>
      {children}
    </TemplatesContext.Provider>
  );
};
