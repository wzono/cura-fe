<template>
  <div class="contacts">
    <LayoutBackBar title="Contacts">
      <mu-flex slot="right" class="button-group" align-items="center">
        <mu-button icon @click="onSearch = !onSearch">
          <mu-icon value="search"/>
        </mu-button>
        <mu-button icon to="/user/add_contact">
          <mu-icon value="add"/>
        </mu-button>
      </mu-flex>
      <div :class="searchWrapperCls">
        <mu-flex direction="column" class="search-contact-wrapper">
          <mu-sub-header>Search</mu-sub-header>
          <mu-text-field
            class="search-input"
            placeholder="cura号/备注/昵称"
            full-width
            :value="searchVal"
            type="search"
            color="secondary"
          >
            <mu-icon value="search" slot="prepend" style="margin-right: 5px" color="secondary"></mu-icon>
            <mu-flex slot="append" align-items="center">
              <mu-button
                color="secondary"
                flat
                v-loading="searching"
                data-mu-loading-size="24"
                @click="searchSubmit"
              >Search</mu-button>
            </mu-flex>
          </mu-text-field>
          <mu-list class="search-result-wrapper">
            <mu-list-item v-for="contact in searchRes" :key="contact.cura_number" avatar button>
              <mu-list-item-action>
                <mu-avatar>
                  <img :src="contact.head_url" alt="avatar_url" v-if="contact.head_url">
                  <span v-else>{{ contact.nickname.charAt(0) }}</span>
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ contact.nickname }}</mu-list-item-title>
                <mu-list-item-sub-title>{{ contact.cura_number }}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
        </mu-flex>
        <mu-fade-transition>
          <div class="contacts-list" v-if="!onSearch">
            <mu-list class="add-friends">
              <mu-list-item button to="/user/add_contact">
                <mu-list-item-action>
                  <mu-icon value="person_add"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>Add Friends</mu-list-item-title>
              </mu-list-item>
            </mu-list>
            <div class="contacts-title">Contacts</div>
            <mu-list toggle-nested dense textline="two-line">
              <mu-list-item
                v-for="(contacts, key) in formatContacts"
                :key="key"
                button
                nested
                :open="open === key"
                @toggle-nested="open = arguments[0] ? key : ''"
              >
                <mu-list-item-title>{{key}} ({{ contacts.length }})</mu-list-item-title>
                <mu-list-item-action>
                  <mu-icon
                    :class="{'toggle-icon': open === key, 'icon': true}"
                    size="30"
                    value="keyboard_arrow_down"
                  ></mu-icon>
                </mu-list-item-action>
                <mu-list-item
                  v-for="contact in contacts"
                  :key="contact.cura_number"
                  avatar
                  button
                  slot="nested"
                >
                  <mu-list-item-action>
                    <mu-avatar>
                      <img :src="contact.head_url" alt="avatar_url" v-if="contact.head_url">
                      <span v-else>{{ contact.nickname.charAt(0) }}</span>
                    </mu-avatar>
                  </mu-list-item-action>
                  <mu-list-item-content>
                    <mu-list-item-title>{{ contact.nickname }}</mu-list-item-title>
                    <mu-list-item-sub-title>{{ contact.signature }}</mu-list-item-sub-title>
                  </mu-list-item-content>
                  <mu-list-item-action>
                    <mu-button icon @click="() => handleChatClick(contact.cura_number)">
                      <mu-icon value="message"></mu-icon>
                    </mu-button>
                  </mu-list-item-action>
                </mu-list-item>
              </mu-list-item>
            </mu-list>
          </div>
        </mu-fade-transition>
      </div>
    </LayoutBackBar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "contacts",
  data() {
    return {
      open: "",
      searching: false,
      searchVal: "",
      searchRes: [],
      onSearch: false
    };
  },
  methods: {
    ...mapActions(["getContacts"]),
    handleChatClick(cura_number) {
      this.$router.push("/user/chat?cura=" + cura_number);
    },
    searchSubmit() {
      const value = this.searchVal;

    }
  },
  computed: {
    ...mapState(["contacts"]),
    formatContacts() {
      return this.contacts.reduce((acc, cur) => {
        acc[cur.group] ? acc[cur.group].push(cur) : (acc[cur.group] = []);
        return acc;
      }, {});
    },
    searchWrapperCls() {
      return {
        "search-wrapper": true,
        "mu-move-up": !this.onSearch
      };
    }
  },
  created() {
    this.getContacts();
  }
};
</script>

<style lang="scss" scoped>
.contacts {
  font-weight: 300;
}
.contacts-list {
  padding: 10px;
}
.contacts-title {
  padding: 5px 0px 5px 45px;
  background-color: #eee;
  margin: 0 -10px 0;
  font-size: $font-small;
  color: #aaa;
}

.search-contact-wrapper {
  .mu-sub-header {
    padding: 0;
  }
  padding: 0 5vw;
}

.search-wrapper {
  background: #fafafa;
  transition: all 0.3s;
}

.mu-move-up {
  transform: translate3d(0, -116px, 0);
}

.icon {
  transition: all 0.3s;
}
.toggle-icon {
  transform: rotateZ(-180deg);
}

.add-friends {
  margin-top: -8px;
  padding: 0;
}
</style>
