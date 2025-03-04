'use client'
import React, { createContext, useState, useEffect } from 'react'
// import axios from "axios";

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  // Default theme
  const [theme, setTheme] = useState({
    primary_color: '#115093',
    secondary_color: 'green',
  })

  // useEffect(() => {
  //   // Fetch theme colors from API
  //   const fetchThemeColors = async () => {
  //     try {
  //       const response = await axios.get("/get/color");
  //       if (response.data) {
  //         setTheme((prevTheme) => ({
  //           ...prevTheme,
  //           primary: response.data.primary || prev theme.primary_color,
  //           secondary: response.data.secondary || prevtheme.secondary_color,
  //         }));
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch theme colors:", error);
  //     }
  //   };

  //   fetchThemeColors();
  // }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
