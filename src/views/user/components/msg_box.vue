<template>
  <div class="message-box">
    <mu-appbar style="width: 100%;" color="primary" title="Cura">
      <mu-button icon large slot="left" @click="drawerHandler()">
        <mu-icon value="dehaze"></mu-icon>
      </mu-button>
      <mu-button icon large slot="right">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>

    <!-- 侧边栏 -->
    <mu-drawer :open.sync="open" :docked="false">
      <mu-container class="info-wrapper">
        <div class="avatar-wrapper">
          <mu-avatar :size="60">
            <img :src="user.head_url" alt="avatar_url" v-if="user.head_url">
            <span v-else>{{ firstCharOfNickname }}</span>
          </mu-avatar>
        </div>
        <div class="detial-wrapper">
          <p class="nickname">{{user.nickname}}</p>
          <p class="phone">{{formatPhone}}</p>
        </div>
      </mu-container>
      <div class="list-wrapper">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="group"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>New Group</mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider/>
        <mu-list>
          <mu-list-item button to="/user/contacts">
            <mu-list-item-action>
              <mu-icon value="account_box"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>Contacts</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="settings"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>Settings</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="call"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>Calls</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="help"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>Cura FAQ</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </div>
    </mu-drawer>

    <div class="content-wrapper mu-custom-content">
      123123
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "msg-box",
  data() {
    return {
      open: false
    };
  },
  methods: {
    drawerHandler() {
      this.open = true;
    }
  },
  computed: {
    ...mapState(["user"]),
    formatPhone() {
      return this.user.phone.split("").reduce((acc, cur, index) => {
        return (acc += (index + 1) % 4 === 0 ? ` - ${cur}` : cur);
      }, "");
    },
    firstCharOfNickname() {
      return this.user.nickname.charAt(0);
    }
  }
};
</script>


<style lang="scss">
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
</style>
