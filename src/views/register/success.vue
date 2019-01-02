<template>
  <div class="register-success">
    <mu-flex align-items="center" direction="column">
      <div class="header-wrapper">
        <p class="welcome">Welcome To Cura~</p>
        <div class="cura-number-wrapper">
          <p class="desc">你申请的CURA号为</p>
          <h3 class="cura-number">{{ curaNumber }}</h3>
        </div>
      </div>

      <mu-flex
        align-items="center"
        class="login-button-wrapper"
        direction="column"
      >
        <div class="button">
          <mu-button color="blueA200" :to="`/login?curaNumber=${curaNumber}`" large>开始Cura~</mu-button>
        </div>
        <div class="logo">
          <img src="@/assets/images/logo.png">
        </div>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
export default {
  name: "register-success",
  computed: {
    curaNumber() {
      return this.$route.query.cura;
    }
  }
};
</script>

<style lang="scss" scoped>
.register-success {
  .header-wrapper {
    margin: 10vh 0;
    text-align: center;
    .welcome {
      font-size: $font-normal;
      color: $theme-color;
      margin: 0;
    }

    .desc {
      font-size: $font-normal;
      color: $theme-sub-color;
    }

    .cura-number {
      font-size: $font-lg;
      color: $theme-sub-color;
      margin: 0;
    }
  }

  .login-button-wrapper {
    .button {
      font-size: $font-normal;
    }
    .logo {
      margin-top: 10vh;
      img {
        @include avatar();
      }
    }
  }
}
</style>
