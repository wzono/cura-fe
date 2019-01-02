<template>
  <div class="update-nickname">
    <LayoutBackBar title="修改昵称">
      <mu-button icon slot="right" @click="confirmUpdate">
        <mu-icon value="done"/>
      </mu-button>
      <div>
        <div style="padding: 20px 30px">
        <mu-text-field v-model="value" placeholder="昵称" label="新的昵称" type="text" full-width :max-length="20"></mu-text-field>
        </div>
      </div>
    </LayoutBackBar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {required} from '@/utils/validator';

export default {
  data() {
    return {
      value: "",
    }
  },
  computed: {
    ...mapState(["socket", "user"])
  },
  methods: {
    confirmUpdate() {
      if (!required(this.value)) {
        this.$toast.error("昵称不能为空");
        return;
      }
       this.socket.send('/app/update_nickname', {}, JSON.stringify({nickname: String(this.value)}))
    }
  },
  created() {
    this.value = this.user.nickname;
  }
};
</script>

<style lang="scss" scoped>
</style>
