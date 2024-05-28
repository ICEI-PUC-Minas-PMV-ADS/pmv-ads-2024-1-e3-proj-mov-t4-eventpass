import React from 'react'
import { Router } from './src/router/router'
import { AuthProvider } from './src/contexts/Auth'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <PaperProvider>
          <Router />
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  )
}
