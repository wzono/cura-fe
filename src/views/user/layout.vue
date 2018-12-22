<template>
  <div class="user-page">
    <CommonFadeTransition>
      <router-view/>
    </CommonFadeTransition>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "user-page",
  methods: {
    ...mapActions(['getGroups'])
  },
  created() {
    this.getGroups();
  }
};
</script>

<style lang="scss" scoped>
</style>
