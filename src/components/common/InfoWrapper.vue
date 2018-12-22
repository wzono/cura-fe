<template>
  <mu-ripple class="info-wrapper" @click="routerGo()">
    <p class="content">{{ content }}</p>
    <p class="desc">{{ desc }}</p>
  </mu-ripple>
</template>

<script>
import { isUndefined } from 'lodash';
export default {
  name: "info-wrapper",
  props: {
    content: String,
    desc: String,
    to: String,
  },
  methods: {
    routerGo() {
      if (isUndefined(this.to)) {
        return;
      }

      this.$router.push(this.to);
    }
  }
};
</script>

<style lang="scss" scoped>
.info-wrapper {
  padding: 30px 0;
  padding-left: 40px;
  letter-spacing: 0.5px;
  position: relative;
  .content {
    color: #000;
    font-size: 14px;
    font-weight: 300;
  }
  .desc {
    color: #888;
    font-weight: 300;
    font-size: 12px;
    margin-top: -3px;
  }
  p {
    margin: 0;
  }
}
</style>
