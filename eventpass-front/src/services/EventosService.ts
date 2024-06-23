import FormData from 'form-data';
import { Alert } from "react-native";
import { UserData } from "../contexts/Auth";
import api from "./api"

export const getEventos = async (top: number) => {
    try {
      const response = await api.get(`Eventos?top=${top}`);
      return response.data;
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar eventos.')
      throw error;
    }
  };

export const searchEventos = async (query: string) => {
    try {
      const response = await api.get(`Eventos/buscar?query=${query}`);
      return response.data;
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar eventos.')
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
    Alert.alert('Erro', 'Erro ao excluir evento.')
    throw error;
  }
};


export const createEventoData = async (data: any, authToken?: UserData) => {
  try {
    const form = new FormData();
    form.append('nome', data.nome);
    form.append('dataHora', data.dataHora);
    form.append('totalIngressos', data.totalIngressos.toString());
    form.append('descricao', data.descricao);
    form.append('local', data.local);
    form.append('flyer', { uri: data.flyer, name: 'flyer.jpg', type: 'image/jpeg' });

    const response = await api.post(`Eventos`, form, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    Alert.alert('Sucesso', 'Evento criado com sucesso!');
    return response.data;
  } catch (error) {
    Alert.alert('Erro', 'Erro ao criar evento.');
    throw error;
  }
};

export const updateEventoData = async (id: number, data: any, authToken?: UserData) => {
  try {
    const form = new FormData();
    form.append('nome', data.nome);
    form.append('dataHora', data.dataHora);
    form.append('totalIngressos', data.totalIngressos.toString());
    form.append('descricao', data.descricao);
    form.append('local', data.local);
    form.append('flyer', { uri: data.flyer, name: 'flyer.jpg', type: 'image/jpeg' });

    const response = await api.put(`Eventos/${id}`, form, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    Alert.alert('Sucesso', 'Evento atualizado com sucesso!');
    return response.data;
  } catch (error) {
    Alert.alert('Erro', 'Erro ao atualizar evento.');
    throw error;
  }
};
