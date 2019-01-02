import * as types from './types';
import { clearChatHistory } from '../services/user';

const actions = {
  async login({ commit }, user) {
    const res = await $api.user.login(user);
    const { data } = res;
    commit({
      type: types.LOGIN,
      payload: data,
    })
  },
  logout({ commit }) {
    commit({
      type: types.LOGOUT
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
  },
  async updateAvatar({ commit }, formdata) {
    const res = await $api.user.updateAvatar(formdata);
    const { data } = res;
    commit({
      type: types.SET_USER,
      payload: data,
    })
  },
  async updatePhone({ commit }, phone) {
    const res = await $api.user.updatePhone(phone);
    const { data } = res;
    commit({
      type: types.SET_USER,
      payload: data,
    })
  },
  async updateNickname({ commit }, nickname ) {
    const res = await $api.user.updateNickname(nickname);
    const { data } = res;
    commit({
      type: types.SET_USER,
      payload: data,
    })
  },
  async updateExtraInfo({ commit }, info) {
    const res = await $api.user.updateExtraInfo(info);
    const { data } = res;
    commit({
      type: types.SET_USER,
      payload: data,
    })
  },
  async addGroup({ commit, dispatch }, groupName) {
    await $api.user.addGroup(groupName);
    await dispatch('getGroups');
  },
  async deleteGroup({ dispatch}, groupId) {
    await $api.user.deleteGroup(groupId);
    await dispatch('getGroups');
  },
  async updateGroupName({ dispatch }, group) {
    await $api.user.updateGroupName(group);
    await dispatch('getGroups');
  },
  async clearChatHistory({ commit }, friendCuraNumber) {
    await $api.user.clearChatHistory(friendCuraNumber);
    commit('socket_clear_current_chat');
  },
}


export default actions;
