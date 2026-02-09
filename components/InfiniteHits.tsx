import React, { useState, useEffect } from 'react'
import { List, useTheme } from 'react-native-paper'
import { useInfiniteHits, useHits } from 'react-instantsearch-core'
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: '#363636',
  },
  item: {
    padding: 10,
    flexDirection: 'column',
  },
  titleText: {
    fontWeight: 'bold',
  },
})

const InfiniteHits = (props) => {
  const { hits, isLastPage, showMore } = useInfiniteHits()
  const [isPressed, setIsPressed] = useState(false)
  interface TickerProps {
    ticker: string
    company: string
  }
  const [tickers, setTickers] = useState<TickerProps[]>([])
  const theme = useTheme()
  // console.log('InfiniteHits theme', theme)
  useEffect(() => {
    try {
      AsyncStorage.getItem('tickers').then((storedData) => {
        if (storedData) {
          const T = JSON.parse(storedData)
          setTickers(T.filter((obj) => obj.ticker !== undefined))
          console.log('InfiniteHits T', T)
          console.log('InfiniteHits tickers', tickers)
        }
      })
    } catch (e) {
      console.log('InfiniteHits AsyncStorage error', e)
    }
  }, [])
  /**
   *
   */
  const handleLoadMore = () => {
    if (!isLastPage) {
      showMore()
    }
  }
  /**
   *
   */
  const handlePressIn = () => {
    setIsPressed(true)
  }
  /**
   *
   */
  const handlePressOut = () => {
    setIsPressed(false)
  }
  /**
   *
   */
  const newHits = []
  for (let i = 0; i < hits.length; i++) {
    if ('ticker' in hits[i]) newHits.push(hits[i])
  }
  // console.log('InfiniteHits newHits', newHits)
  /**
   *
   */
  const ListItem = ({ item, ...props }) => {
    let flag = true
    const O = tickers.find((obj) => obj.ticker === item.ticker)
    if (O !== undefined) flag = false
    const [isStarOutline, setIsStarOutline] = useState(flag)
    /**
     *
     */
    const handleLeftPress = async () => {
      setIsStarOutline(!isStarOutline)
      console.log('InfiniteHits ListItem handleLeftPress item.ticker', item.ticker)
      console.log('InfiniteHits ListItem handleLeftPress tickers b4', tickers)
      const idx = tickers.findIndex((obj) => obj.ticker === item.ticker)
      if (isStarOutline) {
        if (idx === -1) {
          const O: TickerProps = { ticker: item.ticker, company: item.company }
          tickers.push(O)
          console.log('InfiniteHits ListItem handleLeftPress tickers added', tickers)
        }
      } else {
        tickers.splice(idx, 1)
        console.log('InfiniteHits ListItem handleLeftPress tickers del', tickers)
      }
      try {
        AsyncStorage.setItem('tickers', JSON.stringify(tickers)).then(() => {
          console.log('ListItem setItem saved successfully')
        })
      } catch (error) {
        console.error('ListItem setItem data: ', error)
      }
    }
    /**
     *
     */
    const handleRightPress = () => {}
    /**
     *
     */
    return (
      <List.Item
        title={item.ticker}
        description={item.company}
        theme={theme}
        left={(props) => (
          <Pressable onPress={handleLeftPress}>
            <List.Icon
              {...props}
              icon={isStarOutline ? 'star-outline' : 'star'}
              color={theme.colors.primary}
              theme={theme}
            />
          </Pressable>
        )}
        right={(props) => (
          <Pressable onPress={handleRightPress}>
            <List.Icon
              {...props}
              icon="button-pointer"
              color={theme.colors.primary}
              theme={theme}
            />
          </Pressable>
        )}
        titleStyle={{
          color: theme.colors.primary,
        }}
        descriptionStyle={{
          color: theme.colors.secondary,
        }}
      />
    )
  }
  /**
   *
   */
  return (
    <FlatList
      data={newHits}
      keyExtractor={(item) => item.objectID}
      ItemSeparatorComponent={() => <View className="border-b border-[#363636]" />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5} // How close to the end (0.5 = halfway)
      renderItem={({ item }) => <ListItem item={item} />}
    />
  )
}

export default InfiniteHits
