<template>
  <mu-flex class="chat">
    <LayoutBackBar>
      <mu-flex slot="title" align-items="center" @click="toUserDetail">
        <mu-avatar>
          <img :src="currentChatUser.headUrl" alt="avatar_url" v-if="currentChatUser.headUrl">
          <span v-else>W</span>
        </mu-avatar>
        <mu-flex direction="column" class="chat-user-info">
          <div class="user-nickname">{{ currentChatUser.nickname }}</div>
          <div class="user-cura-number">{{ currentChatUser.curaNumber }}</div>
        </mu-flex>
      </mu-flex>
      <mu-button icon slot="right">
        <mu-icon value="more_vert"></mu-icon>
      </mu-button>
      <mu-flex class="mu-chat-wrapper" direction="column">
        <mu-container class="mu-chat-container"></mu-container>
        <mu-flex class="mu-chat-input-wrapper" justify-content="around" align-items="end">
          <mu-button icon>
            <mu-icon value="insert_emoticon" color="#bbb"/>
          </mu-button>
          <mu-text-field
            v-model="message"
            multi-line
            solo
            :rows="1"
            :rows-max="4"
            class="mu-message-input"
          />
          <mu-button icon>
            <mu-icon value="send" color="blueA200"/>
          </mu-button>
        </mu-flex>
      </mu-flex>
    </LayoutBackBar>
  </mu-flex>
</template>

<script>
import { isUndefined } from "lodash";
import { mapState } from "vuex";

export default {
  name: "chat",
  data() {
    return {
      message: "",
      currentChatUser: {
        nickname: "Annoymous",
        curaNumber: 999999
      }
    };
  },
  computed: {
    ...mapState(["token", "user"])
  },
  methods: {
    async getChatObject() {
      const curaNumber = this.$route.query.cura;
      if (isUndefined(curaNumber)) {
        this.$toast.error("无效的用户");
        this.$router.go(-1);
        return;
      }

      try {
        const { data } = await this.$api.user.getUser(curaNumber);
        this.currentChatUser = data;
      } catch (e) {
        this.$router.go(-1);
        this.$throw(e);
      }
    },
    toUserDetail() {
      this.$router.push(`/user/detail?cura=${this.currentChatUser.curaNumber}`);
    },
    initSocket() {
      this.header = {
        Authorization: this.token
      };

      this.ws = this.$ws();

      this.ws.connect(
        this.header,
        this.onConnect,
        this.onError
      );
    },
    onConnect(frame) {
      this.ws.subscribe(
        "/topic/privateChat",
        frame => {
          console.log(frame);
        },
        this.header
      );

      this.ws.send(
        "/app/privateChat",
        this.header,
        JSON.stringify({
          sendCuraNumber: this.user.curaNumber,
          receiveCuraNumber: this.currentChatUser.curaNumber,
          message: "hahaha"
        })
      );
    },
    onError(err) {
      console.log("error");
      console.log(err);
    },
    disConnect() {
      if (this.ws !== null) {
        this.ws.disconnect();
      }
    }
  },
  mounted() {
    this.initSocket();
  },
  created() {
    this.getChatObject();
  },
  beforeDestroy() {
    this.disConnect();
  }
};
</script>

<style lang="scss" scoped>
.user-nickname {
  @include ellipsis();
}

.chat-user-info {
  line-height: 1;
  margin-left: 10px;
  flex: 1;

  .user-cura-number {
    font-size: 12px;
    margin-top: 5px;
    color: rgba(255, 255, 255, 0.5);
  }
}

.mu-chat-wrapper {
  width: 100%;
  height: 100%;
}
.mu-chat-input-wrapper {
  width: 100%;
  overflow: hidden;
  box-shadow: 0 -2px 2px #ccc;
}

.mu-chat-container {
  flex: 1;
  overflow: auto;
  background: url("http://cdn.wingsico.org/image/chat_bg.jpg") fixed;
  background-size: 600px;
  background-repeat: repeat;
}
.mu-message-input {
  margin: 0;
  padding: 0;
  min-height: 48px;
  display: flex;
  align-items: center;
  padding: 12px 0;
}
</style>
