import * as types from './types';

const actions = {
  async login({ commit }, user) {
    const res = await $api.user.login(user);
    const { data } = res;
    commit({
      type: types.LOGIN,
      payload: data,
    })
  },
  async getMe({ commit }) {
    const res = await $api.user.getMe();
    const { data } = res;
    commit({
      type: types.SET_USER,
      payload: data,
    })
  },
  async getContacts({ commit }) {
    const res = await $api.user.getContacts();
    const { data } = res;
    commit({
      type: types.SET_CONTACTS,
      payload: data,
    })
  },
  async getGroups({ commit }) {
    const res = await $api.user.getGroups();
    const { data } = res;
    commit({
      type: types.SET_GROUPS,
      payload: data,
    })
  }
}


export default actions;
