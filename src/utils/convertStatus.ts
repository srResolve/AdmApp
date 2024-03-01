export const convertStatus = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'Ativo';
    case 'PENDING':
      return 'Pendente';
    case 'APPROVED':
      return 'Aprovado';
    case 'REFUSED':
      return 'Recusado';
    case 'COMPLETE':
      return 'Completo';
    case 'PAYED':
      return 'Pago';
    case 'EXECUTED':
      return 'Executado';
    case 'FINISHED':
      return 'Finalizado';
    case 'STARTED':
      return 'Iniciado';
    case 'UNFINISHED':
      return 'Inacabado';
    default:
      return 'Status desconhecido';
  }
};
