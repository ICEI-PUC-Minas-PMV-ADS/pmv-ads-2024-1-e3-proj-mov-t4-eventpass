import api from './api';
import { UserData } from '../contexts/Auth';
import { Alert } from 'react-native';
import { UpdateUsuario } from '../interfaces/usuarios';

export const getUsuario = async (authToken?: UserData) => {
  try {
    const response = await api.get(`Usuarios`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    Alert.alert('Erro', 'Erro ao buscar usuário.')
    throw error;
  }
};

export const updateUsuario = async (id: number, data: UpdateUsuario, authToken?: UserData ) => {
  try {
    const response = await api.patch(`Usuarios/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    Alert.alert('Erro', 'Erro ao atualizar usuário.')
    throw error;
  }
}