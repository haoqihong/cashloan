<template>
    <div class='approval'>
      <el-card class="box-card" style="margin-top: 110px;">
        <div class='title'>
          {{$t('achievements.title1')}}
        </div>
        <div class='menu-search'> 
            <div class='menu-title'>
                <div class='searchItem'>
                    <span>催收人</span>
                    <el-select v-model='listQuery.collectUserId' size='small'>
                        <el-option
                        v-for='item in collUsers'
                        :key='item.id'
                        :label='item.name'
                        :value='item.id'>
                        </el-option>
                    </el-select>
                </div>
                <div class='searchItem'>
                    <span>{{$t('dispatch.gcoll')}}</span>
                    <el-select v-model='listQuery.groupCode' size='small'>
                        <el-option
                        v-for='item in collGroup'
                        :key='item.code'
                        :label='item.name'
                        :value='item.code'>
                        </el-option>
                    </el-select>
                </div>
                <div class='searchItem'>
                  <span>{{$t('customQuery.channel')}}</span>
                  <el-select v-model='listQuery.channelId' size='small'>
                        <el-option
                        v-for='item in business'
                        :key='item.id'
                        :label='item.org_name'
                        :value='item.id'>
                        </el-option>
                    </el-select>
                </div>
                <div class='searchItem'>
                    <span>催收时间</span>
                    <el-date-picker
                    size='small'
                    v-model="listQuery.beginDate"
                    type="date"
                    :placeholder="$t('rule.choose')"
                    @change="getSTimeStart">
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
              v-if="this.listQuery.type === '1'"
              prop='collectUser'
              label="催收人">
              </el-table-column>
              <el-table-column
              v-if="this.listQuery.type === '2'"
              prop='groupValue'
              label="催收组">
              </el-table-column>
              <el-table-column
              v-if="this.listQuery.type === '1' || this.listQuery.type === '2' || this.listQuery.type === '3'"
              prop='totalMoney'
              label="逾期金额">
              </el-table-column>
              <el-table-column
              v-if="this.listQuery.type === '1' || this.listQuery.type === '2' || this.listQuery.type === '3'"
              prop='totalReceiveMoney'
              label="回款金额">
              </el-table-column>
              <el-table-column
              v-if="this.listQuery.type === '1' || this.listQuery.type === '2' || this.listQuery.type === '3'"
              prop='receiveRato'
              label="回款率">
              </el-table-column>
          </el-table>
          <!-- <div class="pagination-container">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listQuery.page"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="listQuery.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div> -->
        </el-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCollectGroup } from 'api/collection/achievement/index'
import { getChannels } from 'api/customQuery/index'
import { page, getCollectUser } from 'api/reportForm/ReturnMoney/index'
export default {
  data() {
    return {
      listLoading: false,
      total: null,
      listQuery: {
        beginDate: "",
        collectUserId: "",
        collectUserValue: "",
        groupCode: "",//催收小组
        groupValue: "",
        channelId: 6,
        type: '3'
      },
      tableData: [],
      multipleSelection: [],
      collGroup: [
        {
            code: '',
            name: this.$t('rule.all')
        }
      ],
      collUsers: [
        {
            id: '',
            name: this.$t('rule.all')
        }
      ],
      business: [],
    }
  },
  computed: {
    ...mapGetters(["elements", "returnMonPage"])
  },
  created() {
    //催收小组
    let group = {};
    getCollectGroup(group)
    .then(response => {
      this.collGroup = this.collGroup.concat(response.data.collectList)
    })
    //渠道下拉
    getChannels()
    .then(response => {
      this.business = response.data;
    })
    //催收人
    let collUser= {};
    getCollectUser(collUser)
    .then(response => {
      let arr = [];
      response.data.collectList.forEach(item => {
        if(item !== null) {
          arr.push(item)
        }
      })
      this.collUsers = this.collUsers.concat(arr)
    })
  },
  methods: {
    //申请时间 开始时间
    getSTimeStart(val) {
      this.listQuery.beginDate = val;//这个sTime是在data中声明的，也就是v-model绑定的值
    },
    getList() {
      this.listLoading = true;
      if (this.listQuery.collectUserId === '' && this.listQuery.groupCode === '') {
        this.listQuery.type = '3'
      } else if (this.listQuery.collectUserId === '' && this.listQuery.groupCode !== '') {
        this.listQuery.type = '2'
      } else if (this.listQuery.groupCode === '' && this.listQuery.collectUserId !== '') {
        this.listQuery.type = '1'
      }
      this.collUsers.forEach(item => {
        if (this.listQuery.collectUserId === item.id && this.listQuery.collectUserId !== '') {
          this.listQuery.collectUserValue = item.name
        } else if (this.listQuery.collectUserId === '') {
          this.listQuery.collectUserValue = ''
        }
      })
      this.collGroup.forEach(item => {
        if (this.listQuery.groupCode === item.code && this.listQuery.groupCode !== '') {
          this.listQuery.groupValue = item.name
        } else if (this.listQuery.groupCode === '') {
          this.listQuery.groupValue = ''
        }
      })
      this.$store.dispatch('saveReturnMonPage', { path: this.$route.path, listQuery: this.listQuery });
      page(this.listQuery)
        .then(response => {
          if (response.status === 200) {
            let arrs = [];
            arrs.push(response.data)
            this.listLoading = false;
            this.tableData = arrs;
          }
        })
    },
    //查询
    search() {
      if (this.listQuery.collectUserId !== '' && this.listQuery.groupCode !== '') {
        this.$message({
          showClose: true,
          message: '催收人与催收小组不能同时查询',
          type: 'warning'
        });
      } else {
        if (this.returnMonPage.has(this.$route.path)) {
          this.listQuery = this.returnMonPage.get(this.$route.path)
        }
        this.getList();
      }
    },
    //重置
    reset() {
      this.listQuery.beginDate = "";
      this.listQuery.collectUserId = "";
      this.listQuery.groupCode = "";
      this.listQuery.channelId = 6;
    },
    //选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // handleSizeChange(val) {
    //   this.listQuery.limit = val;
    //   this.getList()
    // },
    // handleCurrentChange(val) {
    //   this.listQuery.page = val;
    //   this.getList()
    // }
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
</style>