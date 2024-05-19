import React from 'react'
import { StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'
import Carousel from '../components/carousel'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  return (
    <>
      <Searchbar
        style={styles.searchBar}
        placeholder="Buscar evento"
        onChangeText={setSearchQuery}
        value={searchQuery}
        clearIcon={{ color: '#f15a24' }}
        iconColor="#f15a24"
        theme={{ colors: { primary: '#f15a24' } }}
      />
      <Carousel style={styles.carousel} />
    </>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    margin: 16,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  carousel: {
    display: 'flex',
    flex: 1,
    width: '100%',
    marginTop: 120,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})

export default HomePage
