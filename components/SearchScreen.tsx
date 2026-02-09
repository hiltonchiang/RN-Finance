import React from 'react'
import { View, SafeAreaView, StatusBar } from 'react-native'
import { algoliasearch } from 'algoliasearch'
import { InstantSearch } from 'react-instantsearch-core'
import SearchBox, { SearchBar } from '@/components/SearchBox'
import InfiniteHits from '@/components/InfiniteHits'
import { PaperThemeButton } from '@/components/SearchThemeButtons'
const searchClient = algoliasearch('8GQPXHQDD6', '211cd5e9a1d7089a4739d6eb5b6f6eb5')

const SearchScreen = () => {
  return (
    <View className="flex-1">
      <InstantSearch searchClient={searchClient} indexName="tickers">
        <SearchBar />
        <InfiniteHits />
        <View className='flex-row justify-end p-4'>
          <PaperThemeButton />
        </View>
      </InstantSearch>
    </View>
  )
}

export default SearchScreen
