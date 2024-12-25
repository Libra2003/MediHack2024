/**
 * Custom hook to manage and toggle between light and dark themes.
 *
 * @param {string} [defaultTheme] - The default theme to use if no theme is stored in localStorage.
 * @returns {Object} An object containing:
 * - `theme` {string}: The current theme.
 * - `isDark` {boolean}: Whether the current theme is dark.
 * - `isLight` {boolean}: Whether the current theme is light.
 * - `setLightTheme` {Function}: Function to set the theme to light.
 * - `setDarkTheme` {Function}: Function to set the theme to dark.
 * - `toggleTheme` {Function}: Function to toggle between light and dark themes.
*/
// originally written by @imoaazahmed

import { useEffect, useMemo, useState } from "react";

const ThemeProps = {
  key: "theme",
  light: "light",
  dark: "dark",
};

export const useTheme = (defaultTheme) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(ThemeProps.key);

    return storedTheme || (defaultTheme ?? ThemeProps.dark);
  });

  const isDark = useMemo(() => {
    return theme === ThemeProps.dark;
  }, [theme]);

  const isLight = useMemo(() => {
    return theme === ThemeProps.light;
  }, [theme]);

  const _setTheme = (theme) => {
    localStorage.setItem(ThemeProps.key, theme);
    document.documentElement.classList.remove(
      ThemeProps.light,
      ThemeProps.dark,
    );
    document.documentElement.classList.add(theme);
    setTheme(theme);
  };

  const setLightTheme = () => _setTheme(ThemeProps.light);

  const setDarkTheme = () => _setTheme(ThemeProps.dark);

  const toggleTheme = () =>
    theme === ThemeProps.dark ? setLightTheme() : setDarkTheme();

  useEffect(() => {
    _setTheme(theme);
  });

  return { theme, isDark, isLight, setLightTheme, setDarkTheme, toggleTheme };
};
