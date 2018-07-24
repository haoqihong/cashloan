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
                    <span>{{$t('customQuery.channel')}}</span>
                    <el-select v-model='listQuery.channel' size='small'>
                          <el-option
                          v-for='item in business'
                          :key='item.id'
                          :label='item.org_name'
                          :value='item.id'>
                          </el-option>
                      </el-select>
                </div>
                <div class='searchItem'>
                    <span>{{$t('customQuery.authStatus')}}</span>
                    <el-select v-model='listQuery.authStatus' size='small'>
                          <el-option
                          v-for='item in apply'
                          :key='item.value'
                          :label='item.label'
                          :value='item.value'>
                          </el-option>
                      </el-select>
                </div>
                <div class='searchItem searchItem-date'>
                    <span>{{$t('customQuery.customerCrtTime')}}</span>
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
              prop='realName'
              :label="$t('achievements.realName')"
              width='300'>
              </el-table-column>
              <el-table-column
              prop='userName'
              :label="$t('achievements.phoneNo')"
              width='240'>
              </el-table-column>
              <el-table-column
              prop='authStatus'
              :label="$t('customQuery.authStatus')"
              width='200'>
              <template scope="scope">
                <span v-if="scope.row.authStatus=== '0'">{{$t('customQuery.authStatus1')}}</span>
                <span v-if="scope.row.authStatus=== '1'">{{$t('customQuery.authStatus2')}}</span>
                <span v-if="scope.row.authStatus=== '2'">{{$t('customQuery.authStatus3')}}</span>
                <span v-if="scope.row.authStatus=== '3'">{{$t('customQuery.authStatus4')}}</span>
                <span v-if="scope.row.authStatus=== '4'">{{$t('customQuery.authStatus5')}}</span>
                <span v-if="scope.row.authStatus=== '5'">{{$t('customQuery.authStatus6')}}</span>
                <span v-if="scope.row.authStatus=== '6'">{{$t('customQuery.authStatus7')}}</span>
                <span v-if="scope.row.authStatus=== '7'">{{$t('customQuery.authStatus8')}}</span>
            </template>
              </el-table-column>
              <el-table-column
              prop='identityCardNum'
              :label="$t('customQuery.cardNum')"
              width='240'>
              </el-table-column>
              <el-table-column
              prop="birthday"
              :label="$t('customQuery.certifiedDate')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop='attr2'
              :label="$t('customQuery.certifiedCity')"
              width='300'
              show-overflow-tooltip>
              </el-table-column>
              <el-table-column
              prop='workYears'
              :label="$t('customQuery.year')"
              width='100'>
              </el-table-column>
              <el-table-column
              prop='education'
              :label="$t('customQuery.education')"
              width='100'>
              </el-table-column>
              <el-table-column
              prop='religious'
              :label="$t('customQuery.religious')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop="marriage"
              :label="$t('customQuery.marriage')"
              width='120'>
              </el-table-column>
              <el-table-column
              prop='bankCard'
              :label="$t('customQuery.bcard')"
              width='300'>
              </el-table-column>
              <el-table-column
              prop='bankName'
              :label="$t('customQuery.bankCode')"
              width='220'
              show-overflow-tooltip>
              </el-table-column>
              <el-table-column
              prop='regTime'
              :label="$t('customQuery.customerCrtTime')"
              width='220'>
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
import { page, getChannels } from 'api/customQuery/index'
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
          orgId: "",//机构ID
          realName: "",
          phoneNo: "",
          channel: "",
          authStatus: "",
          beginDate: "",
          endDate: ""
      },
      tableData: [],
      multipleSelection: [],
      mechanism: [
        {
          id: '',
          orgName: this.$t('rule.choose')
      }],
      business: [
        {
          id: '',
          org_name: this.$t('rule.choose')
        }
      ],
      apply: [
        {
          value: '',
          label: this.$t('rule.choose')
        },
        {
          value: 1,
          label: this.$t('customQuery.authStatus1')
        },
        {
          value: 2,
          label: this.$t('customQuery.authStatus2')
        },
        {
          value: 3,
          label: this.$t('customQuery.authStatus3')
        },
        {
          value: 4,
          label: this.$t('customQuery.authStatus4')
        },
        {
          value: 5,
          label: this.$t('customQuery.authStatus5')
        },
        {
          value: 6,
          label: this.$t('customQuery.authStatus6')
        },
        {
          value: 7,
          label: this.$t('customQuery.authStatus7')
        },
        {
          value: 8,
          label: this.$t('customQuery.authStatus8')
        }]
    };
  },
  created() {
    //组织机构下拉
    let obj = {};
    getListOrg(obj) 
    .then(response => {
      this.mechanism = this.mechanism.concat(response.data.orgList);
    })
    //渠道下拉
    getChannels()
    .then(response => {
      this.business = this.business.concat(response.data);
    })
  },
  computed: {
    ...mapGetters(["elements", "customPage"])
  },
  methods: {
    //点击导出
    handleDownload() {
      this.downloadLoading = true;
      this.listQuery.limit = this.total;
      this.$store.dispatch('saveCustomPage', { path: this.$route.path, listQuery: this.listQuery });
      page(this.listQuery)
      .then(response => {
        response.data.rows.forEach(item => {
          //申请状态
          switch (item.authStatus) {
              case '0':
                  item.authStatus = this.$t('customQuery.authStatus1')
              break;
              case '1':
                  item.authStatus = this.$t('customQuery.authStatus2')
              break;
              case '2':
                  item.authStatus = this.$t('customQuery.authStatus3')
              break;
          }
        })
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = [ this.$t('achievements.realName'), this.$t('achievements.phoneNo'), this.$t('customQuery.authStatus'), this.$t('customQuery.cardNum'), this.$t('customQuery.certifiedDate'), this.$t('customQuery.certifiedCity'), this.$t('customQuery.year'), this.$t('customQuery.education'), this.$t('customQuery.religious'), this.$t('customQuery.marriage'), this.$t('customQuery.bcard'), this.$t('customQuery.bankCode'), this.$t('customQuery.customerCrtTime') ];
          const filterVal = [ 'realName', 'userName', 'authStatus', 'identityCardNum', 'birthday', 'attr2', 'workYears', 'education', 'religious', 'marriage', 'bankCard', 'bankName', 'regTime' ];
          const list = response.data.rows;
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, this.$t('route.customQuery'))
          this.downloadLoading = false;
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    //注册时间 开始时间
    getSTimeStart(val) {
      this.listQuery.beginDate = val;//这个sTime是在data中声明的，也就是v-model绑定的值
    },
    //注册时间 结束时间
    getSTimeEnd(val) {
      this.listQuery.endDate = val;
    },
    getList() {
      this.listLoading = true;
      this.$store.dispatch('saveCustomPage', { path: this.$route.path, listQuery: this.listQuery });
      page(this.listQuery)
        .then(response => {
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
      if (this.customPage.has(this.$route.path)) {
        this.listQuery = this.customPage.get(this.$route.path)
      }
      this.getList();
    },
    //重置
    reset() {
      this.listQuery.orgId = '';
      this.listQuery.channel = '';
      this.listQuery.authStatus = '';
      this.listQuery.realName = "";
      this.listQuery.phoneNo = "";
      this.listQuery.beginDate = "";
      this.listQuery.endDate = "";
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