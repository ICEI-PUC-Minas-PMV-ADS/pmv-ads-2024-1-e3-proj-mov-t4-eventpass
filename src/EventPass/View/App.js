import React from 'react'
import Header from './src/template/header/header'
import Footer from './src/template/footer/footer'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Header />
        <Footer />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
