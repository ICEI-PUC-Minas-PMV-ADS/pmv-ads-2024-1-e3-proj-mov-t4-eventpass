import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Searchbar } from 'react-native-paper'
import api from '../services/api'

const Buscar = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [eventos, setEventos] = useState([])
  const IMAGE_SERVER_URL = 'http://192.168.15.28:9999'

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

  const items = [
    {
      id: 1,
      titulo: 'Conferência Internacional de Tecnologia',
      date: '15-17 de Maio de 2024',
      local: 'San Francisco, Califórnia, EUA',
      imgUrl:
        'https://images.unsplash.com/photo-1617777934845-a818fd6e1bcb?q=80&w=3431&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      titulo: "Festival de Música 'Sons do Verão'",
      date: '7-9 de Julho de 2024',
      local: 'Rio de Janeiro, Brasil',
      imgUrl:
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      titulo: 'Convenção de Literatura Fantástica',
      date: '20-22 de Setembro de 2024',
      local: 'Edimburgo, Escócia',
      imgUrl:
        'https://images.unsplash.com/photo-1660092506466-6e433fb9cdbc?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Buscar evento"
        onChangeText={setSearchQuery}
        value={searchQuery}
        clearIcon={{ color: '#f15a24' }}
        iconColor="#f15a24"
        theme={{ colors: { primary: '#f15a24' } }}
      />
      <ScrollView>
        {eventos.map((item) => (
          <View key={item.idEvento} style={styles.item}>
            <Image
              style={styles.image}
              source={{
                uri: `${IMAGE_SERVER_URL}/${item.flyer}`,
              }}
            />
            <View style={styles.childCarousel}>
              <Text style={styles.title}>{item.data}</Text>
              <Text style={styles.title}>Ver detalhes</Text>
            </View>
            <View style={styles.body}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {item.nomeEvento}
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
