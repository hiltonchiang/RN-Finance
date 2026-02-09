import React from 'react'
import PropTypes from 'prop-types'
import { View, TextInput } from 'react-native'
import { useSearchBox } from 'react-instantsearch-core'
import { Searchbar, useTheme } from 'react-native-paper'

const styles = {
  container: `p-4 bg-[#252b33]`,
  input: `h-12 p-3 text-base bg-white rounded border border-[#ddd] shadow-[0_2px_2px_0_rgba(0,0,0,0.2)]`,
}
/**
 *
 */
const SearchBox = () => {
  const { currentRefinement, refine } = useSearchBox()
  return (
    <View className={styles.container}>
      <TextInput
        className={styles.input}
        onChangeText={(value) => refine(value)}
        value={currentRefinement}
        placeholder="Search a ticker..."
      />
    </View>
  )
}
/**
 *
 */
export const SearchBar = () => {
  const { currentRefinement, refine } = useSearchBox()
  const theme = useTheme()
  return (
    <View className={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(value) => refine(value)}
        value={currentRefinement}
        theme={theme}
        mode="view"
      />
    </View>
  )
}
export default SearchBox
