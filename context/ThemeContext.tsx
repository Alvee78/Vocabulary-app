import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeContextProps } from '../types';

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  // Load theme from storage on mount
  useEffect(() => {
    AsyncStorage.getItem('appTheme').then(stored => {
      if (stored === 'light' || stored === 'dark') setTheme(stored);
    });
  }, []);

  // Save theme to storage when it changes
  useEffect(() => {
    AsyncStorage.setItem('appTheme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};