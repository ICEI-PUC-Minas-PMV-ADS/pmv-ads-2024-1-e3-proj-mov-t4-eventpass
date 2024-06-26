import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { useAuth } from '../contexts/Auth'
import { ActivityIndicator, Drawer } from 'react-native-paper'
import { View } from 'react-native'
import { AuthStack } from './AuthStack'
import Header from '../template/header/header'

export function Router() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <View>
        <ActivityIndicator animating={true} color="#f15a24" size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Header />
      <AuthStack />
    </NavigationContainer>
  )
}
