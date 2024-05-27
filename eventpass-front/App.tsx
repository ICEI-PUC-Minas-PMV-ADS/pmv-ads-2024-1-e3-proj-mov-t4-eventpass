import React from 'react'
import { Router } from './src/router/router'
import { AuthProvider } from './src/contexts/Auth'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </AuthProvider>
  )
}
