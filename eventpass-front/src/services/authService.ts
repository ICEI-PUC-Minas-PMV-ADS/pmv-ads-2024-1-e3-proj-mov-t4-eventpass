import { Alert } from 'react-native'
import { UserData } from '../contexts/Auth'
import api from './api'
import { LoginUsuario } from '../interfaces/usuarios'

async function signIn(data: LoginUsuario): Promise<UserData> {
    try {
        const response = await api.post('Login', data)
        return Promise.resolve(response.data)
    } catch (error) {
        Alert.alert('Erro', 'Erro ao fazer login.')
        return Promise.reject(error)
    }
}

export const authService =  { signIn }