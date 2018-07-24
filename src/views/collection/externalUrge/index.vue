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
                    <div class='searchItem searchItem-date'>
                        <span>{{$t('lenders.time')}}</span>
                        <el-date-picker
                        size='small'
                        class="dates"
                        v-model="listQuery.beginDate"
                        type="date"
                        :placeholder="$t('rule.beginDate')"
                        @change="getSTimeStart">
                        </el-date-picker>
                        <b>{{$t('lenders.go')}}</b>
                        <el-date-picker
                        size='small'
                        class="dates"
                          v-model="listQuery.endDate"
                          type="date"
                          :placeholder="$t('rule.endDate')"
                          @change="getSTimeEnd">
                        </el-date-picker>
                    </div>
                </div>
                <div class='menu-title'>
                    <div class='searchItem'>
                        <span>{{$t('processing.taskStatus')}}</span>
                        <el-select v-model='listQuery.taskStatus' size='small'>
                            <el-option
                            v-for='item in taskStatus'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                            </el-option>
                        </el-select>
                    </div>
                    <div class="searchItem-overdue">
                        <span>{{$t('processing.overDay')}}</span>
                        <el-input v-model='listQuery.overDayBegin' size='small'></el-input>
                        <b style="font-weight: normal; margin: 0 10px;font-size: 12px; color: #5f5f61;">{{$t('lenders.go')}}</b>
                        <el-input v-model='listQuery.overDayEnd' size='small'></el-input>
                        <b style="font-weight: normal; margin-left: 10px;font-size: 12px; color: #5f5f61;">{{$t('processing.day')}}</b>
                    </div>
                </div>
                <div class='menu-title-btn'>
                  <button type='button' @click='search'>
                      {{$t('btn.query')}}
                  </button>
                  <button type='button' @click='reset'>
                      {{$t('btn.reset')}}
                  </button>
              </div>
            </div>
        </el-card>
        <el-card class='box-card' style="margin-top: 10px;margin-bottom: 20px;">
            <div class='title'>
                {{$t('processing.taskList')}}
            </div>
            <div class='menu-list'>
                <button type='button' :disabled='isDisable2' @click='approvalFn'>{{$t('processing.coll')}}</button>
                <button type='button' @click='receiveFn'>{{$t('processing.receiveTask')}}</button>
                <button type='button' @click='returnFn'>{{$t('processing.returnTask')}}</button>
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
                :label="$t('processing.proName')"
                width='180'>
                </el-table-column>
                <el-table-column
                prop='approvedAmt'
                :label="$t('processing.appAmt')"
                width='180'>
                </el-table-column>
                <el-table-column
                prop="orderCrtTime"
                :label="$t('processing.orderCrtTime')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop="lastPayDate"
                :label="$t('processing.lastPayDate')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop="overdueDay"
                :label="$t('processing.overdueDay')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='overdueAmt'
                :label="$t('processing.overdueAmt')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='overdueInterest'
                :label="$t('processing.overdueInterest')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='callResult'
                :label="$t('processing.callResult')"
                width='120'>
                <template scope="scope">
                    <span v-if="scope.row.callResult=== '1'">{{$t('processing.normal')}}</span>
                    <span v-if="scope.row.callResult=== '2'">{{$t('processing.fail')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='callFailedReason'
                :label="$t('processing.callFailedReason')"
                width='160'>
                <template scope="scope">
                    <span v-if="scope.row.callFailedReason=== '1'">{{$t('processing.reason1')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '2'">{{$t('processing.reason2')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '3'">{{$t('processing.reason3')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '4'">{{$t('processing.reason4')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '5'">{{$t('processing.reason5')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '6'">{{$t('processing.reason6')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '7'">{{$t('processing.reason7')}}</span>
                    <span v-else-if="scope.row.callFailedReason=== '8'">{{$t('processing.reason8')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='dealResult'
                :label="$t('processing.dealResult')"
                width='120'>
                <template scope="scope">
                    <span v-if="scope.row.dealResult=== '1'">{{$t('processing.result1')}}</span>
                    <span v-else-if="scope.row.dealResult=== '2'">{{$t('processing.result2')}}</span>
                    <span v-else-if="scope.row.dealResult=== '3'">{{$t('processing.result3')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='collectRemark'
                :label="$t('processing.collectRemark')"
                width='200'
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop='status'
                :label="$t('processing.taskStatus')"
                width='120'>
                <template scope="scope">
                    <span v-if="scope.row.status=== 10">{{$t('processing.status1')}}</span>
                    <span v-else-if="scope.row.status === 50">{{$t('processing.status1')}}</span>
                    <span v-else>{{$t('processing.status2')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='appShortName'
                :label="$t('processing.appShortName')"
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
import { page, getTask, returnTask } from 'api/collection/externalUrge/index'
export default {
    data() {
        return {
        listLoading: false,
        listQuery: {
            limit: 20,//每页条数
            page: 1,//当前页数
            orderId: "",//订单号
            realName: "",//姓名
            phoneNo: "",//手机
            beginDate: "",//申请时间
            endDate: "",
            taskStatus: 1,
            overDayBegin: "",//逾期天数
            overDayEnd: ""
        },
        total: null,
        tableData: [],
        multipleSelection: [],
        isDisable2: true,
        lanStatus: null,
        taskStatus: [
            {
                value: '',
                label: this.$t('rule.choose')
            },
            {
                value: 1,
                label: this.$t('processing.status1')
            },
            {
                value: 2,
                label: this.$t('processing.status2')
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
    },
    computed: {
        ...mapGetters(["elements", "language", "extPage"])
    },
    methods: {
        //开始时间
        getSTimeStart(val) {
        this.listQuery.beginDate = val;//这个sTime是在data中声明的，也就是v-model绑定的值
        },
        //结束时间
        getSTimeEnd(val) {
        this.listQuery.endDate = val;
        },
        getList() {
            this.listLoading = true;
            this.$store.dispatch('saveExtPage', { path: this.$route.path, listQuery: this.listQuery });
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
                    let str3= String(item.overdueInterest)
                    item.overdueInterest =  str3.replace(re, '.');
                })
                if (response.status === 200) {
                    this.listLoading = false;
                    this.tableData = response.data.rows;
                    this.total = Number(response.data.total);
                }
            })
        },
        //查询
        search() {
            if (this.extPage.has(this.$route.path)) {
                this.listQuery = this.extPage.get(this.$route.path)
            }
            this.getList();
        },
        //重置
        reset() {
        this.listQuery.orderId = "";
        this.listQuery.realName = "";
        this.listQuery.phoneNo = "";
        this.listQuery.beginDate = "";
        this.listQuery.endDate = "";
        this.listQuery.taskStatus = "";
        this.listQuery.overDayBegin = "";
        this.listQuery.overDayEnd = "";
        },
        //选中的数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length !== 0) {
                this.isDisable2 = false;//不禁用
            }
        },
        //催收
        approvalFn() {
            if(this.multipleSelection.length === 1) { 
                this.$store.dispatch('setExtDetail', this.multipleSelection[0])
                this.$router.push({
                    path: '/collection/extDetail', 
                    name: '外催详情'
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
        //领取任务
        receiveFn() {
            getTask()
            .then(response => {
                if(response.status === 200) {
                    this.$message({
                        showClose: true,
                        message: this.$t('approval.success'),
                        type: 'success'
                    });
                    this.getList()
                    if (this.tableData.length > 0) {
                        this.isDisable2 = false;
                    }
                }
            })
        },
        //任务退回
        returnFn() {
            if(this.multipleSelection.length > 0) { 
                let arr = [];
                this.multipleSelection.forEach(item => {
                    arr.push(Number(item.id))
                })
                returnTask(arr)
                .then(response => {
                    if(response.status === 200) {
                        this.$message({
                            showClose: true,
                            message: this.$t('processing.returnsuc'),
                            type: 'success'
                        });
                        this.getList()
                    }
                })
            } else {
                this.$message({
                    showClose: true,
                    message: this.$t('lenders.msg1'),
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
      font-size: 12px; 
      color: #5f5f61;
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