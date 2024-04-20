import * as React from 'react'
import { Appbar } from 'react-native-paper'
import { View, StyleSheet, Image } from 'react-native'

const Header = () => {
  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      {/* <TextInput
        style={styles.input}
        label="Pesquisar"
        mode="outlined"
        theme={{ colors: { primary: '#f15a24'  } }}
      /> */}
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: {
    // paddingTop: 8, // Espaçamento superior para Android
    paddingHorizontal: 16, // Padding lateral de 8px
  },
  logoContainer: {
    flex: 5,
    alignItems: 'flex-start',
  },
  logo: {
    width: 100, // Ajuste o tamanho da logo conforme necessário
    height: 38, // Ajuste o tamanho da logo conforme necessário
  },
  input: {
    flex: 6,
    marginLeft: 8, // Espaçamento à esquerda do input
  },
})

export default Header
