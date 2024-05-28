import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { Evento } from '../interfaces/eventos'
import api from '../services/api'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { HomeStackParamList } from '../router/AuthStack'
import { formatarDataHora } from '../utils/formatData'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableRipple, Portal, Button, Modal } from 'react-native-paper'
import { getIngresso } from '../services/getIngresso'
import { useAuth } from '../contexts/Auth'

type EventosPageRouteProp = RouteProp<HomeStackParamList, 'EventosPage'>

const EventosPage: React.FC = () => {
  const navigate = useNavigation()
  const route = useRoute<EventosPageRouteProp>()
  const { idEvento } = route.params
  const [evento, setEvento] = useState<Evento | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const { user } = useAuth()

  const handleSubmitEvent = async (id: number) => {
    await getIngresso(id, user)
    navigate.goBack()
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
  }, [idEvento])

  const flyerUrl = evento?.flyer

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <TouchableRipple onPress={() => navigate.goBack()}>
            <View style={styles.goBack}>
              <Ionicons name="arrow-back" size={24} color="black" />
              <Text style={styles.titleBack}>Voltar</Text>
            </View>
          </TouchableRipple>
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
            <Text style={styles.title}>
              {evento ? formatarDataHora(evento.dataHora) : ''}
            </Text>
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

          {/* Botão para abrir o modal */}
          <Button
            onPress={() => setModalVisible(true)}
            style={styles.button}
            buttonColor="#f15a24"
            textColor="white"
          >
            Retirar ingresso
          </Button>

          {/* Modal */}
          <Portal>
            <Modal
              visible={modalVisible}
              onDismiss={() => setModalVisible(false)}
              contentContainerStyle={styles.modalView}
            >
              <Text style={styles.modalText}>
                Confirmar retirada de ingresso?
              </Text>
              <View>
                <Button
                  style={styles.button}
                  onPress={() => {
                    handleSubmitEvent(idEvento)
                    setModalVisible(false)
                  }}
                  buttonColor="#f15a24"
                  textColor="white"
                >
                  Confirmar
                </Button>
              </View>
            </Modal>
          </Portal>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
    paddingBottom: 100,
    fontFamily: 'Livvic-Bold',
  },
  button: {
    width: '50%',
    marginTop: 10,
    alignSelf: 'center',
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
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
  titleBack: {
    fontWeight: 'bold',
    color: 'black',
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
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})

export default EventosPage
