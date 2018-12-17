<template>
  <div class="back-bar">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="goBack()">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      <div class="title" slot="default">{{ title }}</div>
      <div slot="right" class="right-part">
        <slot name="right"></slot>
      </div>
    </mu-appbar>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .back-bar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: hidden;
  }
  .right-part {
    @include flex-center();
  }

  .content {
    flex: 1;
    padding: 10px;
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
