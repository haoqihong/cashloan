import fetch from 'utils/fetch';
//个人信息 业务审批信息
export function getInfo(obj) {
    return fetch({
        url: '/api/admin/loanCommon/orderCusInfo',
        method: 'post',
        data: obj
    });
}
//紧急联系人
export function getContact(obj) {
    return fetch({
        url: '/api/admin/loanCommon/getContacts',
        method: 'post',
        data: obj
    })
}
//命中
export function getHit(obj) {
    return fetch({
        url: '/api/admin/loanCommon/hitCheck',
        method: 'post',
        data: obj
    })
}
//获取图片接口
export function getImg(obj) {
    return fetch({
        url: '/api/admin/loanCommon/getImgList',
        method: 'post',
        data: obj
    })
}
//获取客服认证信息
export function getCustomerInfo(obj) {
    return fetch({
        url: '/api/admin/loanCommon/getCustomerById',
        method: 'post',
        data: obj
    })
}
//获取设备信息
export function getAppInfo(obj) {
    return fetch({
        url: '/api/admin/loanCommon/getAppInfo',
        method: 'post',
        data: obj
    })
}
//审批接口
export function getApprOrder(obj) {
    return fetch({
        url: '/api/admin/loanCommon/apprOrder',
        method: 'post',
        data: obj
    })
}
//信审回显
export function getApproInfo(obj) {
    return fetch({
        url: '/api/admin/loanCommon/getApproInfo',
        method: 'post',
        data: obj
    })
}
//终审审批
export function finalApprovel(obj) {
    return fetch({
        url: '/api/admin/loanCommon/finalApprovel',
        method: 'post',
        data: obj
    })
}
//查看认证结果
export function getResultById(query) {
    return fetch({
        url: '/api/admin/loanCommon/getResultById',
        method: 'get',
        params: query
    })
}
//历史记录分页
export function hisPage(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/selectHistoryList',
        method: 'get',
        params: query
    });
}
//top20占通讯录百分比
export function getPercent(obj) {
    return fetch({
        url: '/api/admin/loanCommon/top20Percent',
        method: 'post',
        data: obj
    });
}
//GPS
export function resolveGps(obj) {
    return fetch({
        url: '/api/admin/loanCommon/resolveGps',
        method: 'post',
        data: obj
    });
}