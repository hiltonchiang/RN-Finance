import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { HomeScreen } from 'components/HomeScreen'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ThemeProvider, useMyTheme } from '@/components/ThemeContext'
import { PaperProvider, MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper'
import SearchScreen from '@/components/SearchScreen'
import './global.css'

function Home() {
  return (
    <>
      <HomeScreen title="myHomeScreen" path="App.tsx"></HomeScreen>
      <StatusBar style="auto" />
    </>
  )
}
function Search() {
  return (
    <>
      <SearchScreen />
      <StatusBar style="auto" />
    </>
  )
}
// const Stack = createNativeStackNavigator()
const Tab = createMaterialTopTabNavigator()

function RootStack() {
  const theme = useTheme()
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          height: 60,
          paddingTop: 20,
          backgroundColor: theme.colors.background,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#93C5FD',
          height: 3,
        },
      }}>
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Search" component={Search} options={{ tabBarLabel: 'Search' }} />
    </Tab.Navigator>
  )
}
const AppContent = () => {
  const { theme, toggleTheme } = useMyTheme()
  // console.log('AppContent theme', theme)
  return (
    <PaperProvider theme={theme === DarkTheme ? MD3DarkTheme : MD3LightTheme}>
      <NavigationContainer theme={theme}>
        <RootStack />
      </NavigationContainer>
    </PaperProvider>
  )
}
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
