<template>
  <div class="add-contact">
    <LayoutBackBar title="Add Contact">
      <div class="add-contact-wrapper" :class="searchWrapperCls">

        <mu-flex direction="column" >
          <mu-sub-header>Search</mu-sub-header>
          <mu-text-field
            class="search-input"
            placeholder="cura号/手机号/昵称"
            full-width
            :value="searchVal"
            type="search"
            @focus="searchInputFocus"
            @blur="searchInputBlur"
          >
            <mu-icon value="search" slot="prepend" style="margin-right: 5px" color="primary"></mu-icon>
            <mu-flex slot="append" align-items="center">
              <mu-button color="primary" flat v-loading="searching" data-mu-loading-size="24" @click="searchSubmit">Search</mu-button>
            </mu-flex>
          </mu-text-field>
        </mu-flex>
        <mu-list textline="two-line">
          <mu-list-item v-for="contact in contacts" :key="contact.cura_number" avatar button>
            <mu-list-item-action>
              <mu-avatar>
                <img :src="contact.head_url" alt="avatar_url" v-if="contact.head_url">
                <span v-else>{{ contact.nickname.charAt(0) }}</span>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{ contact.nickname }} ({{contact.cura_number}})</mu-list-item-title>
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
  name: "add-contact",
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
    searchWrapperCls() {
      return {
        "search-wrapper": true,
        "mu-move-up": this.onSearch
      };
    }
  }
};
</script>


<style lang="scss" scoped>
.search-input {
  padding: 12px 5vw 0;
}

.search-wrapper {
  background: #fafafa;
  transition: all 0.3s;
  z-index: 250;
  position: relative;
}

.mu-move-up {
  transform: translate3d(0, -56px, 0);
}
</style>
