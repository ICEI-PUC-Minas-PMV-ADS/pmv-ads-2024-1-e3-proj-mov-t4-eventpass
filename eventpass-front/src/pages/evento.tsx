import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { RouteProp, useRoute } from '@react-navigation/native'
import api from '../services/api'
import { Evento } from '../interfaces/eventos'

type RootStackParamList = {
  Evento: { idEvento: number }
}

type EventoPageRouteProp = RouteProp<RootStackParamList, 'Evento'>

const EventoPage: React.FC = () => {
  const route = useRoute<EventoPageRouteProp>()
  const { idEvento } = route.params
  const [evento, setEvento] = useState<Evento | null>(null)

  useEffect(() => {
    const getEventoData = async () => {
      try {
        const response = await api.get(`Eventos/${idEvento}`)
        setEvento(response.data)
      } catch (error) {
        console.error('Erro ao carregar evento:', error)
      }
    }
    getEventoData()
  }, [idEvento])

  const handlePress = () => {
    console.log('Pressed')
  }

  if (!evento) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    )
  }

  const flyerUrl = `${evento.flyer}`.trim()

  return (
    <ScrollView style={styles.container}>
      <View key={evento.id} style={styles.item}>
        <Image
          style={styles.image}
          source={{
            uri: flyerUrl,
          }}
          onError={(error) =>
            console.error(
              `Failed to load image: ${flyerUrl}`,
              error.nativeEvent
            )
          }
        />
        <View style={styles.childCarousel}>
          <Text style={styles.title}>{evento.dataHora}</Text>
          <TouchableRipple onPress={handlePress}>
            <Text style={styles.title}>Ver detalhes</Text>
          </TouchableRipple>
        </View>
        <View style={styles.body}>
          <TouchableRipple onPress={handlePress}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {evento.nome}
            </Text>
          </TouchableRipple>
          <Text style={{ marginTop: 10 }}>{evento.local}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  title: {
    fontWeight: 'bold',
    color: '#F15A24',
    fontSize: 16,
    marginTop: 10,
  },
  item: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  childCarousel: {
    marginTop: 10,
    alignItems: 'center',
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
    alignItems: 'center',
  },
})

export default EventoPage
