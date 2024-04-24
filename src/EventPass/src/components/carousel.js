import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Carousel from 'react-native-snap-carousel'
import api from '../services/api'

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
const IMAGE_SERVER_URL = 'http://192.168.15.28:9999'

const PaginaPrincipal = () => {
  const [eventos, setEventos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/Eventos/GetTopThreeEvents')
        setEventos(response.data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }
    fetchData()
  }, [])

  const handlePress = () => {
    console.log('Pressed')
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        style={styles.image}
        source={{
          uri: `${IMAGE_SERVER_URL}/${item.flyer}`,
        }}
      />
      <View style={styles.childCarousel}>
        <Text style={styles.title}>{item.data}</Text>
        <TouchableRipple onPress={handlePress}>
          <Text style={styles.title}>Ver detalhes</Text>
        </TouchableRipple>
      </View>
      <View style={styles.body}>
        <TouchableRipple onPress={handlePress}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {item.nomeEvento}
          </Text>
        </TouchableRipple>
        <Text style={{ marginTop: 10 }}>{item.local}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        data={eventos}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    color: '#F15A24',
    fontSize: 16,
    marginTop: 10,
  },
  item: {
    marginTop: 10,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  body: {
    flexDirection: 'column',
    marginTop: 16,
    justifyContent: 'flex-start',
  },
})

export default PaginaPrincipal
