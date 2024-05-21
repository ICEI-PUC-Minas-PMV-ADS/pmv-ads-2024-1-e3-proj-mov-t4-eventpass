import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import CarouselHome from '../components/carousel'

const HomePage: React.FC = () => {
  return (
    <>
      <Text style={styles.title}>Eventos em destaque!</Text>
      <ScrollView>
        <CarouselHome />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
})

export default HomePage
