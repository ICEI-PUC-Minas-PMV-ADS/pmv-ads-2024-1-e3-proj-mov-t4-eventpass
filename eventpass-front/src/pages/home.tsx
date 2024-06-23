import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import CarouselHome from '../components/carousel'

const HomePage: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Eventos em destaque!</Text>
          <CarouselHome />
        </ScrollView>
      </View>
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
  container: {
    backgroundColor: '#fff',
  },
})

export default HomePage
