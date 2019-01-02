<template>
  <div class="user-page">
    <CommonFadeTransition>
      <router-view/>
    </CommonFadeTransition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { SAVE_SOCKET, SET_USER } from "@/store/types";

export default {
  name: "user-page",
  computed: {
    ...mapState(["token", "socket", "user", "socketHeader"])
  },
  methods: {
    ...mapActions(["getGroups", "logout"]),
    ...mapMutations([
      SAVE_SOCKET,
      SET_USER,
      "socket_save_contacts",
      "socket_save_gossip",
      "socket_save_notice",
      "socket_add_current_chat"
    ]),
    initSocket() {
      const socket = this.$ws(this.token);

      const queue = [];

      const subscribes = [];

      const subscribe = socket.subscribe.bind(socket);

      const send = socket.send.bind(socket);
      let socketReady = false;

      socket.send = (...args) => {
        if (!socketReady) queue.push(args);
        else {
          send(...args);
        }
      };

      socket.subscribe = (...args) => {
        if (!socketReady) subscribes.push(args);
        else {
          subscribe(...args);
        }
      };

      function detectSocketReady(callback) {
        let interval = setInterval(() => {
          if (socket.ws.readyState == 1) {
            socketReady = true;
            callback & callback();
            clearInterval(interval);
          }
        }, 10);
      }

      detectSocketReady(flushQueue);

      function flushQueue() {
        queue.forEach(args => send(...args));
        subscribes.forEach(args => subscribe(...args));
      }

      this.SAVE_SOCKET({
        socket: socket,
        header: { Authorization: this.token }
      });

      this.socket.connect(
        this.socketHeader,
        this.onConnect,
        this.onError
      );
    },
    onConnect(frame) {
      this.socket.subscribe("/user/queue/gossip", ({ body }) =>
        this.socket_save_gossip(JSON.parse(body))
      );
      this.socket.subscribe("/user/queue/notice", ({ body }) =>
        this.socket_save_notice(JSON.parse(body))
      );
      this.socket.subscribe("/user/queue/friends", ({ body }) =>
        this.socket_save_contacts(JSON.parse(body))
      );
      this.socket.subscribe("/user/queue/user", ({ body }) => {
        this.$toast.success("更新成功");
        this.$router.replace("/user/settings");
        this.SET_USER({ payload: JSON.parse(body) });
      });

      this.socket.subscribe("/user/queue/chat", ({ body }) => {
        this.socket_add_current_chat(JSON.parse(body));
      });

      this.socket.send("/app/connect");
      this.socket.send("/app/friends");
    },
    onError(err) {
      this.$toast.error(err);
    },
    disConnect() {
      if (this.socket !== null) {
        this.socket.send("/app/outConnect");
        this.socket.disconnect();
      }
    }
  },

  created() {
    this.initSocket();
    this.getGroups();

    addEventListener("beforeunload", this.disConnect);
  },
  beforeDestroy() {
    this.disConnect();
  }
};
</script>

<style lang="scss" scoped>
</style>
