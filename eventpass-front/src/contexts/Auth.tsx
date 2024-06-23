import React, { useContext, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useState } from 'react'
import { authService } from '../services/authService'
import { Alert } from 'react-native'
import { LoginUsuario } from '../interfaces/usuarios'

export interface UserData {
  token: string
}

interface AuthContextData {
  user?: UserData
  signIn: (data: LoginUsuario) => Promise<UserData>
  signOut: () => Promise<void>
  refresh: () => void
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

  const refresh = useCallback(() => {
    loadUserStorage()
  }, [])

  async function signIn(data: LoginUsuario): Promise<UserData> {
    try {
      const auth = await authService.signIn(data)
      setUser(auth)
      await AsyncStorage.setItem('@eventpassAuth', JSON.stringify(auth))
      refresh()
      return auth
    } catch (error) {
      Alert.alert('Erro', 'Usuário ou senha inválidos')
      throw new Error('Usuário ou senha inválidos')
    }
  }

  async function signOut(): Promise<void> {
    await AsyncStorage.removeItem('@eventpassAuth')
    setUser(undefined)
    refresh()
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, refresh, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
