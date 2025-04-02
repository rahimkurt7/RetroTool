// src/context/TeamsContext.js
import React, { createContext, useState } from 'react';

export const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
  const [teamsLink, setTeamsLink] = useState('');

  return (
    <TeamsContext.Provider value={{ teamsLink, setTeamsLink }}>
      {children}
    </TeamsContext.Provider>
  );
};
