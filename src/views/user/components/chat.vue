<template>
  <mu-flex class="chat">
    <LayoutBackBar>
      <mu-flex slot="title" align-items="center" @click="toUserDetail">
        <mu-avatar>
          <img v-lazy="currentChatUser.headUrl">
        </mu-avatar>
        <mu-flex direction="column" class="chat-user-info">
          <div class="user-nickname">{{ currentChatUser.remark || currentChatUser.nickname }}</div>
          <div class="user-cura-number">{{ currentChatUser.curaNumber }}</div>
        </mu-flex>
      </mu-flex>
      <mu-menu placement="bottom-end" slot="right" :open.sync="open">
        <mu-button icon>
          <mu-icon value="more_vert"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="clear">
            <mu-list-item-title>清除所有聊天记录</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="download">
            <mu-list-item-title>下载聊天记录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
      <mu-flex class="mu-chat-wrapper" direction="column">
        <div class="mu-chat-container" ref="chatContainer">
          <transition-group name="list-complete" tag="div">
            <div v-for="(chat) in currentChat" :key="chat.chatId + '-chat'">
              <mu-flex
                :justify-content="chat.receiveCuraNumber === user.curaNumber ? 'start': 'end'"
              >
                <div
                  :class="`${chat.receiveCuraNumber === user.curaNumber ? 'other' : 'my'}-msg msg`"
                >
                  <p class="chat-message" v-html="transformBr(chat.message)"></p>
                  <p class="chat-date">{{ chat.time | formatDate }}</p>
                </div>
              </mu-flex>
            </div>
          </transition-group>
        </div>
        <mu-flex class="mu-chat-input-wrapper" justify-content="around" align-items="end">
          <mu-button icon @click="openEmoji">
            <mu-icon value="insert_emoticon" color="#bbb"/>
          </mu-button>
          <mu-text-field
            v-model="message"
            multi-line
            solo
            :rows="1"
            :rows-max="4"
            class="mu-message-input"
            @keyup.enter.shift="sendMessage"
          />
          <mu-button icon @click="sendMessage">
            <mu-icon value="send" color="blueA200"/>
          </mu-button>
        </mu-flex>

        <div class="emoji-content" v-show="emojiShow">
          <mu-divider></mu-divider>
          <mu-tabs :value.sync="activeEmojiTab" color="#fff" full-width indicator-color="primary">
            <mu-tab>
              <mu-icon value="favorite" color="primary" small></mu-icon>
            </mu-tab>
            <mu-tab>
              <mu-icon value="face" color="primary" small></mu-icon>
            </mu-tab>
          </mu-tabs>
          <mu-divider></mu-divider>
          <div class="emoji-container" ref="emoji">
            <div v-if="activeEmojiTab === 0">
              <span v-for="(item, index) in emoji.hot" :key="index" class="item">{{item}}</span>
            </div>
            <div v-if="activeEmojiTab === 1">
              <span v-for="(item, index) in emoji.people" :key="index" class="item">{{item}}</span>
            </div>
          </div>
        </div>
      </mu-flex>
    </LayoutBackBar>
  </mu-flex>
</template>

<script>
import { isUndefined } from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import moment from "moment";
import emoji from "@/utils/emoji";
import { inHTMLData } from "xss-filters-es6";

export default {
  name: "chat",
  data() {
    return {
      message: "",
      open: false,
      emoji: emoji,
      emojiShow: false,
      activeEmojiTab: 0
    };
  },
  filters: {
    formatDate(value) {
      const dateStr = value.split("+")[0];
      return moment(new Date(dateStr)).format("MM-DD HH:mm");
    }
  },
  computed: {
    ...mapState(["token", "user", "currentChat", "socket"]),
    ...mapGetters(["getContact"]),
    currentChatUser() {
      return this.getContact(this.$route.query.cura);
    }
  },
  methods: {
    ...mapMutations(["socket_clear_current_chat", "socket_add_current_chat"]),
    ...mapActions(["clearChatHistory"]),
    openEmoji() {
      this.emojiShow = !this.emojiShow;
      this.activeEmojiTab = 0;
    },
    async download() {
      this.open = false;
      try {
        this.loading = this.$loading();
        const { data } = await this.$api.user.downloadChatHistory(
          this.currentChatUser.curaNumber
        );

        var filename = `聊天记录-${moment().format("YYYY-MM-DD hh:mm:ss")}.txt`;
        var eleLink = document.createElement("a");
        eleLink.download = filename;
        eleLink.style.display = "none";
        var blob = new Blob([data]);
        eleLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);

      } catch (e) {
        this.$throw(e);
      } finally {
        this.loading.close();
      }
    },
    async clear() {
      this.open = false;
      this.loading = this.$loading();
      try {
        await this.clearChatHistory(this.currentChatUser.curaNumber);
        this.$toast.success("删除聊天记录成功");
      } catch (e) {
        this.$throw(e);
      } finally {
        this.loading.close();
      }
    },
    async getChatObject() {
      const curaNumber = this.$route.query.cura;
      if (isUndefined(curaNumber)) {
        this.$toast.error("无效的用户");
        this.$router.go(-1);
        return;
      }
      try {
        const { data } = await this.$api.user.getUser(curaNumber);
      } catch (e) {
        this.$router.replace("/user/contacts");
        this.$throw(e);
      }

      this.socket.send(
        "/app/inChat",
        {},
        JSON.stringify({ receiveCuraNumber: parseInt(curaNumber, 10) })
      );
    },
    toUserDetail() {
      this.$router.push(`/user/detail?cura=${this.currentChatUser.curaNumber}`);
    },
    scrollBottom() {
      this.$nextTick(function() {
        const chatContainer = this.$refs.chatContainer;
        console.log(chatContainer);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    },
    transformBr(value) {
      return value.replace(/\n/g, "<br />");
    },
    sendMessage() {
      if (this.message === "") {
        this.$toast.message({
          message: "消息不能为空",
          position: "top",
          time: 1500
        });
        return;
      }
      if (this.message.length > 200) {
        this.$toast.message({
          message: "消息太长，请分段发送",
          position: "top",
          time: 2000
        });
        return;
      }
      this.socket.send(
        "/app/chat",
        {},
        JSON.stringify({
          receiveCuraNumber: this.currentChatUser.curaNumber,
          message: inHTMLData(this.message)
        })
      );
      this.message = "";
    },
    leaveChat() {
      this.socket.send(
        "/app/outChat",
        {},
        JSON.stringify({
          receiveCuraNumber: parseInt(this.currentChatUser.curaNumber, 10)
        })
      );
    }
  },
  updated() {
    this.scrollBottom();
  },
  mounted() {
    this.scrollBottom();
    this.$refs.emoji.addEventListener("click", e => {
      var target = e.target || e.srcElement;
      if (!!target && target.tagName.toLowerCase() === "span") {
        this.message += target.innerHTML;
      }
      e.stopPropagation();
    });
  },
  created() {
    this.getChatObject();
  },
  beforeRouteLeave(to, from, next) {
    this.leaveChat();
    this.socket_clear_current_chat();
    next();
  }
};
</script>

<style lang="scss" scoped>
.chat {
  overflow-x: hidden;
}
.user-nickname {
  @include ellipsis();
}
.emoji-content {
  font-size: 24px;
  overflow-x: scroll;
  width: 100vw;
  .emoji-tabs {
    word-break: break-all;
    .mu-tab-wrapper {
      height: 30px;
    }
  }
  .emoji-container {
    height: 30vh;
    padding: 10px;
    .item {
      padding: 5px;
    }
  }
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
  background: url("~@/assets/images/chat_bg.jpg") fixed;
  background-size: 600px;
  background-repeat: repeat;
  background-position: 0 0;
  padding: 20px;
  overflow-x: hidden;
  flex: 1;
  width: 100vw;
  transition: all 0.3s;
}
.mu-message-input {
  margin: 0;
  padding: 0;
  min-height: 48px;
  display: flex;
  align-items: center;
  padding: 12px 0;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

.list-complete-enter-active,
.list-complete-leave-active {
  transition: all 0.3s;
}

.list-complete-move {
  transition: all 0.3s;
}

.msg {
  transition: all 0.3s;
  padding: 8px 8px 2px;
  background: #fff;
  border-radius: 6px;
  margin: 5px 0;
  box-shadow: 0px 0px 4px #aaa;
  position: relative;
  z-index: 1;
  max-width: 70vw;
  min-width: 15vw;
  word-break: break-all;
  word-wrap: wrap;
  p {
    margin: 0;
  }

  .chat-message {
    line-height: 1.2;
    color: #333;
    font-weight: 300;
    font-size: 16px;
  }

  .chat-date {
    text-align: right;
    font-size: 10px;
    font-weight: 300;
    color: #aaa;
  }
}

.my-msg::after {
  content: "";
  position: absolute;
  right: -35px;
  bottom: 8%;
  border: 20px solid transparent;
  border-left-color: #fff;
}

.other-msg::after {
  content: "";
  position: absolute;
  left: -35px;
  bottom: 8%;
  border: 20px solid transparent;
  border-right-color: #fff;
}
</style>
