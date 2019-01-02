<template>
  <div class="back-bar">
    <mu-appbar style="width: 100%;" :color="color" :z-depth="zDepth" ref="appBar">
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
    <div class="mu-custom-content" ref="content">
      <div class="content">
      <slot></slot>
    </div>
    </div>

  </div>
</template>
<script>
</script>
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
    background: $bg-color;
    overflow: auto;
    height: 100%;
  }
</style>

<script>
export default {
  name: 'back-bar',
  props: {
    title: String,
    color: {
      type: String,
      default: 'blueA200'
    },
    zDepth: {
      type: Number,
      default: 1,
    },
    to: String,
  },
  methods: {
    goBack() {
      if (this.to) {
        this.$router.replace(this.to)
        return;
      }
      this.$router.go(-1);
    },
    setContentHeight() {
      const appBarEl = this.$refs.appBar.$el;
      const content = this.$refs.content;

      const appBarHeight = parseFloat(getComputedStyle(appBarEl).height, 10);
      const clientHeight = parseFloat(document.body.clientHeight, 10);

      content.style.height = (clientHeight - appBarHeight) + 'px';
    }
  },
  mounted() {
    this.setContentHeight();
    window.addEventListener('resize', this.setContentHeight);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setContentHeight);
  }
}
</script>
