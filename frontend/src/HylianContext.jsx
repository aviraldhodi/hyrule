import React, { createContext, useState, useEffect, useContext } from 'react';

const HylianContext = createContext();

export const useHylian = () => useContext(HylianContext);

export const HylianProvider = ({ children }) => {
  const [theme, setTheme] = useState('gruvbox');
  const [orgColorMappings, setOrgColorMappings] = useState({});

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Available palette keys across all themes
  const availableColors = ['red', 'green', 'yellow', 'blue', 'purple', 'aqua'];

  const mapOrgToColor = (orgAlias, colorKey) => {
    setOrgColorMappings(prev => ({ ...prev, [orgAlias]: colorKey }));
  };

  const getOrgColor = (orgAlias) => {
    const mappedColor = orgColorMappings[orgAlias];
    if (mappedColor) {
      return `var(--palette-${mappedColor})`;
    }
    return 'var(--secondary-color)'; // Default standard secondary color
  };

  return (
    <HylianContext.Provider value={{ theme, setTheme, availableColors, mapOrgToColor, getOrgColor }}>
      {children}
    </HylianContext.Provider>
  );
};
