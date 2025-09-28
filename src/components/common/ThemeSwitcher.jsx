import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-switcher" aria-label="Changer de thème">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeSwitcher;