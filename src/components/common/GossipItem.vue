<template>
  <van-swipe-cell :right-width="65" v-loading="loading" data-mu-loading-size="24">
    <div style="background-color: #fff">
      <mu-list-item avatar :ripple="false" :to="`/user/chat?cura=${data.curaNumber}`">
        <mu-list-item-action>
          <mu-avatar>
            <img v-lazy="data.headUrl">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{ data.nickname }}</mu-list-item-title>
          <mu-list-item-sub-title>{{ data.content }}</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-flex
            direction="column"
            justify-content="around"
            align-items="end"
            style="height: 100%"
          >
            <div>
              <mu-badge
                :content="data.unReadLength + ''"
                circle
                color="red400"
                v-show="data.unReadLength !== 0"
              ></mu-badge>
            </div>

            <span>{{ data.time | fromNow }}</span>
          </mu-flex>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
    </div>
    <div slot="right" @click="deleteGossip" class="mu-swipe-delete">删除</div>
  </van-swipe-cell>
</template>

<script>
import moment from "moment";
import { SwipeCell } from "vant";
import { mapState } from "vuex";

export default {
  name: "notice-item",
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState(["socket"])
  },
  components: {
    [SwipeCell.name]: SwipeCell
  },
  filters: {
    fromNow(value) {
      moment.locale("zh-cn");
      return moment(value).fromNow();
    }
  },
  methods: {
    deleteGossip() {
      this.loading = true;
      this.socket.send(
        "/app/delete_messages",
        {},
        JSON.stringify({ friendCuraNumber: this.data.curaNumber })
      );
      setTimeout(() => {
        this.loading = false;
        this.$toast.success("删除成功");
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
