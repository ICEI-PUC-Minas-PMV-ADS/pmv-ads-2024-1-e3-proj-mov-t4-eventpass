import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Searchbar, TouchableRipple } from 'react-native-paper'
import api from '../services/api'
import { Evento } from '../interfaces/eventos'

const Buscar = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [eventos, setEventos] = useState<Evento[]>([])

  useEffect(() => {
    const getEventosData = async () => {
      try {
        const response = await api.get('Eventos?top=10')
        setEventos(response.data)
      } catch (error) {
        console.error('Erro ao carregar eventos:', error)
      }
    }
    getEventosData()
  }, [])

  const handlePress = () => {
    console.log('Pressed')
  }

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Buscar evento"
        onChangeText={setSearchQuery}
        value={searchQuery}
        iconColor="#f15a24"
        theme={{ colors: { primary: '#f15a24' } }}
      />
      <ScrollView>
        {eventos.map((item) => (
          <View key={item.id} style={styles.item}>
            <Image
              style={styles.image}
              source={{
                uri: `${item.flyer}`,
              }}
            />
            <View style={styles.childCarousel}>
              <Text style={styles.title}>{item.dataHora}</Text>
              <TouchableRipple onPress={handlePress}>
                <Text style={styles.title}>Ver detalhes</Text>
              </TouchableRipple>
            </View>
            <View style={styles.body}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {item.nome}
              </Text>
              <Text style={{ marginTop: 10 }}>{item.local}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  tinyLogo: {
    width: '100%',
    borderRadius: 15,
  },
  child: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  childCarousel: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
export default Buscar
