<template>
  <div class="register-page">
    <LayoutBackBar title="REGISTER">
      <mu-container class="form-wrapper" :fluid="true">
        <mu-form ref="form" :model="validateForm" class="form-field-wrapper">
          <mu-form-item
            prop="phone"
            :rules="phoneRules"
            label="TELEPHONE"
            label-float
            icon="phone"
            help-text="输入11位手机号码~"
          >
            <mu-text-field v-model="validateForm.phone" type="telephone" max-length="11"/>
          </mu-form-item>
          <mu-form-item
            prop="nickname"
            :rules="nicknameRules"
            label="NICKNAME"
            label-float
            icon="face"
            help-text="取个好听的昵称吧~"
          >
            <mu-text-field v-model="validateForm.nickname" type="text" max-length="20"/>
          </mu-form-item>
          <mu-form-item
            prop="password"
            :rules="passwordRules"
            label="PASSWORD"
            label-float
            icon="locked"
            help-text="6~16位的数字+密码组合哦~"
          >
            <mu-text-field v-model="validateForm.password" type="password" max-length="16"/>
          </mu-form-item>
        </mu-form>
        <mu-container class="button-wrapper" :fluid="true">
          <mu-flex direction="column" align-items="center" justify-content="center">
            <mu-button
              color="secondary"
              :disabled="!submitable"
              @click="submit()"
              v-loading="submitLoading"
              data-mu-loading-size="24"
            >{{ submitText }}</mu-button>
            <mu-paper round :z-depth="0" class="register-image-wrapper">
              <img src="@/assets/images/register.jpg" alt="register">
            </mu-paper>
          </mu-flex>
        </mu-container>
      </mu-container>
    </LayoutBackBar>
  </div>
</template>

<script>
import { isPhone, required, isPassword } from "@/utils/validator";
export default {
  name: "register",
  data() {
    return {
      validateForm: {
        nickname: "",
        password: "",
        phone: ""
      },
      nicknameRules: [
        { validate: val => required(val), message: "昵称不能为空哦~" }
      ],
      passwordRules: [
        {
          validate: val => isPassword(val),
          message: "密码是6~16的字母和数字的组合~"
        }
      ],
      phoneRules: [
        { validate: val => isPhone(val), message: "请填写合法的手机号码哦~" }
      ],
      submitLoading: false
    };
  },
  methods: {
    async submit() {
      const isVaild = await this.$refs.form.validate();
      if (isVaild) {
        this.submitLoading = true;
        try {
          const {data} = await this.$api.user.register(this.validateForm);
          this.$toast.success("注册成功~");
          this.$router.push('/register/success', {cura_number: data});
        } catch(e) {
          this.$throw(e);
        } finally {
          this.submitLoading = false;
        }
      }
    }
  },
  computed: {
    submitable() {
      return !Object.keys(this.validateForm).find(
        key => !this[`${key}Rules`][0].validate(this.validateForm[key])
      );
    },
    submitText() {
      return this.submitable ? "我已经准备好了!" : "我需要先好好思考一下";
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotateZ(0);
  }

  100% {
    transform: rotateZ(360deg);
  }
}
.form-wrapper {
  .form-field-wrapper {
    padding-right: 5vw;
  }
}

.button-wrapper {
  margin-top: 10vh;
}

.register-image-wrapper {
  margin-top: 5vh;
  padding: 10px;
  font-size: 0;
  img {
    width: 300px;
    height: 300px;
  }
}
</style>
