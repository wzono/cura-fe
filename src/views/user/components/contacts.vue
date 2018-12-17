<template>
  <div class="contacts">
    <LayoutBackBar title="Contacts">
      <mu-flex slot="right" class="button-group" align-items="center">
        <mu-button icon>
          <mu-icon value="search"/>
        </mu-button>
        <mu-button icon>
          <mu-icon value="add"/>
        </mu-button>
      </mu-flex>
      <div class="contacts-list">
        <mu-list class="add-friends">
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="person_add"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>Add Friends</mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <div class="contacts-title">Contacts</div>
        <mu-list v-for="(contacts, key) in formatContacts" :key="key" textline="two-line">
          <mu-sub-header>{{ key }}</mu-sub-header>
          <mu-list-item v-for="contact in contacts" :key="contact.cura_number" avatar button>
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
          <mu-divider></mu-divider>
        </mu-list>
      </div>
    </LayoutBackBar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "contacts",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getContacts"]),
    handleChatClick(cura_number) {
      this.$router.push('/user/chat?cura=' + cura_number)
    }
  },
  computed: {
    ...mapState(["contacts"]),
    formatContacts() {
      return this.contacts.reduce((acc, cur) => {
        acc[cur.group] ? acc[cur.group].push(cur) : (acc[cur.group] = []);
        return acc;
      }, {});
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

.add-friends {
  margin-top: -8px;
  padding: 0;
}
</style>
