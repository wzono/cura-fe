<template>
  <div class="settings-page">
    <div class="header-wrapper">
      <mu-flex class="navigator" ref="navigator">
        <mu-button icon class="back-button" @click="goBack()">
          <mu-icon value="arrow_back" color="#fff"></mu-icon>
        </mu-button>
      </mu-flex>
      <mu-flex class="user-base-wrapper">
        <mu-avatar class="avatar-wrapper" :size="60">
          <img v-lazy="user.headUrl">
        </mu-avatar>
        <mu-flex direction="column" class="base-info-wrapper">
          <div class="user-nickname">{{ user.nickname }}</div>
          <div class="user-cura">{{user.curaNumber}}</div>
        </mu-flex>
      </mu-flex>
      <mu-button fab color="#fff" class="change-avatar">
        <van-uploader :after-read="onRead">
          <mu-icon value="photo_camera" color="#333" :size="30"/>
        </van-uploader>
      </mu-button>
    </div>

    <div class="container-wrapper">
      <div class="editable-base-info-wrapper">
        <div class="header">
          <p class="title">Base Info</p>
        </div>
        <CommonInfoWrapper :content="user.phone" desc="Phone Number" to="/user/settings/phone"></CommonInfoWrapper>
        <mu-divider></mu-divider>
        <CommonInfoWrapper :content="user.nickname" desc="Nickname" to="/user/settings/nickname"></CommonInfoWrapper>
      </div>
      <div class="editable-extra-info-wrapper">
        <mu-button fab color="primary" class="edit-extra-button" to="/user/settings/extra_info">
          <mu-icon value="edit" color="#fff"></mu-icon>
        </mu-button>
        <div class="header">
          <p class="title">Extra Info</p>
        </div>
        <CommonInfoWrapper :content="user.birthday" desc="Birthday"></CommonInfoWrapper>
        <mu-divider></mu-divider>
        <CommonInfoWrapper :content="user.sex" desc="Sex"></CommonInfoWrapper>
        <mu-divider></mu-divider>
        <CommonInfoWrapper :content="user.nativePlace" desc="Native Place"></CommonInfoWrapper>
        <mu-divider></mu-divider>
        <CommonInfoWrapper :content="user.signature" desc="Signature"></CommonInfoWrapper>
      </div>

      <div class="support-wrapper">
        <div class="header">
          <p class="title">Support</p>
        </div>
        <CommonInfoWrapper content="Cura FAQ"></CommonInfoWrapper>
        <mu-divider></mu-divider>
        <p class="copyright">Cura For Everyone Enjoyed Chatting</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Uploader, Icon } from "vant";

export default {
  name: "settings-page",
  data() {
    return {
      scroll: 0
    };
  },
  components: {
    [Uploader.name]: Uploader,
    [Icon.name]: Icon
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["updateAvatar"]),
    goBack() {
      this.$router.replace("/user");
    },
    async onRead(file) {
      const formdata = new FormData();
      formdata.append("headUrl", file.file);

      this.updatingAvatar = this.$loading();
      try {
        await this.updateAvatar(formdata);
        this.$toast.success("更新头像成功");
      } catch (e) {
        this.$throw(e);
      } finally {
        this.updatingAvatar.close();
      }
    }
  }
};
</script>

<style lang="scss">
.settings-page {
  background-color: #f1f1f1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  .container-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;

    .header {
      padding-left: 40px;
      .title {
        color: $theme-color;
        font-size: $font-small;
      }
      p {
        margin: 0;
      }
    }

    .editable-base-info-wrapper {
      background-color: $bg-color;
      padding-top: 4vh;
      box-shadow: 0 1px 0px #ccc;
    }

    .editable-extra-info-wrapper {
      background-color: $bg-color;
      margin-top: 30px;
      padding-top: 2vh;
      box-shadow: 0 -1px 1px #ddd, 0 1px 0px #ccc;
      flex: 1;
      position: relative;

      .edit-extra-button {
        position: absolute;
        right: 12vw;
        top: 1.5vh;
        z-index: 111;
      }
    }

    .support-wrapper {
      background-color: $bg-color;
      margin-top: 30px;
      padding-top: 2vh;
      box-shadow: 0 -1px 1px #ddd;

      .copyright {
        text-align: center;
        font-size: 12px;
        color: #aaa;
        font-weight: 300;
      }
    }
  }
  .header-wrapper {
    background-color: $theme-color;
    position: relative;

    .change-avatar {
      position: absolute;
      right: 10vw;
      bottom: 0;
      transform: translateY(50%);
    }

    .navigator {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 101;
      background-color: $theme-color;
      .back-button {
        margin-left: 5px;
        margin-top: 5px;
      }
    }
    .user-base-wrapper {
      margin: 9vh 0 50px 50px;
      color: #fff;
      .avatar-wrapper {
        margin-right: 5vw;
      }

      .base-info-wrapper {
        align-self: stretch;
        line-height: 1;
        padding-top: 20px;
        .user-nickname {
          font-size: $font-small;
          margin-bottom: 7px;
        }

        .user-cura {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 300;
        }
      }
    }
  }
}
</style>
