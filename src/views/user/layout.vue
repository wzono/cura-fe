<template>
  <div class="user-page">
    <!-- <CommonTransition> -->
      <router-view />
    <!-- </CommonTransition> -->
    <mu-bottom-nav
      class="tab-bottom"
      :value.sync="activeTab"
      @change="handleTabChange"
    >
      <mu-bottom-nav-item
        title="消息"
        icon="forum"
        value="msg-box"
        to="msg_box"
        replace
        tag="div"
      />
      <mu-bottom-nav-item
        title="应用"
        icon="apps"
        value="app-box"
        to="app_box"
        replace
        tag="div"

      />
      <mu-bottom-nav-item
        title="我的"
        icon="face"
        value="mine-box"
        to="mine_box"
        replace
        tag="div"

      />
    </mu-bottom-nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "user-page",
  data() {
    return {
      activeTab: 'msg-box'
    }
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    handleTabChange(value) {

    }
  },
  created() {
    this.activeTab = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
  .tab-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
