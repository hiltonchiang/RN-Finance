import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useMyTheme } from '@/components/ThemeContext'
import { DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native'
import { IconButton as PaperIconButton, useTheme as PaperUseTheme } from 'react-native-paper'
/**
 *
 */
const CustomIconButton = ({ title, onPress, iconName, color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Icon name={iconName} size={20} color="#fff" />
    </TouchableOpacity>
  )
}
/**
 *
 */
export const SearchButton = () => {
  const navigation = useNavigation()
  const handleSearch = () => {
    navigation.navigate('Search')
  }
  return <CustomIconButton iconName="search" color="#d9534f" onPress={handleSearch} />
}
/**
 *
 */
export const PaperSearchButton = () => {
  const paperTheme = PaperUseTheme()
  const navigation = useNavigation()
  const handleSearch = () => {
    navigation.navigate('Search')
  }
  return <PaperIconButton icon="magnify" theme={paperTheme} onPress={handleSearch} />
}
/**
 *
 */
export const ThemeButton = () => {
  // const [isDark, setIsDark] = useState(theme.dark ? true : false)
  // const toggleTheme = () => {
  //   setIsDark(!isDark)
  //}
  const { theme, toggleTheme } = useMyTheme()
  return (
    <>
      <CustomIconButton
        iconName={theme === DarkTheme ? 'dark-mode' : 'light-mode'}
        color="#d9534f"
        onPress={toggleTheme}
      />
    </>
  )
}
/**
 *
 */
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // Aligns icon and text horizontally
    alignItems: 'center', // Centers vertically within the button
    justifyContent: 'center', // Centers content horizontally
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    marginLeft: 10, // Adds space between the icon and the text
    color: '#fff',
    fontSize: 16,
  },
})
/**
 *
 */
export const PaperThemeButton = () => {
  const { theme, toggleTheme } = useMyTheme()
  const paperTheme = PaperUseTheme()
  const isDark = paperTheme.dark
  // console.log('PaperThemeButton paperTheme', paperTheme)
  // console.log('PaperThemeButton paperTheme.colors.background', paperTheme.colors.background)
  // console.log('PaperThemeButton paperTheme.colors.primary', paperTheme.colors.primary)
  return (
    <>
      <PaperIconButton
        icon={isDark ? 'weather-night' : 'weather-sunny'}
        theme={paperTheme}
        onPress={toggleTheme}
      />
    </>
  )
}

export default SearchButton
