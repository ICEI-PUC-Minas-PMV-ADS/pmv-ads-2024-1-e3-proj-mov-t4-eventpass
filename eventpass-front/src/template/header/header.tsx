import * as React from 'react'
import { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper'
import { View, StyleSheet, Image, Text } from 'react-native'
import { useAuth } from '../../contexts/Auth'
import { getUsuario } from '../../services/getUsuarioService'
import { Usuario } from '../../interfaces/usuarios'

const Header: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchUsuario = async () => {
      if (user) {
        try {
          const data = await getUsuario(user)
          setUsuario(data)
        } catch (error) {
          console.error('Failed to fetch user:', error)
        }
      } else {
        setUsuario(null)
      }
    }

    fetchUsuario()
  }, [user]) // Adicione 'user' como dependência aqui

  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        {usuario && (
          <Text style={styles.textName}>Olá, {usuario?.nomeUsuario}</Text>
        )}
      </View>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    flex: 5,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 38,
  },
  input: {
    flex: 6,
    marginLeft: 8,
  },
  textName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
})

export default Header
