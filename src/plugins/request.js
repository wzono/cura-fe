import axios from 'axios';
import { getToken } from '@/utils/auth';
import Toast from 'muse-ui-toast';
import store from '@/store/index';
import router from '@/router/index';
import * as types from '@/store/types';


const codeMessage = {
  200: '请求成功',
  201: '修改数据成功',
  204: '删除数据成功',
  400: '请求格式有误',
  401: 'token无效',
  403: '权限不足',
  404: '请求不存在',
  410: '资源已删除',
  422: '验证错误',
  500: '服务器错误',
  502: '网关错误',
  503: '维护中',
  504: '连接超时',
};

const instance = axios.create({
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
})


instance.interceptors.request.use(config => {
  const { headers, auth = true } = config;
  return auth ? { ...config, headers: { ...headers, authorization: getToken() } } : config;
}, err => Promise.reject(err))

instance.interceptors.response.use(response => response.data, err => {
  if (err && err.response) {
    const { status, data } = err.response;

    if (status === 401) {
      store.commit(types.LOGOUT);
      router.replace({
        path: '/login',
      })
    }

    const errorMessage = (data && (data.message || data.error)) || codeMessage[status];
    Toast.error(errorMessage);
    return Promise.reject(err);
  }

  Toast.error(codeMessage[504]);
  throw err;
})

const request = (url, options) => {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT'|| newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return instance(url, newOptions);
}


const install = (Vue) => {
  if (install.installed) {
    return;
  }

  install.installed = true;

  Object.defineProperties(Vue.prototype, {
    $request: {
      get() {
        return request
      },
    },
  });

  Object.defineProperties(window, {
    $request: {
      get() {
        return request
      }
    }
  })
}


export default install;
