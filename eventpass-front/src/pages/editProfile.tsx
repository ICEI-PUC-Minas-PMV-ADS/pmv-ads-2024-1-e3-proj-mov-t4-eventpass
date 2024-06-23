import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button, TextInput, TouchableRipple } from 'react-native-paper'
import { HomeStackParamList } from '../router/AuthStack'
import { UpdateUsuario, Usuario } from '../interfaces/usuarios'
import { useAuth } from '../contexts/Auth'
import { getUsuario, updateUsuario } from '../services/UsuarioService'
import Loading from '../components/loading'

const EditProfile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>()
  const [nome, setNome] = useState<string | undefined>(undefined)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [senha, setSenha] = useState<string | undefined>(undefined)
  const [confirmarSenha, setConfirmarSenha] = useState<string | undefined>(
    undefined
  )
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useAuth()

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

  const editUser = async () => {
    const userData = {
      nome,
      email,
      senha,
      confirmarSenha,
    } as UpdateUsuario

    try {
      if (usuario) {
        setLoading(true)
        await updateUsuario(usuario.id, userData, user)
      }
    } finally {
      setLoading(false)
      navigation.navigate('ProfilePage')
    }
  }
  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <TouchableRipple onPress={() => navigation.navigate('ProfilePage')}>
        <View style={styles.goBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.titleBack}>Voltar</Text>
        </View>
      </TouchableRipple>
      <ScrollView>
        <View style={styles.containerContent}>
          <Text style={styles.title}>ATUALIZE SEUS DADOS</Text>
          <TextInput
            mode="outlined"
            activeOutlineColor="#f15a24"
            outlineStyle={{ borderRadius: 50 }}
            onChangeText={setNome}
            value={nome}
            placeholder="Nome"
            keyboardType="default"
          />
          <TextInput
            mode="outlined"
            activeOutlineColor="#f15a24"
            outlineStyle={{ borderRadius: 50 }}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            mode="outlined"
            activeOutlineColor="#f15a24"
            outlineStyle={{ borderRadius: 50 }}
            onChangeText={setSenha}
            value={senha}
            placeholder="Senha"
            secureTextEntry={true}
            keyboardType="default"
          />
          <TextInput
            mode="outlined"
            activeOutlineColor="#f15a24"
            outlineStyle={{ borderRadius: 50 }}
            onChangeText={setConfirmarSenha}
            value={confirmarSenha}
            placeholder="Confirme sua senha"
            secureTextEntry={true}
            keyboardType="default"
          />
        </View>
        <View style={styles.button}>
          <Button
            mode="contained"
            onPress={() => {
              editUser()
            }}
            style={{ backgroundColor: '#f15a24' }}
          >
            Atualizar
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  titleBack: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  goBack: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,
    gap: 10,
  },
  containerContent: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
    gap: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  button: {
    alignSelf: 'center',
    width: '50%',
    marginTop: 20,
  },
})

export default EditProfile
