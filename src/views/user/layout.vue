<template>
  <div class="user-page">
    <router-view/>
    hello {{ user.nickname }}
    <mu-bottom-nav class="tab-bottom">
      <mu-bottom-nav-item title="Recents" icon="restore"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="Favorites" icon="favorite"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="Nearby" icon="location_on"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
import { mapState } from "vuex";


export default {
  name: "user-page",
  computed: {
    ...mapState(["user"])
  }
};
</script>
