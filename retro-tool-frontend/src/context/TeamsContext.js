import React, { createContext, useState, useEffect } from 'react';

export const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
  const [teamsLink, setTeamsLinkState] = useState('');
  const [currentUser, setCurrentUser] = useState('rahim');
  const [currentSprint, setCurrentSprint] = useState('Sprint 12');

  // Sayfa yüklendiğinde localStorage'dan linki çek
  useEffect(() => {
    const storedLink = localStorage.getItem('teamsLink');
    if (storedLink) {
      setTeamsLinkState(storedLink);
    }
  }, []);

  // Link değiştiğinde localStorage'a kaydet
  const setTeamsLink = (link) => {
    setTeamsLinkState(link);
    localStorage.setItem('teamsLink', link);
  };

  return (
    <TeamsContext.Provider value={{ 
      teamsLink, setTeamsLink, 
      currentUser, setCurrentUser, 
      currentSprint, setCurrentSprint 
    }}>
      {children}
    </TeamsContext.Provider>
  );
};
