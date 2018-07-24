<template>
    <div class='approval'>
        <el-card class="box-card" style="margin-top: 110px;">
            <div class='title'>
                {{$t('lenders.title1')}}
            </div>
            <div class='menu-search'> 
                <div class='menu-title'>
                    <div class='searchItem'>
                        <span>{{$t('grouping.gnum')}}</span>
                        <el-input v-model='listQuery.collectCode' :placeholder="$t('rule.gnum')" size='small'></el-input>
                    </div>
                    <div class='searchItem'>
                        <span>{{$t('grouping.gname')}}</span>
                        <el-input v-model='listQuery.collectName' :placeholder="$t('rule.gname')" size='small'></el-input>
                    </div>
                    <div class='searchItem'>
                        <span>{{$t('grouping.status')}}</span>
                        <el-select v-model='listQuery.status' size='small'>
                            <el-option
                            v-for='item in status'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                            </el-option>
                        </el-select>
                    </div>
                    <div class='searchItem'>
                      <span>{{$t('grouping.auth')}}</span>
                      <el-select v-model='listQuery.collectStatus' size='small'>
                          <el-option
                          v-for='item in collectStatus'
                          :key='item.dictCode'
                          :label='item.dictValue'
                          :value='item.dictCode'>
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
                {{$t('grouping.glist')}}
            </div>
            <div class='menu-list'>
                <button type='button' @click='approvalFn'>{{$t('btn.edit')}}</button>
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
                header-align='center'
                align='center'
                prop='groupCode'
                :label="$t('grouping.gnum')"
                width='140'>
                </el-table-column>
                <el-table-column
                header-align='center'
                align='center'
                prop='groupName'
                :label="$t('grouping.gname')"
                width='140'>
                </el-table-column>
                <el-table-column
                header-align='center'
                align='center'
                prop='startDay'
                :label="$t('grouping.startDay')"
                width='140'>
                </el-table-column>
                <el-table-column
                header-align='center'
                align='center'
                prop='status'
                :label="$t('grouping.status')"
                width='120'>
                <template scope="scope">
                    <p class="able" v-if="scope.row.status === 1">
                        <span style="color: #ff5e43;">{{$t('grouping.enable')}}</span>
                        <b style="display: inline-block;margin: 0 3px;color: #afb0b2;">|</b>
                        <span @click="stop(scope.row)">{{$t('grouping.blockup')}}</span>
                    </p>
                    <p class="able" v-else-if="scope.row.status === 2">
                        <span @click="start(scope.row)">{{$t('grouping.enable')}}</span>
                        <b style="display: inline-block;margin: 0 3px;color: #afb0b2;">|</b>
                        <span style="color: #ff5e43;">{{$t('grouping.blockup')}}</span>
                    </p>
                    <p v-else></p>
                </template>
                </el-table-column>
                <el-table-column
                header-align='center'
                align='center'
                prop="remark"
                :label="$t('grouping.remark')"
                width='200'
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                header-align='center'
                align='center'
                prop="crtTime"
                :label="$t('grouping.crtTime')"
                width='200'
                show-overflow-tooltip>
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
import { page, getCollectDay, beginOrStop } from 'api/collection/grouping/index'
export default {
  data() {
    return {
      listLoading: false,
      listQuery: {
          limit: 20,//每页条数
          page: 1,//当前页数
          collectCode: "",
          collectName: "",
          status: "",
          collectStatus: ""
      },
      total: null,
      tableData: [],
      multipleSelection: [],
      lanStatus: null,
      collectStatus: [
        {
          dictCode: '',
          dictValue: this.$t('rule.choose')
        }
      ],
      status: [
        {
          value: '',
          label: this.$t('rule.choose')
        },
        {
          value: 1,
          label: this.$t('grouping.enable')
        },
        {
          value: 2,
          label: this.$t('grouping.blockup')
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
    //权限
    let obj = {};
    obj.dictCode = 'auth_collect_day'
    getCollectDay(obj)
    .then(response => {
        this.collectStatus = this.collectStatus.concat(response.data.collectDayList);
    })
  },
  computed: {
    ...mapGetters(["elements", "language", "groupPage"])
  },
  methods: {
    //启用
    start(row) {
        let obj1 = {};
        obj1.groupId = row.groupId;
        obj1.status = "1";
        beginOrStop(obj1)
        .then(response=> {
            if (response.status === 200) {
                this.getList()
                this.$message({
                    showClose: true,
                    message: this.$t('grouping.msg1'),
                    type: 'success'
                });
            }
        })
    },
    //停用
    stop(row) {
        let obj2= {};
        obj2.groupId = row.groupId;
        obj2.status = "2";
        beginOrStop(obj2)
        .then(response=> {
            if (response.status === 200) {
                this.getList()
                this.$message({
                    showClose: true,
                    message: this.$t('grouping.msg2'),
                    type: 'success'
                });
            }
        })
    },
    getList() {
      this.listLoading = true;
      this.$store.dispatch('saveGroupPage', { path: this.$route.path, listQuery: this.listQuery });
      page(this.listQuery)
        .then(response => {
          response.data.rows.forEach(item => {
            if (item.startDay !== '') {
              item.startDay = item.startDay + '-' + item.endDay;
            }
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
      if (this.groupPage.has(this.$route.path)) {
        this.listQuery = this.groupPage.get(this.$route.path)
      }
      this.getList();
    },
    //重置
    reset() {
      this.listQuery.collectCode = "";
      this.listQuery.collectName = "";
      this.listQuery.status = "";
      this.listQuery.collectStatus = "";
    },
    //选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //编辑
    approvalFn() {
      if(this.multipleSelection.length === 1) { 
          this.$store.dispatch('setEditGroup', this.multipleSelection[0])
          this.$router.push({
            path: '/collection/newGroup', 
            name: '编辑分组'
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