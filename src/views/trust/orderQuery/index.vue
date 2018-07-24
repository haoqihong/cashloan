<template>
    <div class='approval'>
      <el-card class="box-card" style="margin-top: 110px;">
        <div class='title'>
          {{$t('achievements.title1')}}
        </div>
        <div class='menu-search'> 
            <div class='menu-title'>
                <div class='searchItem'>
                    <span>{{$t('achievements.orderId')}}</span>
                    <el-input v-model='listQuery.orderId' :placeholder="$t('rule.orderId')" size='small'></el-input>
                </div>
                <div class='searchItem'>
                    <span>{{$t('achievements.realName')}}</span>
                    <el-input v-model='listQuery.realName' :placeholder="$t('rule.realName')" size='small'></el-input>
                </div>
                <div class='searchItem'>
                    <span>{{$t('achievements.phoneNo')}}</span>
                    <el-input v-model='listQuery.phoneNo' :placeholder="$t('rule.phoneNo')" size='small'></el-input>
                </div>
                <div class='searchItem searchItem-date'>
                    <span>{{$t('achievements.crtTime')}}</span>
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
            <div class='menu-title'>
                <div class='searchItem'>
                    <span>{{$t('achievements.orgName')}}</span>
                    <el-select v-model='listQuery.orgId' filterable :placeholder="$t('rule.choose')" size='small'>
                        <el-option
                        v-for='item in mechanism'
                        :key='item.id'
                        :label='item.orgName'
                        :value='item.id'>
                        </el-option>
                    </el-select>
                </div>
                <div class='searchItem'>
                    <span>{{$t('achievements.result')}}</span>
                    <el-select v-model='listQuery.approvalResult' size='small'>
                          <el-option
                          v-for='item in result'
                          :key='item.value'
                          :label='item.label'
                          :value='item.value'>
                          </el-option>
                      </el-select>
                </div>
                <div class='searchItem'>
                    <span>{{$t('orderQuery.orderStatus')}}</span>
                    <el-select v-model='listQuery.checkStatus' size='small'>
                          <el-option
                          v-for='item in orderStatus'
                          :key='item.value'
                          :label='item.label'
                          :value='item.value'>
                          </el-option>
                      </el-select>
                </div>
                <div class='searchItem searchItem-date'>
                    <span>{{$t('orderQuery.loanTime')}}</span>
                    <el-date-picker
                    size='small'
                    v-model="listQuery.lendBeginDate"
                    type="date"
                    :placeholder="$t('rule.beginDate')"
                    @change="getSTimeStart2">
                    </el-date-picker>
                    <b>{{$t('approval.go')}}</b>
                    <el-date-picker
                    size='small'
                      v-model="listQuery.lendEndDate"
                      type="date"
                      :placeholder="$t('rule.endDate')"
                      @change="getSTimeEnd2">
                    </el-date-picker>
                </div>
            </div>
            <div class='menu-title'>
                <div class='searchItem'>
                    <span>{{$t('achievements.loanUser')}}</span>
                    <el-input v-model='listQuery.loanUser' :placeholder="$t('rule.loanUser')" size='small'></el-input>
                </div>
                <div class='searchItem searchItem-date'>
                    <span>{{$t('orderQuery.lastPayDate')}}</span>
                    <el-date-picker
                    size='small'
                    v-model="listQuery.repaymengtBeginDate"
                    type="date"
                    :placeholder="$t('rule.beginDate')"
                    @change="getSTimeStart3">
                    </el-date-picker>
                    <b>{{$t('approval.go')}}</b>
                    <el-date-picker
                    size='small'
                      v-model="listQuery.repaymengtEndDate"
                      type="date"
                      :placeholder="$t('rule.endDate')"
                      @change="getSTimeEnd3">
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
                <button type='button' @click="handleDownload" :loading="downloadLoading" :disabled="expDis">
                    {{$t('btn.export')}}
                </button>
            </div>
        </div>
      </el-card>
        <el-card class='box-card' style="margin-top: 10px;margin-bottom: 20px;">
          <div class='title'>
              {{$t('achievements.title2')}}
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
              :label="$t('achievements.orderId')"
              width='240'>
              <template scope="scope">
                  <span>{{scope.row.orderId}}</span>
              </template>
              </el-table-column>
              <el-table-column
              prop='realName'
              :label="$t('achievements.realName')"
              width='300'>
              </el-table-column>
              <el-table-column
              prop='appUserName'
              :label="$t('achievements.phoneNo')"
              width='240'>
              </el-table-column>
              <el-table-column
              prop='proName'
              :label="$t('achievements.proName')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop="crtTime"
              :label="$t('achievements.crtTime')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop="lendDate"
              :label="$t('orderQuery.loanTime')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop='applyAmt'
              :label="$t('orderQuery.apprAmt')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop='neteceipts'
              :label="$t('orderQuery.neteceipts')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop='status'
              :label="$t('orderQuery.orderStatus')"
              width='100'>
              <template scope="scope">
                <span v-if="scope.row.status=== 1">{{$t('orderQuery.status1')}}</span>
                <span v-if="scope.row.status=== 2">{{$t('orderQuery.status2')}}</span>
                <span v-if="scope.row.status=== 3">{{$t('orderQuery.status3')}}</span>
                <span v-if="scope.row.status=== 4">{{$t('orderQuery.status4')}}</span>
                <span v-if="scope.row.status=== 5">{{$t('orderQuery.status5')}}</span>
                <span v-if="scope.row.status=== 6">{{$t('orderQuery.status6')}}</span>
                <span v-if="scope.row.status=== 7">{{$t('orderQuery.status7')}}</span>
                <span v-if="scope.row.status=== 8">{{$t('orderQuery.status8')}}</span>
                <span v-if="scope.row.status=== 9">{{$t('orderQuery.status9')}}</span>
                <span v-if="scope.row.status=== 10">{{$t('orderQuery.status10')}}</span>
            </template>
              </el-table-column>
              <el-table-column
              prop='lastPayDate'
              :label="$t('orderQuery.lastPayDate')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop="orgName"
              :label="$t('achievements.orgName')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop='appShortName'
              :label="$t('achievements.appShortName')"
              width='110'>
              </el-table-column>
              <el-table-column
              prop='checkUserStatus'
              :label="$t('achievements.apprResult')"
              width='110'>
              <template scope="scope">
                <span v-if="scope.row.checkUserStatus=== 0">{{$t('orderQuery.status1')}}</span>
                <span v-if="scope.row.checkUserStatus=== 1">{{$t('orderQuery.adopt')}}</span>
                <span v-if="scope.row.checkUserStatus=== 2">{{$t('orderQuery.refuse')}}</span>
                <span v-if="scope.row.checkUserStatus=== 3">{{$t('orderQuery.derate')}}</span>
            </template>
              </el-table-column>
              <el-table-column
              prop='checkOpinion'
              :label="$t('achievements.checkOpinion')"
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
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { page } from 'api/trust/orderQuery/index'
import { getListOrg } from 'api/trust/achievements/index'
export default {
  name: "achievements",
  data() {
    return {
      expDis: true,
      listLoading: false,
      downloadLoading: false,
      total: null,
      listQuery: {
        limit: 5,
        page: 1,
        orgId: '', // 机构ID
        orderId: '', // 业务ID
        realName: '',
        phoneNo: '',
        approvalResult: 0, // 全部0 通过1拒绝2降额3
        checkStatus: '', // 订单状态
        beginDate: '', // 申请时间
        endDate: '',
        loanUser: '',
        lendBeginDate: '', // 审批时间
        lendEndDate: '',
        repaymengtBeginDate: '', // 到期时间
        repaymengtEndDate: ''
      },
      tableData: [],
      multipleSelection: [],
      mechanism: [
        {
          id: 0,
          orgName: this.$t('rule.choose')
      }],
      result: [
        {
          value: 0,
          label: this.$t('rule.all')
        },
        {
          value: 2,
          label: this.$t('approval.adopt')
        },
        {
          value: 3,
          label: this.$t('approval.refuse')
        },
        {
          value: 4,
          label: this.$t('approval.derate')
        },
        {
          value: 1,
          label: this.$t('approval.audit')
        }
      ],
      orderStatus: [
        {
          value: 0,
          label: this.$t('rule.choose')
        },
        {
          value: 1,
          label: this.$t('orderQuery.status1')
        },
        {
          value: 2,
          label: this.$t('orderQuery.adopt')
        },
        {
          value: 3,
          label: this.$t('orderQuery.refuse')
        },
        {
          value: 4,
          label: this.$t('orderQuery.status3')
        },
        {
          value: 5,
          label: this.$t('orderQuery.status5')
        },
        {
          value: 6,
          label: this.$t('orderQuery.status6')
        },
        {
          value: 7,
          label: this.$t('orderQuery.status7')
        },
        {
          value: 8,
          label: this.$t('orderQuery.status8')
        },
        {
          value: 9,
          label: this.$t('orderQuery.status9')
        },
        {
          value: 10,
          label: this.$t('orderQuery.status10')
        }
      ]
    };
  },
  created() {
    let obj = {};
    getListOrg(obj) 
    .then(response => {
      this.mechanism = this.mechanism.concat(response.data.orgList);
    })
    if (this.orderPage.has(this.$route.path)) {
      this.listQuery = this.orderPage.get(this.$route.path)
    }
    this.getList();
  },
  computed: {
    ...mapGetters(["elements", "orderPage"])
  },
  methods: {
    //点击导出
    handleDownload() {
      this.downloadLoading = true;
      this.listQuery.limit = this.total;
      this.$store.dispatch('saveOrderPage', { path: this.$route.path, listQuery: this.listQuery });
      page(this.listQuery)
      .then(response => {
        response.data.rows.forEach(item => {
          let re = /(?=(?!\b)(\d{3})+$)/g;
          let str = String(item.applyAmt)
          item.applyAmt =  str.replace(re, '.');
          let str2 = String(item.neteceipts)
          item.neteceipts = str2.replace(re, '.');
          //审批结果
          switch (item.checkUserStatus) {
            case 0:
              item.checkUserStatus = this.$t('orderQuery.status1')
              break;
            case 1:
              item.checkUserStatus = this.$t('orderQuery.adopt')
              break;
            case 2:
              item.checkUserStatus = this.$t('orderQuery.refuse')
              break;
            case 3:
              item.checkUserStatus = this.$t('orderQuery.derate')
              break;
          }
          //订单状态
          switch (item.status) {
            case 1:
              item.status = this.$t('orderQuery.status1')
              break;
            case 2:
              item.status = this.$t('orderQuery.status2')
              break;
            case 3:
              item.status = this.$t('orderQuery.status3')
              break;
            case 4:
              item.status = this.$t('orderQuery.status4')
              break;
            case 5:
              item.status = this.$t('orderQuery.status5')
              break;
            case 6:
              item.status = this.$t('orderQuery.status6')
              break;
            case 7:
              item.status = this.$t('orderQuery.status7')
              break;
            case 8:
              item.status = this.$t('orderQuery.status8')
              break;
            case 9:
              item.status = this.$t('orderQuery.status9')
              break;
            case 10:
              item.status = this.$t('orderQuery.status10')
              break;
          }
        })
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = [ this.$t('achievements.orderId'), this.$t('achievements.realName'), this.$t('achievements.phoneNo'), this.$t('achievements.proName'), this.$t('achievements.crtTime'), this.$t('orderQuery.loanTime'), this.$t('orderQuery.apprAmt'), this.$t('orderQuery.neteceipts'), this.$t('orderQuery.orderStatus'), this.$t('orderQuery.lastPayDate'), this.$t('achievements.orgName'), this.$t('achievements.appShortName'), this.$t('achievements.apprResult'), this.$t('achievements.checkOpinion')];
          const filterVal = [ 'orderId', 'realName', 'appUserName', 'proName', 'crtTime', 'lendDate', 'applyAmt', 'neteceipts', 'status', 'lastPayDate', 'orgName', 'appShortName', 'checkUserStatus', 'checkOpinion' ];
          const list = response.data.rows;
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, this.$t('route.orderQuery'))
          this.downloadLoading = false;
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    //申请时间 开始时间
    getSTimeStart(val) {
      this.listQuery.beginDate = val;
    },
    //申请时间 结束时间
    getSTimeEnd(val) {
      this.listQuery.endDate = val;
    },
    //审批时间 开始时间
    getSTimeStart2(val) {
      this.listQuery.lendBeginDate = val;
    },
    //审批时间 结束时间
    getSTimeEnd2(val) {
      this.listQuery.lendEndDate = val;
    },
    //到期时间
    getSTimeStart3(val) {
      this.listQuery.repaymengtBeginDate = val;
    },
    //到期时间
    getSTimeEnd3(val) {
      this.listQuery.repaymengtEndDate = val;
    },
    getList() {
      this.listLoading = true;
      this.$store.dispatch('saveOrderPage', { path: this.$route.path, listQuery: this.listQuery });
      page(this.listQuery)
        .then(response => {
          response.data.rows.forEach(item => {
            let re = /(?=(?!\b)(\d{3})+$)/g;
            let str = String(item.applyAmt)
            item.applyAmt =  str.replace(re, '.');
            let str2 = String(item.neteceipts)
            item.neteceipts = str2.replace(re, '.');
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
      this.getList();
    },
    //重置
    reset() {
      this.listQuery.orgId = "";
      this.listQuery.orderId = "";
      this.listQuery.realName = "";
      this.listQuery.phoneNo = "";
      this.listQuery.approvalResult = 0;
      this.listQuery.checkStatus = "";
      this.listQuery.beginDate = "";
      this.listQuery.endDate = "";
      this.listQuery.loanUser = "";
      this.listQuery.lendBeginDate = "";
      this.listQuery.lendEndDate = "";
      this.listQuery.repaymengtBeginDate = "";
      this.listQuery.repaymengtEndDate = "";
    },
    //选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
.href {
  border-bottom: 1px solid #000;
  cursor: pointer; 
  &:hover {
    color: #20a0ff;
    border-bottom: 1px solid #20a0ff;
  }
}
</style>