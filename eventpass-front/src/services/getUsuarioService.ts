import api from './api';
import { UserData } from '../contexts/Auth';

export const getUsuario = async (authToken?: UserData) => {
  try {
    const response = await api.get(`Usuarios`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
