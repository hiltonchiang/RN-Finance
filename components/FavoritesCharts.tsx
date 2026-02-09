import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { LineChart } from 'react-native-wagmi-charts'
import YahooFinance from 'yahoo-finance2'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { List, useTheme, Text as PaperText } from 'react-native-paper'

const FavoritesCharts = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dataEmpty, setDataEmpty] = useState(false)
  const [error, setError] = useState(null)
  interface TickerProps {
    ticker: string
    company: string
  }
  const [tickers, setTickers] = useState<TickerProps[]>([])
  useEffect(() => {
    // Declare an inner, asynchronous function
    try {
      AsyncStorage.getItem('tickers').then((storedData) => {
        if (storedData) {
          const T = JSON.parse(storedData)
          setTickers(T.filter((obj) => obj.ticker !== undefined))
          setLoading(false)
        } else {
          setDataEmpty(true)
        }
      })
    } catch (e) {
      console.log('FavoritesCharts AsyncStorage error', e)
      setError(e)
    }
  }, [])

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }
  if (dataEmpty) {
    return <Text>No favorite list found, you can search a ticker to view its quotes</Text>
  }
  /**
   *
   */
  const ListItem = i({ item }) => {
    const ticker = item.ticker
      
    return (
      <View>
        <List.Item />
        <LineChart.Provider data={data}>
          <LineChart width={256} height={100}>
            <LineChart.Path color="red" />
          </LineChart>
        </LineChart.Provider>
      </View>
    )
  }
  /**
   *
   */
  return (
    <FlatList
      data={tickers}
      keyExtractor={(item) => item.objectID}
      ItemSeparatorComponent={() => <View className="border-b border-[#363636]" />}
      renderItem={({ item }) => <ListItem item={item} />}
    />
  )
}

export default FavoritesCharts
