<template>
  <div class="update-phone">
    <LayoutBackBar title="修改手机号码">
      <mu-button icon slot="right" @click="confirmUpdate">
        <mu-icon value="done"/>
      </mu-button>
      <div full-width>
        <div style="padding: 20px 30px">
          <mu-text-field v-model="phone" type="tel" full-width label="新的手机号码" :max-length="11"></mu-text-field>
        </div>
      </div>
    </LayoutBackBar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { isPhone } from '@/utils/validator';
export default {
  data() {
    return {
      phone: "",
    }
  },
  computed: {
    ...mapState(["socket"])
  },
  methods: {
    confirmUpdate() {
      if (!isPhone(this.phone)) {
        this.$toast.error("手机号不合法");
        return;
      }

      this.socket.send('/app/update_phone', {}, JSON.stringify({phone: String(this.phone)}))
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
