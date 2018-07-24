<template>
    <div class='approval'>
      <el-card class="box-card" style="margin-top: 110px;">
        <div class='title'>
          {{$t('achievements.title1')}}
        </div>
        <div class='menu-search'> 
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
            </div>
            <div class='menu-title'>
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
                    <span>{{$t('achievements.loanUser')}}</span>
                    <el-input v-model='listQuery.loanUser' :placeholder="$t('rule.loanUser')" size='small'></el-input>
                </div>
                <div class='searchItem searchItem-date'>
                    <span>{{$t('achievements.checkDate')}}</span>
                    <el-date-picker
                    size='small'
                    v-model="listQuery.beginDate2"
                    type="date"
                    :placeholder="$t('rule.beginDate')"
                    @change="getSTimeStart2">
                    </el-date-picker>
                    <b>{{$t('approval.go')}}</b>
                    <el-date-picker
                    size='small'
                      v-model="listQuery.endDate2"
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
                <button type='button' :disabled="expDis" @click="handleDownload" :loading="downloadLoading">
                    {{$t('btn.export')}}
                </button>
            </div>
        </div>
      </el-card>
        <el-card class='box-card' style="margin-top: 10px;margin-bottom: 20px;">
          <div class='title'>
              {{$t('achievements.title2')}}
          </div>
          <!-- <div class='menu-list'>
            <button type='button' @click='approvalFn'>查看审批详情</button>
          </div> -->
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
                  <span class="href" @click="hrefFn(scope.row)">{{scope.row.orderId}}</span>
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
              prop='businessUserName'
              :label="$t('achievements.loanUser')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop='proName'
              :label="$t('achievements.proName')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop='applyAmt'
              :label="$t('achievements.applyAmt')"
              width='100'>
              </el-table-column>
              <el-table-column
              prop="crtTime"
              :label="$t('achievements.crtTime')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop="checkDate"
              :label="$t('achievements.checkDate')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop="approvedAmt"
              :label="$t('achievements.approvedAmt')"
              width='100'>
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
              prop='status'
              :label="$t('achievements.apprResult')"
              width='110'>
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
import { page, getListOrg, exportListExel } from 'api/trust/achievements/index'
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
          orderId: "",//业务ID
          realName: "",
          phoneNo: "",
          approvalResult: 0,//全部0 通过1拒绝2降额3
          orgId: "",//机构ID
          beginDate: "",//申请时间
          endDate: "",
          loanUser: "",
          beginDate2: "",//审批时间
          endDate2: ""
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
      ]
    };
  },
  created() {
    let obj = {};
    getListOrg(obj) 
    .then(response => {
      this.mechanism = this.mechanism.concat(response.data.orgList);
    })
    if (this.trustAchiPage.has(this.$route.path)) {
      this.listQuery = this.trustAchiPage.get(this.$route.path)
    }
    this.getList();
  },
  computed: {
    ...mapGetters(["elements", "trustAchiPage"])
  },
  methods: {
    hrefFn(row) {
      this.$store.dispatch('setQueryDetail', row)
      this.$router.push({
            path: '/trust/achiQuery', 
            name: '统计查询'
        }) 
    },
    //点击导出
    handleDownload() {
      this.downloadLoading = true;
      this.$store.dispatch('saveTrustAchiPage', { path: this.$route.path, listQuery: this.listQuery });
      exportListExel(this.listQuery)
      .then(response => {
        response.data.forEach(item => {
          let re = /(?=(?!\b)(\d{3})+$)/g;
          let str = String(item.applyAmt)
          item.applyAmt =  str.replace(re, '.');
          let str2 = String(item.approvedAmt)
          item.approvedAmt = str2.replace(re, '.');
          switch (item.status) {
              case 1:
                  item.status = this.$t('approvalDetail.audit')
              break;
              case 2:
                  item.status = this.$t('approvalDetail.credit')
              break;
              case 3:
                  item.status = this.$t('approvalDetail.repayments')
              break;
              case 4:
                  item.status = this.$t('approvalDetail.refused')
              break;
              case 5:
                  item.status = this.$t('approvalDetail.clear')
              break;
          }
        })
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = [ this.$t('achievements.orderId'), this.$t('achievements.realName'), this.$t('achievements.phoneNo'), this.$t('achievements.proName'), this.$t('achievements.applyAmt'), this.$t('achievements.crtTime'), this.$t('achievements.checkDate'), this.$t('achievements.approvedAmt'), this.$t('achievements.orgName'), this.$t('achievements.appShortName'), this.$t('achievements.apprResult'), this.$t('achievements.checkOpinion')];
          const filterVal = ['orderId', 'realName', 'appUserName', 'proName', 'applyAmt', 'crtTime', 'checkDate', 'approvedAmt', 'orgName', 'appShortName', 'status', 'checkOpinion'];
          const list = response.data;
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, this.$t('achievements.achievements'))
          this.downloadLoading = false;
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    //申请时间 开始时间
    getSTimeStart(val) {
      this.listQuery.beginDate = val;//这个sTime是在data中声明的，也就是v-model绑定的值
    },
    //申请时间 结束时间
    getSTimeEnd(val) {
      this.listQuery.endDate = val;
    },
    //审批时间 开始时间
    getSTimeStart2(val) {
      this.listQuery.beginDate2 = val;//这个sTime是在data中声明的，也就是v-model绑定的值
    },
    //审批时间 结束时间
    getSTimeEnd2(val) {
      this.listQuery.endDate2 = val;
    },
    getList() {
      this.listLoading = true;
      this.$store.dispatch('saveTrustAchiPage', { path: this.$route.path, listQuery: this.listQuery });
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
      this.listQuery.orgId = 0;
      this.listQuery.orderId = "";
      this.listQuery.realName = "";
      this.listQuery.phoneNo = "";
      this.listQuery.approvalResult = 0;
      this.listQuery.beginDate = "";
      this.listQuery.endDate = "";
      this.listQuery.loanUser = "";
      this.listQuery.beginDate2 = "";
      this.listQuery.endDate2 = "";
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