<template>
    <div class="approval-detail">
        <el-row class='detail'>
            <el-col :span="6">
                <div class="detail-left">
                    <el-card class="box-card" style="margin-right: 8px;margin-bottom: 8px;">
                        <div class='title'>
                            {{$t('approvalDetail.personal')}}
                        </div>
                        <div class="detail-info">
                            <div class='detail-info-item'>
                                <span>{{$t('reduDetail.realName')}}:</span>
                                <span>{{info.realName}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('reduDetail.phoneNo')}}:</span>
                                <span>{{info.userName}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('reduDetail.loanAmt')}}:</span>
                                <span>{{info.approvedAmt}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('reduDetail.applyDate')}}:</span>
                                <span>{{info.crtTime}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('reduDetail.lastPayDate')}}:</span>
                                <span>{{info.lastPayDate}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('reduDetail.overDay')}}:</span>
                                <span>{{info.overdueDay}}{{$t('reduDetail.day')}}</span>
                            </div>
                            <div class='detail-info-item'>
                                <span>{{$t('reduDetail.overdueAmt')}}:</span>
                                <span>{{info.overdueAmt}}/IDR</span>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="detail-right">
                    <el-card class="box-card" style="margin-bottom: 8px;">
                        <div class='title'>
                            {{$t('reduDetail.adjust')}}
                        </div>
                        <div class='personal-opinion'>
                            <div class='personal-opinion-item'>
                                <div class="inps">
                                    <span><i style="color: red;margin-right: 2px;">*</i>{{$t('reduDetail.type')}}</span>
                                    <el-select v-model='save.breakType' :placeholder="$t('rule.choose')" size='small'>
                                        <el-option
                                        v-for='item in redutype'
                                        :key='item.value'
                                        :label='item.label'
                                        :value='item.value'>
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="inps">
                                    <span><i style="color: red;margin-right: 2px;">*</i>{{$t('reduDetail.breakAmt')}}</span>
                                    <el-input v-model='save.breakAmt' placeholder='' size='mini' v-on:input ="inputFunc"></el-input>
                                </div>
                                <div class="inps">
                                    <span>{{$t('reduDetail.redOverAmt')}}：</span>
                                    <div>{{redOverAmt}}/IDR</div>
                                </div>
                                <div class="inps">
                                    <span>{{$t('reduDetail.redRepAmt')}}：</span>
                                    <div>{{redRepAmt}}/IDR</div>
                                </div>
                            </div>
                            <div class='personal-opinion-item remarks'>
                                <span><i style="color: red;margin-right: 2px;">*</i>{{$t('reduDetail.breakReason')}}</span>
                                <el-input type='textarea' v-model='save.breakReason' :placeholder="$t('rule.explain')"></el-input>
                            </div>
                            <div class="id-photo">
                                <div id="image3">
                                    <el-upload
                                    ref="upload"
                                    class="upload-demo"
                                    :action="UploadUrl()"
                                    :on-remove="handleRemove"
                                    :file-list="imgList"
                                    list-type="picture"
                                    :on-success="uploadSuccess"
                                    :on-error="uploadError"
                                    :multiple="true"
                                    :headers= "{Authorization: token}">
                                        <el-button size="small" type="primary" @click="submitUpload">{{$t('reduDetail.upload')}}</el-button>
                                        <div slot="tip" class="el-upload__tip">{{$t('reduDetail.prompt')}}</div>
                                    </el-upload>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card" style="margin-bottom: 8px;">
                        <div class='title'>
                            {{$t('reduDetail.record')}}
                        </div>
                        <div class='contact-list'>
                            <el-table
                                :data="recordList"
                                style="width: 100%;font-size: 12px;"
                                border
                                >
                                <el-table-column 
                                    header-align="center" 
                                    align="center" 
                                    :label="$t('reduDetail.num')"
                                    width="65"
                                    type="index">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="crtTime"
                                    :label="$t('reduDetail.crtTime')"
                                    width="200">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="breakType"
                                    :label="$t('reduDetail.type')"
                                    width="200">
                                    <template scope="scope">
                                        <span v-if="scope.row.breakType=== '1'">{{$t('reduDetail.breakType1')}}</span>
                                        <span v-else-if="scope.row.breakType=== '2'">{{$t('reduDetail.breakType2')}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="breakAmt"
                                    :label="$t('reduDetail.breakAmt')"
                                    width="200">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="breakReason"
                                    :label="$t('reduDetail.breakReason')"
                                    width="200">
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="breakStatus"
                                    :label="$t('reduDetail.breakStatus')"
                                    width="200">
                                    <template scope="scope">
                                        <span v-if="scope.row.breakStatus=== '10'">{{$t('reduDetail.breakStatus1')}}</span>
                                        <span v-else-if="scope.row.breakStatus=== '20'">{{$t('reduDetail.breakStatus2')}}</span>
                                        <span v-else-if="scope.row.breakStatus=== '30'">{{$t('reduDetail.breakStatus3')}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="crtUser"
                                    :label="$t('reduDetail.operator')"
                                    width="200">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                    <div class="back">
                        <button type='button' @click='keep'>
                            {{$t('btn.conserve')}}
                        </button>
                        <button type='button' @click='close'>
                            {{$t('btn.close')}}
                        </button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import IDimg from 'assets/images/ID.jpg'
    import Viewer from 'viewerjs'
    import 'viewerjs/dist/viewer.css'
    import { mapGetters } from "vuex";
    import { getTable, saveData, uploadImg, multiUploadImage, removeImg, getImgList } from 'api/reduction/reduDetail/index'
    export default {
        data() {
            return {
                redOverAmt: "",
                redRepAmt: "",
                uuid: null,
                imgList: [],
                save: {
                    orderId: "",
                    uuid: "",
                    breakType: "",
                    breakAmt: "",
                    breakReason: ""
                },
                IDimg,
                imgs: [],
                info: {
                    "approvedAmt": "",//金额
                    "attr8": "",
                    "crtTime": "",//申请时间
                    "lastPayDate": "",//到期时间
                    "orderId": "",//业务ID
                    "overdueAmt": "",//逾期罚息
                    "overdueDay": "",//逾期天数
                    "pName": "",//产品名称
                    "realName": "",//客户姓名
                    "userName": "",//手机号
                    "breakAmt": "",//减免金额
                    "breakRepayAmt":""//减免后应还金额
                },
                recordList: [
                    {
                        "crtTime": "",//操作时间
                        "breakType": "",//减免类型
                        "breakAmt": "",//减免金额
                        "breakReason": "",//减免原因
                        "breakStatus": "",//审核状态
                        "crtUser": ""//操作人
                    }
                ],
                redutype: [
                    {
                        value: "1",
                        label: this.$t('reduDetail.breakType1')
                    },
                    {
                        value: "2",
                        label: this.$t('reduDetail.breakType2')
                    }
                ],
                lanStatus: null,
                fileType: null

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
            let obj = {};
            obj.orderId = this.info.orderId;
            getTable(obj)
            .then(response => {
                if (response.length !== 0) {
                    response.forEach(item => {
                        let re = /(?=(?!\b)(\d{3})+$)/g;
                        let str = String(item.breakAmt)
                        item.breakAmt =  str.replace(re, '.');
                    })
                    this.recordList = response;
                }
            })
            //查询图片
            this.searchFn()
            //生成uuid
            this.guid()
            //减免后罚息
            
        },
        computed: {
            ...mapGetters(["elements", "language", "token", "reduDetails"])
        },
        mounted () {
            this.viewer()
        },
        methods: {
            getParamsDetail() {
                if(this.reduDetails.lastPayDate instanceof Array) {
                    this.reduDetails.lastPayDate = this.reduDetails.lastPayDate.join()
                }
                this.info = this.reduDetails;
            },
            inputFunc() {
                let msg = this.info.overdueAmt.replace(/\./g,'')
                this.info.overdueAmt = msg
                if(this.save.breakAmt < Number(this.info.overdueAmt) && this.save.breakAmt >= 0 && this.save.breakAmt !== "") {
                    this.redOverAmt = Number(this.info.overdueAmt) - this.save.breakAmt;//减免后罚息
                    this.redRepAmt = this.info.repayAmt - this.save.breakAmt;//减免后应还金额
                } else if(this.save.breakAmt === ""){
                    this.redOverAmt = "";
                    this.redRepAmt = "";
                } else {
                    this.$message({
                        message: this.$t('reduDetail.msg'),
                        type: 'warning'
                    });
                    this.redOverAmt = "";
                    this.redRepAmt = "";
                }
            },
            //查询图片
            searchFn() {
                let msg = {};
                msg.orderId = this.uuid;
                msg.fileType = 1;
                getImgList(msg)
                .then(response => {
                    response.data.forEach(item => {
                        let imgs = {};
                        imgs.url = item.url
                        imgs.name = item.imagePath
                        this.imgList.push(imgs)
                    })
                })
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            // 上传成功后的回调
            uploadSuccess (response, file, fileList) {
                let arr = [];
                response.data.forEach((item, index) => {
                    let obj = {};
                    obj.orderId = this.uuid;
                    obj.imageType = 1;
                    obj.imageName = "MA";
                    obj.imagePath = item;
                    obj.channel = "";
                    arr.push(obj);
                })
                let msg = {};
                msg.imgList = arr
                multiUploadImage(msg)
                .then(response => {
                    //console.log(response)
                })
            },
            // 上传错误
            uploadError (response, file, fileList) {
                console.log('上传失败，请重试！')
            },
            UploadUrl() {
                return '/api/admin/loanCommon/' + 1 + '/uploadImg';     
            },
            //删除图片
            handleRemove(file, fileList) {
                let obj = {};
                obj.filePath = file.name
                removeImg(obj)
                .then(response => {
                    //console.log(response)
                })
            },
            viewer() {
                //获取图片
                const viewer = new Viewer(document.getElementById('image3'));
            },
            S4() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            },
            guid() {
                this.uuid =  (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
            },
            //保存
            keep() {
                if (this.save.breakType !== "" && this.save.breakAmt !== "" && this.save.breakReason !== "") {
                    this.$confirm(this.$t('loanDetail.cue1'), {
                        confirmButtonText: this.$t('btn.confirm'),
                        cancelButtonText: this.$t('btn.cancel'),
                        type: "warning",
                        center: true
                    })
                    .then(() => {
                        this.save.orderId = this.info.orderId;
                        this.save.uuid = this.uuid;
                        saveData(this.save)
                        .then(response => {
                            if(response.status === 200) {
                                this.$message({
                                    message: this.$t('reduDetail.savesuccess'),
                                    type: 'success'
                                });
                                let view = {};
                                view.name = this.$route.name;
                                view.path = this.$route.path;
                                this.$store.dispatch('delVisitedViews', view)
                                this.$router.push({
                                    path: '/reduction/reduApply', 
                                    name: '减免申请'
                                })
                            } else {
                                this.$message({
                                    message: this.$t('reduDetail.savefail'),
                                    type: 'warning'
                                });
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
                } else if(this.save.breakType === "") {
                    this.$message({
                        showClose: true,
                        message: this.$t('reduDetail.msg1'),
                        type: 'warning'
                    });
                } else if(this.save.breakAmt === "") {
                    this.$message({
                        showClose: true,
                        message: this.$t('reduDetail.msg2'),
                        type: 'warning'
                    });
                } else if(this.save.breakReason === "") {
                    this.$message({
                        showClose: true,
                        message: this.$t('reduDetail.msg3'),
                        type: 'warning'
                    });
                }
            },
            //返回
            close() {
                let view = {};
                view.name = this.$route.name;
                view.path = this.$route.path;
                this.$store.dispatch('delVisitedViews', view)
                this.$router.push({
                    path: '/reduction/reduApply', 
                    name: '减免申请'
                })
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
        }
    }
    .contact-list {
        width: 90%;
        margin: 10px 5%;
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
            width: 80px;
            text-align: right;
            font-size: 12px;
            font-weight: bold;
            margin-right: 6px;
            color: #616264;
        }
        .inps {
            width: 25%;
            display: flex;
            align-items: center;
            &:nth-child(3),
            &:nth-child(4){
                span {
                    display: inline-block;
                    width: 100px;
                    margin-right: 6px;
                }
                &>div {
                    font-size: 12px;
                    flex: 1;
                }
            }
            &>div {
                flex: 1;
            }
        }
    }
    .remarks {
        width: 100%;
        div:nth-child(2) {
            width: 80%;
        }
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
.id-photo {
    padding: 20px;
    box-sizing: border-box;
    #image3{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    #image3>div{
        width: 50%;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 3%;
        img {
            width: 100%;
        }
    }
}
.upload {
    padding: 0 0 0 20px;
    box-sizing: border-box;
}
.gridClass {
    position: relative;
    margin: 1rem 0;
}
.showDelBtn {
    border-style: none;
    background: none;
    padding: 0px;
    margin: 0px;
    position: absolute;
    right: -10px;
    top:  -10px;
    outline: none;
}
</style>