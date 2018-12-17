<template>
  <div class="welcome-page">
    <div class="title-wrapper">
      <h1 class="title">CURA</h1>
      <p class="description tb-line">Make Chat Simple</p>
      <div class="logo-wrapper">
        <img src="@/assets/images/logo.jpg" alt="cura-logo">
      </div>
    </div>

    <div class="action-wrapper">
      <div class="start-wrapper">
        <mu-button color="primary" to="/register">Go Cura~
          <mu-icon right value="send"/>
        </mu-button>
      </div>
      <div class="login-tip-wrapper">
        <mu-button flat color="secondary" to="/login">已有账号?直接登录</mu-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "welcome-page",
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
.welcome-page {
  padding: 30px;
  text-align: center;
  height: 100vh;
  overflow-y: hidden;
  .title-wrapper {
    .title {
      color: $theme-color;
      font-size: $font-xl;
      margin: 6vh 0;
    }

    .description {
      color: $theme-sub-color;
      font-size: $font-normal;
      margin: 0;
      padding: 1vh 5vw;
    }

    .logo-wrapper {
      margin-top: 10vh;
      img {
        width: 300px;
        height: 300px;
      }
    }
  }

  .action-wrapper {
    margin-top: 10vh;
  }
}
</style>
