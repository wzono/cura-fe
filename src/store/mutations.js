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
  },
  [types.UPDATE_DIRECTION](state, { payload }) {
    state.direction = payload.direction;
  },
  [types.SET_CONTACTS](state, { payload }) {
    state.contacts = payload;
  }
}

export default mutations;
