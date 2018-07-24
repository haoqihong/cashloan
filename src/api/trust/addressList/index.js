import fetch from 'utils/fetch';
//通讯录
export function addressPage(query) {
    return fetch({
        url: '/api/admin/loanCommon/addressPage',
        method: 'get',
        params: query
    });
}
//通话记录
export function callPage(query) {
    return fetch({
        url: '/api/admin/loanCommon/callPage',
        method: 'get',
        params: query
    });
}
//短信记录
export function smsInfoPage(query) {
    return fetch({
        url: '/api/admin/loanCommon/smsInfoPage',
        method: 'get',
        params: query
    });
}
//TOP20 通话记录
export function top20Call(obj) {
    return fetch({
        url: '/api/admin/loanCommon/top20Call',
        method: 'post',
        data: obj
    });
}
//TOP20 短信记录
export function top20Sms(obj) {
    return fetch({
        url: '/api/admin/loanCommon/top20Sms',
        method: 'post',
        data: obj
    });
}
//社交App 
export function appPage(query) {
    return fetch({
        url: '/api/admin/loanCommon/appPage',
        method: 'get',
        params: query
    });
}