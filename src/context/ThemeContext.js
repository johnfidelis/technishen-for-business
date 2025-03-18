'use client'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import { useFetchData } from '@/hooks/useApiService'
import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const { data, isLoading } = useFetchData(GET_ENDPOINTS.COLORS, 'colors')
  // Default theme
  const [theme, setTheme] = useState({
    primary_color: '#115093',
    secondary_color: '#0e850e',
    logo: null,
  })

  useEffect(() => {
    if (!isLoading) {
      setTheme({
        primary_color: data?.primary_color,
        secondary_color: data?.secondary_color,
        logo: data?.logo,
      })
    }
  }, [data, isLoading])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
