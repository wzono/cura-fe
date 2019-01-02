<template>
  <van-swipe-cell :right-width="65" v-loading="loading" data-mu-loading-size="24">
    <div class="notice-item">
      <mu-list-item avatar :ripple="false">
        <mu-list-item-action @click="showUserDetail">
          <mu-avatar>
            <img v-lazy="data.headUrl">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{ data.nickname }}</mu-list-item-title>
          <mu-list-item-sub-title>{{ data.content }}</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action v-if="data.type === 1">
          <mu-flex v-if="data.isDeal === 0">
            <mu-button fab @click="agree" color="green500" small style="margin-right: 10px;">
              <mu-icon value="done"/>
            </mu-button>
            <mu-button fab @click="refuse" color="red500" small>
              <mu-icon value="close"/>
            </mu-button>
          </mu-flex>
          <mu-flex v-else direction="column" align-items="end">
            <span>{{ data.time | formatDate }}</span>
            <span>{{ data.isDeal === 1 ? '已添加' : '已拒绝'}}</span>
          </mu-flex>
        </mu-list-item-action>
        <mu-list-item-action v-else>
          <mu-flex direction="column" align-items="end">
            <span>{{ data.time | formatDate }}</span>
            <span>&nbsp;</span>
          </mu-flex>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>

      <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="onAgree">
        <mu-appbar color="primary" title="接受申请">
          <mu-button slot="left" icon @click="cancelAgree">
            <mu-icon value="close"></mu-icon>
          </mu-button>
          <mu-button slot="right" flat @click="submitAgree">Done</mu-button>
        </mu-appbar>
        <div style="padding: 0 30px;">
          <mu-flex
            align-items="center"
            style="margin-top: 5vh;padding-right: 5vw;"
            direction="column"
          >
            <mu-text-field
              v-model="remark"
              placeholder="最多不超过10个字符"
              :max-length="10"
              color="primary"
              label="备注"
              full-width
            ></mu-text-field>
            <mu-select label="选择分组" v-model="selectGroupId" dense full-width>
              <mu-option
                v-for="group in groups"
                :key="group.groupId"
                :label="group.groupName"
                :value="group.groupId"
              ></mu-option>
            </mu-select>
          </mu-flex>
        </div>
      </mu-dialog>
    </div>
    <div slot="right" @click="deleteNotice" class="mu-swipe-delete">删除</div>
  </van-swipe-cell>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import { SwipeCell } from "vant";
export default {
  name: "notice-item",
  props: {
    data: Object
  },
  data() {
    return {
      onAgree: false,
      remark: "",
      selectGroupId: "",
      loading: false,
      deleting: false
    };
  },
  components: {
    [SwipeCell.name]: SwipeCell
  },
  filters: {
    formatDate(value) {
      return moment(new Date(value)).format("MM-DD HH:mm");
    }
  },
  computed: {
    buttonText() {
      return this.data.type === 1 ? "接受" : "确认";
    },
    ...mapState(["groups", "socket"])
  },
  methods: {
    deleteNotice() {
      this.deleting = true;
      this.socket.send(
        "/app/delete_message",
        {},
        JSON.stringify({
          friendCuraNumber: this.data.sendCuraNumber,
          type: this.data.type,
          messageBoxId: this.data.messageBoxId,
        })
      );
      setTimeout(() => {
        this.deleting = false;
        this.$toast.success("删除成功");
      }, 300);
    },
    confirmRead() {
      this.loading = true;
      this.socket.send(
        "/app/read_message",
        {},
        JSON.stringify({ friendCuraNumber: this.data.sendCuraNumber, type: 2 })
      );

      setTimeout(() => {
        this.loading = false;
        this.$toast.success("已读取");
      }, 300);
    },
    showUserDetail() {
      this.$router.push(`/user/detail?cura=${this.data.sendCuraNumber}`);
    },
    agree() {
      this.onAgree = true;
    },
    submitAgree() {
      if (this.selectGroupId === "") {
        this.$toast.warning("至少选择一个分组");
        return;
      }
      this.socket.send(
        "/app/deal",
        {},
        JSON.stringify({
          sendCuraNumber: this.data.sendCuraNumber,
          isDeal: 1,
          remark: this.remark,
          groupId: this.selectGroupId
        })
      );
      setTimeout(() => {
        this.$toast.success("接受成功！");
        this.cancelAgree();
      }, 300);
    },
    cancelAgree() {
      this.onAgree = false;
      this.remark = "";
      this.selectGroupId = "";
    },
    refuse() {
      this.socket.send(
        "/app/deal",
        {},
        JSON.stringify({ sendCuraNumber: this.data.sendCuraNumber, isDeal: 2 })
      );
      setTimeout(() => {
        this.$toast.success("已拒绝");
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
.mu-swipe-delete {
  display: flex;
  height: 100%;
  background-color: red;
  color: #fff;
  justify-content: center;
  align-items: center;
  width: 65px;
}
</style>
