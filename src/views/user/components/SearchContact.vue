<template>
  <div class="search-contact" :class="searchPageCls">
    <LayoutBackBar title="Add Contact">
      <div class="search-contact-wrapper">
        <mu-flex direction="column" >
          <mu-sub-header>Search</mu-sub-header>
          <mu-text-field
            class="search-input"
            placeholder="cura号/手机号/昵称"
            full-width
            v-model="searchVal"
            type="search"
            @search="searchSubmit"
            @focus="searchInputFocus"
            @blur="searchInputBlur"
          >
            <mu-icon value="search" slot="prepend" style="margin-right: 5px" color="blueA200"></mu-icon>
            <mu-flex slot="append" align-items="center">
              <mu-button color="blueA200" flat v-loading="searching" data-mu-loading-size="24" @click="searchSubmit">Search</mu-button>
            </mu-flex>
          </mu-text-field>
        </mu-flex>
        <mu-list textline="two-line">
          <mu-list-item v-for="contact in contacts" :key="contact.curaNumber" avatar button :to="`/user/detail?cura=${contact.curaNumber}`">
            <mu-list-item-action>
              <mu-avatar>
                <img :src="contact.headUrl" alt="avatar_url" v-if="contact.headUrl">
                <span v-else>{{ contact.nickname.charAt(0) }}</span>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{ contact.nickname }} ({{contact.curaNumber}})</mu-list-item-title>
              <mu-list-item-sub-title>
                <mu-flex>{{ contact.sex }} {{contact.age }}</mu-flex>
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </div>
    </LayoutBackBar>
  </div>
</template>

<script>

export default {
  name: "search-contact",
  data() {
    return {
      searchVal: "",
      onSearch: false,
      contacts: [],
      searching: false
    };
  },
  methods: {
    searchInputFocus() {
      this.onSearch = true;
    },
    searchInputBlur() {
      this.onSearch = false;
    },
    async searchSubmit() {
      if (this.searchVal === "") {
        this.$toast.warning('搜索值为空');
        return;
      }
      this.searching = true;
      try {
        const { data } = await this.$api.user.searchOthers(this.searchVal);
        this.contacts = data;
      } catch (e) {
        this.$throw(e);
      } finally {
        this.searching = false;
      }
    }
  },
  computed: {
    searchPageCls() {
      return {
        "search-wrapper": true,
        "mu-move-up": this.onSearch
      };
    }
  }
};
</script>


<style lang="scss" scoped>
.search-contact {
  transition: all 0.3s;
}

.search-input {
  padding: 12px 5vw 0;
}

.search-wrapper {
  background: $bg-color;
}

.mu-move-up {
  transform: translate3d(0, -60px, 0);
}
</style>
