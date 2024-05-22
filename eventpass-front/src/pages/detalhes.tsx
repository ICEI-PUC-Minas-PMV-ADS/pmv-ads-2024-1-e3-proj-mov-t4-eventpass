import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Evento } from '../interfaces/eventos'
import api from '../services/api'
import { useRoute } from '@react-navigation/native'
import { Portal, Provider, Button, Modal } from 'react-native-paper'

const DetailPage: React.FC = () => {
  const route = useRoute()
  const { idEvento } = route?.params
  const [evento, setEvento] = useState<Evento | null>(null)

  const handleSubmitEvent = async () => {
    try {
      // const response = await api.get(`Eventos/${idEvento}/retirar-ingresso`)
      console.log('Ingresso retirado com sucesso!')
    } catch (error) {
      console.error('Erro ao carregar eventos:', error)
    }
  }

  useEffect(() => {
    const getEventoData = async () => {
      try {
        const response = await api.get(`Eventos/${idEvento}`)
        setEvento(response.data)
      } catch (error) {
        console.error('Erro ao carregar eventos:', error)
      }
    }
    getEventoData()
  }, [])

  const flyerUrl = evento?.flyer
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.tinyLogo}
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
          <View style={styles.child}>
            <Text style={styles.text}>{evento?.nome}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>{evento?.dataHora}</Text>
            <Text style={[styles.conteudo, { fontWeight: 'bold' }]}>
              {evento?.local}
            </Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.bodyDescricao}>
            <Text
              style={[
                styles.title,
                {
                  color: '#4F4F4F',
                  fontWeight: 'bold',
                },
              ]}
            >
              Descrição do evento
            </Text>
            <Text style={styles.conteudo}>{evento?.descricao}</Text>
          </View>
          <View style={styles.hr} />
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
    paddingBottom: 100,
    fontFamily: 'Livvic-Bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: '#f15a24',
    width: 140,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonTeste: {
    marginTop: 25,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  tinyLogo: {
    width: '100%',
    borderRadius: 15,
    height: 200,
  },
  child: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  title: {
    fontWeight: 'bold',
    color: '#F15A24',
    fontSize: 18,
  },
  conteudo: {
    marginTop: 5,
    color: '#3B3B3B',
    fontSize: 16,
    textAlign: 'justify',
  },
  body: {
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'flex-start',
  },
  bodyDescricao: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  hr: {
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default DetailPage
