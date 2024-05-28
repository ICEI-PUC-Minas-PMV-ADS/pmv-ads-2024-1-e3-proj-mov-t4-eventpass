import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import api from '../services/api'
import { Evento } from '../interfaces/eventos'
import { formatarDataHora } from '../utils/formatData'
import { getEventos } from '../services/getEventosService'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeStackParamList } from '../router/AuthStack'

const CarouselHome: React.FC = () => {
  type HomeScreenNavigationProp = StackNavigationProp<
    HomeStackParamList,
    'EventosPage'
  >
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const [eventos, setEventos] = useState<Evento[]>([])

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const data = await getEventos(3)
        setEventos(data)
      } catch (error) {
        console.error('Erro ao carregar eventos:', error)
      }
    }

    fetchEventos()
  }, [])

  const handlePress = (idEvento: number) => {
    navigation.navigate('EventosPage', { idEvento })
  }

  return (
    <ScrollView style={styles.container}>
      {eventos.map((item) => (
        <View key={item.id} style={styles.item}>
          <Image
            style={styles.image}
            source={{
              uri: `${item.flyer}`,
            }}
          />
          <View style={styles.childCarousel}>
            <Text style={styles.title}>{formatarDataHora(item.dataHora)}</Text>
            <TouchableRipple onPress={() => handlePress(item.id)}>
              <Text style={styles.title}>Ver detalhes</Text>
            </TouchableRipple>
          </View>
          <View style={styles.body}>
            <TouchableRipple onPress={() => handlePress(item.id)}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {item.nome}
              </Text>
            </TouchableRipple>
            <Text style={{ marginTop: 10 }}>{item.local}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
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
    marginBottom: 20,
    borderRadius: 8,
  },
  childCarousel: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default CarouselHome
