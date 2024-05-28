import { Alert } from 'react-native';
import api from '../services/api';
import { UserData } from '../contexts/Auth';

export const getIngresso = async (id: number, authToken?: UserData) => {
  try {
    const response = await api.post(`Eventos/${id}/retirar-ingresso`, null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    Alert.alert('Sucesso', 'Ingresso retirado com sucesso!')
    return response.data;
  } catch (error) {
    Alert.alert('Erro', 'Erro ao retirar o ingresso.')
    throw error;
  }
};
