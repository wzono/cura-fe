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
  async getUser({ commit }) {
    const res = await $api.user.getUser();
    const { data } = res;
    commit({
      type: types.LOGIN,
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
  }
}


export default actions;
