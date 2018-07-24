<template>
    <div class="loan-detail">
        <el-card class="box-card" style="margin-top: 110px;">
             <div class='title'>
                个人信息
            </div>
            <div class='personal-info'>
                <div class='personal-info-item'>
                    <span>产品编号:</span>
                    <div class="right">
                        <el-input v-model='form.pronum' placeholder='' size='mini'></el-input>
                    </div>
                </div>
                <div class='personal-info-item'>
                    <span>产品名称:</span>
                    <div class="right">
                        <el-input v-model='form.proname' placeholder='' size='mini'></el-input>
                    </div>
                </div>
                <div class='personal-info-item'>
                    <span>金额:</span>
                    <div class="right">
                        <el-input v-model='form.sumstart' placeholder='' size='mini'></el-input>
                        <span style="margin: 0 5px;">至</span>
                        <el-input v-model='form.sunend' placeholder='' size='mini'></el-input>
                    </div>
                </div>
                <div class='personal-info-item'>
                    <span>拆分金额:</span>
                    <div class="right">
                        <el-input v-model='form.compromise' placeholder='' size='mini'></el-input>
                    </div>
                </div>
                <div class='personal-info-item'>
                    <span>期限:</span>
                    <div class="right"> 
                        <el-input v-model='form.termstart' placeholder='' size='mini'></el-input>
                        <span style="margin: 0 5px;">至</span>
                        <el-input v-model='form.termend' placeholder='' size='mini'></el-input>
                    </div>
                </div>
                <div class='personal-info-item'>
                    <span>利率:</span>
                    <div class="right">
                        <el-input v-model='form.interestrate' placeholder='' size='mini'></el-input>
                    </div>
                </div>
                <div class='personal-info-item'>
                    <span>账户管理费:</span>
                    <div class="right">
                        <el-select v-model='form.value' placeholder='请选择' size='small'>
                            <el-option
                            v-for='item in form.account'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                            </el-option>
                        </el-select>
                        <el-input v-model='form.sum2' placeholder='' size='mini' style="margin-left: 20px;"></el-input>
                    </div>
                </div>
                <div class='personal-info-item'>
                    <span>显示顺序:</span>
                    <div class="right">
                        <el-input v-model='form.order' placeholder='' size='mini'></el-input>
                    </div>
                </div>
                <div class='personal-info-item overdue'>
                    <span>逾期罚息规则:</span>
                    <div class="right">
                        <el-select v-model='form.value1' placeholder='请选择' size='small'>
                            <el-option
                            v-for='item in form.overdue'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                            </el-option>
                        </el-select>
                        <div class="info">
                            <div class="info-item">
                                <el-input v-model='form.time1' placeholder='' size='mini'></el-input>
                                <span style="margin: 0 5px;">至</span>
                                <el-input v-model='form.time2' placeholder='' size='mini'></el-input>
                                <el-input v-model='form.timerate1' placeholder='' size='mini'></el-input>
                            </div>
                            <div class="info-item">
                                <el-input v-model='form.time3' placeholder='' size='mini'></el-input>
                                <span style="margin: 0 5px;">至</span>
                                <el-input v-model='form.time4' placeholder='' size='mini'></el-input>
                                <el-input v-model='form.timerate2' placeholder='' size='mini'></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='personal-info-item'>
                    <span>备注:</span>
                    <div class="right remarks"> 
                        <el-input type="textarea" v-model='form.remarks' placeholder='请加以说明' size='mini'></el-input>
                    </div>
                </div>
            </div>
        </el-card>
        <div class="back">
            <button type='button' @click='keep()' :disabled='isDisable'>
                保存
            </button>
            <button type='button' @click='goback'>
                返回
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isDisable: false,
                form: {
                    pronum: '',
                    proname: '',
                    sumstart: '',
                    sunend: '',
                    compromise: '',
                    termstart: '',
                    termend: '',
                    interestrate: '',
                    account: [
                        {
                            value: "选项1",
                            label: "浮动金额"
                        },
                        {
                            value: "选项2",
                            label: "固定金额"
                        }
                    ],
                    value: '',
                    sum2: '',
                    order: '',
                    overdue: [
                        {
                            value: "选项1",
                            label: "固定利率"
                        },
                        {
                            value: "选项2",
                            label: "分段利率"
                        }
                    ],
                    value1: '',
                    time1: '',
                    time2: '',
                    timerate1: '',
                    time2: '',
                    time3: '',
                    timerate2: '',
                    remarks: ''
                }
            }
        },
        methods: {
            //提交
            keep() {
                this.$confirm("确定提交？", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                })
                .then(() => {
                this.$message({
                    showClose: true,
                    type: "success",
                    message: "提交成功!"
                });
                })
                .catch(() => {
                this.$message({
                    showClose: true,
                    type: "info",
                    message: "已取消"
                });
                });
            },
            //返回
            goback() {
                this.$router.push('/product/productManage') 
            }
        }
    }
</script>

<style scoped lang="scss">
input::-webkit-input-placeholder {
    font-size: 12px;
}
.box-card {
  width: 95%;
  margin-left: 2.5%;
  margin-right: 2.5%;
}
.title {
  line-height: 30px;
  font-size: 16px;
  display: flex;
  padding-bottom: 10px;
  box-sizing: border-box;
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
.personal-info {
    width: 96%;
    padding: 10px 0;
    box-sizing: border-box;
    font-size: 12px;
    .personal-info-item {
        width: 100%;
        margin: 10px 0;
        display: flex;
        align-items: center;
        &>span {
            display: inline-block;
            width: 100px;
            text-align: right;
            font-size: 12px;
            margin-right: 15px;
            color: #616264;
        }
        .right {
            flex: 1;
            display: flex;
            align-items: center;
            .el-input, .el-select {
                width: 15%;
            }
            .info {
                flex: 1;
                margin-left: 20px;
                .info-item {
                    margin-bottom: 10px;
                }
            }
        }
        .remarks {
            .el-input {
                width: 100%;
            }
        }
    }
    .overdue {
        margin-top: 15px;
        align-items: flex-start;
        .right {
            align-items: flex-start;
        }
    }
}
.back { 
    width: 95%;
    margin-left: 2.5%;
    margin-top: 40px;
    margin-bottom: 80px;
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