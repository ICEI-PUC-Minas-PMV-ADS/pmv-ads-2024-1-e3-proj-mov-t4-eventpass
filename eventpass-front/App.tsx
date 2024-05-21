import Header from './src/template/header/header'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Footer from './src/template/footer/footer'
import React from 'react'

export default function App() {
  return (
    <SafeAreaProvider>
      <Header />
      <Footer />
    </SafeAreaProvider>
  )
}
