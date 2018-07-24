<template>
    <div class="approval-detail">
        <el-row style="margin-top: 110px;">
            <el-col :span="12">
                <el-card class="box-card" style="margin-right: 10px;">
                    <div class='title'>
                        {{$t('loanDetail.title1')}}
                    </div>
                    <div class="detail-info">
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.realName')}}:</span>
                            <span>{{info.realName}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.appUserName')}}:</span>
                            <span>{{info.appUserName}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.cardNum')}}:</span>
                            <span>{{info.cardNum}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.applyAmt')}}:</span>
                            <span>{{info.applyAmt}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.proName')}}:</span>
                            <span>{{info.proName}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.proTerm')}}:</span>
                            <span>{{info.proTerm}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.crtTime')}}:</span>
                            <span>{{info.crtTime}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.orderId')}}:</span>
                            <span>{{info.orderId}}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div class='title'>
                        {{$t('loanDetail.title2')}}
                    </div>
                    <div class="detail-info">
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.bankCard')}}:</span>
                            <span>{{info.bankCard}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.bankCode')}}:</span>
                            <span>{{info.bankCode}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.approvedAmt')}}:</span>
                            <span>{{info.approvedAmt}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span v-show="info.channel === 1" style="color: red;">{{$t('loanDetail.totalCreditserviceFee')}}:</span>
                            <span v-show="info.channel === 1">{{info.totalCreditserviceFee}}</span>
                            <span v-show="info.channel === 2" style="color: red;">{{$t('loanDetail.consultationfee')}}:</span>
                            <span v-show="info.channel === 2">{{info.totalCreditserviceFee}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span style="color: red;">{{$t('loanDetail.totalInterest')}}:</span>
                            <span>{{info.totalInterest}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span v-show="info.channel === 1" style="color: red;">{{$t('loanDetail.totalAccountFee')}}:</span>
                            <span v-show="info.channel === 1">{{info.totalAccountFee}}</span>
                            <span v-show="info.channel === 2" style="color: red;">{{$t('loanDetail.transferfee')}}:</span>
                            <span v-show="info.channel === 2">{{info.totalAccountFee}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.neteceipts')}}:</span>
                            <span>{{info.neteceipts}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span style="color: red;">{{$t('loanDetail.orgName')}}:</span>
                            <span>{{info.orgName}}</span>
                        </div>
                        <div class='detail-info-item'>
                            <span>{{$t('loanDetail.checkOpinion')}}:</span>
                            <span>{{info.checkOpinion}}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="back">
            <button type='button' @click='submit()'>
                {{$t('btn.submit')}}
            </button>
            <button type='button' @click='back'>
                {{$t('btn.back')}}
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { getUserByOrder, sureLoan } from 'api/loan/lenders/index';
    export default {
        data() {
            return {
                orderId: null,
                info: {},
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
            this.orderId = this.loanDetails.orderId
            let obj = {};
            obj.orderId = this.orderId;
            obj.msgType = this.lanStatus;
            //详情
            getUserByOrder(obj) 
            .then(response => {
                let msg = response.data;
                let re = /(?=(?!\b)(\d{3})+$)/g;
                let str = String(msg.applyAmt)
                msg.applyAmt =  str.replace(re, '.');

                let str2 = String(msg.approvedAmt)
                msg.approvedAmt =  str2.replace(re, '.');

                let str3 = String(msg.totalCreditserviceFee)
                msg.totalCreditserviceFee =  str3.replace(re, '.');

                let str4 = String(msg.totalInterest)
                msg.totalInterest =  str4.replace(re, '.');

                let str5 = String(msg.totalAccountFee)
                msg.totalAccountFee =  str5.replace(re, '.');

                let str6 = String(msg.neteceipts)
                msg.neteceipts =  str6.replace(re, '.');
                
                this.info = response.data;
            })
        },
        computed: {
            ...mapGetters(["elements", "language", "loanDetails"])
        },
        methods: {
            //提交
            submit() {
                this.$confirm(this.$t('loanDetail.cue1'), {
                    confirmButtonText: this.$t('btn.confirm'),
                    cancelButtonText: this.$t('btn.cancel'),
                    type: "warning",
                    center: true
                })
                .then(() => {
                    let msg = {}
                    msg.orderId = this.orderId;
                    msg.msgType = this.lanStatus;
                    sureLoan(msg)
                    .then(response => {
                        let view = {};
                        view.name = this.$route.name;
                        view.path = this.$route.path;
                        this.$store.dispatch('delVisitedViews', view)
                        this.$router.push({
                            path: '/loan/lenders', 
                            name: '业务放款'
                        })
                    })
                })
                .catch(() => {
                    this.$message({
                        showClose: true,
                        type: "info",
                        message: this.$t('loanDetail.cue3')
                    });
                });
            },
            back() {
                let view = {};
                view.name = this.$route.name;
                view.path = this.$route.path;
                this.$store.dispatch('delVisitedViews', view)
                this.$router.push('/loan/lenders')
            }
        }
    }
</script>

<style scoped lang="scss">
.box-card {
    height: 435px;
}
.approval-detail {
    padding: 0 20px;
    box-sizing: border-box;
}
input::-webkit-input-placeholder {
    font-size: 12px;
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
    .id-photo {
        width: 90%;
        margin: 10px 5%;
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