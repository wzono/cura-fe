<template>
  <div class="user-detail">
    <div class="header-wrapper">
      <mu-flex class="navigator">
        <mu-button icon class="back-button" @click="goBack()">
          <mu-icon value="arrow_back" color="#fff"></mu-icon>
        </mu-button>
      </mu-flex>
    </div>
    <mu-flex class="detial-info" direction="column">
      <mu-avatar class="avatar-wrapper" :size="80">
        <img :src="userInfo.headUrl" alt="avatar">
      </mu-avatar>
      <mu-flex class="actions-wrapper">
        <mu-button
          fab
          color="#448aff"
          style="margin-right: 5vw;"
          :to="`/user/add_contact?cura=${userInfo.curaNumber}`"
          v-if="!userInfo.isFriend"
        >
          <mu-icon value="add" color="#fff"></mu-icon>
        </mu-button>
        <mu-button
          fab
          color="#448aff"
          to="/user/settings"
          v-if="userInfo.curaNumber === user.curaNumber"
        >
          <mu-icon value="edit" color="#fff"></mu-icon>
        </mu-button>
        <mu-button
          fab
          color="#448aff"
          :href="`tel:${userInfo.phone}`"
          style="display: inline-block;"
        >
          <mu-icon value="phone" color="#fff"></mu-icon>
        </mu-button>
      </mu-flex>
      <div class="mu-info-wrapper">
        <div class="border1px--bottom info-wrapper">
          <div class="main-wrapper">
            <span class="nickname">{{ userInfo.nickname }}</span>
            <span class="cura">Cura: {{ userInfo.curaNumber }}</span>
          </div>
          <mu-flex class="main-wrapper" align-items="center">
            <mu-badge class="sex" color="#ffafc9" :content="userInfo.sex"></mu-badge>
            <span class="age">{{ userAge }}岁</span>
            <span class="birthday">birth: {{ userInfo.birthday }}</span>
          </mu-flex>
          <div class="signature">
            <span>个性签名:</span>
            <span>{{ userInfo.signature }}</span>
          </div>
        </div>

        <mu-list>
          <mu-list-item button :ripple="false">
            <mu-list-item-action>
              <mu-icon value="phone"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>{{ userInfo.phone }}</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button :ripple="false">
            <mu-list-item-action>
              <mu-icon value="public"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>{{ userInfo.nativePlace }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>

        <mu-container class="commend-wrapper border1px--top-bottom" v-if="showCommend">
          <mu-chip
            class="chip"
            :color="getRandomColor()"
            v-for="(commend, index) in userInfo.commend"
            :key="index"
          >
            <mu-avatar :size="32">
              <img :src="commend.headUrl">
            </mu-avatar>
            {{ commend.text }}
          </mu-chip>
        </mu-container>

        <mu-flex justify-content="center" v-if="userInfo.isFriend">
          <mu-button color="primary" round @click="onCommend = true">
            <mu-icon left value="edit"></mu-icon>评价一下~
          </mu-button>
        </mu-flex>
      </div>
    </mu-flex>

    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="onCommend">
      <mu-appbar color="primary" title="Add Commend">
        <mu-button slot="left" icon @click="cancelCommend">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat @click="submitCommend">Done</mu-button>
      </mu-appbar>
      <mu-container>
        <mu-sub-header>评价</mu-sub-header>
        <mu-flex justify-content="center" style="padding-right: 5vw;">
          <mu-text-field
            v-model="commend"
            placeholder="最多不超过10个字符"
            :max-length="10"
            icon="loyalty"
            color="primary"
            full-width
          ></mu-text-field>
        </mu-flex>
      </mu-container>
    </mu-dialog>
  </div>
</template>

<script>
import { isUndefined } from "lodash";
import moment from "moment";
import { randomColor } from "@/utils/utils";
import { mapState, mapMutations } from "vuex";

export default {
  name: "user-detail",
  data() {
    return {
      userInfo: {},
      onCommend: false,
      commend: ""
    };
  },
  methods: {
    async getUserInfo() {
      const curaNumber = this.$route.query.cura;
      if (isUndefined(curaNumber)) {
        this.$toast.error("无效的用户");
        this.$router.go(-1);
        return;
      }

      try {
        const { data } = await this.$api.user.getUser(curaNumber);
        this.userInfo = data;
      } catch (e) {
        this.$router.go(-1);
        this.$throw(e);
      }
    },
    getRandomColor() {
      return randomColor();
    },
    goBack() {
      this.$router.go(-1);
    },
    cancelCommend() {
      this.onCommend = false;
      this.commend = "";
    },
    async submitCommend() {
      this.onCommend = false;
      this.commend = "";
    }
  },
  computed: {
    ...mapState(["user"]),
    userAge() {
      console.log(parseInt(moment(this.userInfo.birthday, "YYYY-MM-DD").fromNow(), 10))
      return this.userInfo.birthday
        ? parseInt(moment(this.userInfo.birthday, "YYYY-MM-DD").fromNow(), 10)
        : 0;
    },
    formatBirthday() {
      return moment(this.userInfo.birthday).format("YYYY-MM-DD");
    },
    showCommend() {
      return this.userInfo.commend && this.userInfo.commend.length > 0;
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.user-detail {
  background-color: $bg-color;
  min-height: 100vh;
  .header-wrapper {
    height: 20vh;
    background-image: url("http://cdn.wingsico.org/image/154251694416325900_a640x364.jpg");
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position-y: 75%;
    position: relative;
    .navigator {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      .back-button {
        margin: 10px 0 10px 10px;
        background-color: rgba(255, 192, 203, 0.8);
      }
    }
  }

  .detial-info {
    position: relative;
    .avatar-wrapper {
      position: absolute;
      left: 10vw;
      transform: translateY(-50%);
    }

    .actions-wrapper {
      position: absolute;
      right: 10vw;
      transform: translateY(-50%);
    }

    .mu-info-wrapper {
      padding: 20px;
      width: 100%;
      margin-top: 40px;
      .info-wrapper {
        padding-bottom: 20px;
        margin-bottom: 5px;
        .main-wrapper {
          font-size: $font-small;
          font-weight: 400;

          .cura {
            font-weight: 300;
            color: $theme-color;
            font-size: 14px;
            margin-left: 10px;
          }
        }

        .sex {
          padding: 0 2px;
          font-size: 14px;
        }

        .age,
        .birthday {
          font-weight: 300;
          color: $theme-sub-color;
          font-size: 14px;
          margin-left: 15px;
        }
      }

      .signature {
        margin-top: 5px;
      }

      .commend-wrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 10px 0;
        margin-bottom: 20px;
        .chip {
          @include ellipsis();
          margin: 10px 5px;
        }
      }
    }
  }
}
</style>
