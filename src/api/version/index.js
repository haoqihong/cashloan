import fetch from 'utils/fetch';
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/pageAppVersion',
        method: 'get',
        params: query
    });
}
//启动和禁用
export function updateAppStatus(obj) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/updateAppStatus',
        method: 'post',
        data: obj
    });
}
//升级保存
export function uploadApk(obj) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/uploadApk',
        method: 'post',
        data: obj
    });
}