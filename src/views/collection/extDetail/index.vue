<template>
    <div class="new-group">
        <el-tabs class="tabs" type="card" v-model="activeName2" @tab-click="handleClick">
            <el-tab-pane :label="$t('collDetail.collHandle')" name="first">
                <el-card style="margin-bottom: 20px;">
                    <div class='title'>
                        {{$t('collDetail.cust')}}
                    </div>
                    <div class="customer">
                        <div class="customer-item">
                            <span>{{$t('collDetail.realName')}}：</span>
                            <span>{{customerInfo.realName}}</span>
                        </div>
                        <div class="customer-item">
                            <span>{{$t('collDetail.phoneNo')}}：</span>
                            <span>{{customerInfo.appUserName}}</span>
                        </div>
                        <div class="customer-item">
                            <span>{{$t('collDetail.companyTel')}}：</span>
                            <span>{{customerInfo.companyTel}}</span>
                        </div>
                        <div class="customer-item">
                            <span>{{$t('collDetail.urgentName1')}}：</span>
                            <span>{{contact1.contactsName}}</span>
                        </div>
                        <div class="customer-item">
                            <span>{{$t('collDetail.phoneNo')}}：</span>
                            <span>{{contact1.mobile}}</span>
                        </div>
                        <div class="customer-item">
                            <span>{{$t('collDetail.relation')}}：</span>
                            <span>{{contact1.relation}}</span>
                        </div>
                        <div class="customer-item">
                            <span>{{$t('collDetail.urgentName2')}}：</span>
                            <span>{{contact2.contactsName}}</span>
                        </div>
                        <div class="customer-item">
                            <span>{{$t('collDetail.phoneNo')}}：</span>
                            <span>{{contact1.mobile}}</span>
                        </div>
                        <div class="customer-item">
                            <span>{{$t('collDetail.relation')}}：</span>
                            <span>{{contact1.relation}}</span>
                        </div>
                    </div>
                </el-card>
                <el-card class="el-card" style="margin-bottom: 40px;">
                    <div class='title'>
                        {{$t('collDetail.collResult')}}
                    </div>
                    <div class='personal-opinion'>
                        <div class='personal-opinion-item'>
                            <span><i style="color: red;margin-right: 2px;">*</i>{{$t('collDetail.callResult')}}</span>
                            <el-select v-model='inp1' :placeholder="$t('rule.choose')">
                                <el-option
                                v-for='item in callStatus'
                                :key='item.value'
                                :label='item.label'
                                :value='item.value'>
                                </el-option>
                            </el-select>
                        </div>
                        <div class='personal-opinion-item'>
                            <span><i style="color: red;margin-right: 2px;">*</i>{{$t('collDetail.errorReason')}}</span>
                            <el-select v-model='inp2' :placeholder="$t('rule.choose')">
                                <el-option
                                v-for='item in errorResult'
                                :key='item.value'
                                :label='item.label'
                                :value='item.value'>
                                </el-option>
                            </el-select>
                        </div>
                        <div class='personal-opinion-item'>
                            <span><i style="color: red;margin-right: 2px;">*</i>{{$t('collDetail.handleResult')}}</span>
                            <el-select v-model='inp3' :placeholder="$t('rule.choose')" @change="changeFn">
                                <el-option
                                v-for='item in handleResult'
                                :key='item.value'
                                :label='item.label'
                                :value='item.value'>
                                </el-option>
                            </el-select>
                        </div>
                        <div class='personal-opinion-item'>
                            <span>{{$t('collDetail.overdueAmt')}}</span>
                            <el-input v-model='overdueAmt' :disabled="true"></el-input>
                            <b class="unit">IDR</b>
                        </div>
                        <div class='personal-opinion-item'>
                            <span>{{$t('collDetail.breakAmt')}}</span>
                            <el-input v-model='breakAmt' :disabled="isDis" v-on:input ="inputFunc"></el-input>
                            <b class="unit">IDR</b>
                        </div>
                        <div class='personal-opinion-item remarks'>
                            <span>{{$t('collDetail.collRemark')}}</span>
                            <el-input type='textarea' :rows="2" v-model='collectRemark' :placeholder="$t('rule.explain')"></el-input>
                        </div>
                        <div class='personal-opinion-item datas'>
                            <el-table
                                class="tables"
                                :data="recordList"
                                style="width: 85%;font-size: 12px;margin-left: 33px;"
                                border
                                >
                                <el-table-column 
                                    header-align="center" 
                                    align="center" 
                                    :label="$t('collDetail.num')"
                                    width="65"
                                    type="index">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="dealCrtTime"
                                    :label="$t('collDetail.crtTime')"
                                    width="200">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="callResult"
                                    :label="$t('collDetail.callResult')">
                                    <template scope="scope">
                                        <span v-if="scope.row.callResult=== '1'">{{$t('collDetail.normal')}}</span>
                                        <span v-if="scope.row.callResult=== '2'">{{$t('collDetail.fail')}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="callFailedReason"
                                    :label="$t('collDetail.callFailedReason')">
                                    <template scope="scope">
                                        <span v-if="scope.row.callFailedReason=== '1'">{{$t('collDetail.reason1')}}</span>
                                        <span v-else-if="scope.row.callFailedReason=== '2'">{{$t('collDetail.reason2')}}</span>
                                        <span v-else-if="scope.row.callFailedReason=== '3'">{{$t('collDetail.reason3')}}</span>
                                        <span v-else-if="scope.row.callFailedReason=== '4'">{{$t('collDetail.reason4')}}</span>
                                        <span v-else-if="scope.row.callFailedReason=== '5'">{{$t('collDetail.reason5')}}</span>
                                        <span v-else-if="scope.row.callFailedReason=== '6'">{{$t('collDetail.reason6')}}</span>
                                        <span v-else-if="scope.row.callFailedReason=== '7'">{{$t('collDetail.reason7')}}</span>
                                        <span v-else-if="scope.row.callFailedReason=== '8'">{{$t('collDetail.reason8')}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="dealResult"
                                    :label="$t('collDetail.handleResult')">
                                    <template scope="scope">
                                        <span v-if="scope.row.dealResult=== '1'">{{$t('collDetail.result1')}}</span>
                                        <span v-else-if="scope.row.dealResult=== '2'">{{$t('collDetail.result2')}}</span>
                                        <span v-else-if="scope.row.dealResult=== '3'">{{$t('collDetail.result3')}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="collectRemark"
                                    :label="$t('collDetail.collectRemark')">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="baseUserName"
                                    :label="$t('collDetail.operator')">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="personal-opinion-item pagination-container" style="margin-left: 30px;">
                            <el-pagination
                            @size-change="handleSizeChangeColl"
                            @current-change="handleCurrentChangeColl"
                            :current-page="listQueryColl.page"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="listQueryColl.limit"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalColl">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="back">
                        <button type='button' @click='submit'>
                            {{$t('btn.confirm')}}
                        </button>
                        <button type='button' @click='cancel'>
                            {{$t('btn.cancel')}}
                        </button>
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane :label="$t('approvalDetail.maillist')" name="second">
                <div class='menu-search'> 
                    <div class='menu-title'>
                        <div class='searchItem'>
                            <span>{{$t('approvalDetail.phoneNo')}}</span>
                            <el-input v-model='listQuery.phoneNo' :placeholder="$t('rule.phoneNo')" size='small'></el-input>
                        </div>
                        <div class='searchItem'>
                            <span>{{$t('approvalDetail.contactName')}}</span>
                            <el-input v-model='listQuery.contactName' :placeholder="$t('rule.realName')" size='small'></el-input>
                        </div>
                        <div class='menu-title-btn'>
                            <button type='button' @click='search'>
                                {{$t('btn.search')}}
                            </button>
                            <button type='button' @click='reset'>
                                {{$t('btn.reset')}}
                            </button>
                        </div>
                    </div>
                    <el-table
                        v-loading="listLoading"
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
                        :label="$t('approvalDetail.num')"
                        width="90">
                        <template scope="scope">
                            <span>{{scope.row.index}}</span>
                        </template>
                        </el-table-column>
                        <!-- <el-table-column
                        header-align="center"
                        align="center"
                        prop='realName'
                        :label="$t('approvalDetail.realName')"
                        width="240">
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='contactPhone'
                        :label="$t('approvalDetail.phone')"
                        width="180">
                        </el-table-column> -->
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='contactName'
                        :label="$t('approvalDetail.contactName')"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='contactPhone'
                        :label="$t('approvalDetail.contactPhone')"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='contactStatus'
                        :label="$t('approvalDetail.contactStatus')"
                        width="180">
                        <template scope="scope">
                            <span v-if="scope.row.contactStatus=== 1">{{$t('approvalDetail.yes')}}</span>
                            <span v-if="scope.row.contactStatus=== 2">{{$t('approvalDetail.no')}}</span>
                        </template> 
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='contactRelation'
                        :label="$t('approvalDetail.relation')"
                        width="120">
                        </el-table-column>
                    </el-table>
                    <div class="pagination-container">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="listQuery.page"
                        :page-sizes="[5, 10, 20, 50]"
                        :page-size="listQuery.limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('approvalDetail.calllog')" name="third">
                <div class='menu-search'> 
                    <div class='menu-title'>
                        <div class='searchItem'>
                            <span>{{$t('approvalDetail.phoneNo')}}</span>
                            <el-input v-model='listQuery1.callUserPhone' :placeholder="$t('rule.phoneNo')" size='small'></el-input>
                        </div>
                        <div class='searchItem'>
                            <span>{{$t('approvalDetail.contactName')}}</span>
                            <el-input v-model='listQuery1.callUserName' :placeholder="$t('rule.realName')" size='small'></el-input>
                        </div>
                        <div class='menu-title-btn'>
                            <button type='button' @click='search2'>
                                {{$t('btn.search')}}
                            </button>
                            <button type='button' @click='reset2'>
                                {{$t('btn.reset')}}
                            </button>
                        </div>
                    </div>
                    <el-table
                        v-loading="listLoading1"
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
                        :label="$t('approvalDetail.num')"
                        width="90">
                        <template scope="scope">
                            <span>{{scope.row.index}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='callUserName'
                        :label="$t('approvalDetail.contactsName')"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='callUserPhone'
                        :label="$t('approvalDetail.phoneNo')"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='callStatus'
                        :label="$t('approvalDetail.callStartTime')"
                        width="180">
                            <template scope="scope">
                                <span v-if="scope.row.callStatus=== '1'">{{$t('approvalDetail.call')}}</span>
                                <span v-if="scope.row.callStatus=== '2'">{{$t('approvalDetail.oncall')}}</span>
                            </template> 
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='callStatus'
                        :label="$t('approvalDetail.callStatus')"
                        width="240">
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='callTime'
                        :label="$t('approvalDetail.callTime')"
                        width="120">
                        </el-table-column>
                    </el-table>
                    <div class="pagination-container">
                        <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page="listQuery1.page"
                        :page-sizes="[5, 10, 20, 50]"
                        :page-size="listQuery1.limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total1">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('approvalDetail.smslog')" name="fourth">
                <div class='menu-search'>
                    <el-table
                        v-loading="listLoading2"
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
                        :label="$t('approvalDetail.num')"
                        width="90">
                        <template scope="scope">
                            <span>{{scope.row.index}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='smsUserName'
                        :label="$t('approvalDetail.contactsName')"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='smsUserPhone'
                        :label="$t('approvalDetail.phoneNo')"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='smsStatus'
                        :label="$t('approvalDetail.smsStatus')"
                        width="120">
                            <template scope="scope">
                                <span v-if="scope.row.smsStatus=== '2'">{{$t('approvalDetail.send')}}</span>
                                <span v-if="scope.row.smsStatus=== '1'">{{$t('approvalDetail.receive')}}</span>
                            </template> 
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='smsCrtTime'
                        :label="$t('approvalDetail.smsCrtTime')"
                        width="240">
                        </el-table-column>
                        <el-table-column
                        header-align="center"
                        align="center"
                        prop='smsContent'
                        :label="$t('approvalDetail.smsContent')"
                        width="300">
                        </el-table-column>
                    </el-table>
                    <div class="pagination-container">
                        <el-pagination
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :current-page="listQuery2.page"
                        :page-sizes="[5, 10, 20, 50]"
                        :page-size="listQuery2.limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total2">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('approvalDetail.top')" name="fifth">
                <div class="topname">{{$t('approvalDetail.calllog')}}</div>
                <el-table
                    v-loading="listLoading3"
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
                    :label="$t('approvalDetail.num')"
                    width="90">
                    <template scope="scope">
                        <span>{{scope.row.index}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    header-align="center"
                    align="center"
                    prop='callUserName'
                    :label="$t('approvalDetail.contactsName')">
                    </el-table-column>
                    <el-table-column
                    header-align="center"
                    align="center"
                    prop='callUserPhone'
                    :label="$t('approvalDetail.phoneNo')">
                    </el-table-column>
                    <el-table-column
                    header-align="center"
                    align="center"
                    prop='totalNum'
                    :label="$t('approvalDetail.totalNum')">
                    </el-table-column>
                    <el-table-column
                    header-align="center"
                    align="center"
                    prop='totalCallTime'
                    :label="$t('approvalDetail.totalCallTime')">
                    </el-table-column>
                </el-table>
                <div class="pagination-container">
                    <el-pagination
                    @size-change="handleSizeChange3"
                    @current-change="handleCurrentChange3"
                    :current-page="listQuery3.page"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="listQuery3.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData3.length">
                    </el-pagination>
                </div>
                <div class="topname">{{$t('approvalDetail.smslog')}}</div>
                <el-table
                    v-loading="listLoading4"
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
                    :label="$t('approvalDetail.num')"
                    width="90">
                    <template scope="scope">
                        <span>{{scope.row.index}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    header-align="center"
                    align="center"
                    prop='smsUserName'
                    :label="$t('approvalDetail.contactsName')">
                    </el-table-column>
                    <el-table-column
                    header-align="center"
                    align="center"
                    prop='smsUserPhone'
                    :label="$t('approvalDetail.phoneNo')">
                    </el-table-column>
                    <el-table-column
                    header-align="center"
                    align="center"
                    prop='totalNum'
                    :label="$t('approvalDetail.smstotalNum')">
                    </el-table-column>
                    <el-table-column
                    header-align="center"
                    align="center"
                    prop='sendNum'
                    :label="$t('approvalDetail.sendNum')">
                    </el-table-column>
                    <el-table-column
                    header-align="center"
                    align="center"
                    prop='getNum'
                    :label="$t('approvalDetail.getNum')">
                    </el-table-column>
                </el-table>
                <div class="pagination-container">
                    <el-pagination
                    @size-change="handleSizeChange4"
                    @current-change="handleCurrentChange4"
                    :current-page="listQuery4.page"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="listQuery4.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData4.length">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { busRecordPage, collectTask } from 'api/collection/processing/index'
    import { getContact } from 'api/trust/approvalDetail/index';
    import { addressPage, callPage, smsInfoPage, top20Call, top20Sms } from 'api/trust/addressList/index';
    export default {
        data() {
            return {
                listLoading: true,
                listLoading1: true,
                listLoading2: true,
                listLoading3: true,
                listLoading4: true,
                activeName2: 'first',
                listQuery: {
                    userId: undefined,
                    contactName: '',
                    phoneNo: '',
                    limit: 5,
                    page: 1
                },
                total: null,
                listQuery1: {
                    userId: undefined,
                    callUserName: '',
                    callUserPhone: '',
                    limit: 5,
                    page: 1
                },
                total1: null,
                listQuery2: {
                    userId: undefined,
                    smsUserName: '',
                    smsUserPhone: '',
                    limit: 5,
                    page: 1
                },
                total2: null,
                listQuery3: {
                    page: 1,
                    limit: 5
                },
                total3: null,
                listQuery4: {
                    page: 1,
                    limit: 5
                },
                total4: null,
                tableData: [],
                tableData1: [],
                tableData2: [],
                tableData3: [],
                tableData4: [],
                userId: '',
                realName: '',
                isDis: true,
                totalColl: null,
                listQueryColl: {
                    "limit": 10, //每页条数
                    "page": 1, //当前页数
                    "orderId": ""
                },
                inp1: '',
                inp2: '',
                inp3: '',
                overdueAmt: '',
                breakAmt: '',
                collectRemark: '',
                callStatus: [
                    {
                        value: '',
                        label: this.$t('rule.choose')
                    },
                    {
                        value: '1',
                        label: this.$t('collDetail.normal')
                    },
                    {
                        value: '2',
                        label: this.$t('collDetail.fail')
                    }
                ],
                errorResult: [
                    {
                        value: '',
                        label: this.$t('rule.choose')
                    },
                    {
                        value: '1',
                        label: this.$t('collDetail.reason1')
                    },
                    {
                        value: '2',
                        label: this.$t('collDetail.reason2')
                    },
                    {
                        value: '3',
                        label: this.$t('collDetail.reason3')
                    },
                    {
                        value: '4',
                        label: this.$t('collDetail.reason4')
                    },
                    {
                        value: '5',
                        label: this.$t('collDetail.reason5')
                    },
                    {
                        value: '6',
                        label: this.$t('collDetail.reason6')
                    },
                    {
                        value: '7',
                        label: this.$t('collDetail.reason7')
                    },
                    {
                        value: '8',
                        label: this.$t('collDetail.reason8')
                    }
                ],
                handleResult: [
                    {
                        value: '',
                        label: this.$t('rule.choose')
                    },
                    {
                        value: '1',
                        label: this.$t('collDetail.result1')
                    },
                    // {
                    //     value: '2',
                    //     label: this.$t('collDetail.result2')
                    // },
                    {
                        value: '3',
                        label: this.$t('collDetail.result3')
                    }
                ],
                recordList: [
                    {
                        "dealCrtTime": "",//操作时间
                        "callResult": "",//通话结果
                        "callFailedReason": "",//失败原因
                        "dealResult": "",//处理结果
                        "collectRemark": "",//催收意见
                        "baseUserName": ""//操作人
                    }
                ],
                lanStatus: null,
                customerInfo: {
                    realName: '',
                    appUserName: '',
                    companyTel: ''
                },
                contact1: {
                    contactsName: '',
                    mobile: '',
                    relation: ''
                },
                contact2: {
                    contactsName: '',
                    mobile: '',
                    relation: ''
                }
            }
        },
        created() {
            if (this.language === 'zh') {
                this.lanStatus = 1;
            } else if (this.language === 'en') {
                this.lanStatus = 2;
            } else {
                this.lanStatus = 3;
            }
            this.getParamsDetail()
            //表格
            this.getListColl()
            this.getParams();
            //紧急联系人
            let contact = {};
            contact.orderId = this.listQueryColl.orderId
            contact.msgType = this.lanStatus
            getContact(contact)
            .then(response => {
                if(response.data.length === 2) {
                    this.contact1 = response.data[0]
                    this.contact2 = response.data[1]
                } else if (response.data.length === 1) {
                    this.contact1 = response.data[0]
                }
            })
        },
        computed: {
            ...mapGetters(["elements", "language", "extDetails"])
        },
        methods: {
            inputFunc() {
                let msg = this.overdueAmt.replace(/\./g,'')
                if(this.breakAmt > Number(msg)) {
                    this.$message({
                        message: this.$t('collDetail.msg1'),
                        type: 'warning'
                    });
                } else if(this.breakAmt < 0) {
                    this.$message({
                        message: this.$t('collDetail.msg2'),
                        type: 'warning'
                    });
                }
            },
            changeFn() {
                if (this.inp3 === '3') {
                    this.isDis = false;
                } else {
                    this.isDis = true;
                }
            },
            getParamsDetail() {
                this.listQueryColl.orderId = this.extDetails.orderId
                this.overdueAmt = this.extDetails.overdueAmt
                this.customerInfo.realName = this.extDetails.realName
                this.customerInfo.appUserName = this.extDetails.appUserName
                this.customerInfo.companyTel = this.extDetails.companyTel
            },
            //表格
            getListColl() {
                busRecordPage(this.listQueryColl)
                .then(response => {
                    this.recordList = response.data.rows;
                    this.totalColl = Number(response.data.total);
                })
            },
            //确定
            submit() {
                if(this.inp1 !== '' && this.inp2 !== '' && this.inp3 !== '') {
                    this.$confirm(this.$t('loanDetail.cue1'), {
                        confirmButtonText: this.$t('btn.confirm'),
                        cancelButtonText: this.$t('btn.cancel'),
                        type: "warning",
                        center: true
                    })
                    .then(() => {
                        let msg = {};
                        msg.taskId = this.extDetails.id;
                        msg.orderId = this.extDetails.orderId;
                        msg.telResult = this.inp1;
                        msg.callFailReason = this.inp2;
                        msg.delResult = this.inp3;
                        msg.subAmt = this.breakAmt;
                        msg.collectRemark = this.collectRemark;
                        collectTask(msg)
                        .then(response => {
                            if(response.status === 200) {
                                let view = {};
                                view.name = this.$route.name;
                                view.path = this.$route.path;
                                this.$store.dispatch('delVisitedViews', view)
                                this.$router.push({
                                    path: '/collection/externalUrge', 
                                    name: '电催'
                                })
                            }
                        })
                    })
                    .catch(() => {
                        this.$message({
                            showClose: true,
                            type: "info",
                            message: this.$t('loanDetail.cue3')
                        });
                    });
                } else if(this.inp1 === '') {
                    this.$message({
                        showClose: true,
                        message: this.$t('collDetail.warn1'),
                        type: 'warning'
                    });
                } else if(this.inp2 === '') {
                    this.$message({
                        showClose: true,
                        message: this.$t('collDetail.warn2'),
                        type: 'warning'
                    });
                } else if(this.inp3 === '') {
                    this.$message({
                        showClose: true,
                        message: this.$t('collDetail.warn3'),
                        type: 'warning'
                    });
                }
            },
            cancel() {
                let view = {};
                view.name = this.$route.name;
                view.path = this.$route.path;
                this.$store.dispatch('delVisitedViews', view)
                this.$router.push('/collection/externalUrge')
            },
            handleSizeChangeColl(val) {
                this.listQueryColl.limit = val;
                this.getListColl()
            },
            handleCurrentChangeColl(val) {
                this.listQueryColl.page = val;
                this.getListColl()
            },
            getParams () {
                this.userId = this.extDetails.userId;
                this.realName = this.extDetails.realName;
            },
            handleClick(tab, event) {
                if(tab.label === this.$t('collDetail.addressList')) {
                    this.getList();
                } else if(tab.label === this.$t('collDetail.calllog')) {
                    this.getList1();
                } else if(tab.label === this.$t('collDetail.smslog')) {
                    this.getList2();
                } else if(tab.label === this.$t('collDetail.top')) {
                    this.getList3();
                    this.getList4();
                }
            },
            getList() {
                //通话录
                this.listQuery.userId = this.userId
                addressPage(this.listQuery)
                .then(response => {
                    if(response.status === 200) {
                        this.listLoading = false;
                        response.data.rows.forEach(item => {
                            item.realName = this.realName;
                        })
                        this.tableData = response.data.rows;
                        this.tableData.forEach((item, index) => {
                            item.index = index + (this.listQuery.page - 1) * this.listQuery.limit + 1
                        })
                        this.total = Number(response.data.total);
                    } else {
                        this.listLoading = true;
                    }
                })
            },
            getList1() {
                //通话记录
                this.listQuery1.userId = this.userId
                callPage(this.listQuery1)
                .then(response => {
                    if(response.status === 200) {
                        this.listLoading1 = false;
                        this.tableData1 = response.data.rows;
                        this.tableData1.forEach((item, index) => {
                            item.index = index + (this.listQuery1.page - 1) * this.listQuery1.limit + 1
                        })
                        this.total1 = Number(response.data.total);
                    } else {
                        this.listLoading1 = true;
                    }
                })
            },
            getList2() {
                //短信记录
                this.listQuery2.userId = this.userId
                smsInfoPage(this.listQuery2)
                .then(response => {
                    if(response.status === 200) {
                        this.listLoading2 = false;
                        this.tableData2 = response.data.rows;
                        this.tableData2.forEach((item, index) => {
                            item.index = index + (this.listQuery2.page - 1) * this.listQuery2.limit + 1
                        })
                        this.total2 = Number(response.data.total);
                    } else {
                        this.listLoading2 = true;
                    }
                })
            },
            getList3() {
                //通话top
                let obj = {};
                obj.userId = this.userId;
                top20Call(obj)
                .then(response => {
                    if(response.status === 200) {
                        this.listLoading3 = false;
                        this.tableData3 = response.data
                        this.tableData3.forEach((item, index) => {
                            item.index = index + (this.listQuery3.page - 1) * this.listQuery3.limit + 1
                        })
                    } else {
                        this.listLoading3 = true;
                    }
                })
            },
            getList4() {
                //短信top
                let obj1 = {};
                obj1.userId = this.userId;
                top20Sms(obj1)
                .then(response => {
                    if(response.status === 200) {
                        this.listLoading4 = false;
                        this.tableData4 = response.data
                        this.tableData4.forEach((item, index) => {
                            item.index = index + (this.listQuery4.page - 1) * this.listQuery4.limit + 1
                        })
                    } else {
                        this.listLoading4 = true;
                    }
                })
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
            }
        }
    }
</script>

<style scoped lang="scss">
.new-group {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    position: relative;
}
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
.personal-opinion {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    .personal-opinion-item {
        width: 100%;
        margin: 20px 0;
        display: flex;
        align-items: center;
        &>span {
            display: inline-block;
            width: 80px;
            text-align: right;
            font-size: 12px;
            font-weight: bold;
            margin-right: 15px;
            color: #616264;
        }
        &>div {
            width: 20%;
        }
    }
    .remarks {
        width: 100%;
        display: flex;
        align-items: flex-start;
        div:nth-child(2) {
            width: 80%;
        }
    }
    .datas {
        width: 100%;
        div:nth-child(2) {
            width: 80%;
        }
    }
}
.back { 
    margin: 10px 0 40px 0;
    button {
        padding: 0 20px;
        height: 28px;
        background: #20a0ff;
        color: #fff;
        outline: none;
        border-width: 0;
        border-radius: 4px;
        font-size: 12px;
        &:nth-child(2) {
            margin-left: 10px;
            background: #ebf5ff;
            color: #20a0ff;
            border: 1px solid #abd5ff;
        }
    }
}
.unit {
    font-weight: normal;
    margin-left: 5px;
    font-size: 12px;
}
.menu-title {
  width: 90%;
  height: 50px;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 5%;
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
    width: 30%;
    margin-left: 2%;
    display: flex;
    justify-content: space-center;
    span {
      display: inline-block;
      width: 86px;
      text-align: right;
      font-size: 12px;
      font-weight: bold;
    }
    div:nth-child(2) {
      width: 116px;
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
    margin-left: 20px;
    margin-bottom: 20px;
    font-weight: bold;
}
.customer {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    .customer-item {
        width: 30%;
        text-align: left;
        line-height: 35px;
        span:nth-child(1) {
            display: inline-block;
            width: 110px;
            text-align: right;
            margin-right: 5px;
            color: #616264;
        }
        span:nth-child(2) {
            color: #8a8a8c;
        }
    }
}
</style>