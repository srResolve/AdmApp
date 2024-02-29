export const baseInputOnBlurValidation = (name: string, value?: string) => {
  switch (name) {
    case 'name':
      if (!value || value === '') {
        return 'Insira um nome válido';
      }
      break;

    case 'email':
      if (!value || value === '') {
        return 'Insira um e-mail';
      }
      break;

    case 'password':
      if (!value || value === '') {
        return 'Insira uma senha';
      }
      break;
    case 'password2':
      if (!value || value === '') {
        return 'Confirme sua senha';
      }

    case 'value':
      if (!value || value === '') {
        return 'Insira um valor';
      }

    case 'quantity':
      if (!value || value === '') {
        return 'Insira uma quantidade';
      }

    default:
      null;
  }
};
