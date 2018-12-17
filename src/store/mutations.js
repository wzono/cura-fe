import * as types from './types';
import { clearToken, setToken } from '@/utils/auth';

const mutations = {
  [types.LOGIN](state, { payload }) {
    state.user = payload.user;
    state.token = payload.token;
    setToken(payload.token);
  },
  [types.LOGOUT](state) {
    state.user = {};
    state.token = "";
    clearToken();
  }
}

export default mutations;
