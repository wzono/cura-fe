<template>
  <div class="update-phone">
    <LayoutBackBar title="Change Extra Info">
      <mu-button icon slot="right" @click="confirmUpdate">
        <mu-icon value="done"/>
      </mu-button>
      <div>
        <mu-form ref="form" :model="validateForm" class="form">
          <mu-form-item label="Birthday" prop="birthday">
            <mu-date-input
              v-model="validateForm.birthday"
              container="bottomSheet"
              full-width
              action-icon="date_range"
              no-display
            />
          </mu-form-item>
          <mu-form-item label="Sex" prop="sex">
            <mu-radio v-model="validateForm.sex" value="男" label="男"></mu-radio>
            <mu-radio v-model="validateForm.sex" value="女" label="女"></mu-radio>
            <mu-radio v-model="validateForm.sex" value="保密" label="保密"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="nativePlace" label="Natice Place">
            <mu-text-field
              :value="addressText"
              placeholder="选择所在地"
              @click="selectNativePlace"
              action-icon="place"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item label="Signature" prop="signature">
            <mu-text-field
              v-model="validateForm.signature"
              placeholder="不允许超过100个字符"
              multi-line
              :rows="3"
              :max-length="100"
            ></mu-text-field>
          </mu-form-item>
        </mu-form>

        <mu-bottom-sheet :open.sync="showAddress">
          <mu-slide-picker
            :slots="addressSlots"
            :visible-item-count="7"
            @change="addressChange"
            :values="address"
          ></mu-slide-picker>
        </mu-bottom-sheet>
      </div>
    </LayoutBackBar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { address } from "@/utils/config";
import moment from 'moment';

export default {
  name: "update-extra-info",
  data() {
    return {
      validateForm: {
        birthday: "",
        sex: "男",
        nativePlace: "",
        signature: ""
      },
      addressSlots: [
        {
          width: "100%",
          textAlign: "right",
          values: Object.keys(address)
        },
        {
          width: "100%",
          textAlign: "left",
          values: ["北京"]
        }
      ],
      address: ["北京", "北京"],
      addressProvince: "北京",
      addressCity: "北京",
      showAddress: false
    };
  },
  computed: {
    ...mapState(["user", "socket"]),
    addressText() {
      const nativePlace =
        this.addressProvince === this.addressCity
          ? this.addressCity
          : this.address.join("-");
      this.validateForm.nativePlace = nativePlace;
      return nativePlace;
    }
  },
  methods: {
    confirmUpdate() {
      this.validateForm.birthday = moment(this.validateForm.birthday).format('YYYY-MM-DD');
      this.socket.send("/app/update_user_info", {}, JSON.stringify(this.validateForm));
    },
    addressChange(value, index) {
      switch (index) {
        case 0:
          this.addressProvince = value;
          const arr = address[value];
          this.addressSlots[1].values = arr;
          this.addressCity = arr[0];
          break;
        case 1:
          this.addressCity = value;
          break;
      }
      this.address = [this.addressProvince, this.addressCity];
    },
    selectNativePlace() {
      this.showAddress = true;
    },
    initExtraInfo() {
      this.validateForm.birthday = this.user.birthday;
      this.validateForm.sex = this.user.sex;
      this.validateForm.signature = this.user.signature;

      const np = this.user.nativePlace.split("-");
      if (np.length === 1) {
        this.addressProvince = np[0];
        this.addressCity = np[0];
        this.address = [np[0], np[0]];
      } else {
        this.addressProvince = np[0];
        this.addressCity = np[1];
        this.address = [np[0], np[1]];
      }
    }
  },
  created() {
    this.initExtraInfo();
  }
};
</script>

<style lang="scss" scoped>
.form {
  margin-top: 5vh;
  padding: 2vh 5vw;
}
</style>
