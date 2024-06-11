import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import { Button, Divider } from 'react-native-paper'
import { useAuth } from '../contexts/Auth'
import { useEffect, useState } from 'react'
import { Usuario } from '../interfaces/usuarios'
import { getUsuario } from '../services/getUsuarioService'
import { formatarTipoUsuario } from '../utils/formatTipoUser'
import { deleteEvento, getMyEventos } from '../services/getEventosService'
import { Evento } from '../interfaces/eventos'
import { formatarDataHora } from '../utils/formatData'
import Loading from '../components/loading'
import { deleteIngresso, getMyIngressos } from '../services/getIngressoService'
import { Ingresso } from '../interfaces/ingressos'

const TicketPage: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [meusEventos, setMeusEventos] = useState<Array<Evento>>([])
  const [meusIngressos, setMeusIngressos] = useState<Array<Ingresso>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { user, signOut, refresh } = useAuth()

  useEffect(() => {
    const fetchUsuario = async () => {
      if (user) {
        try {
          const data = await getUsuario(user)
          setUsuario(data)
        } catch (error) {
          console.error('Erro ao carregar Usuario:', error)
        }
      }
    }

    fetchUsuario()
  }, [user])

  const isGestor = usuario?.tipo === 1

  useEffect(() => {
    const fetchMeusEventos = async () => {
      if (usuario && isGestor) {
        try {
          const data = await getMyEventos(user)
          setMeusEventos(data)
        } catch (error) {
          console.error('Erro ao carregar eventos:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchMeusEventos()
  }, [usuario, isGestor])

  useEffect(() => {
    const fetchMeusIngressos = async () => {
      if (usuario && !isGestor) {
        try {
          const data = await getMyIngressos(user)
          setMeusIngressos(data)
        } catch (error) {
          console.error('Erro ao carregar Ingressos:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchMeusIngressos()
  }, [usuario, isGestor])

  const handleDeleteEvent = async (id: number) => {
    await deleteEvento(id, user)
    refresh()
  }

  const handleDeleteIngresso = async (id: number) => {
    await deleteIngresso(id, user)
    refresh()
  }

  if (loading) {
    return <Loading />
  }

  return isGestor ? (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>MEUS EVENTOS</Text>
      </View>
      {meusEventos.length > 0 ? (
        meusEventos.map((event) => (
          <View key={event.id}>
            <View style={styles.containerData}>
              <Image source={{ uri: event.flyer }} style={styles.flyer} />
              <View>
                <Text style={styles.text}>{event.nome}</Text>
                <Text style={styles.titleData}>
                  {formatarDataHora(event.dataHora)}
                </Text>
                <Text style={styles.conteudo}>{event.local}</Text>
              </View>
            </View>
            <View style={styles.buttonGroup}>
              <Button
                mode="text"
                onPress={() => {}}
                style={styles.button}
                textColor="#f15a24"
                icon="eye"
              >
                Visualizar
              </Button>
              <Button
                mode="text"
                onPress={() => {}}
                style={styles.button}
                textColor="#f15a24"
                icon="pencil"
              >
                Editar
              </Button>
              <Button
                mode="text"
                onPress={() => handleDeleteEvent(event.id)}
                style={styles.button}
                textColor="#f15a24"
                icon="delete"
              >
                Deletar
              </Button>
            </View>
            <Divider bold />
          </View>
        ))
      ) : (
        <View>
          <Text style={styles.titleData}>
            Você ainda não possui eventos, crie um agora mesmo!
          </Text>
        </View>
      )}

      <Button
        mode="contained-tonal"
        onPress={() => {}}
        style={styles.buttonCreate}
        textColor="#ffffff"
        buttonColor="#f15a24"
        icon="pencil"
      >
        Criar novo evento
      </Button>
    </ScrollView>
  ) : (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>MEUS INGRESSOS</Text>
      </View>
      {meusIngressos.length > 0 ? (
        meusIngressos.map((ingresso) => (
          <View key={ingresso.idIngresso}>
            <View style={styles.containerData}>
              <View>
                <Text style={styles.text}>{ingresso.nomeEvento}</Text>
                <Text style={styles.titleData}>
                  {formatarDataHora(ingresso.dataEvento)}
                </Text>
              </View>
            </View>
            <View style={styles.buttonGroup}>
              <Button
                mode="text"
                onPress={() => {}}
                style={styles.button}
                textColor="#f15a24"
                icon="eye"
              >
                Visualizar
              </Button>
              <Button
                mode="text"
                onPress={() => handleDeleteIngresso(ingresso.idIngresso)}
                style={styles.button}
                textColor="#f15a24"
                icon="delete"
              >
                Deletar
              </Button>
            </View>
            <Divider bold />
          </View>
        ))
      ) : isGestor ? (
        <View>
          <Text style={styles.titleData}>
            Você ainda não possui eventos, crie um agora mesmo!
          </Text>
          <Button
            mode="contained-tonal"
            onPress={() => {}}
            style={styles.buttonCreate}
            textColor="#ffffff"
            buttonColor="#f15a24"
            icon="pencil"
          >
            Criar novo evento
          </Button>
        </View>
      ) : (
        <View>
          <Text style={styles.titleData}>
            Você ainda não possui ingressos, compre um agora mesmo!
          </Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerData: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  flyer: {
    borderRadius: 10,
    width: 60,
    height: 60,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
  },
  button: {
    width: 110,
    alignSelf: 'center',
  },
  buttonCreate: {
    width: '50%',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleData: {
    fontWeight: 'bold',
    color: '#F15A24',
    fontSize: 16,
    paddingVertical: 10,
  },
  conteudo: {
    marginTop: 5,
    color: '#3B3B3B',
    fontSize: 16,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
})

export default TicketPage
