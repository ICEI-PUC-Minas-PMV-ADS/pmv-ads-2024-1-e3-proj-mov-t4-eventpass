import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useState } from 'react'
import { authService } from '../services/authService'
import { Alert } from 'react-native'

export interface UserData {
  token: string
}

interface AuthContextData {
  user?: UserData
  signIn: (email: string, password: string) => Promise<UserData>
  signOut: () => Promise<void>
  loading: boolean
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserStorage()
  }, [])

  async function loadUserStorage() {
    const auth = await AsyncStorage.getItem('@eventpassAuth')

    if (auth) {
      setUser(JSON.parse(auth) as UserData)
    }
    setLoading(false)
  }

  async function signIn(email: string, password: string): Promise<UserData> {
    try {
      const auth = await authService.signIn(email, password)

      setUser(auth)
      AsyncStorage.setItem('@eventpassAuth', JSON.stringify(auth))
      return auth
    } catch (error) {
      Alert.alert('Erro', 'Usuário ou senha inválidos')
      throw new Error('Usuário ou senha inválidos')
    }
  }

  async function signOut(): Promise<void> {
    setUser(undefined)
    console.log('signOut')
    AsyncStorage.removeItem('@eventpassAuth')
    return
  }
  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
