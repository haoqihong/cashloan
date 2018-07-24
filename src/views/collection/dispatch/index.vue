<template>
    <div class='approval'>
        <el-card class="box-card" style="margin-top: 110px;">
            <div class='title'>
                {{$t('lenders.title1')}}
            </div>
            <div class='menu-search'> 
                <div class='menu-title'>
                    <div class='searchItem'>
                        <span>{{$t('lenders.orderId')}}</span>
                        <el-input v-model='listQuery.orderId' :placeholder="$t('rule.orderId')" size='small'></el-input>
                    </div>
                    <div class='searchItem'>
                        <span>{{$t('lenders.realName')}}</span>
                        <el-input v-model='listQuery.realName' :placeholder="$t('rule.realName')" size='small'></el-input>
                    </div>
                    <div class='searchItem'>
                        <span>{{$t('lenders.phoneNo')}}</span>
                        <el-input v-model='listQuery.phoneNo' :placeholder="$t('rule.phoneNo')" size='small'></el-input>
                    </div>
                    <div class='searchItem'>
                        <span>{{$t('dispatch.callResult')}}</span>
                        <el-select v-model='listQuery.telResult' size='small'>
                            <el-option
                            v-for='item in callResult'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class='menu-title'>
                    <div class='searchItem'>
                        <span>{{$t('dispatch.collStatus')}}</span>
                        <el-select v-model='listQuery.collectStatus' size='small'>
                            <el-option
                            v-for='item in collStatus'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                            </el-option>
                        </el-select>
                    </div>
                    <div class='searchItem'>
                        <span>{{$t('dispatch.dealResult')}}</span>
                        <el-select v-model='listQuery.delResult' size='small'>
                            <el-option
                            v-for='item in dealResult'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                            </el-option>
                        </el-select>
                    </div>
                    <div class='searchItem'>
                        <span>{{$t('dispatch.auth')}}</span>
                        <el-select v-model='listQuery.collectCode' size='small'>
                            <el-option
                            v-for='item in collectStatus'
                            :key='item.dictCode'
                            :label='item.dictValue'
                            :value='item.dictValue'>
                            </el-option>
                        </el-select>
                    </div>
                    <div class='searchItem'>
                        <span>{{$t('dispatch.recStatus')}}</span>
                        <el-select v-model='listQuery.receiveStatus' size='small'>
                            <el-option
                            v-for='item in receiveState'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class='menu-title'>
                    <div class="searchItem-overdue">
                        <span>{{$t('dispatch.overDay')}}</span>
                        <el-input v-model='listQuery.overDayBegin' size='small'></el-input>
                        <b style="font-weight: normal; margin: 0 10px; font-size: 12px; color: #5f5f61;">{{$t('lenders.go')}}</b>
                        <el-input v-model='listQuery.overDayEnd' size='small'></el-input>
                        <b style="font-weight: normal; margin-left: 10px;font-size: 12px; color: #5f5f61;">{{$t('dispatch.day')}}</b>
                    </div>
                </div>
                <div class='menu-title-btn'>
                  <button type='button' @click='search'>
                      {{$t('btn.query')}}
                  </button>
                  <button type='button' @click='reset'>
                      {{$t('btn.reset')}}
                  </button>
                  <button type='button' @click="handleDownload" :disabled="expDis">
                      {{$t('btn.export')}}
                  </button>
              </div>
            </div>
        </el-card>
        <el-card class='box-card' style="margin-top: 10px;margin-bottom: 20px;">
            <div class='title'>
                {{$t('dispatch.taskList')}}
            </div>
            <div class='menu-list'>
                <button type='button' :disabled='isDisable2' @click='approvalFn'>{{$t('dispatch.collDet')}}</button>
            </div>
            <el-table
                v-loading="listLoading"
                ref='multipleTable'
                :data='tableData'
                tooltip-effect='dark'
                style='width: 95%'
                class='tables'
                @selection-change='handleSelectionChange'
                border
                size='mini'>
                <el-table-column
                header-align='center'
                align='center'
                type='selection'
                width='55'>
                </el-table-column>
                <el-table-column
                prop='orderId'
                :label="$t('lenders.orderId')"
                width='240'>
                </el-table-column>
                <el-table-column
                prop='realName'
                :label="$t('lenders.realName')"
                width='240'>
                </el-table-column>
                <el-table-column
                prop='appUserName'
                :label="$t('lenders.phoneNo')"
                width='180'>
                </el-table-column>
                <el-table-column
                prop='proName'
                :label="$t('dispatch.proName')"
                width='180'>
                </el-table-column>
                <el-table-column
                prop='approvedAmt'
                :label="$t('dispatch.appAmt')"
                width='180'>
                </el-table-column>
                <el-table-column
                prop="orderCrtTime"
                :label="$t('dispatch.orderCrtTime')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop="lastPayDate"
                :label="$t('dispatch.lastPayDate')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop="overdueDay"
                :label="$t('dispatch.overDay')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='overdueAmt'
                :label="$t('dispatch.overdueAmt')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='overdueInterest'
                :label="$t('dispatch.overdueInterest')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='baseUserName'
                :label="$t('dispatch.recStatus')"
                width='200'>
                <template scope="scope">
                    <span v-if="scope.row.baseUserName=== ''">{{$t('dispatch.unreceived')}}</span>
                    <span v-else-if="scope.row.baseUserName=== null">{{$t('dispatch.unreceived')}}</span>
                    <span v-else>{{$t('dispatch.receive')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='groupName'
                :label="$t('dispatch.collGroup')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='baseUserName'
                :label="$t('dispatch.baseUserName')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='status'
                :label="$t('dispatch.taskStatus')"
                width='120'>
                <template scope="scope">
                    <span v-if="scope.row.status=== 10">{{$t('dispatch.status1')}}</span>
                    <span v-else-if="scope.row.status === 20">{{$t('dispatch.status2')}}</span>
                    <span v-else-if="scope.row.status === 50">{{$t('dispatch.status3')}}</span>
                    <span v-else>{{$t('dispatch.status4')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='orderStatus'
                :label="$t('dispatch.orderStatus')"
                width='200'>
                <template scope="scope">
                    <span v-if="scope.row.orderStatus=== 1">{{$t('approval.audit')}}</span>
                    <span v-else-if="scope.row.orderStatus=== 2">{{$t('approval.credit')}}</span>
                    <span v-else-if="scope.row.orderStatus=== 3">{{$t('approval.repayments')}}</span>
                    <span v-else-if="scope.row.orderStatus=== 4">{{$t('approval.refused')}}</span>
                    <span v-else-if="scope.row.orderStatus=== 5">{{$t('approval.clear')}}</span>
                    <span v-else-if="scope.row.orderStatus=== 6">{{$t('dispatch.orderStatus1')}}</span>
                    <span v-else-if="scope.row.orderStatus=== 7">{{$t('dispatch.orderStatus2')}}</span>
                    <span v-else-if="scope.row.orderStatus=== 8">{{$t('orderQuery.status8')}}</span>
                    <span v-else-if="scope.row.orderStatus=== 9">{{$t('orderQuery.status9')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='callResult'
                :label="$t('dispatch.callResult')"
                width='120'>
                <template scope="scope">
                    <span v-if="scope.row.callResult=== '1'">{{$t('dispatch.normal')}}</span>
                    <span v-else-if="scope.row.callResult=== '2'">{{$t('dispatch.fail')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='callFailedReason'
                :label="$t('dispatch.callFailedReason')"
                width='160'>
                <template scope="scope">
                    <span v-if="scope.row.callFailedReason=== '1'">{{$t('dispatch.reason1')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '2'">{{$t('dispatch.reason2')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '3'">{{$t('dispatch.reason3')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '4'">{{$t('dispatch.reason4')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '5'">{{$t('dispatch.reason5')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '6'">{{$t('dispatch.reason6')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '7'">{{$t('dispatch.reason7')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '8'">{{$t('dispatch.reason8')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='dealResult'
                :label="$t('dispatch.dealResult')"
                width='120'>
                <template scope="scope">
                    <span v-if="scope.row.dealResult=== '1'">{{$t('dispatch.result1')}}</span>
                    <span v-else-if="scope.row.dealResult=== '2'">{{$t('dispatch.result2')}}</span>
                    <span v-else-if="scope.row.dealResult=== '3'">{{$t('dispatch.result3')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='collectRemark'
                :label="$t('dispatch.collectRemark')"
                width='200'
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop='appShortName'
                :label="$t('dispatch.appShortName')"
                width='120'>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="listQuery.page"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="listQuery.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { page, getCollectDay } from 'api/collection/dispatch/index'
export default {
    data() {
        return {
        expDis: true,
        listLoading: false,
        listQuery: {
            limit: 10,//每页条数
            page: 1,//当前页数
            orderId: "",//订单号
            realName: "",//姓名
            phoneNo: "",//手机
            telResult: "",//通话结果
            collectStatus: "",//催收状态
            delResult: "",//处理结果
            collectCode: "",//催收权限
            receiveStatus: "",//领取状态
            overDayBegin: "",//逾期天数
            overDayEnd: ""
        },
        total: null,
        tableData: [],
        multipleSelection: [],
        isDisable2: true,
        lanStatus: null,
        callResult: [
            {
                value: '',
                label: this.$t('rule.choose')
            },
            {
                value: 1,
                label: this.$t('dispatch.normal')
            },
            {
                value: 2,
                label: this.$t('dispatch.fail')
            }
        ],
        collStatus: [
            {
                value: '',
                label: this.$t('rule.choose')
            },
            {
                value: 1,
                label: this.$t('dispatch.success')
            },
            {
                value: 2,
                label: this.$t('dispatch.fail')
            }
        ],
        dealResult: [
            {
                value: '',
                label: this.$t('rule.choose')
            },
            {
                value: 1,
                label: this.$t('dispatch.result1')
            },
            {
                value: 2,
                label: this.$t('dispatch.result2')
            },
            {
                value: 3,
                label: this.$t('dispatch.result3')
            }
        ],
        collectStatus: [
            {
                dictCode: '',
                dictValue: this.$t('rule.choose')
            }
        ],
        receiveState: [
            {
                value: '',
                label: this.$t('rule.choose')
            },
            {
                value: 1,
                label: this.$t('dispatch.havesign')
            },
            {
                value: 2,
                label: this.$t('dispatch.nosign')
            }
        ]
        };
    },
    created() {
        if (this.language === 'zh') {
            this.lanStatus = 1;
        } else if (this.language === 'en') {
            this.lanStatus = 2;
        } else {
            this.lanStatus = 3;
        }
        //权限
        let obj = {};
        obj.dictCode = 'auth_collect_day'
        getCollectDay(obj)
        .then(response => {
            this.collectStatus = this.collectStatus.concat(response.data.collectDayList);
        })
    },
    computed: {
        ...mapGetters(["elements", "language", "collDispPage"])
    },
    methods: {
        //导出
        handleDownload() {
            this.$store.dispatch('saveCollDispPage', { path: this.$route.path, listQuery: this.listQuery });
            if (this.tableData.length > 0) {
                this.isDisable2 = false;
            } else {
                this.isDisable2 = true;
            }
            this.listQuery.limit = this.total;
            page(this.listQuery)
            .then(response => {
                response.data.rows.forEach(item => {
                    let re = /(?=(?!\b)(\d{3})+$)/g;
                    let str = String(item.approvedAmt)
                    item.approvedAmt =  str.replace(re, '.');
                    let str2 = String(item.overdueAmt)
                    item.overdueAmt =  str2.replace(re, '.');
                    let str3 = String(item.breakAmt)
                    item.breakAmt =  str3.replace(re, '.');
                    let str4= String(item.overdueInterest)
                    item.overdueInterest =  str4.replace(re, '.');
                    //领取状态
                    if(item.baseUserName === "" || item.baseUserName === null) {
                        item.attr8 = this.$t('dispatch.unreceived')
                    } else{
                        item.attr8 = this.$t('dispatch.receive')
                    }
                    //订单状态
                    switch (item.orderStatus) {
                        case 1:
                            item.orderStatus = this.$t('approvalDetail.audit')
                        break;
                        case 2:
                            item.orderStatus = this.$t('approvalDetail.credit')
                        break;
                        case 3:
                            item.orderStatus = this.$t('approvalDetail.repayments')
                        break;
                        case 4:
                            item.orderStatus = this.$t('approvalDetail.refused')
                        break;
                        case 5:
                            item.orderStatus = this.$t('approvalDetail.clear')
                        break;
                        case 6:
                            item.orderStatus = this.$t('dispatch.orderStatus1')
                        break;
                        case 7:
                            item.orderStatus = this.$t('dispatch.orderStatus2')
                        break;
                        case 8:
                            item.orderStatus = this.$t('orderQuery.status8')
                        break;
                        case 9:
                            item.orderStatus = this.$t('orderQuery.status9')
                        break;
                    }
                    //通话结果
                    if(item.callResult === '1') {
                        item.callResult = this.$t('dispatch.normal')
                    } else if(item.callResult === '2'){
                        item.callResult = this.$t('dispatch.fail')
                    }
                    //失败原因
                    switch (item.callFailedReason) {
                        case '1':
                            item.callFailedReason = this.$t('dispatch.reason1')
                        break;
                        case '2':
                            item.callFailedReason = this.$t('dispatch.reason2')
                        break;
                        case '3':
                            item.callFailedReason = this.$t('dispatch.reason3')
                        break;
                        case '4':
                            item.callFailedReason = this.$t('dispatch.reason4')
                        break;
                        case '5':
                            item.callFailedReason = this.$t('dispatch.reason5')
                        break;
                        case '6':
                            item.callFailedReason = this.$t('dispatch.reason6')
                        break;
                        case '7':
                            item.callFailedReason = this.$t('dispatch.reason7')
                        break;
                        case '8':
                            item.callFailedReason = this.$t('dispatch.reason8')
                        break;
                    }
                    //处理结果
                    if(item.dealResult === '1') {
                        item.dealResult = this.$t('dispatch.result1')
                    } else if(item.dealResult === '2'){
                        item.dealResult = this.$t('dispatch.result2')
                    } else if(item.dealResult === '3'){
                        item.dealResult = this.$t('dispatch.result3')
                    }
                    //任务状态
                    if(item.status === 10) {
                        item.status = this.$t('dispatch.status1')
                    } else if(item.status === 20){
                        item.status = this.$t('dispatch.status2')
                    } else if(item.status === 50){
                        item.status = this.$t('dispatch.status3')
                    } else {
                        item.status = this.$t('dispatch.status4')
                    }
                })
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/vendor/Export2Excel')
                    const tHeader = [ this.$t('lenders.orderId'), this.$t('lenders.realName'), this.$t('lenders.phoneNo'), this.$t('dispatch.proName'), this.$t('dispatch.appAmt'), this.$t('dispatch.orderCrtTime'), this.$t('dispatch.lastPayDate'), this.$t('dispatch.overDay'), this.$t('dispatch.overdueAmt'), this.$t('dispatch.recStatus'), this.$t('dispatch.collGroup'), this.$t('dispatch.baseUserName'), this.$t('dispatch.taskStatus'), this.$t('dispatch.orderStatus'), this.$t('dispatch.callResult'), this.$t('dispatch.callFailedReason'), this.$t('dispatch.dealResult'), this.$t('dispatch.collectRemark'), this.$t('dispatch.appShortName')];
                    const filterVal = ['orderId', 'realName', 'appUserName', 'proName', 'approvedAmt', 'orderCrtTime', 'lastPayDate', 'overdueDay', 'overdueAmt', 'attr8', 'groupName', 'baseUserName', 'status', 'orderStatus', 'callResult', 'callFailedReason', 'dealResult', 'collectRemark', 'appShortName'];
                    const list = response.data.rows;
                    const data = this.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, this.$t('route.dispatch'))
                    this.downloadLoading = false;
                })
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        getList() {
            this.listLoading = true;
            this.$store.dispatch('saveCollDispPage', { path: this.$route.path, listQuery: this.listQuery });
            if (this.tableData.length > 0) {
                this.isDisable2 = false;
            } else {
                this.isDisable2 = true;
            }
            page(this.listQuery)
            .then(response => {
                response.data.rows.forEach(item => {
                    let re = /(?=(?!\b)(\d{3})+$)/g;
                    let str = String(item.approvedAmt)
                    item.approvedAmt =  str.replace(re, '.');
                    let str2 = String(item.overdueAmt)
                    item.overdueAmt =  str2.replace(re, '.');
                    let str3 = String(item.breakAmt)
                    item.breakAmt =  str3.replace(re, '.');
                    let str4= String(item.overdueInterest)
                    item.overdueInterest =  str4.replace(re, '.');
                })
                if (response.status === 200) {
                    this.expDis = false;
                    this.listLoading = false;
                    this.tableData = response.data.rows;
                    this.total = Number(response.data.total);
                }
            })
        },
        //查询
        search() {
            if (this.collDispPage.has(this.$route.path)) {
                this.listQuery = this.collDispPage.get(this.$route.path)
            }
            this.getList();
        },
        //重置
        reset() {
        this.listQuery.orderId = "";
        this.listQuery.realName = "";
        this.listQuery.phoneNo = "";
        this.listQuery.telResult = "";
        this.listQuery.collectStatus = "";
        this.listQuery.delResult = "";
        this.listQuery.collectCode = "";
        this.listQuery.receiveStatus = "";
        this.listQuery.overDayBegin = "";
        this.listQuery.overDayEnd = "";
        },
        //选中的数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length !== 0) {
                this.isDisable2 = false;
            }
        },
        //催收明细
        approvalFn() {
            if(this.multipleSelection.length === 1) { 
                this.$store.dispatch('setCollQueryDetail', this.multipleSelection[0])
                this.$router.push({
                    path: '/collection/collQueryDetail', 
                    name: '催收查询详情'
                })             
            } else if(this.multipleSelection.length <= 0){
                this.$message({
                    showClose: true,
                    message: this.$t('lenders.msg1'),
                    type: 'warning'
                });
            } else {
                this.$message({
                    showClose: true,
                    message: this.$t('lenders.msg2'),
                    type: 'warning'
                });
            }
        },
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList()
        },
    }
};
</script>

<style scoped lang='scss'>
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
.menu-title {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
    font-size: 15px;
    span {
      width: 50%;
      padding-left: 10px;
      padding-right: 10px;
      text-align: right;
    }
  }
  .searchItem {
    width: 18%;
    margin-left: 0.5%;
    display: flex;
    justify-content: space-center;
    span {
      display: inline-block;
      width: 70px;
      text-align: right;
      font-size: 12px;
      color: #5f5f61;
    }
    div:nth-child(2) {
      flex: 1;
    }
  }
  .searchItem-overdue {
        width: 18%;
        margin-left: 0.5%;
        display: flex;
        justify-content: space-center;
        span {
            display: inline-block;
            width: 70px;
            text-align: right;
            font-size: 12px;
            color: #5f5f61;
        }
        div {
            flex: 1;
        }
  }
  .searchItem-date {
    width: 41%;
    b {
      margin: 0 10px;
      font-weight: normal;
    }
  }
}
.menu-title-btn {
  padding: 10px 0;
  box-sizing: border-box;
  button {
    padding: 0 20px;
    height: 28px;
    background: #20a0ff;
    color: #fff;
    outline: none;
    border-width: 0;
    border-radius: 4px;
    font-size: 12px;
    margin-left: 10px;
    &:nth-child(1) {
      margin-left: 0;
    }
    &:nth-child(2) {
      background: #ebf5ff;
      color: #20a0ff;
      border: 1px solid #abd5ff;
    }
  }
  button[disabled] {
    padding: 0 20px;
    height: 28px;
    background: #c1e0ff;
    color: #fafbff;
    outline: none;
    border-width: 0;
    border-radius: 4px;
    font-size: 12px;
  }
}
.menu-list {
  padding: 20px 0;
  box-sizing: border-box;
  button {
    padding: 0 20px;
    height: 28px;
    background: #20a0ff;
    color: #fff;
    outline: none;
    border-width: 0;
    border-radius: 4px;
    font-size: 12px;
    margin-left: 10px;
    &:nth-child(1) {
      margin-left: 0;
    }
  }
  button[disabled] {
    padding: 0 20px;
    height: 28px;
    background: #c1e0ff;
    color: #fafbff;
    outline: none;
    border-width: 0;
    border-radius: 4px;
    font-size: 12px;
  }
}
</style>