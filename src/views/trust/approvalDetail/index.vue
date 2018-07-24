<template>
    <div class="approval-detail">
        <el-row class='detail'>
            <el-col :span="7">
                <div class="detail-left">
                    <el-card class="box-card" style="margin-right: 8px;margin-bottom: 8px;">
                        <div class='title'>
                            {{$t('approvalDetail.personal')}}
                        </div>
                        <div class="detail-info">
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.realName')}}:</span>
                                <span>{{info.realName}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.phoneNo')}}:</span>
                                <span>{{info.phoneNo}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.cardNum')}}:</span>
                                <span>{{info.cardNum}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.customerCrtTime')}}:</span>
                                <span>{{info.customerCrtTime}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.certifiedCity')}}:</span>
                                <span>{{info.idCardAddress}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.certifiedDate')}}:</span>
                                <span>{{info.birthday}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.authMsg')}}:</span>
                                <span>{{info.authMsg}}<a href="javascript:void(0);" class="results" @click="seeResult">{{$t('approvalDetail.see')}}</a></span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.bankCards')}}:</span>
                                <span v-show="info.cardExist === 1" style="color: red;">{{info.bankCard}}</span>
                                <span v-show="info.cardExist === 0" style="color: #8a8a8c;">{{info.bankCard}}</span>
                            </div>
                            <div class='detail-info-item continue'>
                                <span>{{$t('approvalDetail.continue')}}:</span>
                                <span>{{this.continue}}</span>
                                <button type='button' v-show="this.continue === '是'" @click="loanHistory = true">{{$t('approvalDetail.seehis')}}</button>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.percent')}}:</span>
                                <span>{{this.percent}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.regGps')}}:</span>
                                <span>{{url.address1}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.subGps')}}:</span>
                                <span>{{url.address2}}</span>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card" style="margin-right: 8px;margin-bottom: 8px;">
                        <div class='title'>
                            {{$t('approvalDetail.business')}}
                        </div>
                        <div class="detail-info">
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.orderId')}}:</span>
                                <span>{{info.orderId}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.proName')}}:</span>
                                <span>{{info.proName}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.applyAmt')}}:</span>
                                <span>{{info.applyAmt}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.crtTime')}}:</span>
                                <span>{{info.crtTime}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('approvalDetail.proTerm')}}:</span>
                                <span>{{info.proTerm}}</span>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="detail-right">
                    <el-card class="box-card" style="margin-bottom: 8px;">
                        <div class='title'>
                            {{$t('approvalDetail.urgent')}}
                        </div>
                        <div class='contact-list'>
                            <el-table
                                :data="urgentContact"
                                style="width: 100%;font-size: 12px;"
                                border
                                >
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="contactsName"
                                    :label="$t('approvalDetail.contactsName')">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="mobile"
                                    :label="$t('approvalDetail.mobile')">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="relation"
                                    :label="$t('approvalDetail.relation')">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="addressBookStatus"
                                    :label="$t('approvalDetail.addressBookStatus')">
                                    <template scope="scope">
                                        <span v-if="scope.row.addressBookStatus=== 1">{{$t('approvalDetail.pass')}}</span>
                                        <span v-if="scope.row.addressBookStatus=== 2">{{$t('approvalDetail.nopass')}}</span>
                                    </template> 
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="checkStatus"
                                    :label="$t('approvalDetail.checkStatus')"
                                    show-overflow-tooltip>
                                    <template scope="scope">
                                        <span v-if="scope.row.checkStatus=== 2" >{{$t('approvalDetail.nohit')}}</span>
                                        <span v-if="scope.row.checkStatus=== 1" class="hit">
                                            {{$t('approvalDetail.hit')}}
                                            <a href="javascript:void(0)" @click="lookUp(scope.row)">{{$t('approvalDetail.hitsee')}}> </a>
                                        </span>
                                    </template> 
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                    <el-card class="box-card" style="margin-bottom: 8px;">
                        <div class='title'>
                            {{$t('approvalDetail.idcard')}}
                        </div>
                        <div class="id-photo">
                            <div id="image">
                                <div v-for="(item, index) in img1" :key="index">
                                    <img :src="item.imagePathUrl" alt="">
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card" style="margin-bottom: 8px;">
                        <div class='title'>
                            {{$t('approvalDetail.auth')}}
                        </div>
                        <div class="basic">
                            <div class="basic-title">
                                {{$t('approvalDetail.personal')}}
                            </div>
                            <el-table
                                :data="perInfo"
                                style="width: 100%;font-size: 12px;"
                                border
                                >
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="birthday"
                                    :label="$t('approvalDetail.birthday')"
                                    width="110">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="education"
                                    :label="$t('approvalDetail.education')"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="religious"
                                    :label="$t('approvalDetail.religious')"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="marriage"
                                    :label="$t('approvalDetail.marriage')"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="familyNum"
                                    :label="$t('approvalDetail.familyNum')"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="sonsNum"
                                    :label="$t('approvalDetail.sonsNum')"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="motherName"
                                    :label="$t('approvalDetail.motherName')"
                                    width="130">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="familyAddress"
                                    :label="$t('approvalDetail.familyAddress')"
                                    width="220"
                                    show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="basic">
                            <div class="basic-title">
                                {{$t('approvalDetail.work')}}
                            </div>
                            <el-table
                                :data="perInfo"
                                style="width: 100%;font-size: 12px;"
                                border
                                >
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="salary"
                                    :label="$t('approvalDetail.salary')"
                                    width="160">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="jobName"
                                    :label="$t('approvalDetail.jobName')"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="workYears"
                                    :label="$t('approvalDetail.workYears')"
                                    width="120">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="companyName"
                                    :label="$t('approvalDetail.companyName')"
                                    width="220"
                                    show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="companyTel"
                                    :label="$t('approvalDetail.companyTel')"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="companyNet"
                                    :label="$t('approvalDetail.companyNet')"
                                    width="100">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="companyAddress"
                                    :label="$t('approvalDetail.companyAddress')"
                                    width="220"
                                    show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="basic">
                            <div class="basic-title">
                                {{$t('approvalDetail.gam')}}
                            </div>
                            <div class="risk">
                                <div class='risk-item'>
                                    <span>{{$t('approvalDetail.risk')}}:</span>
                                    <span>{{hse}}</span>
                                    <button type='button' class='third' @click="dialogVisible = true">{{$t('approvalDetail.seegam')}}</button>
                                </div>
                            </div>
                        </div>
                        <div class="basic">
                            <div class="basic-title">
                                {{$t('approvalDetail.option')}}
                            </div>
                            <div class="optional">
                                <div class="optional-item">
                                    <div>
                                        <span>{{$t('approvalDetail.que1')}}</span>
                                        <span>
                                            {{$t('approvalDetail.amount')}}
                                        </span>
                                    </div>
                                    <div style="text-align: left;">
                                        <span>{{$t('approvalDetail.answer')}}</span>
                                        <span>
                                            {{authentication.problem1}}
                                        </span>
                                    </div>
                                </div>
                                <div class="optional-item">
                                    <div>
                                        <span>{{$t('approvalDetail.que2')}}</span>
                                        <span>
                                            {{$t('approvalDetail.doing')}}
                                        </span>
                                    </div>
                                    <div>
                                        <span>{{$t('approvalDetail.answer')}}</span>
                                        <span>
                                            {{authentication.problem2}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="basic">
                            <div class="basic-title">
                                {{$t('approvalDetail.supp')}}
                            </div>
                            <div class="id-photo">
                                <div id="image2">
                                    <div v-for="(item, index) in img2" :key="index">
                                        <img :src="item.imagePathUrl" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="basic">
                            <div class="basic-title">
                                {{$t('approvalDetail.equip')}}
                            </div>
                            <el-table
                                :data="equipment"
                                style="width: 100%;font-size: 12px;"
                                border
                                >
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="phoneName"
                                    :label="$t('approvalDetail.phoneName')">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="androidVersion"
                                    :label="$t('approvalDetail.andVersion')">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="installDate"
                                    :label="$t('approvalDetail.insDate')">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="appVersion"
                                    :label="$t('approvalDetail.appVersion')">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                    <el-card class="box-card" style="margin-bottom: 8px;">
                        <div class='title'>
                            {{$t('approvalDetail.view')}}
                        </div>
                        <div class='personal-opinion'>
                            <div class='personal-opinion-item'>
                                <span><i style="color: red;margin-right: 2px;">*</i>{{$t('approvalDetail.elenuc')}}</span>
                                <el-select v-model='telStatus' :placeholder="$t('rule.choose')" size='small'>
                                    <el-option
                                    v-for='item in electric'
                                    :key='item.value'
                                    :label='item.label'
                                    :value='item.value'>
                                    </el-option>
                                </el-select>
                            </div>
                            <div class='personal-opinion-item'>
                                <span>{{$t('approvalDetail.explain')}}</span>
                                <el-input type='textarea' v-model='telOpinion' :placeholder="$t('rule.toLength')" :maxlength="500"></el-input>
                            </div>
                            <div class='personal-opinion-item'>
                                <span><i style="color: red;margin-right: 2px;">*</i>{{$t('approvalDetail.result')}}</span>
                                <el-radio-group v-model='status' @change="changeHandler" style="margin: 10px 0;">
                                    <el-radio :label="$t('approvalDetail.adopt')" size='mini'></el-radio>
                                    <el-radio :label="$t('approvalDetail.refuse')" size='mini'></el-radio>
                                    <el-radio :label="$t('approvalDetail.derate')" size='mini'></el-radio>
                                </el-radio-group>
                                <div class='personal-info-item' v-show="isQuota">
                                    <span><i style="color: red;margin-right: 2px;">*</i>{{$t('approvalDetail.limit')}}</span>
                                    <el-input type="number" v-model='approvedAmt' placeholder='' size='mini' @input="blurFn"></el-input>
                                </div>
                            </div>
                            <div class='personal-opinion-item'>
                                <span>{{$t('approvalDetail.remarks')}}</span>
                                <el-input type='textarea' v-model='checkOpinion' :placeholder="$t('rule.toLength')" :maxlength="500"></el-input>
                            </div>
                        </div>
                    </el-card>
                    <div class="back">
                        <button type='button' @click='submit'>
                            {{$t('btn.submit')}}
                        </button>
                        <button type='button' @click='back'>
                            {{$t('btn.back')}}
                        </button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-dialog :title="$t('approvalDetail.rlt')" :visible.sync="dialogTableVisible">
            <div class="custom-form">
                <div class="thead">
                    <div>{{$t('approvalDetail.rltname')}}</div>
                    <div>{{$t('approvalDetail.mobile')}}</div>
                    <div>{{$t('approvalDetail.relation')}}</div>
                    <div>{{$t('approvalDetail.loanstatus')}}</div>
                </div>
                <div class="tbody">
                    <div>{{gridData.contactsName}}</div>
                    <div>{{gridData.mobile}}</div>
                    <div>{{gridData.relation}}</div>
                    <div>{{gridData.status}}</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogTableVisible = false">{{$t('btn.close')}}</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible" width="100%" top="10%">
            <div class="gam-info">
                <div class='tab-title'>
                    {{$t('approvalDetail.gaminfo')}}
                </div>
                <el-tabs class="tabs" type="card" v-model="activeName2" @tab-click="handleClick">
                    <el-tab-pane :label="$t('approvalDetail.maillist')" name="first">
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
                    <el-tab-pane :label="$t('approvalDetail.calllog')" name="second">
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
                    <el-tab-pane :label="$t('approvalDetail.smslog')" name="third">
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
                    <el-tab-pane :label="$t('approvalDetail.top')" name="fourth">
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
                    <el-tab-pane :label="$t('approvalDetail.gamapp')" name="fifth">
                        <div class="menu-search">
                            <el-table
                                v-loading="listLoading5"
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
                                :label="$t('approvalDetail.num')"
                                width="90">
                                <template scope="scope">
                                    <span>{{scope.row.index}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column
                                header-align="center"
                                align="center"
                                prop='appName'
                                :label="$t('approvalDetail.names')">
                                </el-table-column>
                                <el-table-column
                                header-align="center"
                                align="center"
                                prop='type'
                                :label="$t('approvalDetail.type')">
                                </el-table-column>
                            </el-table>
                            <div class="pagination-container">
                                <el-pagination
                                @size-change="handleSizeChange5"
                                @current-change="handleCurrentChange5"
                                :current-page="listQuery5.page"
                                :page-sizes="[5, 10, 20, 50]"
                                :page-size="listQuery5.limit"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total5">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">{{$t('btn.close')}}</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="$t('approvalDetail.loanhis')" :visible.sync="loanHistory">
            <div class="loan-info">
                <div class="loan-item">
                    <span>{{$t('approvalDetail.realName')}}:</span>
                    <span>{{info.realName}}</span>
                </div>
                <div class="loan-item">
                    <span>{{$t('approvalDetail.phoneNo')}}:</span>
                    <span>{{info.phoneNo}}</span>
                </div>
                <div class="loan-item">
                    <span>{{$t('approvalDetail.bankCards')}}:</span>
                    <span>{{info.bankCard}}</span>
                </div>
            </div>
            <el-table
                :data="historyTable"
                border
                style="width: 100%">
                <el-table-column
                header-align="center"
                align="center"
                :label="$t('approvalDetail.num')"
                type="index"
                width="65">
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                :label="$t('approvalDetail.orderId')"
                width="200">
                <template scope="scope">
                    <span class="href">{{scope.row.orderId}}</span>
                </template>
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                prop="proName"
                :label="$t('approvalDetail.proName')"
                width="200">
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                prop="crtTime"
                :label="$t('approvalDetail.crtTime')"
                width="200">
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                prop="lendDate"
                :label="$t('approvalDetail.loanTime')"
                width="200">
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                prop="applyAmt"
                :label="$t('approvalDetail.applyAmts')"
                width="200">
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                prop="neteceipts"
                :label="$t('approvalDetail.neteceipts')"
                width="200">
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                prop="lastPayDate"
                :label="$t('approvalDetail.lastPayDate')"
                width="200">
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                prop="realRepayDate"
                :label="$t('approvalDetail.realRepayDate')"
                width="200">
                </el-table-column>
                <el-table-column
                header-align="center"
                align="center"
                prop="status"
                :label="$t('approvalDetail.orderStatus')"
                width="200">
                <template scope="scope">
                    <span v-if="scope.row.status=== 3">{{$t('approvalDetail.status1')}}</span>
                    <span v-if="scope.row.status=== 4">{{$t('approvalDetail.status2')}}</span>
                    <span v-if="scope.row.status=== 5">{{$t('approvalDetail.status3')}}</span>
                    <span v-if="scope.row.status=== 6">{{$t('approvalDetail.status4')}}</span>
                    <span v-if="scope.row.status=== 7">{{$t('approvalDetail.status5')}}</span>
                    <span v-if="scope.row.status=== 8">{{$t('approvalDetail.status6')}}</span>
                </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="loanHistory = false">{{$t('btn.close')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Viewer from 'viewerjs'
    import 'viewerjs/dist/viewer.css'
    import { mapGetters } from "vuex";
    import { getInfo, getContact, getHit, getImg, getCustomerInfo, getAppInfo, getApprOrder, getResultById, hisPage, getPercent, resolveGps } from 'api/trust/approvalDetail/index';
    import { addressPage, callPage, smsInfoPage, top20Call, top20Sms, appPage } from 'api/trust/addressList/index';
    export default {
        data() {
            return {
                url: {
                    address1: '',
                    address2: ''
                },
                percent: '',
                listLoading: true,
                listLoading1: true,
                listLoading2: true,
                listLoading3: true,
                listLoading4: true,
                listLoading5: true,
                historyTable: [{
                    orderId: '',//业务ID
                    proName: '',//产品名称
                    crtTime: '',//申请时间
                    lendDate: '',//放款时间
                    applyAmt: '',//审批金额
                    neteceipts: '',//放款金额
                    lastPayDate: '',//到期时间
                    realRepayDate: '',//还款时间
                    status: ''//订单状态
                }],
                loanHistory: false,
                continue: '',
                imgList: [],
                img1: [],
                img2: [],
                info: {
                    "realName": "",//客户姓名
                    "phoneNo": "",//客户手机号
                    "cardNum": "",//身份证卡号
                    "customerCrtTime": "",//个人信息注册时间
                    "orderId": "",//业务ID
                    "proName": "",//产品名称
                    "applyAmt": "",//申请金额
                    "crtTime": "",//申请时间
                    "proTerm": ""//申请期限
                },
                certifiedCity: "",
                certifiedDate: "",
                certifiedResult: "",
                urgentContact: [],
                dialogTableVisible: false,
                gridData: {
                    contactsName: '',
                    mobile: '',
                    relation: '',
                    status: '',
                },
                hse: this.$t('approvalDetail.noobtain'),
                equipment: [],
                telStatus: "",
                status: "",
                telOpinion: "",
                checkOpinion: "",
                approvedAmt: "",
                isQuota: false,
                electric: [
                    {
                    value: 1,
                    label: this.$t('approvalDetail.yes')
                    },
                    {
                    value: 2,
                    label: this.$t('approvalDetail.no')
                    }
                ],
                orderId: null,
                prodId: null,
                imgQuery: {
                    userId: null,
                    channel: null
                },
                authentication: {
                    problem1: '',
                    problem2: '',
                },
                perInfo: [],
                dialogVisible: false,
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
                listQuery5: {
                    userId: undefined,
                    appName: '',
                    limit: 5,
                    page: 1
                },
                total5: null,
                tableData: [],
                tableData1: [],
                tableData2: [],
                tableData3: [],
                tableData4: [],
                tableData5: [],
                userId: '',
                realName: '',
                lanStatus: null
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
            //GPS
            let gps = {};
            gps.orderId = this.orderId;
            resolveGps(gps)
            .then(response => {
                response.data.gpsList.forEach(item => {
                    if(item.saveType === '1') {
                        this.url.address1 = item.address
                    } else if(item.saveType === '2') {
                        this.url.address2 = item.address
                    }
                })
            })
            //历史记录
            let hisObj = {};
            hisObj.orderId = this.orderId;
            hisPage(hisObj)
            .then(response => {
                this.historyTable = response.data;
            })
            //个人信息 业务审批信息
            let per = {};
            per.orderId = this.orderId
            getInfo(per)
            .then(response => {
                let re = /(?=(?!\b)(\d{3})+$)/g;
                let str = String(response.data.applyAmt)
                response.data.applyAmt =  str.replace(re, '.');
                this.info = response.data;
                if(response.data.loanContinued === 0) {
                    this.continue = this.$t('approvalDetail.no')
                } else if(response.data.loanContinued === 1) {
                    this.continue = this.$t('approvalDetail.yes')
                }
            })
            //top20占比
            let percents = {};
            percents.userId = this.imgQuery.userId;
            getPercent(percents)
            .then(response => {
                this.percent = response.data.percent;
            })
            //紧急联系人
            let contact = {};
            contact.orderId = this.orderId
            contact.msgType = this.lanStatus
            getContact(contact)
            .then(response => {
                this.urgentContact = response.data;
            })
            //获取客服认证信息
            let obj = {};
            obj.userId = this.imgQuery.userId;
            obj.msgType = this.lanStatus;
            getCustomerInfo(obj) 
            .then(response => {
                response.data.loanCustomerInfo.workYears = response.data.loanCustomerInfo.workYears + this.$t('approvalDetail.year')
                this.perInfo.push(response.data.loanCustomerInfo)
                this.authentication.problem1 = this.perInfo[0].needMoney;
                this.authentication.problem2 = this.perInfo[0].moneyToDo;
            })
            //获取设备信息
            let appinfo = {};
            appinfo.userId = this.imgQuery.userId;
            getAppInfo(appinfo) 
            .then(response => {
                let obj = {};
                obj.phoneName = response.data.phoneBrand + response.data.phoneModels;
                obj.androidVersion = response.data.androidVersion;
                obj.installDate = response.data.installDate;
                obj.appVersion = response.data.appVersion;
                this.equipment.push(obj)
            })
            this.getParams();
            this.getList();
        },
        computed: {
            ...mapGetters(["elements", "language", "apprDetails"])
        },
        mounted () {
            this.viewer()
        },
        methods: {
            viewer() {
                //获取图片
                let imgs = {};
                imgs.userId = this.imgQuery.userId;
                imgs.channel = this.imgQuery.channel;
                getImg(imgs) 
                .then(response => {
                    this.imgList = response.data.imgPathList
                    this.imgList.forEach(item => {
                        if(item.imageType === 1) {
                            this.img1.push(item)
                        } else if(item.imageType === 2) {
                            this.img1.push(item)
                        }else {
                            this.img2.push(item)
                        }
                    })
                    this.$nextTick(()=>{
                        const viewer = new Viewer(document.getElementById('image'));
                        const viewer2 = new Viewer(document.getElementById('image2'));
                    } )
                })
            },
            getParamsDetail () {
                this.orderId = this.apprDetails.orderId;
                this.imgQuery.userId = this.apprDetails.userId;
                this.imgQuery.channel = this.apprDetails.channel;
                this.prodId = this.apprDetails.prodId;
            },
            //查看认证结果
            seeResult () {
                let obj = {};
                obj.orderId = this.orderId;
                getResultById(obj)
                .then(response => {
                    this.info.authMsg = response.data;
                })
            },
            //查看
            lookUp(row) {
                //命中
                let hit = {};
                hit.mobile = row.mobile;
                getHit(hit) 
                .then(response => {
                    this.gridData.contactsName = row.contactsName;
                    this.gridData.mobile = row.mobile;
                    this.gridData.relation = row.relation;
                    switch(response.data.status) {
                        case '100':
                            this.gridData.status = this.$t('approvalDetail.registered')
                        break;
                        case '1':
                            this.gridData.status = this.$t('approvalDetail.audit')
                        break;
                        case '2':
                            this.gridData.status = this.$t('approvalDetail.credit')
                        break;
                        case '3':
                            this.gridData.status = this.$t('approvalDetail.repayments')
                        break;
                        case '4':
                            this.gridData.status = this.$t('approvalDetail.refused')
                        break;
                        case '5':
                            this.gridData.status = this.$t('approvalDetail.clear')
                        break;
                    }
                    this.dialogTableVisible = true;
                })
            },
            //审批结果改变时
            changeHandler(val) {
                if(val == this.$t('approvalDetail.derate')) {
                    this.isQuota = true
                } else {
                    this.isQuota = false
                }
            },
            //提交
            submit() {
                if(this.telStatus === "" && this.status === "" || this.telStatus === "") {
                    this.$message({
                        showClose: true,
                        message: this.$t('approvalDetail.cue4'),
                        type: 'warning'
                    });
                } else if(this.status === "") {
                    this.$message({
                        showClose: true,
                        message: this.$t('approvalDetail.cue5'),
                        type: 'warning'
                    });
                } else if(this.status === this.$t('approvalDetail.derate') && this.approvedAmt === '') {
                    this.$message({
                        showClose: true,
                        message: this.$t('approvalDetail.cue10'),
                        type: 'warning'
                    });
                } else {
                    let format = this.info.applyAmt.replace(/\./g,'')
                    if(Number(this.approvedAmt) > Number(format)) {
                        this.$message({
                            showClose: true,
                            message: this.$t('approvalDetail.cue7'),
                            type: 'warning'
                        });
                    } else if (Number(this.approvedAmt) < 10000 && this.approvedAmt !== ''){
                        this.$message({
                            showClose: true,
                            message: this.$t('approvalDetail.cue9'),
                            type: 'warning'
                        });
                    } else {
                        this.$confirm(this.$t('approvalDetail.cue1'), {
                            confirmButtonText: this.$t('btn.confirm'),
                            cancelButtonText: this.$t('btn.cancel'),
                            type: "warning",
                            center: true
                        })
                        .then(() => {
                            let view = {};
                            view.name = this.$route.name;
                            view.path = this.$route.path;
                            this.$store.dispatch('delVisitedViews', view).then((views) => {
                                const latestView = views.slice(-1)[0]
                                if (latestView) {
                                    this.$router.push(latestView.path)
                                } else {
                                    this.$router.push('/')
                                }
                            })

                            let msg = {};
                            msg.orderId = this.orderId;
                            msg.telStatus = this.telStatus;
                            msg.telOpinion = this.telOpinion;
                            if (this.status === this.$t('approvalDetail.adopt')) {
                                msg.type = 1;
                            }else if(this.status === this.$t('approvalDetail.derate')) {
                                msg.type = 2;
                                msg.approvedAmt = Number(this.approvedAmt);
                            } else if(this.status === this.$t('approvalDetail.refuse')) {
                                msg.type = 3;
                            }
                            if(this.status === this.$t('approvalDetail.derate') && Number(this.approvedAmt) <= Number(format)) {
                                msg.approvedAmt = Number(this.approvedAmt);
                            } else {
                                msg.approvedAmt = Number(format);
                            } 
                            msg.checkOpinion = this.checkOpinion;
                            msg.pId = this.prodId;
                            msg.msgType = this.lanStatus;
                            getApprOrder(msg) 
                            .then(response => {
                                if (response.data.success === "1") {
                                    this.$message({
                                        showClose: true,
                                        type: "success",
                                        message: this.$t('approvalDetail.cue2')
                                    });
                                    this.$router.push({
                                        path: '/trust/approval', 
                                        name: '业务审批'
                                    })
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: this.$t('approvalDetail.cue8'),
                                        type: 'warning'
                                    });
                                    this.$router.push({
                                        path: '/trust/approval', 
                                        name: '业务审批'
                                    })
                                }
                            })
                        })
                        .catch(() => {
                            this.$message({
                                showClose: true,
                                type: "info",
                                message: this.$t('approvalDetail.cue3')
                            });
                        });
                    }
                }
            },
            //返回
            back() {
                let view = {};
                view.name = this.$route.name;
                view.path = this.$route.path;
                this.$store.dispatch('delVisitedViews', view)
                this.$router.push('/trust/approval')
            },
            //审批额度效验
            blurFn() {
                let msg = this.info.applyAmt.replace(/\./g,'')
                if(Number(this.approvedAmt) > Number(msg)) {
                    this.$message({
                        showClose: true,
                        message: this.$t('approvalDetail.cue7'),
                        type: 'warning'
                    });
                }
            },
            getParams () {
                this.userId = this.apprDetails.userId;
                this.realName = this.apprDetails.realName;
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
            getList5() {
                //APP
                this.listQuery5.userId = this.userId;
                appPage(this.listQuery5)
                .then(response => {
                    if(response.status === 200) {
                        this.listLoading5 = false;
                        this.tableData5 = response.data.rows;
                        this.tableData5.forEach((item, index) => {
                            item.index = index + (this.listQuery5.page - 1) * this.listQuery5.limit + 1
                        })
                        this.total5 = Number(response.data.total);
                    } else {
                        this.listLoading5 = true;
                    }
                })
            },
            handleClick(tab, event) {
                if(tab.label === this.$t('approvalDetail.calllog')) {
                    this.getList1();
                } else if(tab.label === this.$t('approvalDetail.smslog')) {
                    this.getList2();
                } else if(tab.label === this.$t('approvalDetail.top')) {
                    this.getList3();
                    this.getList4();
                } else if(tab.label === this.$t('approvalDetail.gamapp')) {
                    this.getList5();
                }
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
input::-webkit-input-placeholder {
    font-size: 12px;
}
.approval-detail {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    position: relative;
}
.title {
  line-height: 30px;
  font-size: 16px;
  display: flex;
  padding-bottom: 10px;
  box-sizing: border-box;
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
.el-table {
    z-index: 0;
}
.detail-info {
    font-size: 12px;
    .detail-info-item {
        line-height: 35px;
        span:nth-child(1) {
            margin-right: 5px;
            color: #616264;
        }
        span:nth-child(2) {
            color: #8a8a8c;
            display: inline-block;
            line-height: 20px;
        }
    }
    .contact-list {
        width: 90%;
        margin: 10px 5%;
    }
}

.id-photo {
    padding: 20px;
    box-sizing: border-box;
    #image, #image2 {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    #image>div, #image2>div {
        width: 30%;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 3%;
        img {
            width: 100%;
        }
    }
}
.risk {
    font-size: 12px;
    .risk-item {
        padding: 20px 0 20px 28px;
        box-sizing: border-box;     
        button {
            padding: 0 20px;
            height: 28px;
            outline: none;
            border-width: 0;
            border-radius: 4px;
            font-size: 12px;
            background: #ebf5ff;
            color: #20a0ff;
            border: 1px solid #abd5ff;
            margin-left: 50px;
        }
    }
}
.basic {
    width: 100%;
    border-radius: 3px;
    border: 1px solid #ebeef5;
    margin-bottom: 40px;
    .basic-title {
        height: 40px;
        line-height: 40px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        background: #ebeef5;
        padding-left: 28px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: bold;
    }
    .optional {
        display: flex;
        font-size: 12px;
        .optional-item {
            flex: 1;
            padding: 10px 0 10px 10%;
            box-sizing: border-box;
            border-right: 1px solid #ebeef5;
            &:last-child {
                border: none;
            }
            &>div {
                line-height: 25px;
                span:nth-child(1) {
                    margin-right: 5px;
                    color: #616264;
                }
                span:nth-child(2) {
                    color: #8a8a8c;
                }
            }
        }
    }
}
.personal-opinion {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    .personal-opinion-item {
        width: 100%;
        margin: 10px 0;
        display: flex;
        align-items: center;
        span {
            display: inline-block;
            width: 90px;
            text-align: right;
            font-size: 12px;
            font-weight: bold;
            margin-right: 15px;
            color: #616264;
        }
        div:nth-child(2), div:nth-child(4){
            width: 20%;
        }
        &:nth-child(2),
        &:nth-child(4),
        &:nth-child(6) {
            width: 100%;
            div:nth-child(2) {
                width: 80%;
            }
        }
        &:nth-child(3),
        &:nth-child(5) {
            width: 100%;
            div:nth-child(2) {
                width: 50%;
            }
        }
    }
}
.hit {
    color: red;
    &>a {
        position: absolute;
        right: 10px;
        color:#20a0ff;
        text-decoration: underline;
    }
}
.results {
    margin-left: 5px;
    color:#20a0ff;
    text-decoration: underline;
}
.custom-form {
    width: 100%;
    text-align: center;
    .thead {
        line-height: 45px;
        display: flex;
        font-weight: bold;
        &>div { 
            flex: 1;
            border-left: 1px solid #eee;
            border-top: 1px solid #eee;
            &:last-child {
                border-right: 1px solid #eee;
            }
        }
    }
    .tbody {
        line-height: 45px;
        display: flex;
        &>div { 
            flex: 1;
            border-left: 1px solid #eee;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            &:last-child {
                border-right: 1px solid #eee;
            }
        }
    }
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
    margin-bottom: 20px;
    font-weight: bold;
}
.addressList {
    width: 800px;
}
.continue>button {
    padding: 0 15px;
    height: 28px;
    line-height: 28px;
    outline: none;
    border-width: 0;
    border-radius: 4px;
    font-size: 12px;
    background: #ebf5ff;
    color: #20a0ff;
    border: 1px solid #abd5ff;
    margin-left: 10px;
}
.loan-info {
    width: 100%;
    display: flex;
    padding: 10px 0;
    box-sizing: border-box;
    .loan-item {
        width: 30%;
        text-align: left;
        span:nth-child(1) {
            margin-right: 5px;
        }
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
.back { 
    margin-top: 40px;
    margin-bottom: 80px;
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
</style>