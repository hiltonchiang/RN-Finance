import React from 'react'
import { EditScreenInfo } from './EditScreenInfo'
import { Text, View, Button, StyleSheet } from 'react-native'
import {
  SearchButton,
  ThemeButton,
  PaperThemeButton,
  PaperSearchButton,
} from '@/components/SearchThemeButtons'
import { LineChart } from 'react-native-wagmi-charts'
import YahooFinance from 'yahoo-finance2'
import { Text as PaperText, Button as PaperButton } from 'react-native-paper'

function Charts() {
  const newData = []
  for (let i = 0; i < 100; i++) {
    newData.push({
      timestamp: new Date().getTime() + i * 15 * 60 * 1000,
      value: Math.floor(Math.random() * 10) + 1,
    })
  }
  // console.log('charts data', newData)
  return (
    <LineChart.Provider data={newData}>
      <LineChart width={256} height={100}>
        <LineChart.Path color="red" />
      </LineChart>
    </LineChart.Provider>
  )
}

type HomeScreenProps = {
  title: string
  path: string
  children?: React.ReactNode
}

const styles1 = {
  screenContainer: 'flex-1 justify-between',
  contentArea: 'flex-1 p-2.5',
  buttonsContainer: 'absolute bottom-0 left-0 right-0 flex-row justify-end py-2.5 px-2.5',
  buttonWrapper: `flex-1 mx-1.25`,
}

export const HomeScreen = ({ title, path, children }: HomeScreenProps) => {
  return (
    <View className={styles.container}>
      {/*<Text className={styles.title}>{title}</Text>*/}
      <PaperText>{title}</PaperText>
      <View className={styles.separator} />
      <EditScreenInfo path={path} />
      <Charts />
      <View className={styles1.buttonsContainer}>
        <PaperSearchButton />
        <PaperThemeButton />
      </View>
      {children}
    </View>
  )
}
const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 `,
  title: `text-xl font-bold`,
}
