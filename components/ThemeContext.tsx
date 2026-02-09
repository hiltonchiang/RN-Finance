// ThemeContext.js
import React, { createContext, useState, useContext } from 'react'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { Appearance, useColorScheme } from 'react-native'

export const ThemeContext = createContext({
  theme: DefaultTheme,
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme() // Detect system preference
  console.log('ThemePrvoider colorScheme', colorScheme)
  const [isDark, setIsDark] = useState(colorScheme === 'dark')

  const toggleTheme = () => {
    Appearance.setColorScheme(isDark ? 'light' : 'dark')
    setIsDark((prev) => !prev)
  }

  const theme = isDark ? DarkTheme : DefaultTheme

  // You can extend the default themes with custom colors if needed

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useMyTheme = () => useContext(ThemeContext)
