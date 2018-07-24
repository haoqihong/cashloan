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
                    <div class='searchItem' style="width: 25%">
                        <span>{{$t('lenders.orgname')}}</span>
                        <el-select v-model='listQuery.orgId' filterable :placeholder="$t('rule.choose')" size='small'>
                            <el-option
                            v-for='item in mechanism'
                            :key='item.id'
                            :label='item.orgName'
                            :value='item.id'>
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class='menu-title'>
                  <div class='searchItem'>
                      <span>{{$t('lenders.loanstatus')}}</span>
                      <el-select v-model='listQuery.loanStatus' size='small'>
                          <el-option
                          v-for='item in status'
                          :key='item.value'
                          :label='item.label'
                          :value='item.value'>
                          </el-option>
                      </el-select>
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
                      <b>{{$t('approval.go')}}</b>
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
                    <span>{{$t('lenders.continuedLoan')}}</span>
                    <el-select v-model='listQuery.continuedLoanStatus' size='small'>
                        <el-option
                        v-for='item in conLoan'
                        :key='item.value'
                        :label='item.label'
                        :value='item.value'>
                        </el-option>
                    </el-select>
                  </div>
                  <div class='searchItem searchItem-date'>
                      <span>{{$t('lenders.loanTime')}}</span>
                      <el-date-picker
                      size='small'
                      class="dates"
                      v-model="listQuery.lendBeginDate"
                      type="date"
                      :placeholder="$t('rule.beginDate')"
                      @change="getSTimeStart2">
                      </el-date-picker>
                      <b>{{$t('approval.go')}}</b>
                      <el-date-picker
                      size='small'
                      class="dates"
                        v-model="listQuery.lendEndDate"
                        type="date"
                        :placeholder="$t('rule.endDate')"
                        @change="getSTimeEnd2">
                      </el-date-picker>
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
                {{$t('lenders.title2')}}
            </div>
            <div class='menu-list'>
                <button type='button' :disabled='isDisable2' @click='approvalFn'>{{$t('lenders.loan')}}</button>
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
                width='180'>
                </el-table-column>
                <el-table-column
                prop='appUserName'
                :label="$t('lenders.phoneNo')"
                width='180'>
                </el-table-column>
                <el-table-column
                prop='bankCard'
                :label="$t('lenders.bankCard')"
                width='260'>
                </el-table-column>
                <el-table-column
                prop='bankCode'
                :label="$t('lenders.bankCode')"
                width='180'>
                </el-table-column>
                <el-table-column
                prop="proName"
                :label="$t('lenders.proName')"
                width='150'>
                </el-table-column>
                <el-table-column
                prop="applyAmt"
                :label="$t('lenders.applyAmt')"
                width='100'>
                </el-table-column>
                <el-table-column
                prop="approvedAmt"
                :label="$t('lenders.approvedAmt')"
                width='100'>
                </el-table-column>
                <el-table-column
                prop="crtTime"
                :label="$t('lenders.time')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='checkDate'
                :label="$t('lenders.checkDate')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='lendDate'
                :label="$t('lenders.loanTime')"
                width='200'>
                </el-table-column>
                <el-table-column
                prop='appShortName'
                :label="$t('lenders.channel')"
                width='160'>
                </el-table-column>
                <el-table-column
                prop='checkStatus'
                :label="$t('lenders.status')"
                width='130'>
                <template scope="scope">
                    <span v-if="scope.row.checkStatus=== 50">{{$t('lenders.noloan')}}</span>
                    <span v-else-if="scope.row.checkStatus=== 100">{{$t('lenders.yesloan')}}</span>
                    <span v-else>{{$t('lenders.inLoan')}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop='orgName'
                :label="$t('lenders.orgname')"
                width='260'>
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
import { page, getListOrg } from 'api/loan/lenders/index'
export default {
  name: "lenders",
  data() {
    return {
      listLoading: false,
      listQuery: {
        limit: 20,//每页条数
        page: 1,//当前页数
        orderId: "",//订单号
        realName: "",//姓名
        phoneNo: "",//手机
        orgId: 0,//机构key
        loanStatus: 1,//放款	 默认传1   1.未放款2.已放款
        beginDate: "",//申请时间
        endDate: "",
        msgType: "",
        lendBeginDate: "",//放款时间
        lendEndDate: "",
        continuedLoanStatus: ""
      },
      total: null,
      tableData: [],
      multipleSelection: [],
      mechanism: [{ id: 0, orgName: this.$t('rule.choose') }],
      status: [
        {
          value: 0,
          label: this.$t('rule.all')
        },
        {
          value: 1,
          label: this.$t('lenders.noloan')
        },
        {
          value: 2,
          label: this.$t('lenders.yesloan')
        }
      ],
      conLoan: [
        {
          value: '',
          label: this.$t('rule.all')
        },
        {
          value: 1,
          label: this.$t('approvalDetail.yes')
        }
      ],
      isDisable2: true,
      lanStatus: null
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
    let obj = {};
    getListOrg(obj) 
    .then(response => {
      this.mechanism = this.mechanism.concat(response.data.orgList);
    })
  },
  computed: {
    ...mapGetters(["elements", "language", "lendersPage"])
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
    //放款开始时间
    getSTimeStart2(val) {
      this.listQuery.lendBeginDate = val;//这个sTime是在data中声明的，也就是v-model绑定的值
    },
    //放款结束时间
    getSTimeEnd2(val) {
      this.listQuery.lendEndDate = val;
    },
    getList() {
      this.listLoading = true;
      this.$store.dispatch('saveLendersPage', { path: this.$route.path, listQuery: this.listQuery });
      if (this.tableData.length > 0) {
        this.isDisable2 = false;
      } else {
        this.isDisable2 = true;
      }
      this.listQuery.msgType = this.lanStatus;
      page(this.listQuery)
        .then(response => {
          response.data.rows.forEach(item => {
            let re = /(?=(?!\b)(\d{3})+$)/g;
            let str = String(item.applyAmt)
            item.applyAmt =  str.replace(re, '.');
            let str2 = String(item.approvedAmt)
            item.approvedAmt = str2.replace(re, '.');
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
      if (this.lendersPage.has(this.$route.path)) {
        this.listQuery = this.lendersPage.get(this.$route.path)
      }
      this.getList();
    },
    //重置
    reset() {
      this.listQuery.orderId = "";
      this.listQuery.realName = "";
      this.listQuery.phoneNo = "";
      this.listQuery.orgId = 0;
      this.listQuery.loanStatus = 1;
      this.listQuery.beginDate = "";
      this.listQuery.endDate = "";
      this.listQuery.lendBeginDate = "";
      this.listQuery.lendEndDate = "";
      this.listQuery.continuedLoanStatus = "";
    },
    //选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length !== 0) {
        if (this.multipleSelection[0].checkStatus === 50) {
          this.isDisable2 = false;//不禁用
        } else {
          this.isDisable2 = true;//禁用
        }
      }
    },
    //放款
    approvalFn() {
      if(this.multipleSelection.length == 1) { 
        this.$store.dispatch('setLoanDetail', this.multipleSelection[0])
        this.$router.push({
          path: '/loan/loanDetail', 
          name: '放款详情'
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