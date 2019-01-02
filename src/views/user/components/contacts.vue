<template>
  <div class="contacts" :class="searchPageCls">
    <LayoutBackBar title="我的好友">
      <mu-flex slot="right" class="button-group" align-items="center">
        <mu-button icon @click="toggleSearch">
          <mu-icon value="search"/>
        </mu-button>
        <mu-button icon to="/user/search_contact">
          <mu-icon value="add"/>
        </mu-button>
      </mu-flex>
      <div :class="searchWrapperCls">
        <mu-flex direction="column" class="search-contact-wrapper" align-items="center">
          <mu-sub-header>Search</mu-sub-header>
          <mu-text-field
            class="search-input"
            placeholder="cura号/备注/昵称"
            full-width
            v-model="searchVal"
            type="search"
            color="secondary"
            @search="searchSubmit"
            @keyup.enter="searchSubmit"
            @blur="focus = false"
            @focus="focus = true"
            @input="clearSearchRes"
            ref="searchInput"
          >
            <mu-icon value="search" slot="prepend" style="margin-right: 5px" color="secondary"></mu-icon>
            <mu-flex slot="append" align-items="center">
              <mu-button color="secondary" flat @click="searchSubmit">Search</mu-button>
            </mu-flex>
          </mu-text-field>
          <mu-list class="search-result-wrapper" v-if="searchRes.length !== 0">
            <mu-sub-header>Result</mu-sub-header>
            <mu-list-item v-for="contact in searchRes" :key="contact.curaNumber" avatar button :to="`/user/chat?cura=${contact.curaNumber}`">
              <mu-list-item-action>
                <mu-avatar>
                  <img v-lazy="contact.headUrl">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title v-html="formatName(contact)"></mu-list-item-title>
                <mu-list-item-sub-title v-html="contact.curaNumber"></mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
          <div class="empty-text" v-if="isSearchResEmpty">{{ searchResEmptyText }}</div>
        </mu-flex>
        <mu-fade-transition>
          <div class="contacts-list" v-if="!onSearch">
            <mu-list class="add-friends">
              <mu-list-item button to="/user/search_contact">
                <mu-list-item-action>
                  <mu-icon value="person_add"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>添加好友</mu-list-item-title>
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
                <mu-list-item-title>{{key}} ({{ contacts | online }}/{{ contacts.length }})</mu-list-item-title>
                <mu-list-item-action>
                  <mu-icon
                    :class="{'toggle-icon': open === key, 'icon': true}"
                    size="30"
                    value="keyboard_arrow_down"
                  ></mu-icon>
                </mu-list-item-action>
                <mu-list-item
                  v-for="contact in contacts"
                  :key="contact.curaNumber"
                  avatar
                  button
                  slot="nested"
                  @click="() => handleChatClick(contact.curaNumber)"
                >
                  <mu-list-item-action>
                    <mu-avatar>
                      <img v-lazy="contact.headUrl" >
                    </mu-avatar>
                  </mu-list-item-action>
                  <mu-list-item-content>
                    <mu-list-item-title>{{ formatName(contact) }}</mu-list-item-title>
                    <mu-list-item-sub-title>
                      <span v-if="contact.isOnline" style="color:#03a9f4">
                        [在线] <span style="color: #333">{{ contact.signature }}</span>
                      </span>
                      <span v-else style="color: #">
                        [离线] {{ contact.signature }}
                      </span>
                    </mu-list-item-sub-title>
                  </mu-list-item-content>
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
import { mapActions, mapState, mapGetters } from "vuex";

const searchHash = "search";
export default {
  name: "contacts",
  data() {
    return {
      open: "",
      searchVal: "",
      searchRes: [],
      onSearch: false,
      searchResEmptyText: "没有符合条件的好友哦~",
      isSearchResEmpty: false,
      focus: false
    };
  },
  filters: {
    online(contacts) {
      return contacts.filter(contact => contact.isOnline).length;
    }
  },
  methods: {
    // ...mapActions(["getContacts"]),
    handleChatClick(curaNumber) {
      if (curaNumber == this.user.curaNumber) {
        this.$router.push("/user/detail?cura=" + curaNumber)
      } else {
        this.$router.push("/user/chat?cura=" + curaNumber);
      }
    },
    searchSubmit() {
      const inputEl = this.$refs.searchInput.$el.querySelector(
        ".mu-text-field-input"
      );

      inputEl.blur();

      const value = this.searchVal.toLowerCase();

      if (value === "") {
        this.$toast.warning('搜索值为空');
        return;
      }
      const searchRes = this.contacts
        .filter(({ nickname, curaNumber, remark }) => {
          return (
            nickname.toLowerCase().includes(value) ||
            String(curaNumber)
              .toLowerCase()
              .includes(value) ||
            remark.toLowerCase().includes(value)
          );
        })
        .map(user => {
          user.nickname = user.nickname.replace(
            new RegExp(value, "i"),
            v => `<span style="color: #f06292;">${v}</span>`
          );
          user.curaNumber = String(user.curaNumber).replace(
            new RegExp(value, "i"),
            v => `<span style="color: #f06292;">${v}</span>`
          );
          user.remark = user.remark.replace(
            new RegExp(value, "i"),
            v => `<span style="color: #f06292;">${v}</span>`
          );
          return user;
        });
      this.searchRes = searchRes;
      this.isSearchResEmpty = searchRes.length === 0;
    },
    toggleSearch() {
      !this.onSearch
        ? (window.location.hash = searchHash)
        : this.$router.go(-1);
    },
    clear() {
      this.searchVal = "";
      this.searchRes = [];
      this.isSearchResEmpty = false;
    },
    formatName(contact) {
      let name = "";
      if (contact.remark === "") {
        return contact.nickname;
      } else {
        return `${contact.remark}(${contact.nickname})`
      }
    },
    clearSearchRes() {
      this.searchRes = [];
      this.isSearchResEmpty = false;
    }
  },
  computed: {
    ...mapGetters(["contacts", "groups"]),
    ...mapState(["user"]),
    formatContacts() {
      const newContacts = this.contacts.reduce((acc, cur) => {
        acc[cur.group.name] ? acc[cur.group.name].push(cur) : (acc[cur.group.name] = [cur]);
        return acc;
      }, {});
      const groupMap = this.groups.reduce((acc, cur) => {
        if (!acc[cur.name]) {
          acc[cur.name] = [];
        }
        return acc;
      }, newContacts)
      return groupMap;
    },
    searchWrapperCls() {
      return {
        "search-wrapper": true,
        "mu-move-up": !this.onSearch
      };
    },
    searchPageCls() {
      return {
        "mu-move-up-focus": this.focus
      };
    }
  },
  watch: {
    $route(newVal, oldVal) {
      const { hash } = newVal;
      this.onSearch = hash === `#${searchHash}`;
      this.clear();
    }
  },
  created() {
    this.onSearch = this.$route.hash === `#${searchHash}`;
  },
  beforeRouteLeave(to, from, next) {
    window.scrollTo(0, 0);
    next();
  }
};
</script>

<style lang="scss" scoped>
.contacts {
  transition: all 0.3s;
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
  padding: 0 5vw;
  .empty-text {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    color: $theme-sub-color;
  }
  .mu-sub-header {
    padding: 0;
  }
}


.search-wrapper {
  background: $bg-color;
  transition: all 0.3s;
  position: relative;
}

.mu-move-up {
  transform: translate3d(0, -116px, 0);
}

.mu-move-up-focus {
  transform: translate3d(0, -60px, 0);
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
