const state = {
  user: {}, // 当前用户信息
  token: "", // 当前用户token
  direction: 'forward', // 路由方向
  contacts: [], // 联系人列表
  messageBox: {
    gossip: [],
    notice: [],
  },
  groups: [], // 好友分组
  clusters: [], // 群聊
  socket: null,
  socketHeader: {},
  currentChat: [],
  messageList: [],
}

export default state;
