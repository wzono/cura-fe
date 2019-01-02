<template>
  <div class="mu-group-settings">
    <LayoutBackBar title="分组管理">
      <div full-width class="mu-content-wrapper">
        <mu-sub-header>所有分组</mu-sub-header>
        <mu-divider></mu-divider>
        <mu-list dense class="list">
          <div class="group-item" v-for="group in groups" :key="group.id">
            <mu-list-item button :ripple="false">
              <mu-list-item-action>
                <mu-button icon @click="onDelete(group)">
                  <mu-icon value="remove_circle"></mu-icon>
                </mu-button>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{group.name}}</mu-list-item-title>
              </mu-list-item-content>
              <mu-list-item-action @click="onUpdate(group)">
                <mu-button icon>
                  <mu-icon value="edit"></mu-icon>
                </mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider></mu-divider>
          </div>
        </mu-list>

        <mu-button fab class="add-group" color="primary" @click="onAddGroup">
          <mu-icon value="add" color="#fff"></mu-icon>
        </mu-button>
      </div>

      <mu-dialog
        title="删除分组"
        max-width="80%"
        :esc-press-close="false"
        :open.sync="openDelete"
      >删除分组后该分组好友自动归到默认分组下，确定删除该分组吗?
        <mu-button slot="actions" flat color="primary" @click="openDelete = false">取消</mu-button>
        <mu-button slot="actions" flat color="primary" @click="deleteGroupConfirm">确定</mu-button>
      </mu-dialog>
      <mu-dialog
        title="增加分组"
        max-width="80%"
        :esc-press-close="false"
        :open.sync="openAdd"
      >
        <mu-text-field label="分组名称" v-model="currentGroup.name" :error-text="helpText" @input="helpText = ''"></mu-text-field>
        <mu-button slot="actions" flat color="primary" @click="openAdd = false; helpText = ''">取消</mu-button>
        <mu-button slot="actions" flat color="primary" @click="addGroupConfirm">确定</mu-button>
      </mu-dialog>
      <mu-dialog
        title="修改分组名称"
        max-width="80%"
        :esc-press-close="false"
        :open.sync="openUpdate"
      >
        <mu-text-field label="分组名称" v-model="currentGroup.name" :error-text="helpText" @input="helpText = ''"></mu-text-field>
        <mu-button slot="actions" flat color="primary" @click="openUpdate = false; helpText = ''">取消</mu-button>
        <mu-button slot="actions" flat color="primary" @click="updateGroupConfirm">确定</mu-button>
      </mu-dialog>
    </LayoutBackBar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "group-settings",
  computed: {
    ...mapGetters(["groups"]),
  },
  data() {
    return {
      openDelete: false,
      openUpdate: false,
      openAdd: false,
      currentGroup: {
        id: "",
        name: "",
      },
      loading: false,
      helpText: "",
    };
  },
  methods: {
    ...mapActions(["deleteGroup", "addGroup", "updateGroupName"]),
    onDelete(group) {
      this.currentGroup = group;
      this.openDelete = true;
    },
    onAddGroup() {
      this.currentGroup = {};
      this.openAdd = true;
    },
    onUpdate(group) {
      this.currentGroup = {
        id: group.id,
        name: group.name
      };
      this.openUpdate = true;
    },
    async deleteGroupConfirm() {
      try {
        this.openDelete = false;
        this.loading = this.$loading();
        await this.deleteGroup(this.currentGroup.id);
        this.$toast.success("删除成功");
      } catch (e) {
        this.$throw(e);
      } finally {
        this.loading.close();
      }
    },
    async addGroupConfirm() {
      if (!this.currentGroup.name) {
        this.helpText = "分组名不能为空";
        return;
      }
      try {
        this.openAdd = false;
        this.loading = this.$loading();
        await this.addGroup(this.currentGroup.name);
        this.$toast.success("添加成功");
      } catch (e) {
        this.$throw(e);
      } finally {
        this.loading.close();
      }
    },
    async updateGroupConfirm() {
      if (!this.currentGroup.name) {
        this.helpText = "分组名不能为空";
        return;
      }
      try {
        this.openUpdate = false;
        this.loading = this.$loading();
        await this.updateGroupName(this.currentGroup);
        this.$toast.success("修改分组名称成功");
      } catch (e) {
        this.$throw(e);
      } finally {
        this.loading.close();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mu-content-wrapper {
  width: 100%;
  padding: 0;

  .list {
    padding: 0;
  }

  .add-group {
    position: fixed;
    right: 13vw;
    bottom: 20vh;
  }
}
</style>
