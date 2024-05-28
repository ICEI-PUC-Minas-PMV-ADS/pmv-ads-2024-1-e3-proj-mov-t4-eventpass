export const formatarDataHora = (dataHoraString: string) => {
    const dataHora = new Date(dataHoraString);
    const dia = dataHora.getDate().toString().padStart(2, '0');
    const mes = (dataHora.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataHora.getFullYear();
    const horas = dataHora.getHours().toString().padStart(2, '0');
    const minutos = dataHora.getMinutes().toString().padStart(2, '0');

    return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
  };