import { Alert } from 'react-native';
import api from './api';
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
    console.log('Erro ao retirar o ingresso:', error);
    Alert.alert('Erro', 'Erro ao retirar o ingresso.')
    throw error;
  }
};

export const getMyIngressos = async ( authToken?: UserData) => {
  try {
    const response = await api.get(`Ingressos`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Erro ao buscar ingressos do usuário:', error);
    Alert.alert('Erro', 'Erro ao buscar ingressos do usuário.')
    throw error;
  }
};

export const deleteIngresso = async (id: number, authToken?: UserData) => {
  try {
    const response = await api.delete(`Ingressos/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    Alert.alert('Sucesso', 'Ingresso excluído com sucesso!')
    return response.data;
  } catch (error) {
    console.log('Erro ao excluir ingresso:', error);
    Alert.alert('Erro', 'Erro ao excluir ingresso.')
    throw error;
  }
};