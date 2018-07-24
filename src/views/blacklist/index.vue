<template>
    <div class='approval'>
      <el-card class="box-card" style="margin-top: 110px;">
        <div class='title'>
          {{$t('achievements.title1')}}
        </div>
        <div class='menu-search'> 
            <div class='menu-title'>
                <div class='searchItem'>
                    <span>{{$t('blacklist.phoneNo')}}</span>
                    <el-input v-model='listQuery.phoneNo' size='small'></el-input>
                </div>
                <div class='searchItem'>
                    <span>{{$t('blacklist.cardNum')}}</span>
                    <el-input v-model='listQuery.cardNum' size='small'></el-input>
                </div>
                <div class='searchItem'>
                    <span>{{$t('blacklist.bcard')}}</span>
                    <el-input v-model='listQuery.bankCard' size='small'></el-input>
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
              header-align='center'
              align='center'
              :label="$t('user.num')"
              type="index"
              width='70'>
              </el-table-column>
              <el-table-column
              prop='mobile'
              :label="$t('blacklist.phoneNo')">
              </el-table-column>
              <el-table-column
              prop='idNo'
              :label="$t('blacklist.cardNum')">
              </el-table-column>
              <el-table-column
              prop='bankCardNo'
              :label="$t('blacklist.bcard')">
              </el-table-column>
              <el-table-column
              prop="realName"
              :label="$t('blacklist.realName')">
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
import { page } from 'api/blackList/index'
export default {
  name: "blacklist",
  data() {
    return {
      listLoading: false,
      total: null,
      listQuery: {
        limit: 5,
        page: 1,
        phoneNo: '',
        cardNum: '',
        bankCard: '',
      },
      tableData: [],
      multipleSelection: []
    };
  },
  computed: {
    ...mapGetters(["elements", "blackPage"])
  },
  methods: {
    //注册时间 开始时间
    getSTimeStart(val) {
      this.listQuery.beginDate = val;
    },
    //注册时间 结束时间
    getSTimeEnd(val) {
      this.listQuery.endDate = val;
    },
    getList() {
      this.listLoading = true;
      this.$store.dispatch('saveBlackPage', { path: this.$route.path, listQuery: this.listQuery });
      page(this.listQuery)
        .then(response => {
          if (response.status === 200) {
            this.listLoading = false;
            this.tableData = response.data.rows;
            this.total = Number(response.data.total);
          }
        })
    },
    //查询
    search() {
      if (this.blackPage.has(this.$route.path)) {
        this.listQuery = this.blackPage.get(this.$route.path)
      }
      this.getList();
    },
    //重置
    reset() {
      this.listQuery.phoneNo = "";
      this.listQuery.cardNum = "";
      this.listQuery.bankCard = "";
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