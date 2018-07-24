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
                        <el-input v-model='listQuery.userName' :placeholder="$t('rule.phoneNo')" size='small'></el-input>
                    </div>
                    <div class='searchItem searchItem-date'>
                        <span>{{$t('lenders.time')}}</span>
                        <el-date-picker
                        size='small'
                        class="dates"
                        v-model="listQuery.startDate"
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
                      <span>{{$t('reduAudit.type')}}</span>
                      <el-select v-model='listQuery.breakType' size='small'>
                          <el-option
                          v-for='item in types'
                          :key='item.value'
                          :label='item.label'
                          :value='item.value'>
                          </el-option>
                      </el-select>
                  </div>
                  <div class='searchItem'>
                      <span>{{$t('reduAudit.status')}}</span>
                      <el-select v-model='listQuery.breakStatus' size='small'>
                          <el-option
                          v-for='item in status'
                          :key='item.value'
                          :label='item.label'
                          :value='item.value'>
                          </el-option>
                      </el-select>
                  </div>
                    <div class="searchItem-overdue">
                        <span>{{$t('reduAudit.overDay')}}</span>
                        <el-input v-model='listQuery.startDays' size='small'></el-input>
                        <b style="font-weight: normal; margin: 0 10px;font-size: 12px; color: #5f5f61;">{{$t('lenders.go')}}</b>
                        <el-input v-model='listQuery.endDays' size='small'></el-input>
                        <b style="font-weight: normal; margin-left: 10px;font-size: 12px; color: #5f5f61;">{{$t('reduAudit.day')}}</b>
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
                {{$t('reduAudit.taskList')}}
            </div>
            <div class='menu-list'>
                <button type='button' :disabled='isDisable2' @click='approvalFn'>{{$t('reduAudit.audit')}}</button>
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
                prop='userName'
                :label="$t('lenders.phoneNo')"
                width='180'>
                </el-table-column>
                <el-table-column
                prop='approvedAmt'
                :label="$t('reduAudit.appAmt')"
                width='180'>
                </el-table-column>
                <el-table-column
                prop="crtTime"
                :label="$t('reduAudit.orderCrtTime')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop="lastPayDate"
                :label="$t('reduAudit.lastPayDate')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop="overdueDay"
                :label="$t('reduAudit.overdueDay')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='overdueAmt'
                :label="$t('reduAudit.overdueAmt')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='overdueInterest'
                :label="$t('reduAudit.overdueInterest')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='breakAmt'
                :label="$t('reduAudit.breakAmt')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='breakRepayAmt'
                :label="$t('reduAudit.breakRepayAmt')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='breakType'
                :label="$t('reduAudit.type')"
                width='200'>
                <template scope="scope">
                    <span v-if="scope.row.breakType=== '1'">{{$t('reduAudit.breakType1')}}</span>
                    <span v-else-if="scope.row.breakType=== '2'">{{$t('reduAudit.breakType2')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='breakStatus'
                :label="$t('reduAudit.status')"
                width='200'>
                <template scope="scope">
                    <span v-if="scope.row.breakStatus=== '10'">{{$t('reduAudit.breakStatus1')}}</span>
                    <span v-else-if="scope.row.breakStatus=== '20'">{{$t('reduAudit.breakStatus2')}}</span>
                    <span v-else-if="scope.row.breakStatus=== '30'">{{$t('reduAudit.breakStatus3')}}</span>
                </template>
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
import { page } from 'api/reduction/reduAudit/index'
export default {
  data() {
    return {
      isDisable2: true,
      listLoading: false,
      listQuery: {
          limit: 10,//每页条数
          page: 1,//当前页数
          orderId: "",//订单号
          realName: "",//姓名
          userName: "",//手机
          startDate: "",//申请时间
          endDate: "",
          startDays: "",//逾期天数
          endDays: "",
          breakType: "",//减免类型
          breakStatus: 10//审核状态
      },
      total: null,
      tableData: [],
      multipleSelection: [],
      lanStatus: null,
      types: [
        {
          value: '',
          label: this.$t('rule.choose')
        },
        {
          value: 1,
          label: this.$t('reduAudit.breakType1')
        },
        {
          value: 2,
          label: this.$t('reduAudit.breakType2')
        }
      ],
      status: [
        {
          value: '',
          label: this.$t('rule.choose')
        },
        {
          value: 10,
          label: this.$t('reduAudit.status1')
        },
        {
          value: 20,
          label: this.$t('reduAudit.status2')
        },
        {
          value: 30,
          label: this.$t('reduAudit.status3')
        }
      ],
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
    ...mapGetters(["elements", "language", "auditPage"])
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
      this.$store.dispatch('saveAuditPage', { path: this.$route.path, listQuery: this.listQuery });
      page(this.listQuery)
        .then(response => {
            response.data.rows.forEach(item => {
              item.lastPayDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.lastPayDate)

              let re = /(?=(?!\b)(\d{3})+$)/g;
              let str = String(item.approvedAmt)
              item.approvedAmt =  str.replace(re, '.');

              let str2 = String(item.overdueAmt)
              item.overdueAmt =  str2.replace(re, '.');

              let str3 = String(item.breakAmt)
              item.breakAmt =  str3.replace(re, '.');

              let str4 = String(item.breakRepayAmt)
              item.breakRepayAmt =  str4.replace(re, '.');

              let str5= String(item.overdueInterest)
              item.overdueInterest =  str5.replace(re, '.');
            })
            if (response.status === 200) {
              this.listLoading = false;
              this.tableData = response.data.rows;
              this.total = Number(response.data.total);
            }
        })
      if (this.tableData.length > 0) {
        this.isDisable2 = false;
      } else {
        this.isDisable2 = true;
      }
    },
    //查询
    search() {
      if (this.auditPage.has(this.$route.path)) {
        this.listQuery = this.auditPage.get(this.$route.path)
      }
      this.getList();
    },
    //重置
    reset() {
      this.listQuery.orderId = "";
      this.listQuery.realName = "";
      this.listQuery.userName = "";
      this.listQuery.startDate = "";
      this.listQuery.endDate = "";
      this.listQuery.breakType = "";
      this.listQuery.breakStatus = "";
      this.listQuery.startDays = "";
      this.listQuery.endDays = "";
    },
    //选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length !== 0) {
        this.isDisable2 = false;
      }
    },
    //审核
    approvalFn() {
      if(this.multipleSelection.length === 1) { 
        this.$store.dispatch('setAuditDetail', this.multipleSelection[0])
        this.$router.push({
          path: '/reduction/auditDetail', 
          name: '减免审核详情'
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
    }
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