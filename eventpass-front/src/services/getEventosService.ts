import { Alert } from "react-native";
import { UserData } from "../contexts/Auth";
import api from "./api"

export const getEventos = async (top: number) => {
    try {
      const response = await api.get(`Eventos?top=${top}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      throw error;
    }
  };

export const searchEventos = async (query: string) => {
    try {
      const response = await api.get(`Eventos/buscar?query=${query}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      throw error;
    }
  }

export const getMyEventos = async ( authToken?: UserData) => {
  try {
    const response = await api.get(`Eventos/meus-eventos`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Erro ao buscar eventos do usuário:', error);
    Alert.alert('Erro', 'Erro ao buscar eventos do usuário.')
    throw error;
  }
};

export const deleteEvento = async (id: number, authToken?: UserData) => {
  try {
    const response = await api.delete(`Eventos/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    Alert.alert('Sucesso', 'Evento excluído com sucesso!')
    return response.data;
  } catch (error) {
    console.log('Erro ao excluir evento:', error);
    Alert.alert('Erro', 'Erro ao excluir evento.')
    throw error;
  }
};