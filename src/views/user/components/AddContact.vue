<template>
  <div class="add-contact">
    <LayoutBackBar title="Apply Contact">
      <mu-flex>
        <mu-list textline="two-line">
          <mu-list-item avatar button>
            <mu-list-item-action>
              <mu-avatar>
                <img :src="userInfo.headUrl" alt="avatar_url">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{ userInfo.nickname }} ({{userInfo.curaNumber}})</mu-list-item-title>
              <mu-list-item-sub-title>
                <mu-flex>{{ userInfo.sex }} {{ userAge }}岁</mu-flex>
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-flex>
      <mu-container class="form">
        <p class="sub-title">设置备注和分组</p>
        <van-cell-group>
          <van-field v-model="remark" clearable label="备注"/>
          <van-cell title="分组" center clickable @click="selectorShow = true">
            <mu-flex align-items="center" justify-content="end">
              <span>{{ selectedGroup.name }}</span>
              <mu-icon value="chevron_right"></mu-icon>
            </mu-flex>
          </van-cell>
        </van-cell-group>
        <mu-flex justify-content="center" style="margin-top: 30px;">
          <mu-button color="primary" large round @click="submitApplication">提交申请</mu-button>
        </mu-flex>
      </mu-container>
    </LayoutBackBar>

    <van-actionsheet v-model="selectorShow" :actions="groups" @select="onSelect"/>
  </div>
</template>

<script>
import { isUndefined, isEmpty } from "lodash";
import { CellGroup, Field, Actionsheet, Cell } from "vant";
import moment from "moment";
import { mapState, mapGetters } from "vuex";

export default {
  name: "add-contact",
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Actionsheet.name]: Actionsheet,
    [Cell.name]: Cell
  },
  data() {
    return {
      userInfo: {},
      remark: "",
      selectedGroup: {},
      selectorShow: false
    };
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
        this.userInfo = data;
      } catch (e) {
        this.$router.go(-1);
        this.$throw(e);
      }
    },
    onSelect(group) {
      this.selectorShow = false;
      this.selectedGroup = group;
    },
    async submitApplication() {
      if (isEmpty(this.selectedGroup)) {
        this.$toast.warning('请选择一个分组~');
        return;
      }

      const loading = this.$loading();
      try {
        await this.$api.user.submitFriendApply({
          curaNumber: this.userInfo.curaNumber,
          remark: this.remark,
          groupId: this.selectedGroup.id
        });
        this.$toast.success("申请成功！等待对方回复~");
        this.$router.go(-1);
      } catch (e) {
        this.$throw(e);
      } finally {
        loading.close();
      }
    }
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["groups"]),
    userAge() {
      return this.userInfo.birthday
        ? parseInt(moment(this.userInfo.birthday, "YYYY-MM-DD").fromNow(), 10)
        : 0;
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.form {
  padding: 0;
  .sub-title {
    margin: 0 34px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
