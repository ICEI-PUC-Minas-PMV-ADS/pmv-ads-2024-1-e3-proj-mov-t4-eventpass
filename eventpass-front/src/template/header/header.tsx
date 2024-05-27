import * as React from 'react'
import { Appbar } from 'react-native-paper'
import { View, StyleSheet, Image } from 'react-native'

const Header: React.FC = () => {
  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
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
    flex: 5,
    alignItems: 'flex-start',
  },
  logo: {
    width: 100,
    height: 38,
  },
  input: {
    flex: 6,
    marginLeft: 8,
  },
})

export default Header
