<template>
    <div class="new-group">
        <el-card class="el-card" style="margin-bottom: 40px;">
            <div class='title'>
                {{$t('AppUpgrade.title')}}
            </div>
            <div class='personal-opinion'>
                <el-form :model="ruleForm" size="mini" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item :label="$t('AppUpgrade.appUpload')" prop="apk" ref='uploadItem'>
                      <el-checkbox-group v-model="ruleForm.apk">
                      </el-checkbox-group>
                        <el-upload
                          ref="upload"  
                          size='small'
                          style="width: 50%;"
                          class="upload-demo"
                          :action="UploadUrl()"
                          :limit='1'
                          :on-success="uploadSuccess"
                          :before-upload="beforeUpload"
                          :file-list="ruleForm.apk"
                          :headers= "{Authorization: token}">
                          <el-button size="small" type="primary" @click="submitUpload">{{$t('AppUpgrade.subUpload')}}</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item :label="$t('AppVersion.verName')" prop="verName">
                        <el-input size='small' style="width: 50%;" v-model="ruleForm.verName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('AppVersion.verPlat')" prop="verPlat">
                        <el-radio-group v-model="ruleForm.verPlat">
                          <el-radio size='small' label="Android"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="$t('AppVersion.verId')" prop="verId">
                        <el-input size='small' style="width: 50%;" v-model="ruleForm.verId"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('approval.channel')" prop="appName">
                      <el-select v-model='ruleForm.appName' :placeholder="$t('rule.choose')" size='small'>
                          <el-option
                          v-for='item in appChannel'
                          :key='item.id'
                          :label='item.org_name'
                          :value='item.id'>
                          </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('AppUpgrade.isUpdate')" prop="verForce">
                      <el-select v-model="ruleForm.verForce" :placeholder="$t('rule.choose')" size='small'>
                        <el-option
                          v-for="item in appUpdate"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('AppUpgrade.updateDes')" prop="verDesc">
                        <el-input size='small' type="textarea" v-model="ruleForm.verDesc"></el-input>
                    </el-form-item>
                    <el-form-item class="back">
                        <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.conserve')}}</el-button>
                        <el-button @click="resetForm('ruleForm')">{{$t('btn.back')}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getChannels } from 'api/customQuery/index'
import { uploadApk } from 'api/version/index'
export default {
  data() {
    return {
      apk: '',
      param: '',
      ruleForm: {
        apk: [],
        verName: '',
        verPlat: '',
        verId: '',
        appName: '',
        verForce: '',
        verDesc: ''
      },
      appChannel: [],
      appUpdate: [
        {
          value: '0',
          label: this.$t('AppUpgrade.update')
        },
        {
          value: '1',
          label: this.$t('AppUpgrade.nonUpdate')
        }
      ],
      rules: {
        apk: [
          { type: 'array', required: true, message: this.$t('AppUpgrade.rule1'), trigger: 'change'}
        ],
        verName: [
          { required: true, message: this.$t('AppUpgrade.rule2'), trigger: 'blur' },
          { min: 3, max: 8, message: this.$t('AppUpgrade.len1'), trigger: 'blur' }
        ],
        verPlat: [
          { required: true, message: this.$t('AppUpgrade.rule3'), trigger: 'change' }
        ],
        verId: [
          { required: true, message: this.$t('AppUpgrade.rule4'), trigger: 'blur' }
        ],
        appName: [
          { type: 'number', required: true, message: this.$t('AppUpgrade.rule5'), trigger: 'change' }
        ],
        verForce: [
          { required: true, message: this.$t('AppUpgrade.rule6'), trigger: 'change' }
        ],
        verDesc: [
          { required: true, message: this.$t('AppUpgrade.rule7'), trigger: 'blur' },
          { min: 1, max: 50, message: this.$t('AppUpgrade.len2'), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
      //渠道下拉
    getChannels()
    .then(response => {
      this.appChannel = response.data;
    })
  },
  computed: {
    ...mapGetters(["elements", "language", "token"])
  },
  methods: {
    UploadUrl() {
      return '//jsonplaceholder.typicode.com/posts/';     
    },
    beforeUpload(file) {
      this.param = new FormData();
      this.param.append('apk', file);
    },
    // 上传成功后的回调
    uploadSuccess(response, file, fileList) {
      this.ruleForm.apk = fileList;
      // this.$refs.uploadItem.clearValidate();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(this.$t('loanDetail.cue1'), {
            confirmButtonText: this.$t('btn.confirm'),
            cancelButtonText: this.$t('btn.cancel'),
            type: "warning",
            center: true
          })
          .then(() => {
            this.param.append('orgId', this.ruleForm.appName);
            this.param.append('verId', this.ruleForm.verId);
            this.param.append('verName', this.ruleForm.verName);
            this.param.append('verPlat', this.ruleForm.verPlat);
            this.param.append('verForce', this.ruleForm.verForce);
            this.param.append('verDesc', this.ruleForm.verDesc);
            console.log(this.param.get('apk'));
            console.log(this.param.get('orgId'));
            console.log(this.param.get('verId'));
            console.log(this.param.get('verName'));
            console.log(this.param.get('verPlat'));
            console.log(this.param.get('verForce'));
            console.log(this.param.get('verDesc'));
            uploadApk(this.param)
            .then(response => {
              if (response.status === 200) {
                // let view = {};
                // view.name = this.$route.name;
                // view.path = this.$route.path;
                // this.$store.dispatch('delVisitedViews', view)
                // this.$router.push({
                //     path: '/version/AppVersion', 
                //     name: '版本管理'
                // })
              }
            })
          })
          .catch(() => {
            this.$message({
              showClose: true,
              type: "info",
              message: this.$t('loanDetail.cue3')
            });
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      let view = {};
      view.name = this.$route.name;
      view.path = this.$route.path;
      this.$store.dispatch('delVisitedViews', view)
      this.$router.push('/version/AppVersion')
    }
  }
}
</script>

<style scoped lang="scss">
.new-group {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    position: relative;
}
.title {
  line-height: 30px;
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: bold;
}
.title:before{
  display: block;
  content: "";
  width: 3px;
  height: 16px;
  background-color: #309afe;
}
.title:before {
  margin-right: 8px;
}
::before {
  box-sizing: inherit;
  -webkit-tap-highlight-color: transparent;
}
.personal-opinion {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
}
.back { 
    margin: 10px 0 30px 0;
    button {
        padding: 0 20px;
        height: 28px;
        background: #20a0ff;
        color: #fff;
        outline: none;
        border-width: 0;
        border-radius: 4px;
        font-size: 12px;
        &:nth-child(2) {
            margin-left: 10px;
            background: #ebf5ff;
            color: #20a0ff;
            border: 1px solid #abd5ff;
        }
    }
}
</style>