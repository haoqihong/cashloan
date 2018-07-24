<template>
    <div class="new-group">
        <el-card class="el-card">
            <div class='title'>
                {{$t('newGroup.title')}}
            </div>
            <div class='personal-opinion'>
                <div class='personal-opinion-item'>
                    <span>{{$t('newGroup.gnum')}}</span>
                    <el-input v-model='groupCode' :disabled="isDisabled"></el-input>
                </div>
                <div class='personal-opinion-item'>
                    <span>{{$t('newGroup.gname')}}</span>
                    <el-input v-model='groupName' :disabled="isDisabled"></el-input>
                </div>
                <div class='personal-opinion-item'>
                    <span><i style="color: red;margin-right: 2px;">*</i>{{$t('newGroup.auth')}}</span>
                    <el-select v-model='inp1' :placeholder="$t('rule.choose')">
                        <el-option
                        v-for='item in collectStatus'
                        :key='item.dictCode'
                        :label='item.dictValue'
                        :value='item.dictCode'>
                        </el-option>
                    </el-select>
                </div>
                <div class='personal-opinion-item remarks'>
                    <span>{{$t('newGroup.remark')}}</span>
                    <el-input type='textarea' :rows="2" v-model='remarks' :placeholder="$t('rule.explain')"></el-input>
                </div>
                <div class='personal-opinion-item remarks'>
                    <span>{{$t('newGroup.have')}}</span>
                    <div class='text-area'>
                       <span v-for="(item, index) in member" :key="index">{{item}}</span>
                    </div>
                </div>
            </div>
        </el-card>
        <div class="back">
            <button type='button' @click='conserve'>
                {{$t('btn.conserve')}}
            </button>
            <button type='button' @click='back'>
                {{$t('btn.back')}}
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { getCollectDay, getUserById, editSave } from 'api/collection/grouping/index'
    export default {
        data() {
            return {
                isDisabled: true,
                groupCode: '',
                groupName: '',
                remarks: '',
                inp1: '',
                member: [],
                collectStatus: [
                    {
                        dictCode: '',
                        dictValue: this.$t('rule.choose')
                    }
                ]
            }
        },
        created() {
            this.getParamsDetail()
            //权限
            let obj = {};
            obj.dictCode = 'auth_collect_day'
            getCollectDay(obj)
            .then(response => {
                this.collectStatus = this.collectStatus.concat(response.data.collectDayList);
            })
            this.getMember()
        },
        computed: {
            ...mapGetters(["elements", "language", "editGroups"])
        },
        methods: {
            //查询对应成员
            getMember() {
                let msg = {};
                msg.groupId = this.editGroups.groupBaseId;
                getUserById(msg)
                .then(response => {
                    this.member = response.data.collectUserList
                })
            },
            getParamsDetail() {
                this.groupCode = this.editGroups.groupCode;
                this.groupName = this.editGroups.groupName;
                switch(this.editGroups.startDay) {
                    case '':
                        this.inp1 = ""
                    break;
                    case '1-3':
                        this.inp1 = "auth_collect_day_2"
                    break;
                    case '4-7':
                        this.inp1 = "auth_collect_day_3"
                    break;
                    case '1-7':
                        this.inp1 = "auth_collect_day_4"
                    break;
                    case '8-30':
                        this.inp1 = "auth_collect_day_5"
                    break;
                    case '30+':
                        this.inp1 = "auth_collect_day_6"
                    break;
                }
                this.remarks = this.editGroups.remark;
            },
            //保存
            conserve() {
                if(this.inp1 !== '') {
                    this.$confirm(this.$t('loanDetail.cue1'), {
                        confirmButtonText: this.$t('btn.confirm'),
                        cancelButtonText: this.$t('btn.cancel'),
                        type: "warning",
                        center: true
                    })
                    .then(() => {
                        let msg = {};
                        msg.groupId = this.editGroups.groupBaseId;
                        msg.collectDayCode = this.inp1;
                        msg.remark = this.remarks;
                        editSave(msg)
                        .then(response => {
                            if(response.status === 200) {
                                let view = {};
                                view.name = this.$route.name;
                                view.path = this.$route.path;
                                this.$store.dispatch('delVisitedViews', view)
                                this.$router.push({
                                    path: '/collection/grouping', 
                                    name: '催收分组管理'
                                })
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
                    this.$message({
                        showClose: true,
                        message: this.$t('newGroup.msg'),
                        type: 'warning'
                    });
                }
            },
            back() {
                let view = {};
                view.name = this.$route.name;
                view.path = this.$route.path;
                this.$store.dispatch('delVisitedViews', view)
                this.$router.push('/collection/grouping')
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
.box-card {
  width: 95%;
  margin-left: 2.5%;
  margin-right: 2.5%;
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
    .personal-opinion-item {
        width: 100%;
        margin: 20px 0;
        display: flex;
        align-items: center;
        &>span {
            display: inline-block;
            width: 100px;
            text-align: right;
            font-size: 12px;
            font-weight: bold;
            margin-right: 15px;
            color: #616264;
        }
        &>div {
            width: 20%;
        }
    }
    .remarks {
        width: 100%;
        display: flex;
        align-items: flex-start;
        div:nth-child(2) {
            width: 50%;
        }
    }
    .text-area {
        display: block;
        resize: vertical;
        padding: 5px 7px 20px 0;
        width: 100%;
        height: auto;
        color: #1f2d3d;
        background-color: #fff;
        background-image: none;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        span {
            display: inline-block;
            padding: 5px 10px;
            box-sizing: border-box;
            border-radius: 4px;
            background: #f0f2f5;
            font-size: 12px;
            color: #909399;
            margin: 3px;
        }
    }
}
.back { 
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