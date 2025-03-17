
import React from 'react';
import './App.css'; // Подключение стилей
import { ThemeProvider, useTheme } from './ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

const App = () => {
  const { theme } = useTheme(); // Получаем текущую тему

  return (
    <div className={`app ${theme}`}>
      <h1>Theme Switcher App</h1>
      <ThemeSwitcher />
    </div>
  );
};

// Оборачиваем приложение в ThemeProvider
const AppWithProvider = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWithProvider;