<template>
  <div class="login-page">
    <LayoutBackBar title="登陆 Cura" to="/">
      <div class="form-wrapper" >
        <mu-flex justify-content="center">
          <mu-paper circle :z-depth="3" class="user-avatar-wrapper">
            <mu-avatar size="120">
              <img src="@/assets/images/logo.png" v-if="!headUrl">
              <img v-lazy="headUrl" v-else>
            </mu-avatar>
          </mu-paper>
        </mu-flex>
        <mu-form ref="form" :model="validateForm" class="form-field-wrapper">
          <mu-form-item prop="cura" label="CURA" label-float icon="account_circle">
            <mu-text-field v-model="validateForm.cura" type="text"/>
          </mu-form-item>
          <mu-form-item prop="password" label="PASSWORD" label-float icon="locked">
            <mu-text-field v-model="validateForm.password" type="password" max-length="16"/>
          </mu-form-item>
        </mu-form>
        <div class="button-wrapper" >
          <mu-flex direction="column" align-items="center" justify-content="center">
            <mu-button
              :color="loginButtonColor"
              @click="submit()"
              large
              v-loading="submitLoading"
              data-mu-loading-size="24"
            >
              <span class="text" v-if="!loginSuccess">LOGIN</span>
              <mu-icon value="done" v-else/>
            </mu-button>
          </mu-flex>
        </div>
      </div>
    </LayoutBackBar>
  </div>
</template>

<script>
import { required } from "@/utils/validator";
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      validateForm: {
        cura: "",
        password: ""
      },
      submitLoading: false,
      loginSuccess: false,
      headUrl: ""
    };
  },
  methods: {
    ...mapActions(['login']),
    async submit() {
      if (this.isFormFieldVaild()) {
        this.submitLoading = true;
        try {
          const res = await this.login({
            curaNumber: this.validateForm.cura,
            password: this.validateForm.password
          });
          this.$toast.success('登陆成功');
          this.loginSuccess = true;

          this.$router.push('/user');
        } catch (e) {
          this.$throw(e);
        } finally {
          this.submitLoading = false;
        }
      }
    },
    isFormFieldVaild() {
      !required(this.validateForm.cura) && this.$toast.info("cura号不能为空");
      !required(this.validateForm.password) && this.$toast.info("密码不能为空");
      return (
        required(this.validateForm.cura) && required(this.validateForm.password)
      );
    }
  },
  computed: {
    loginButtonColor() {
      return this.loginSuccess ? "success" : "blueA200";
    }
  },
  created() {
    this.validateForm.cura = this.$route.query.curaNumber || "";
    this.headUrl = this.$route.query.headUrl || "";
  }
};
</script>

<style lang="scss" scoped>
.form-wrapper {
}
.user-avatar-wrapper {
  padding: 5px;
  font-size: 0;
  margin-top: 5vh;
}

.form-field-wrapper {
  padding-right: 5vw;
  margin: 5vh 0 10vh;
}

.button-wrapper {
  text-align: center;
  transition: all 0.5s;
  .text {
    font-size: 20px;
  }
}
</style>
