<template>
  <div class="contact-settings">
    <LayoutBackBar title="好友设置">
      <mu-button icon slot="right" @click="confirmUpdate">
        <mu-icon value="done"/>
      </mu-button>
      <div full-width class="form">
        <van-cell-group>
          <van-cell title="昵称" :value="userInfo.nickname"/>
          <van-field v-model="remark" clearable label="备注"/>
          <van-cell title="分组" center clickable @click="selectorShow = true">
            <mu-flex align-items="center" justify-content="end">
              <span>{{ selectedGroup.name }}</span>
              <mu-icon value="chevron_right"></mu-icon>
            </mu-flex>
          </van-cell>
        </van-cell-group>
        <mu-flex justify-content="center" style="margin-top: 30px;">
          <mu-button color="primary" large round @click="deleteContact">删除好友</mu-button>
        </mu-flex>
      </div>
      <van-actionsheet v-model="selectorShow" :actions="groups" @select="onSelect"/>
    </LayoutBackBar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { CellGroup, Field, Actionsheet, Cell } from "vant";
import { isUndefined, isEmpty } from "lodash";

export default {
  name: "contact-settings",
  data() {
    return {
      remark: "",
      selectedGroup: {},
      selectorShow: false,
      userInfo: {}
    };
  },
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Actionsheet.name]: Actionsheet,
    [Cell.name]: Cell
  },
  computed: {
    ...mapGetters(["groups", "getContact"]),
    ...mapState(["user", "contacts", "socket"]),
    currentChatUser() {
      return this.getContact(this.$route.query.cura);
    }
  },
  methods: {
    async getUserInfo() {
      const curaNumber = this.$route.query.cura;
      if (isUndefined(curaNumber)) {
        this.$toast.error("无效的用户");
        this.$router.go(-1);
        return;
      }

      try {
        const { data } = await this.$api.user.getUser(curaNumber);
        this.userInfo = data.user;
        this.$nextTick(this.setUserInfo);
      } catch (e) {
        this.$router.go(-1);
        this.$throw(e);
      }
    },
    onSelect(group) {
      this.selectorShow = false;
      this.selectedGroup = group;
    },
    setUserInfo() {
      this.remark = this.currentChatUser.remark;
      this.selectedGroup = this.currentChatUser.group || {};
    },
    async deleteContact() {
      await this.$api.user.deleteFriend(this.userInfo.curaNumber);
      this.$toast.success("删除成功");
      this.socket.send("/app/friends_two",{}, JSON.stringify({ friendCuraNumber: this.userInfo.curaNumber}));
      this.$router.replace("/user");
    },
    async confirmUpdate() {
      const reqs = [
        this.$api.user.updateFriendRemark({
          friendCuraNumber: this.userInfo.curaNumber,
          remark: this.remark
        }),
        this.$api.user.updateFriendGroup({
          friendCuraNumber: this.userInfo.curaNumber,
          groupId: this.selectedGroup.id
        })
      ];

      await Promise.all(reqs);
      this.$toast.success("更新成功");
      this.socket.send("/app/friends");
      this.$router.go(-1);
    }
  },
  created() {
    this.getUserInfo();
  },
  // updated() {
  //   this.setUserInfo();
  // }
};
</script>

<style lang="scss" scoped>
.form {
  margin-top: 2vh;
}
</style>
