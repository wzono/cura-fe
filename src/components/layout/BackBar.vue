<template>
  <div class="back-bar">
    <mu-appbar style="width: 100%;" color="primary" :z-depth="1">
      <mu-button icon slot="left" @click="goBack()">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <div class="title" slot="default">
        {{ title }}
        <slot name="title"></slot>
      </div>
      <div slot="right" class="right-part">
        <slot name="right"></slot>
      </div>
    </mu-appbar>
    <div class="content mu-custom-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .back-bar {
    display: flex;
    flex-direction: column;
  }
  .right-part {
    @include flex-center();
  }

  .content {
    flex: 1;
    width: 100vw;
  }
</style>

<script>
export default {
  name: 'back-bar',
  props: {
    title: String,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>
