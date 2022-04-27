<template>
  <div class="hlcx-login-bg">
    <div class="hlcx-login-box">
      <p class="hlcx-login-title">电网技术中心数字化平台</p>

      <el-form
        :model="loginForm"
        :rules="loginRules"
        status-icon
        ref="loginForm"
        class="hlcx-loginForm"
      >
        <el-form-item prop="account">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            v-model="loginForm.account"
            type="input"
            class="deal"
            @keyup.enter.native="submitForm('loginForm')"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="password">
          <el-input
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="passwords"
            autocomplete="off"
            minlength="8"
          ></el-input>
        </el-form-item>
        <p class="hlcx-login-msg">如忘记密码，请联系管理员</p>
        <!-- <el-form-item prop="captcha" style="position: relative">
          <el-input
            placeholder="请输入验证码"
            v-model="loginForm.captcha"
            class="hlcx-login-vcode"
            minlength="4"
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
          <div class="hlcx-login-imgcode" @click="handleChangeCodeImg">
            <el-image :src="kaptcha" alt="验证码" style="height: 43px">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item> -->
        <el-form-item style="position: relative">
          <el-button
            type="primary"
            class="hlcx-login-btn"
            @click="submitForm('loginForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/user";
import { setToken } from "@/utils/auth";
// import CryptoJS from "crypto-js";
// import JSEncrypt from "jsencrypt/bin/jsencrypt";
var timerId;
export default {
  data() {
    // 验证密码
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    let inputDescription = (rule, value, callback) => {
      var reg = /\s+/g;
      if (value && reg.test(value)) {
        callback(new Error("用户名不可以输入空格"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: "",
        captcha: "",
        symmetricKey: "", //对称密钥
        captchaKey: ""
      },
      passwords: "",
      publicKey: "", //非对称密钥
      identifyCodes: "1234567890",
      identifyCode: "",
      loginRules: {
        account: [
          { required: true, trigger: "blur", message: "请输入用户名" },
          { validator: inputDescription, trigger: ["blur", "change"] }
        ],
        // passwords: [
        //   { required: true, trigger: "blur", message: "请输入密码" },
        //   { validator: validatePass, trigger: "blur" }
        // ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      kaptcha: ""
    };
  },
  mounted() {
    // this.handlePublicKey();
    // this.handleSymmetricKey();
    // this.handleKaptcha();
  },
  methods: {
    // 更新验证码
    handleChangeCodeImg() {
      clearTimeout(timerId);
      this.handleKaptcha();
    },
    // 获取验证码
    handleKaptcha() {
      getKaptcha().then(res => {
        this.kaptcha = res.base64Img;
        this.loginForm.captchaKey = res.captchaKey;
      });
    },
    // 获取非对称私钥
    handlePublicKey() {
      getPublicKey().then(res => {
        this.publicKey = res;
      });
    },
    // 获取对称密钥
    handleSymmetricKey() {
      getSymmetricKey().then(res => {
        this.loginForm.symmetricKey = res;
      });
    },
    // RSA加密
    encryptRSA(password, pub_key) {
      let enc = new JSEncrypt(); // 声明一个新的JSEncrypt对象
      enc.setPublicKey(pub_key); // 配置公钥
      return enc.encrypt(password); // 加密
    },
    // AES加密
    encrypt(word, keyStr) {
      // keyStr = keyStr ? keyStr : "absoietlj32fai12";
      let key = CryptoJS.enc.Utf8.parse(keyStr);
      let srcs = CryptoJS.enc.Utf8.parse(word);
      let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    },
    // 解密
    decrypt(word, keyStr) {
      keyStr = keyStr ? keyStr : "absoietlj32fai12";
      var key = CryptoJS.enc.Utf8.parse(keyStr);
      var decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    },
    // 登录按钮
    submitForm(loginForm) {
      // RSA加密
      // let RSApublicKeyData = this.encryptRSA(this.passwords, this.publicKey);
      // AES加密
      // let AESPassword = this.encrypt(
      //   RSApublicKeyData,
      //   this.loginForm.symmetricKey
      // );
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          // this.$store
          //   .dispatch("Login", this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: "/redirect" });
          //     // this.$router.push({ path: this.redirect || "/" });
          //   })
          //   .catch(() => {
          //     this.passwords = "";
          //     this.loginForm.captcha = "";
          //     this.handleKaptcha();
          //   });
          login(this.loginForm).then(res => {
            let userList = res.data.userList;
            setToken("Token", userList.token);
            this.$router.push({ path: "/" });
          });
        } else {
          this.passwords = "";
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.hlcx-login-bg {
  width: 100%;
  height: 100%;
  background: url("../../assets/login/login-bg.jpg");
  background-size: cover;
  position: relative;
}
.hlcx-login-box {
  text-align: center;
  width: 22%;
  height: 40%;
  position: absolute;
  right: 13%;
  top: 22%;
}
.hlcx-login-title {
  color: #01ad83;
  font-size: 30px;
  font-weight: 700;
  padding: 4rem 0;
}
.hlcx-loginForm {
  text-align: center;
}
.hlcx-loginForm .el-input {
  width: 87%;
  height: 45px;
  line-height: 45px;
  margin-bottom: 30px;
}
::v-deep .hlcx-loginForm .password .el-input {
  margin-bottom: 20px;
}
.hlcx-login-msg {
  width: 100%;
  text-align: right;
  color: #01ad83;
  padding: 0 6% 30px 0;
  font-size: 1.2rem;
}
.hlcx-login-btn {
  width: 86%;
  height: 50px !important;
  font-size: 20px;
  background: #01ad83;
}
.hlcx-login-imgcode {
  border-radius: 4px;
  height: 46px;
  line-height: 46px;
  position: absolute;
  right: 7%;
  top: 0;
  cursor: pointer;
  margin-left: 20px;
}
*/deep/.el-form > .el-form-item {
  margin: 0;
}
*/deep/.el-form-item {
  width: 100%;
}
*/deep/.hlcx-login-vcode input {
  width: 60%;
  float: left;
}
*/deep/.hlcx-login-btn span {
  display: block;
  text-align: center;
}
*/deep/.hlcx-loginForm .el-input--medium .el-input__inner {
  height: 45px;
  line-height: 45px;
}
*/deep/.el-form-item__error {
  top: 65%;
  left: 8%;
}
::v-deep .el-button {
  margin: 0 !important;
}
::v-deep .password .el-form-item__error {
  top: 78%;
}
::v-deep .deal input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
::v-deep .deal input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
