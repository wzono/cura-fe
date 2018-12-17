<template>
  <mu-flex class="chat">
    <LayoutBackBar>
      <mu-flex slot="title" align-items="center">
        <mu-avatar>
          <!-- <img :src="head_url" alt="avatar_url" v-if="head_url"> -->
          <span>W</span>
        </mu-avatar>
        <div class="user-nickname">{{ currentChatCura }}</div>
      </mu-flex>
      <mu-button icon slot="right">
        <mu-icon value="more_vert"></mu-icon>
      </mu-button>
      <mu-flex class="mu-chat-wrapper" direction="column">
        <mu-container class="mu-chat-container">
            123123
        </mu-container>
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
            <mu-icon value="send" color="primary" />
          </mu-button>
        </mu-flex>
      </mu-flex>
    </LayoutBackBar>
  </mu-flex>
</template>

<script>
import { isUndefined } from "lodash";
export default {
  name: "chat",
  data() {
    return {
      currentChatCura: "",
      message: ""
    };
  },
  methods: {
    getChatObject() {
      const cura_number = this.$route.query.cura;
      if (isUndefined(cura_number)) {
        this.$toast.error("无效的用户");
        this.$router.go(-1);
        return;
      }

      this.currentChatCura = cura_number;
    }
  },
  created() {
    this.getChatObject();
  }
};
</script>

<style lang="scss" scoped>
.user-nickname {
  @include ellipsis();
  margin-left: 10px;
}

.mu-chat-wrapper {
  width: 100%;
  height: calc(100vh - 56px);
}
.mu-chat-input-wrapper {
  width: 100%;
  overflow: hidden;
  box-shadow: 0 -2px 2px #ccc;
}

.mu-chat-container {
  height: calc(100% - 48px);
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
