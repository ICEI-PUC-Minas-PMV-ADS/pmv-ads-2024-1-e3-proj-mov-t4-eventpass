import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SignIn from '../pages/signIn'
import HomePage from '../pages/home'
import Buscar from '../pages/buscar'
import { View, ViewStyle } from 'react-native'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useAuth } from '../contexts/Auth'
import ProfilePage from '../pages/profile'
import { createStackNavigator } from '@react-navigation/stack'
import EventosPage from '../pages/evento'
import { ParamListBase } from '@react-navigation/native'
import TicketPage from '../pages/ingresso'
import EditProfile from '../pages/editProfile'
import EditEvento from '../pages/editEvento'
import CreateEvento from '../pages/createEvento'

export interface HomeStackParamList extends ParamListBase {
  HomePage: undefined
  EventosPage: { idEvento: number }
  Ingresso: undefined
  EditEvento: { idEvento: number }
  CreateEvento: undefined
  EditProfile: { idUsuario: number }
  ProfilePage: undefined
}

const Stack = createStackNavigator<HomeStackParamList>()

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="EventosPage" component={EventosPage} />
      <Stack.Screen name="Ingresso" component={TicketPage} />
      <Stack.Screen name="EditEvento" component={EditEvento} />
      <Stack.Screen name="CreateEvento" component={CreateEvento} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
    </Stack.Navigator>
  )
}

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
  const { user } = useAuth()
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
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
      {user ? (
        <Tab.Group>
          <Tab.Screen
            name="Ingresso"
            component={TicketPage}
            options={{
              tabBarIcon: ({ focused }) => (
                <View>
                  <Ionicons
                    name="ticket-sharp"
                    size={24}
                    color={focused ? '#f15a24' : '#ffffff'}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfilePage}
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
        </Tab.Group>
      ) : (
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
      )}
    </Tab.Navigator>
  )
}
