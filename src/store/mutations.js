import * as types from './types';
import { clearToken, setToken, getToken } from '@/utils/auth';
import moment from 'moment';

const mutations = {
  [types.LOGIN](state, { payload }) {
    const { user } = payload;
    user.commend = payload.commends;
    state.user = payload.user;
    state.token = payload.token;
    setToken(payload.token);
  },
  [types.SET_USER](state, { payload }) {
    const { user } = payload;
    user.commend = payload.commends;
    state.user = user;
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
  },
  [types.SAVE_SOCKET](state, payload) {
    state.socket = payload.socket;
    state.socketHeader = payload.header;
  },
  socket_save_gossip(state, payload) {
    const map = payload.reduce((acc, cur) => {
      const uuid = (cur.sendCuraNumber * cur.receiveCuraNumber) / (cur.sendCuraNumber + cur.receiveCuraNumber);
      acc[uuid] ? acc[uuid].push(cur) : acc[uuid] = [cur];
      return acc;
    }, {})

    const data = Object.keys(map).sort((a, b) => new Date(map[b].slice(-1).time) - new Date(map[a].slice(-1).time)).map(key => {
      const item = map[key];
      const obj = {};
      const _item = item.find((t) => t.receiveCuraNumber == state.user.curaNumber || t.sendCuraNumber == state.user.curaNumber);
      obj.headUrl = _item.headUrl;
      obj.curaNumber = _item.sendCuraNumber == state.user.curaNumber ? _item.receiveCuraNumber : _item.sendCuraNumber;
      obj.nickname = _item.nickname;
      obj.content = item[0].content;
      obj.time = item[0].time;
      obj.unReadLength = item.filter(({ isRead }) => isRead === 0).length;
      return obj;
    })

    state.messageBox.gossip = data;
  },
  socket_save_notice(state, payload) {
    state.messageBox.notice = payload.sort((a, b) => new Date(b.time) - new Date(a.time));
  },
  socket_save_contacts(state, payload) {
    state.contacts = payload;
  },
  socket_add_current_chat(state, payload) {
    if (payload instanceof Array) {
      state.currentChat = [];
      state.currentChat.push(...payload)

    } else {
      if (state.currentChat.slice(-1).chatId !== payload.chatId) {
        state.currentChat.push(payload)
      }
    }
  },
  socket_clear_current_chat(state) {
    state.currentChat = [];
  }
}

export default mutations;
