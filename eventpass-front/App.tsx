import Header from './src/template/header/header'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Footer from './src/template/footer/footer'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <SafeAreaProvider>
      <Header />
      <NavigationContainer>
        <Footer />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
