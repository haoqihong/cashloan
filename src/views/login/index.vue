<template>
<div class="login-container">
  <div class="main">
    <div class="login-title">
      <img :src="title" alt="" >
    </div>
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <el-form-item prop="username">
        <span class="svg-container">
            <img :src="user" alt="">
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账户"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
            <img :src="psd" alt="">
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="login-btn">
        <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">
          {{$t('login.logIn')}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-dialog title="第三方验证" :visible.sync="showDialog">
    邮箱登录成功,请选择第三方验证
    <social-sign></social-sign>
  </el-dialog>

</div>
</template>

<script>
import socialSign from './socialsignin';
import title from '@/assets/login/title.png'
import user from '@/assets/login/user.png'
import psd from '@/assets/login/psd.png'
export default {
  components: {
    socialSign
  },
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'));
      } else {
        callback();
      }
    };
    return {
      title,
      user,
      psd,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{
          required: true,
          message: '账户不能为空',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePass
        }]
      },
      loading: false,
      showDialog: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({
              path: '/'
            });
            // this.showDialog = true;
          }).catch(() => {
            this.loading = false;
          });
          // this.$http.post('/oauth/token', {
          //   username: this.loginForm.username,
          //   password: this.loginForm.password
          // }, {
          //   headers: {
          //     Authorization: 'Basic enV1bDp6dXVs'
          //   },
          //   emulateJSON: true,
          //   emulateHTTP: true
          // }).then(function(response) {
          //   if (response.status === 200) {
          //     this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
          //       this.loading = false;
          //       this.$router.push({
          //         path: '/'
          //       });
          //       // this.showDialog = true;
          //     }).catch(() => {
          //       this.loading = false;
          //     });
          //   } else {
          //     this.loading = false;
          //     return false;
          //   }
          // }, function(error) {
          //   console.log('server error!!');
          //   this.loading = false;
          //   return false;
          // });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1);
      // const hashObj = getQueryObject(hash);
      // const originUrl = window.location.origin;
      // history.replaceState({}, '', originUrl);
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // };
      // const codeName = hashObj[codeMap[this.auth_type]];
      // if (!codeName) {
      //   alert('第三方登录失败');
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' });
      //   });
      // }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan);
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
}

.login-container {
    @include relative;
    height: 100vh;
    background: url("../../assets/login/login_bg.png") no-repeat;
    background-size: 100% 100%;
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
        -webkit-text-fill-color: #fff !important;
    }
    input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: #818181;
        height: 42px;
    }
    .el-input {
        display: inline-block;
        height: 42px;
        width: 85%;
    }
    .svg-container {
      height: 42px;
      line-height: 42px; 
      padding-left: 15px;
      padding-top: 7px;
      float: left;
    }
    .main {
      width: 420px;
      height: 390px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .login-title {
        font-size: 26px;
        font-weight: 400;
        color: #eeeeee;
        margin: 0 auto 20px;
        text-align: center;
        font-weight: bold;
        img {
          width: 190px;
          height: 45px;
        }
    }
    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 400px;
        padding: 35px 35px 15px;
        margin: 0 auto;
        background: #fcfdfe;
        border-radius: 5px;
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background:#ededed;
        border-radius: 5px;
        color: #818181;
    }
    .login-btn {
      text-align: center;
      background:#fcfdfe; 
      padding-top: 20px;
    }
    .forget-pwd {
      color: #818181;
    }
    .el-button--primary {
      width: 166px;
      height: 40px;
      border-radius: 20px;
      color: #fff;
      background-color: #1e1e1e;
      border-color: #1e1e1e;
    }
}
.el-form-item__content {
  line-height: 42px!important;
}
</style>
