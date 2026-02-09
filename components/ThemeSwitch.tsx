import { Switch, View, Text } from 'react-native'
import { useTheme } from './UseTheme'

export const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme()

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ color: theme.text }}>Dark Mode</Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  )
}
