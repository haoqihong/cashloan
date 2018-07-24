<template>
    <div class='approval'>
      <el-card class="box-card" style="margin-top: 110px;">
          <div class='title'>
              {{$t('approval.title1')}}
          </div>
          <div class='menu-search'> 
              <div class='menu-title'>
                  <div class='searchItem'>
                      <span>{{$t('approval.orderId')}}</span>
                      <el-input v-model='listQuery.orderId' :placeholder="$t('rule.orderId')" size='small'></el-input>
                  </div>
                  <div class='searchItem'>
                      <span>{{$t('approval.realName')}}</span>
                      <el-input v-model='listQuery.realName' :placeholder="$t('rule.realName')" size='small'></el-input>
                  </div>
                  <div class='searchItem'>
                      <span>{{$t('approval.phoneNo')}}</span>
                      <el-input v-model='listQuery.phoneNo' :placeholder="$t('rule.phoneNo')" size='small'></el-input>
                  </div>
                  <div class='searchItem'>
                      <span>{{$t('approval.result')}}</span>
                      <el-select v-model='listQuery.approvalResult' size='small'>
                          <el-option
                          v-for='item in result'
                          :key='item.value'
                          :label='item.label'
                          :value='item.value'>
                          </el-option>
                      </el-select>
                  </div>
              </div>
              <div class='menu-title'>
                  <div class='searchItem searchItem-date'>
                      <span>{{$t('approval.time')}}</span>
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
                  <div class='searchItem searchItem-date'>
                      <span>{{$t('achievements.checkDate')}}</span>
                      <el-date-picker
                      size='small'
                      class="dates"
                      v-model="listQuery.checkBeginDate"
                      type="date"
                      :placeholder="$t('rule.beginDate')"
                      @change="getSTimeStart2">
                      </el-date-picker>
                      <b>{{$t('approval.go')}}</b>
                      <el-date-picker
                      size='small'
                      class="dates"
                      v-model="listQuery.checkEndDate"
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
              {{$t('approval.title2')}}
          </div>
          <div class='menu-list'>
              <button type='button' @click='approvalFn' :disabled='isDisable2'>{{$t('approval.appr')}}</button>
          </div>
          <el-table
            v-loading="listLoading"
            ref='multipleTable'
            :data='tableData'
            tooltip-effect='dark'
            style='width: 100%'
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
            sortable
            prop='orderId'
            :label="$t('approval.orderId')"
            width='240'>
            </el-table-column>
            <el-table-column
            prop='realName'
            :label="$t('approval.realName')"
            width='200'>
            </el-table-column>
            <el-table-column
            prop='appUserName'
            :label="$t('approval.phoneNo')"
            width="180">
            </el-table-column>
            <el-table-column
            prop='proName'
            :label="$t('approval.proName')"
            width='100'>
            </el-table-column>
            <el-table-column
            prop='applyAmt'
            :label="$t('approval.applyAmt')"
            width='100'>
            </el-table-column>
            <el-table-column
            prop='crtTime'
            :label="$t('approval.time')"
            width="200">
            </el-table-column>
            <el-table-column
            prop='checkDate'
            :label="$t('achievements.checkDate')"
            width="200">
            </el-table-column>
            <el-table-column
            prop='appShortName'
            :label="$t('approval.channel')"
            width='130'>
            </el-table-column>
            <el-table-column
            prop='status'
            :label="$t('approval.result')"
            width='130'>
            <template scope="scope">
                <span v-if="scope.row.status=== 1">{{$t('approval.audit')}}</span>
                <span v-if="scope.row.status=== 2">{{$t('approval.credit')}}</span>
                <span v-if="scope.row.status=== 3">{{$t('approval.repayments')}}</span>
                <span v-if="scope.row.status=== 4">{{$t('approval.refused')}}</span>
                <span v-if="scope.row.status=== 5">{{$t('approval.clear')}}</span>
            </template>
            </el-table-column>
            <el-table-column
            prop='checkOpinion'
            :label="$t('approval.checkOpinion')"
            width='300'
            show-overflow-tooltip
            >
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
import { page } from 'api/trust/confirmation/index'
export default {
  name: "confirmation",
  data() {
    return {
      listLoading: false,
      listQuery: {
          page: 1,
          limit: 10,
          orderId: "",
          realName: "",
          phoneNo: "",
          approvalResult: 4,
          delStatus: "",
          beginDate: "",
          endDate: "",
          checkBeginDate: "",
          checkEndDate: ""
      },
      total: null,
      tableData: [],
      multipleSelection: [],
      result: [
        {
          value: 0,
          label: this.$t('rule.all')
        },
        {
          value: 1,
          label: this.$t('approval.adopt')
        },
        {
          value: 2,
          label: this.$t('approval.refuse')
        },
        {
          value: 3,
          label: this.$t('approval.derate')
        },
        {
          value: 4,
          label: this.$t('approval.audit')
        }
      ],
      isDisable2: true
    };
  },
  computed: {
    ...mapGetters(["elements", "confirmPage"])
  },
  created() {
    if (this.confirmPage.has(this.$route.path)) {
      this.listQuery = this.confirmPage.get(this.$route.path)
    }
    this.getList();
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
    //审批开始时间
    getSTimeStart2(val) {
      this.listQuery.checkBeginDate = val;//这个sTime是在data中声明的，也就是v-model绑定的值
    },
    //审批结束时间
    getSTimeEnd2(val) {
      this.listQuery.checkEndDate = val;
    },
    //查询
    search() {
      this.getList();
    },
    //重置
    reset() {
      this.listQuery.orderId = "";
      this.listQuery.realName = "";
      this.listQuery.phoneNo = "";
      this.listQuery.approvalResult = 4;
      this.listQuery.beginDate = "";
      this.listQuery.endDate = "";
      this.listQuery.checkBeginDate = "";
      this.listQuery.checkEndDate = "";
    },
    getList() {
      this.listLoading = true;
      this.$store.dispatch('saveConfirmPage', { path: this.$route.path, listQuery: this.listQuery });
      if (this.tableData.length > 0) {
        this.isDisable2 = false;
      } else {
        this.isDisable2 = true;
      }
      page(this.listQuery)
        .then(response => {
          response.data.rows.forEach(item => {
            let re = /(?=(?!\b)(\d{3})+$)/g;
            let str = String(item.applyAmt)
            item.applyAmt =  str.replace(re, '.');
          })
          if (response.status === 200) {
            this.listLoading = false;
            this.tableData = response.data.rows;
            this.total = Number(response.data.total);
          }
        })
    },
    //选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length !== 0) {
        if (this.multipleSelection[0].checkStatus > 45 || this.multipleSelection[0].status === 4) {
          this.isDisable2 = true;
        } else {
          this.isDisable2 = false;
        }
      }
    },
    //审批
    approvalFn() {
      if(this.multipleSelection.length == 1) {  
        this.$store.dispatch('setApprDetailEnd', this.multipleSelection[0])
        this.$router.push({
          path: '/trust/endApprDetail', 
          name: '终审详情'
        })               
      } else if(this.multipleSelection.length <= 0){
          this.$message({
              showClose: true,
              message: this.$t('approval.msg1'),
              type: 'warning'
          });
      } else {
          this.$message({
              showClose: true,
              message: this.$t('approval.msg2'),
              type: 'warning'
          });
      }
    },
    handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
    },
    handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
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