<template>
    <div class='approval'>
        <el-card class="box-card" style="margin-top: 110px;">
            <div class='title'>
                查询信息
            </div>
            <div class='menu-search'> 
                <div class='menu-title'>
                    <div class='searchItem'>
                        <span>产品编号</span>
                        <el-input v-model='pro_number' placeholder='请输入产品编号' size='small'></el-input>
                    </div>
                    <div class='searchItem'>
                        <span>产品名称</span>
                        <el-input v-model='pro_user' placeholder='请输入产品名称' size='small'></el-input>
                    </div>
                    <div class='searchItem'>
                        <span>期限</span>
                        <el-input v-model='term' placeholder='请输入期限' size='small'></el-input>
                    </div>
                    <div class='searchItem'>
                        <span>状态</span>
                        <el-select v-model='value' placeholder='请选择' size='small'>
                            <el-option
                            v-for='item in status'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class='menu-title-btn'>
                    <button type='button' @click='search()' :disabled='isDisable'>
                        查询
                    </button>
                    <button type='button' @click='reset'>
                        重置
                    </button>
                </div>
            </div>
        </el-card>
        <el-card class='box-card' style="margin-top: 10px;margin-bottom: 20px;">
            <div class='title'>
                账单列表
            </div>
            <div class='menu-list'>
                <el-button type="text" @click="addProduct">新增</el-button>
            </div>
            <el-table
                ref='multipleTable'
                :data='tableData.slice((listQuery.page-1)*listQuery.limit,listQuery.page*listQuery.limit)'
                tooltip-effect='dark'
                style='width: 95%'
                class='tables'
                @selection-change='handleSelectionChange'
                border
                size='mini'>
                <el-table-column
                header-align='center'
                align='center'
                type='selection'>
                </el-table-column>
                <el-table-column
                sortable
                prop='proNum'
                label='产品编号'>
                </el-table-column>
                <el-table-column
                prop='proName'
                label='产品名称'>
                </el-table-column>
                <el-table-column
                prop='sum'
                label='金额'
                width="120">
                </el-table-column>
                <el-table-column
                prop='term'
                label='期限（天）'>
                </el-table-column>
                <el-table-column
                prop='interestRate'
                label='利率'>
                </el-table-column>
                <el-table-column
                prop='mngRate'
                label='管理费率'
                width="120">
                </el-table-column>
                <el-table-column
                prop='status'
                label='状态'>
                </el-table-column>
                <el-table-column
                prop='draworder'
                label='显示顺序'>
                </el-table-column>
                <el-table-column
                prop='createTime'
                label='创建时间'>
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
                :total="tableData.length">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "productManage",
  data() {
    return {
      listQuery: {
          page: 1,
          limit: 20,
          orgId: undefined
      },
      tableData: [
        {
          proNum: '1',
          proName: '王小虎',
          sum: '200',
          term: '7',
          interestRate: '',
          mngRate: '',
          status: '',
          draworder: '',
          createTime: ''
        },
        {
          proNum: '2',
          proName: '王小虎',
          sum: '200',
          term: '7',
          interestRate: '',
          mngRate: '',
          status: '',
          draworder: '',
          createTime: ''
        },
        {
          proNum: '3',
          proName: '王小虎',
          sum: '200',
          term: '7',
          interestRate: '',
          mngRate: '',
          status: '',
          draworder: '',
          createTime: ''
        },
        {
          proNum: '4',
          proName: '王小虎',
          sum: '200',
          term: '7',
          interestRate: '',
          mngRate: '',
          status: '',
          draworder: '',
          createTime: ''
        },
        {
          proNum: '5',
          proName: '王小虎',
          sum: '200',
          term: '7',
          interestRate: '',
          mngRate: '',
          status: '',
          draworder: '',
          createTime: ''
        }
      ],
      multipleSelection: [],
      pro_number: "",
      pro_user: "",
      term: "",
      status: [
        {
          value: "选项1",
          label: "未处理"
        },
        {
          value: "选项2",
          label: "已处理"
        },
        {
          value: "选项3",
          label: "已签收"
        }
      ],
      value: "",
      applydate: "",
      isDisable: false
    };
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    //查询
    search() {
      this.isDisable = true;
      setTimeout(() => {
        this.isDisable = false;
      }, 2000);
    },
    //重置
    reset() {
      this.pro_number = "";
      this.pro_user = "";
      this.value = "";
      this.applydate = "";
    },
    //选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
        this.listQuery.limit = val;
    },
    handleCurrentChange(val) {
        this.listQuery.page = val;
    },
    //新增产品
    addProduct() {
      this.$router.push('/product/addProduct')
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