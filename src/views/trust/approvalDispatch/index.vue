<template>
    <div class='approval'>
        <el-card class="box-card" style="margin-top: 110px;">
            <div class='title'>
                {{$t('approvalDispatch.title1')}}
            </div>
            <div class='menu-search'> 
                    <div class='menu-title'>
                        <div class='searchItem'>
                        <span>{{$t('approvalDispatch.orderId')}}</span>
                        <el-input v-model='listQuery.orderId' :placeholder="$t('rule.orderId')" size='small'></el-input>
                    </div>
                    <div class='searchItem'>
                        <span>{{$t('approvalDispatch.realName')}}</span>
                        <el-input v-model='listQuery.realName' :placeholder="$t('rule.realName')" size='small'></el-input>
                    </div>
                    <div class='searchItem'>
                        <span>{{$t('approvalDispatch.phoneNo')}}</span>
                        <el-input v-model='listQuery.phoneNo' :placeholder="$t('rule.phoneNo')" size='small'></el-input>
                    </div>
                    <div class='searchItem'>
                        <span>{{$t('approvalDispatch.receiver')}}</span>
                        <el-input v-model='listQuery.checkUser' :placeholder="$t('rule.receiver')" size='small'></el-input>
                    </div>
                </div>
                <div class='menu-title'>
                    <div class='searchItem searchItem-date'>
                        <span>{{$t('approvalDispatch.crtTime')}}</span>
                        <el-date-picker
                        size='small'
                        v-model="listQuery.beginDate"
                        type="date"
                        :placeholder="$t('rule.beginDate')"
                        @change="getSTimeStart">
                        </el-date-picker>
                        <b>{{$t('approval.go')}}</b>
                        <el-date-picker
                        size='small'
                          v-model="listQuery.endDate"
                          type="date"
                          :placeholder="$t('rule.endDate')"
                          @change="getSTimeEnd">
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
                {{$t('approvalDispatch.title2')}}
            </div>
            <div class='menu-list'>
                <el-button type="text" @click="assignedTo">{{$t('approvalDispatch.assignTo')}}</el-button>
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
                prop='orderId'
                :label="$t('approvalDispatch.orderId')"
                width='240'>
                </el-table-column>
                <el-table-column
                prop='realName'
                :label="$t('approvalDispatch.realName')"
                width='240'>
                </el-table-column>
                <el-table-column
                prop='appUserName'
                :label="$t('approvalDispatch.phoneNo')"
                width='240'>
                </el-table-column>
                <el-table-column
                prop='proName'
                :label="$t('approvalDispatch.proName')"
                width='240'>
                </el-table-column>
                <el-table-column
                prop='applyAmt'
                :label="$t('approvalDispatch.applyAmt')"
                width='100'>
                </el-table-column>
                <el-table-column
                prop="crtTime"
                :label="$t('approvalDispatch.crtTime')"
                width='240'>
                </el-table-column>
                <el-table-column
                prop='businessUserName'
                :label="$t('approvalDispatch.receiver')"
                width='240'>
                </el-table-column>
                <el-table-column
                prop='appShortName'
                :label="$t('approvalDispatch.appShortName')"
                width='240'>
                </el-table-column>
                <el-table-column
                prop='checkOpinion'
                :label="$t('approvalDispatch.checkOpinion')"
                width='300'
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="listQuery.page"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
              </el-pagination>
            </div>
        </el-card>
        <el-dialog :title="$t('approvalDispatch.chooseTo')" :visible.sync="dialogFormVisible">
            <div class='handler'>
                <span>{{$t('approvalDispatch.handler')}}</span>
                <el-select v-model='value2' :placeholder="$t('rule.choose')" size='small'>
                    <el-option
                    v-for='item in region'
                    :key='item.id'
                    :label='item.username'
                    :value='item.id'>
                    </el-option>
                </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{$t('btn.cancel')}}</el-button>
                <el-button type="primary" @click="confirmFn">{{$t('btn.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { page, getAllBaseUser, loanDispatch } from 'api/trust/approvalDispatch/index'
export default {
  name: "approvalDispatch",
  data() {
    return {
      listLoading: false,
      total: null,
      listQuery: {
        limit: 5,
        page: 1,
        orgId: "",//业务ID
        realName: "",
        phoneNo: "",
        checkUser: "",//签收人
        beginDate: "",
        endDate: ""
      },
      tableData: [],
      multipleSelection: [],
      value2: "",
      dialogFormVisible: false,
      region: []
    };
  },
  computed: {
    ...mapGetters(["elements", "apprDispPage"])
  },
  created() {
    if (this.apprDispPage.has(this.$route.path)) {
      this.listQuery = this.apprDispPage.get(this.$route.path)
    }
    this.getList();
  },
  methods: {
    //申请时间 开始时间
    getSTimeStart(val) {
      this.listQuery.beginDate = val;//这个sTime是在data中声明的，也就是v-model绑定的值
    },
    //申请时间 结束时间
    getSTimeEnd(val) {
      this.listQuery.endDate = val;
    },
    getList() {
      this.listLoading = true;
      this.$store.dispatch('saveApprDispPage', { path: this.$route.path, listQuery: this.listQuery });
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
    //查询
    search() {
      this.getList();
    },
    //重置
    reset() {
      this.listQuery.orderId = "";
      this.listQuery.realName = "";
      this.listQuery.phoneNo = "";
      this.listQuery.checkUser = "";
      this.listQuery.beginDate = "";
      this.listQuery.endDate = "";
    },
    //选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 指定代理人
    assignedTo() {
      if (this.multipleSelection.length <= 0){
        this.$message({
          showClose: true,
          message: this.$t('approvalDispatch.msg1'),
          type: 'warning'
        });
      } else {
        let obj = {};
        obj.channel = this.multipleSelection[0].channel
        getAllBaseUser(obj)
        .then(response => {
          this.region = response.data.userList;
        })
        this.dialogFormVisible = true
      }
    },
    //指定处理人确认按钮
    confirmFn() {
      if (this.value2 !== '') {
        let obj = {};
        let arrId = [];
        this.multipleSelection.forEach(item => {
          arrId.push(item.orderId)
        })
        obj.orderId = arrId.join();
        obj.baseUserId = this.value2;
        loanDispatch(obj)
        .then(response => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: this.$t('approvalDispatch.opersuccess'),
              type: 'success'
            });
            this.dialogFormVisible = false
            this.value2 = ''
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('rule.pleAssignTo'),
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
.handler {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
    span {
      display: inline-block;
      width: 80px;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
    }
    div:nth-child(2) {
      flex: 1;
    }
}
</style>