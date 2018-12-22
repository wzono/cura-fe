import * as types from './types';
import { clearToken, setToken, getToken } from '@/utils/auth';

const mutations = {
  [types.LOGIN](state, { payload }) {
    state.user = payload.user;
    state.token = payload.token;
    setToken(payload.token);
  },
  [types.SET_USER](state, { payload }) {
    state.user = payload;
    state.token = getToken();
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
  },
  [types.SET_GROUPS](state, { payload }) {
    state.groups = payload;
  }
}

export default mutations;
