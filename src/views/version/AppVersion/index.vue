<template>
    <div class='approval'>
      <el-card class="box-card" style="margin-top: 110px;">
        <div class='title'>
          {{$t('achievements.title1')}}
        </div>
        <div class='menu-search'> 
            <div class='menu-title'>
                <div class='searchItem'>
                    <span>{{$t('AppVersion.status')}}</span>
                    <el-select v-model='listQuery.verStatus' size='small'>
                        <el-option
                        v-for='item in appStatus'
                        :key='item.value'
                        :label='item.label'
                        :value='item.value'>
                        </el-option>
                    </el-select>
                </div>
                <div class='searchItem'>
                    <span>{{$t('customQuery.channel')}}</span>
                    <el-select v-model='listQuery.orgId' size='small'>
                          <el-option
                          v-for='item in appChannel'
                          :key='item.id'
                          :label='item.org_name'
                          :value='item.id'>
                          </el-option>
                      </el-select>
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
              {{$t('achievements.title2')}}
          </div>
          <div class='menu-list'>
              <button type='button' @click='addFn' :disabled="addDis">{{$t('btn.NewAdd')}}</button>
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
              prop='verName'
              :label="$t('AppVersion.verName')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop='verId'
              :label="$t('AppVersion.verId')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop='verPlat'
              :label="$t('AppVersion.verPlat')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop="verStatus"
              :label="$t('AppVersion.verStatus')"
              width='200'>
              <template scope="scope">
                  <p class="able" v-if="scope.row.verStatus === 0">
                      <span @click="start(scope.row)">{{$t('AppVersion.enable')}}</span>
                      <b style="display: inline-block;margin: 0 3px;color: #afb0b2;">|</b>
                      <span style="color: #ff5e43;">{{$t('AppVersion.blockup')}}</span>
                  </p>
                  <p class="able" v-else-if="scope.row.verStatus === 1">
                      <span style="color: #ff5e43;">{{$t('AppVersion.enable')}}</span>
                      <b style="display: inline-block;margin: 0 3px;color: #afb0b2;">|</b>
                      <span @click="stop(scope.row)">{{$t('AppVersion.blockup')}}</span>
                  </p>
                  <p v-else></p>
              </template>
              </el-table-column>
              <el-table-column
              prop='uploadTime'
              :label="$t('AppVersion.uploadTime')"
              width='200'>
              </el-table-column>
              <el-table-column
              prop='appName'
              :label="$t('AppVersion.appName')"
              width='200'>
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
import { getChannels } from 'api/customQuery/index'
import { page, updateAppStatus } from 'api/version/index'
export default {
  data() {
    return {
      addDis: true,
      listLoading: false,
      total: null,
      listQuery: {
          limit: 5,
          page: 1,
          verStatus: '',
          orgId: ''
      },
      tableData: [],
      multipleSelection: [],
      appChannel: [
        {
          id: '',
          org_name: this.$t('rule.choose')
        }
      ],
      appStatus: [
        {
          value: '',
          label: this.$t('rule.all')
        },
        {
          value: 0,
          label: this.$t('AppVersion.blockup')
        },
        {
          value: 1,
          label: this.$t('AppVersion.effective')
        }
      ]
    };
  },
  created() {
    //渠道下拉
    getChannels()
    .then(response => {
      this.appChannel = this.appChannel.concat(response.data);
    })
  },
  computed: {
    ...mapGetters(["elements", "appVerPage"])
  },
  methods: {
    //有效
    start(row) {
      let obj1 = {};
      obj1.id = row.id;
      obj1.verStatus = 1;
      obj1.channel = row.channel;
      updateAppStatus(obj1)
      .then(response => {
        if (response.status === 200) {
          this.getList()
          this.$message({
            showClose: true,
            message: this.$t('AppVersion.msg1'),
            type: 'success'
          });
        }
      })
    },
    //禁用
    stop(row) {
      let obj2 = {};
      obj2.id = row.id;
      obj2.verStatus = 0;
      obj2.channel = row.channel;
      updateAppStatus(obj2)
      .then(response=> {
        if (response.status === 200) {
          this.getList()
          this.$message({
              showClose: true,
              message: this.$t('AppVersion.msg2'),
              type: 'success'
          });
        }
      })
    },
    addFn() {
      this.$router.push({
        path: '/version/AppUpgrade', 
        name: 'APP升级'
      }) 
    },
    getList() {
      this.listLoading = true;
      this.$store.dispatch('saveAppVerPage', { path: this.$route.path, listQuery: this.listQuery });
      page(this.listQuery)
        .then(response => {
          if (response.status === 200) {
            this.listLoading = false;
            this.tableData = response.data.rows;
            this.total = Number(response.data.total);
          }
        })
      if (this.tableData.length > 0) {
        this.addDis = false;
      } else {
        this.addDis = true;
      }
    },
    //查询
    search() {
      if (this.appVerPage.has(this.$route.path)) {
        this.listQuery = this.appVerPage.get(this.$route.path)
      }
      this.getList();
    },
    //重置
    reset() {
      this.listQuery.verStatus = '';
      this.listQuery.orgId = '';
    },
    //选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length !== 0) {
        this.addDis = false;
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

.able {
    display: inline-block;
    span {
        border-bottom: 1px solid #afb0b2;
        padding-bottom: 2px;
        color: #afb0b2;
        cursor: pointer;
    }
}
</style>