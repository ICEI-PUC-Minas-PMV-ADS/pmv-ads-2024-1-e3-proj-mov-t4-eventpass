export const formatarTipoUsuario = (tipo?: number) => {
    switch (tipo) {
      case 0:
        return 'Espectador';
      case 1:
        return 'Gestor';
      default:
        return 'Não identificado';
    }
  };