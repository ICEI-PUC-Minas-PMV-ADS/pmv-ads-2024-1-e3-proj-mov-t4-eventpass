import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SignIn from '../pages/signIn'
import HomePage from '../pages/home'
import Buscar from '../pages/buscar'
import { View, ViewStyle } from 'react-native'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    border: 'none',
    backgroundColor: 'black',
    height: 80,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
  } as ViewStyle,
}

const Tab = createBottomTabNavigator()

export function AuthStack() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Entypo
                name="home"
                size={24}
                color={focused ? '#f15a24' : '#ffffff'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Buscar}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome
                name="search"
                size={24}
                color={focused ? '#f15a24' : '#ffffff'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Sign In"
        component={SignIn}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name="person"
                size={24}
                color={focused ? '#f15a24' : '#ffffff'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
