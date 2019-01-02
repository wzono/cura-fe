<template>
  <div class="message-box">
    <mu-appbar style="width: 100%;" color="blueA200" title="Cura" ref="indexAppBar">
      <mu-button icon large slot="left" @click="drawerHandler()">
        <mu-icon value="dehaze"></mu-icon>
      </mu-button>
      <mu-badge
        :content="`${unReadNoticeLength}`"
        circle
        color="secondary"
        slot="right"
        v-if="unReadNoticeLength !== 0"
        badge-class="mu-custom-badge"
      >
        <mu-button icon to="/user/notice">
          <mu-icon value="notifications"></mu-icon>
        </mu-button>
      </mu-badge>
      <mu-button icon to="/user/notice" slot="right" v-else>
        <mu-icon value="notifications"></mu-icon>
      </mu-button>
    </mu-appbar>

    <!-- 侧边栏 -->
    <mu-drawer :open.sync="open" :docked="false">
      <div class="info-wrapper" @click="toUserDetail()">
        <div class="avatar-wrapper">
          <mu-avatar :size="60">
            <img v-lazy="user.headUrl">
          </mu-avatar>
        </div>
        <div class="detial-wrapper">
          <p class="nickname">{{user.nickname}}</p>
          <p class="phone">{{formatPhone}}</p>
        </div>
      </div>
      <div class="list-wrapper">
        <mu-list>
          <mu-list-item button to="/user/contacts">
            <mu-list-item-action>
              <mu-icon value="account_box"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>我的好友</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button to="/user/settings">
            <mu-list-item-action>
              <mu-icon value="settings"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>设置</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button to="/user/group_settings">
            <mu-list-item-action>
              <mu-icon value="group"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>分组管理</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="goDataView">
            <mu-list-item-action>
              <mu-icon value="looks"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>数据可视化</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="goProduct">
            <mu-list-item-action>
              <mu-icon value="description"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>产品原型</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="goApi">
            <mu-list-item-action>
              <mu-icon value="description"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>接口文档</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="handleLogout">
            <mu-list-item-action>
              <mu-icon value="exit_to_app"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </div>
    </mu-drawer>

    <!-- 消息内容 -->
    <div class="mu-content-wrapper mu-custom-content" ref="indexContent">
      <mu-sub-header>最近聊天记录</mu-sub-header>
      <mu-list>
        <CommonGossipItem v-for="item in messageBox.gossip" :key="item.sendCuraNumber" :data="item"></CommonGossipItem>
      </mu-list>
      <div class="empty-text" v-if="messageBox.gossip.length === 0">暂无聊天</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "msg-box",
  data() {
    return {
      open: false
    };
  },
  methods: {
    ...mapActions(["logout"]),
    goDataView() {
      window.open("/echarts/");
    },
    goProduct() {
      window.open("/product/");
    },
    goApi() {
      window.open("/api/");
    },
    drawerHandler() {
      this.open = true;
    },
    setContentHeight() {
      const appBarEl = this.$refs.indexAppBar.$el;
      const content = this.$refs.indexContent;

      const appBarHeight = parseFloat(getComputedStyle(appBarEl).height, 10);
      const clientHeight = parseFloat(document.body.clientHeight, 10);

      content.style.height = clientHeight - appBarHeight + "px";
    },
    toUserDetail() {
      this.$router.push(`/user/detail?cura=${this.user.curaNumber}`);
    },
    handleLogout() {
      this.$router.replace(
        `/login?curaNumber=${this.user.curaNumber}&headUrl=${this.user.headUrl}`
      );
      this.logout();
      this.$toast.success("你已退出登录");
    }
  },
  computed: {
    ...mapState(["user", "messageBox"]),
    formatPhone() {
      return this.user.phone.split("").reduce((acc, cur, index) => {
        return (acc += (index + 1) % 4 === 0 ? ` - ${cur}` : cur);
      }, "");
    },
    firstCharOfNickname() {
      return this.user.nickname.charAt(0);
    },
    unReadNoticeLength() {
      return this.messageBox.notice.filter(notice => notice.isRead === 0)
        .length;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.open = false;
    next();
  },
  mounted() {
    this.setContentHeight();
  }
};
</script>


<style lang="scss">
.message-box {
  background: #fafafa;
  .empty-text {
    font-size: 14px;
    color: $theme-color;
    text-align: center;
    margin-top: 30px;
  }
  .mu-custom-badge {
    top: 6px;
    right: 6px;
    height: 20px;
    width: 20px;
  }
  .info-wrapper {
    padding: 3vh 5vw 1vh;
    background-color: $theme-color;
    color: #fff;

    .avatar-wrapper {
      margin-bottom: 1vh;
    }

    .detial-wrapper {
      .nickname {
        font-size: 18px;
      }
      .phone {
        color: rgba(255, 255, 255, 0.7);
        font-weight: 300;
        font-size: 12px;
      }
      p {
        margin: 0;
      }
    }
  }

  .list-wrapper {
    font-size: 14px;
    font-weight: 500;
  }

  .mu-content-wrapper {
    background-color: #fff;
  }
}
</style>
