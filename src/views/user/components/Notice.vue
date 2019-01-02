<template>
  <div class="notice">
    <LayoutBackBar title="消息通知" to="/user">
      <mu-list textline="two-line" dense>
        <CommonNoticeItem
          v-for="notice in messageBox.notice"
          :key="notice.messageBoxId"
          :data="notice"
        />
      </mu-list>
      <mu-flex
        class="empty-container"
        direction="column"
        align-items="center"
        v-if="messageBox.notice.length === 0"
      >
        <div class="image-wrapper">
          <img src="http://cdn.wingsico.org/image/20181211-1.png">
        </div>
        <div class="text-wrapper">没有消息哦~</div>
      </mu-flex>
    </LayoutBackBar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapState(["user", "messageBox", "groups", "socket"])
  },
  methods: {

  },
  created() {
    this.socket.send('/app/read_notice')
  }
};
</script>

<style lang="scss" scoped>
.empty-container {
  margin: 40px 0;
  .image-wrapper {
    position: relative;
    width: 300px;
    margin: auto;
    img {
      width: 100%;
      height: auto;
    }
  }
  .text-wrapper {
    margin-top: 20px;
    color: #999;
    font-size: 12px;
    line-height: 1.2;
    text-align: center;
  }
}
</style>
