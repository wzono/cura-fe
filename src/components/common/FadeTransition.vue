<template>
  <transition :name="'fade-move-' + (direction === 'forward' ? 'in' : 'out')" >
    <slot class="fade-transition"></slot>
  </transition>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "transition-fade",
  computed: {
    ...mapState(["direction"])
  }
};
</script>

<style lang="scss" scoped>

</style>
