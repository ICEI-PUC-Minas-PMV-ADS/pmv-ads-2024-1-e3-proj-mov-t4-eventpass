import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useAuth } from '../contexts/Auth'
import { useEffect, useState } from 'react'
import { Usuario } from '../interfaces/usuarios'
import { getUsuario } from '../services/UsuarioService'
import { formatarTipoUsuario } from '../utils/formatTipoUser'
import Loading from '../components/loading'
import { useNavigation } from '@react-navigation/native'
import { HomeStackParamList } from '../router/AuthStack'
import { StackNavigationProp } from '@react-navigation/stack'

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'EditProfile'
>

const ProfilePage: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { user, signOut } = useAuth()

  const handlePress = (idUsuario: number) => {
    navigation.navigate('EditProfile', { idUsuario })
  }

  useEffect(() => {
    const fetchUsuario = async () => {
      if (user) {
        try {
          const data = await getUsuario(user)
          setUsuario(data)
        } catch (error) {
          console.error('Erro ao carregar Usuario:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUsuario()
  }, [user])

  if (loading) {
    return <Loading />
  }

  return (
    user && (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>DADOS DO USUÁRIO</Text>
        </View>
        <View style={styles.containerData}>
          <Text style={styles.titleData}>Nome do usuário</Text>
          <Text>{usuario?.nomeUsuario}</Text>
          <Text style={styles.titleData}>CPF/CNPJ</Text>
          <Text>{usuario?.cpf}</Text>
          <Text style={styles.titleData}>Email</Text>
          <Text>{usuario?.email}</Text>
          <Text style={styles.titleData}>Tipo de usuário</Text>
          <Text>{formatarTipoUsuario(usuario?.tipo)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={() => handlePress(usuario?.id || 0)}
            style={styles.button}
            textColor="#f15a24"
            icon="pencil"
          >
            Editar perfil
          </Button>
          <Button
            mode="contained"
            onPress={async () => {
              await signOut()
            }}
            buttonColor="#b61215"
            style={styles.button}
          >
            Sair da conta
          </Button>
        </View>
      </View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 20,
  },
  containerData: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 20,
  },
  titleData: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    width: '40%',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default ProfilePage
