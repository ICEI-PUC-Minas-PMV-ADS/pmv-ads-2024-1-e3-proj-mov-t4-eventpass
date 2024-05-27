import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfilePage from '../pages/profile'

export interface AppParamList {
  Home: undefined
  Profile: undefined
}

const Stack = createNativeStackNavigator()

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfilePage} />
    </Stack.Navigator>
  )
}
