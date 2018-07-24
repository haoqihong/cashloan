<template>
    <div class="gam-info">
        <el-card class="box-card-tab" style="margin-top: 110px;">
            <div class='tab-title'>
                社交信息数据
            </div>
            <el-tabs class="tabs" type="card" v-model="activeName2" @tab-click="handleClick">
                <el-tab-pane label="通话录" name="first">
                    <div class='menu-search'> 
                        <div class='menu-title'>
                            <div class='searchItem'>
                                <span>手机号</span>
                                <el-input v-model='listQuery.phoneNo' placeholder='请输入手机号' size='small'></el-input>
                            </div>
                            <div class='searchItem'>
                                <span>联系人姓名</span>
                                <el-input v-model='listQuery.contactName' placeholder='请输入客户姓名' size='small'></el-input>
                            </div>
                            <div class='menu-title-btn'>
                                <button type='button' @click='search'>
                                    查询
                                </button>
                                <button type='button' @click='reset'>
                                    重置
                                </button>
                            </div>
                        </div>
                        <el-table
                            ref='multipleTable'
                            :data='tableData'
                            tooltip-effect='dark'
                            style='width: 90%'
                            class='tables'
                            border
                            size='mini'>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='id'
                            label='序号'
                            width="90">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='realName'
                            label='客户姓名'
                            width="240">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='contactPhone'
                            label='客户手机号'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='contactName'
                            label='联系人姓名'
                            width="120">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='contactPhone'
                            label='联系人手机号'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='contactStatus'
                            label='是否紧急联系人'
                            width="180">
                            <template scope="scope">
                                <span v-if="scope.row.contactStatus=== 1">是</span>
                                <span v-if="scope.row.contactStatus=== 2">否</span>
                            </template> 
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='contactRelation'
                            label='关系'
                            width="120">
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
                    </div>
                </el-tab-pane>
                <el-tab-pane label="通话记录" name="second">
                    <div class='menu-search'> 
                        <div class='menu-title'>
                            <div class='searchItem'>
                                <span>手机号</span>
                                <el-input v-model='listQuery1.callUserPhone' placeholder='请输入手机号' size='small'></el-input>
                            </div>
                            <div class='searchItem'>
                                <span>联系人姓名</span>
                                <el-input v-model='listQuery1.callUserName' placeholder='请输入客户姓名' size='small'></el-input>
                            </div>
                            <div class='menu-title-btn'>
                                <button type='button' @click='search2'>
                                    查询
                                </button>
                                <button type='button' @click='reset2'>
                                    重置
                                </button>
                            </div>
                        </div>
                        <el-table
                            ref='multipleTable'
                            :data='tableData1'
                            tooltip-effect='dark'
                            style='width: 90%'
                            class='tables'
                            border
                            size='mini'>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='id'
                            label='序号'
                            width="90">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='callUserName'
                            label='姓名'
                            width="120">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='callUserPhone'
                            label='手机号'
                            width="150">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='callStartTime'
                            label='呼叫/被呼叫'
                            width="180">
                                <template scope="scope">
                                    <span v-if="scope.row.callStartTime=== 1">呼叫</span>
                                    <span v-if="scope.row.callStartTime=== 2">被呼叫</span>
                                </template> 
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='callStatus'
                            label='通话时间'
                            width="240">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='callTime'
                            label='通话时长'
                            width="120">
                            </el-table-column>
                        </el-table>
                        <div class="pagination-container">
                            <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page="listQuery1.page"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="listQuery1.limit"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total1">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="短信记录" name="third">
                    <div class='menu-search'>
                        <div class='menu-title'>
                            <div class='searchItem'>
                                <span>手机号</span>
                                <el-input v-model='listQuery2.smsUserPhone' placeholder='请输入手机号' size='small'></el-input>
                            </div>
                            <div class='searchItem'>
                                <span>联系人姓名</span>
                                <el-input v-model='listQuery2.smsUserName' placeholder='请输入客户姓名' size='small'></el-input>
                            </div>
                            <div class='menu-title-btn'>
                                <button type='button' @click='search3'>
                                    查询
                                </button>
                                <button type='button' @click='reset3'>
                                    重置
                                </button>
                            </div>
                        </div>
                        <el-table
                            ref='multipleTable'
                            :data='tableData2'
                            tooltip-effect='dark'
                            style='width: 90%'
                            class='tables'
                            border
                            size='mini'>
                            <el-table-column
                            header-align="center"
                            align="center"
                            sortable
                            prop='id'
                            label='序号'
                            width="90">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='smsUserName'
                            label='姓名'
                            width="120">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='smsUserPhone'
                            label='手机号'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='smsStatus'
                            label='发送/接收'
                            width="120">
                                <template scope="scope">
                                    <span v-if="scope.row.smsStatus=== '1'">发送</span>
                                    <span v-if="scope.row.smsStatus=== '2'">接收</span>
                                </template> 
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='smsCrtTime'
                            label='创建时间'
                            width="240">
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='smsContent'
                            label='内容'
                            width="300">
                            </el-table-column>
                        </el-table>
                        <div class="pagination-container">
                            <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            :current-page="listQuery2.page"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="listQuery2.limit"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total2">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="TOP20" name="fourth">
                    <div class="topname">通话记录</div>
                    <el-table
                        ref='multipleTable'
                        class="tables"
                        :data='tableData3.slice((listQuery3.page-1)*listQuery3.limit,listQuery3.page*listQuery3.limit)'
                        tooltip-effect='dark'
                        style="width: 90%"
                        border
                        size='mini'>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='id'
                        label='序号'>
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='callUserName'
                        label='姓名'>
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='callUserPhone'
                        label='手机号'>
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='totalNum'
                        label='通话次数'>
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='totalCallTime'
                        label='累计通话时长'>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-container">
                        <el-pagination
                        @size-change="handleSizeChange3"
                        @current-change="handleCurrentChange3"
                        :current-page="listQuery3.page"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="listQuery3.limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData3.length">
                        </el-pagination>
                    </div>
                    <div class="topname">短信记录</div>
                    <el-table
                        ref='multipleTable'
                        class="tables"
                        :data='tableData4.slice((listQuery4.page-1)*listQuery4.limit,listQuery4.page*listQuery4.limit)'
                        tooltip-effect='dark'
                        style="width: 90%"
                        border
                        size='mini'>
                        <el-table-column
                        header-align="center"
                        align="center"
                        sortable
                        prop='id'
                        label='序号'>
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='smsUserName'
                        label='姓名'>
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='smsUserPhone'
                        label='手机号'>
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='totalNum'
                        label='短信总条数'>
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='sendNum'
                        label='发送总条数'>
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='getNum'
                        label='接受总条数'>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-container">
                        <el-pagination
                        @size-change="handleSizeChange4"
                        @current-change="handleCurrentChange4"
                        :current-page="listQuery4.page"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="listQuery4.limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData4.length">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="社交APP" name="fifth">
                    <div class="menu-search">
                        <div class='menu-title'>
                            <div class='searchItem'>
                                <span>名称</span>
                                <el-input v-model='listQuery5.appName' placeholder='请输入名称' size='small'></el-input>
                            </div>
                            <div class='menu-title-btn'>
                                <button type='button' @click='search4'>
                                    查询
                                </button>
                            </div>
                        </div>  
                        <el-table
                            ref='multipleTable'
                            :data='tableData5'
                            tooltip-effect='dark'
                            style='width: 90%'
                            class='tables'
                            border
                            size='mini'>
                            <el-table-column
                            header-align="center"
                            align="center"
                            sortable
                            prop='id'
                            label='序号'>
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='appName'
                            label='名称'>
                            </el-table-column>
                            <el-table-column
                            header-align="center"
                            align="center"
                            prop='type'
                            label='类别'>
                            </el-table-column>
                        </el-table>
                        <div class="pagination-container">
                            <el-pagination
                            @size-change="handleSizeChange5"
                            @current-change="handleCurrentChange5"
                            :current-page="listQuery5.page"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="listQuery5.limit"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total5">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <div class="back">
            <el-button type="primary" @click="goback">返回</el-button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { addressPage, callPage, smsInfoPage, top20Call, top20Sms, appPage } from 'api/trust/addressList/index'
    export default {
        data() {
            return {
                activeName2: 'first',
                listQuery: {
                    userId: undefined,
                    contactName: '',
                    phoneNo: '',
                    limit: 20,
                    page: 1
                },
                total: null,
                listQuery1: {
                    userId: undefined,
                    callUserName: '',
                    callUserPhone: '',
                    limit: 20,
                    page: 1
                },
                total1: null,
                listQuery2: {
                    userId: undefined,
                    smsUserName: '',
                    smsUserPhone: '',
                    limit: 20,
                    page: 1
                },
                total2: null,
                listQuery3: {
                    page: 1,
                    limit: 20
                },
                total3: null,
                listQuery4: {
                    page: 1,
                    limit: 20
                },
                total4: null,
                listQuery5: {
                    userId: undefined,
                    appName: '',
                    limit: 20,
                    page: 1
                },
                total5: null,
                tableData: [{
                    id: "",
                    realName: '',
                    contactPhone: '',
                    contactName: '',
                    contactPhone: '',
                    contactStatus: '',
                    contactRelation: ''
                }],
                tableData1: [{
                    id: "1",
                    callUserName: "张三",
                    callUserPhone: "18211186680",
                    callStartTime: 1,
                    callStatus: "1",
                    callTime: "1"
                }],
                tableData2: [{
                    id: "1",
                    smsUserName: "张三",
                    smsUserPhone: "18211186680",
                    smsStatus: 1,
                    smsCrtTime: "2",
                    smsContent: "2"
                }],
                tableData3: [{
                    id: "1",
                    callUserName: "张三",
                    callUserPhone: "18211186680",
                    totalNum: "12",
                    totalCallTime: ""
                }],
                tableData4: [{
                    id: "1",
                    smsUserName: "张三",
                    smsUserPhone: "18211186680",
                    totalNum: "12",
                    sendNum: "",
                    getNum: ""
                }],
                tableData5: [{
                    id: "1",
                    appName: "微信",
                    type: "社交"
                }],
                userId: '',
                realName: ''
            }
        },
        computed: {
            ...mapGetters(["elements"])
        },
        created() {
            this.getParams();
            this.getList();
            this.getList1();
            this.getList2();
            this.getList3();
            this.getList4();
            this.getList5();
        },
        methods: {
            getParams () {
                this.userId = this.$route.query.userId;
                this.realName = this.$route.query.realName;
            },
            getList() {
                //通话录
                this.listQuery.userId = this.userId
                addressPage(this.listQuery)
                .then(response => {
                    response.data.rows.forEach(item => {
                        item.realName = this.realName;
                    })
                    this.tableData = response.data.rows;
                    this.total = Number(response.data.total);
                })
            },
            getList1() {
                //通话记录
                this.listQuery1.userId = this.userId
                callPage(this.listQuery1)
                .then(response => {
                    this.tableData1 = response.data.rows;
                    this.total1 = Number(response.data.total);
                })
            },
            getList2() {
                //短信记录
                this.listQuery2.userId = this.userId
                smsInfoPage(this.listQuery2)
                .then(response => {
                    this.tableData2 = response.data.rows;
                    this.total2 = Number(response.data.total);
                })
            },
            getList3() {
                //通话top
                let obj = {};
                obj.userId = this.userId;
                top20Call(obj)
                .then(response => {
                    this.tableData3 = response.data
                })
            },
            getList4() {
                //短信top
                let obj1 = {};
                obj1.userId = this.userId;
                top20Sms(obj1)
                .then(response => {
                    this.tableData4 = response.data
                })
            },
            getList5() {
                //APP
                this.listQuery5.userId = this.userId;
                appPage(this.listQuery5)
                .then(response => {
                    this.tableData5 = response.data.rows;
                    this.total5 = Number(response.data.total);
                })
            },
            handleClick(tab, event) {
                //console.log(tab, event)
            },
            //重置
            reset() {
                this.listQuery.phoneNo = "";
                this.listQuery.contactName = "";
            },
            //查询
            search() {
                this.getList()
            },
            //通话记录重置
            reset2() {
                this.listQuery1.callUserPhone = "";
                this.listQuery1.callUserName = "";
            },
            //通话记录查询
            search2() {
                this.getList1()
            },
            //短信记录重置
            reset3() {
                this.listQuery2.smsUserPhone = "";
                this.listQuery2.smsUserName = "";
            },
            //短信记录查询
            search3() {
                this.getList2()
            },
            //APP查询
            search4() {
                this.getList5()
            },
            //返回
            goback() {
                this.$router.push({
                    path: '/trust/approvalDetail', 
                    name: '审批详情',
                    query: {
                        orderId: this.$route.query.orderId,
                        userId: this.$route.query.userId,
                        channel: this.$route.query.channel,
                        prodId: this.$route.query.prodId,
                        realName: this.$route.query.realName
                    }
                })   
            },
            handleSizeChange(val) {
                this.listQuery.limit = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.page = val;
                this.getList();
            },
            handleSizeChange1(val) {
                this.listQuery1.limit = val;
                this.getList1();
            },
            handleCurrentChange1(val) {
                this.listQuery1.page = val;
                this.getList1();
            },
            handleSizeChange2(val) {
                this.listQuery2.limit = val;
                this.getList2();
            },
            handleCurrentChange2(val) {
                this.listQuery2.page = val;
                this.getList2();
            },
            handleSizeChange3(val) {
                this.listQuery3.limit = val;
            },
            handleCurrentChange3(val) {
                this.listQuery3.page = val;
            },
            handleSizeChange4(val) {
                this.listQuery4.limit = val;
            },
            handleCurrentChange4(val) {
                this.listQuery4.page = val;
            },
            handleSizeChange5(val) {
                this.listQuery5.limit = val;
                this.getList5();
            },
            handleCurrentChange5(val) {
                this.listQuery5.page = val;
                this.getList5();
            }
        }
    }
</script>

<style scoped lang="scss">
.box-card-tab {
  width: 95%;
  margin-left: 2.5%;
  margin-right: 2.5%;
}
.tab-title {
  line-height: 30px;
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: bold;
}
.tab-title:before{
  display: block;
  content: "";
  width: 3px;
  height: 16px;
  background-color: #309afe;
}
.tab-title:before {
  margin-right: 8px;
}
::before {
  box-sizing: inherit;
  -webkit-tap-highlight-color: transparent;
}
.tabs {
    margin-top: 10px;
}
.menu-title {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
    width: 22%;
    margin-left: 2.5%;
    display: flex;
    justify-content: space-center;
    span {
      display: inline-block;
      width: 80px;
      text-align: right;
      font-size: 12px;
      font-weight: bold;
    }
    div:nth-child(2) {
      flex: 1;
    }
  }
  .searchItem-date {
    width: 32%;
  }
  .menu-title-btn {
    margin-left: 30px;
    button {
      padding: 0 20px;
      height: 28px;
      background: #20a0ff;
      color: #fff;
      outline: none;
      border-width: 0;
      margin-left: 15px;
      border-radius: 4px;
      font-size: 12px;
    }
  }
}
.tables {
  margin-left: 5%;
}
.pagination-container {
  width: 92%;
  margin-left: 4%;
  margin-bottom: 20px;
}
.topname {
    margin-bottom: 20px;
    font-weight: bold;
}
.back {
    width: 95%;
    margin-left: 2.5%;
    margin-top: 40px;
}
</style>