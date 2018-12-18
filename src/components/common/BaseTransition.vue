<template>
  <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
    <slot></slot>
  </transition>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "transition-common",
  computed: {
    ...mapState(["direction"])
  }
};
</script>
