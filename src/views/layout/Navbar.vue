<template>
  <el-menu class="navbar" mode="horizontal"> 
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar></levelbar>
    <!-- <tabs-view></tabs-view> -->
    <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
    <div class="right-item">
      <el-tooltip effect="light" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>
      <lang-select class="international right-menu-item"></lang-select>
      <el-tooltip effect="light" :content="username" placement="bottom">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper"> <img class="user-avatar" :src="Head"> <i class="el-icon-caret-bottom"></i> </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link class='inlineBlock' to="/">
              <el-dropdown-item> {{$t('navbar.dashboard')}} </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided><span @click="modify" style="display:block;">{{$t('navbar.modify')}}</span></el-dropdown-item>
            <el-dropdown-item divided><span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-tooltip>
    </div>
    <el-dialog :title="$t('modify.title')" width="20%" :visible.sync="dialogFormVisible" :modal-append-to-body="false" append-to-body>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="$t('modify.old')" prop="oldcipher">
          <el-input type="password" v-model="ruleForm2.oldcipher" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('modify.psd')" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('modify.newpsd')" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">{{$t('btn.submit')}}</el-button>
          <el-button @click="resetForm('ruleForm2')">{{$t('btn.reset')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-menu>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import Levelbar from './Levelbar';
import TabsView from './TabsView';
import Hamburger from 'components/Hamburger';
import Screenfull from 'components/Screenfull';
import LangSelect from 'components/LangSelect';
import ErrorLog from 'components/ErrLog';
import errLogStore from 'store/errLog';
import { changepwd } from 'api/login';
import Head from 'assets/images/head.png'
export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('modify.prompt2')));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('modify.prompt3')));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error(this.$t('modify.prompt4')));
      } else {
        callback();
      }
    };
    return {
      Head,
      log: errLogStore.state.errLog,
      dialogFormVisible: false,
      ruleForm2: {
        oldcipher: '',
        pass: '',
        checkPass: ''
      },
      rules2: {
        oldcipher: [
          { required: true, message: this.$t('modify.prompt1'), trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  computed: { ...mapGetters([
      'sidebar',
      'name',
      'username',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut')
        .then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
    },
    //修改密码
    modify() {
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {};
          obj.oldPwd = this.ruleForm2.oldcipher;
          obj.newPwd = this.ruleForm2.checkPass;
          changepwd(obj)
          .then(response => {
            if (response.status === 200) {
              this.$message({
                message: '恭喜你，修改密码成功',
                type: 'success'
              });
            }
          })
          this.dialogFormVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .errLog-container {
        display: inline-block;
        position: absolute;
        right: 150px;
    }
    .right-item {
      position: fixed;
      right: 0;
      top: 0;
    }
    .screenfull {
        position: absolute;
        right: 115px;
        top: 16px;
        color: red;
    }
    .international {
        position: absolute;
        right: 85px;
        top: 2px;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>
