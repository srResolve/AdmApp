import axios from 'axios';
import { configRefresh, configToken, storageToken } from '../utils/tokenManagement';

export const amazonik = 'http://192.168.0.224:3333';
export const refreshToken = 'sr-resolve-adm.refreshToken';
export const token = 'sr-resolve-worker.token';
export const productionApi = 'https://api.senhorresolve.com';

export const baseURL = productionApi;

export const api = axios.create({
  baseURL,
});

export const PostAPI = async (url: string, data: any) => {
  const connect = await api
    .post(url, data)
    .then(({ data }) => {
      return {
        status: 200,
        body: data,
      };
    })
    .catch((err) => {
      const message = err.response.data;
      const status = err.response.status;
      return { status: status, body: message };
    });

  return connect.status === 500
    ? { status: connect.status, body: 'Ops! algo deu errado, tente novamente' }
    : connect.status === 413
      ? {
          status: connect.status,
          body: 'Ops! algo deu errado, tente novamente ou escolha outra imagem',
        }
      : connect;
};

export const AuthPostAPI = async (url: string, data: any) => {
  const token = await configToken();

  if (token === 400) {
    return { status: 400, body: '' };
  }

  const connect = await api
    .post(url, data, token)
    .then(({ data }) => {
      return {
        status: 200,
        body: data,
      };
    })
    .catch((err) => {
      const message = err.response.data;
      const status = err.response.status;
      return { status: status, body: message };
    });

  return connect.status === 500
    ? { status: connect.status, body: 'Ops! algo deu errado, tente novamente' }
    : connect.status === 413
      ? {
          status: connect.status,
          body: 'Ops! algo deu errado, tente novamente ou escolha outra imagem',
        }
      : connect;
};

export const AuthPutAPI = async (url: string, data: any) => {
  const token = await configToken();

  if (token === 400) {
    return;
  }

  const connect = await api
    .put(url, data, token)
    .then(({ data }) => {
      return {
        status: 200,
        body: data,
      };
    })
    .catch((err) => {
      const message = err.response.data;
      const status = err.response.status;
      return { status: status, body: message };
    });

  return connect.status === 500
    ? { status: connect.status, body: 'Ops! algo deu errado, tente novamente' }
    : connect.status === 413
      ? {
          status: connect.status,
          body: 'Ops! algo deu errado, tente novamente ou escolha outra imagem',
        }
      : connect;
};

export const getAPI = async (url: string) => {
  const connect = await api
    .get(url)
    .then(({ data }) => {
      return {
        status: 200,
        body: data,
      };
    })
    .catch((err) => {
      const message = err.response.data;
      const status = err.response.status;
      return { status: status, body: message };
    });

  return connect.status === 500
    ? { status: connect.status, body: 'Ops! algo deu errado, tente novamente' }
    : connect.status === 413
      ? {
          status: connect.status,
          body: 'Ops! algo deu errado, tente novamente ou escolha outra imagem',
        }
      : connect;
};

export const authGetAPI = async (url: string) => {
  const token = await configToken();

  if (token === 400) {
    return { status: 400, body: '' };
  }

  const connect = await api
    .get(url, token)
    .then(({ data }) => {
      return {
        status: 200,
        body: data,
      };
    })
    .catch((err) => {
      const message = err.response.data;
      const status = err.response.status;
      return { status: status, body: message };
    });

  return connect.status === 500
    ? { status: connect.status, body: 'Ops! algo deu errado, tente novamente' }
    : connect.status === 413
      ? {
          status: connect.status,
          body: 'Ops! algo deu errado, tente novamente ou escolha outra imagem',
        }
      : connect;
};

export const authDeleteAPI = async (url: string) => {
  const token = await configToken();

  if (token === 400) {
    return { status: 400, body: '' };
  }

  const connect = await api
    .delete(url, token)
    .then(({ data }) => {
      return {
        status: 200,
        body: data,
      };
    })
    .catch((err) => {
      const message = err.response.data;
      const status = err.response.status;
      return { status: status, body: message };
    });

  return connect.status === 500
    ? { status: connect.status, body: 'Ops! algo deu errado, tente novamente' }
    : connect.status === 413
      ? {
          status: connect.status,
          body: 'Ops! algo deu errado, tente novamente ou escolha outra imagem',
        }
      : connect;
};

export const loginVerifyAPI = async () => {
  const token = await configToken();
  const refreshToken = await configRefresh();
  if (token == 400 || refreshToken == 400) {
    return 400;
  }

  const newToken = await api
    .patch('/user/refresh', {}, refreshToken)
    .then(async ({ data }) => {
      return { status: 200, body: '' };
    })
    .catch((err) => {
      const message = err.response.data;
      const status = err.response.status;
      return { status: status, body: message };
    });
  if (newToken.status != 200) {
    return 400;
  }

  await storageToken(newToken.body);

  return 200;
};
