import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Searchbar, TouchableRipple } from 'react-native-paper'
import api from '../services/api'
import { Evento } from '../interfaces/eventos'
import { formatarDataHora } from '../utils/formatData'
import { getEventos, searchEventos } from '../services/EventosService'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeStackParamList } from '../router/AuthStack'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'

const Buscar = () => {
  type HomeScreenNavigationProp = StackNavigationProp<
    HomeStackParamList,
    'EventosPage'
  >
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const [searchQuery, setSearchQuery] = useState('')
  const [eventosBusca, setEventosBusca] = useState<Evento[]>([])
  const [searching, setSearching] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const data = await getEventos(10)
        setEventosBusca(data)
      } catch (error) {
        console.error('Erro ao carregar eventos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEventos()
  }, [])

  useEffect(() => {
    const buscarEventos = async () => {
      if (searching) {
        try {
          setLoading(true)
          const response = await searchEventos(searchQuery)
          setEventosBusca(response)
        } catch (error) {
          console.error('Erro ao buscar eventos:', error)
        } finally {
          setSearching(false)
          setLoading(false)
        }
      }
    }

    buscarEventos()
  }, [searching])

  const handleSearch = () => {
    setSearching(true)
  }

  const handlePress = (idEvento: number) => {
    navigation.navigate('EventosPage', { idEvento })
  }

  const handleSearchClear = async () => {
    const data = await getEventos(10)
    setEventosBusca(data)
  }

  if (loading) {
    return <Loading />
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
        onSubmitEditing={handleSearch}
        onClearIconPress={handleSearchClear}
      />
      <ScrollView>
        {eventosBusca.length > 0 &&
          eventosBusca.map((item) => (
            <View key={item.id} style={styles.item}>
              <Image
                style={styles.image}
                source={{
                  uri: `${item.flyer}`,
                }}
              />
              <View style={styles.childCarousel}>
                <Text style={styles.title}>
                  {formatarDataHora(item.dataHora)}
                </Text>
                <TouchableRipple onPress={() => handlePress(item.id)}>
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
        {eventosBusca.length === 0 && (
          <Text style={styles.noSearch}>Nenhum evento encontrado.</Text>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 150,
    backgroundColor: '#fff',
  },
  searchBar: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  noSearch: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
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
