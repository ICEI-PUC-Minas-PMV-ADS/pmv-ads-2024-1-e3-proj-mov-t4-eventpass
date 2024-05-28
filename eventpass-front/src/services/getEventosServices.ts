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