import { UserData } from '../contexts/Auth'
import api from './api'

async function signIn(email: string, password: string): Promise<UserData> {
    try {
        const response = await api.post('Login', { username: email, password })
        return Promise.resolve(response.data)
    } catch (error) {
        console.error('Erro ao fazer login:', error)
        return Promise.reject(error)
    }
}

export const authService =  { signIn }