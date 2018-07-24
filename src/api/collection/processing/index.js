import fetch from 'utils/fetch';
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/collectTaskPage',
        method: 'get',
        params: query
    });
}
//催收详情表格
export function busRecordPage(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/businessRecordPage',
        method: 'get',
        params: query
    });
}
//催收详情保存
export function collectTask(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/collectTask',
        method: 'get',
        params: query
    });
}
//领取任务
export function getTask() {
    return fetch({
        url: '/api/admin/approval/getCollectTasks',
        method: 'post'
    });
}
//任务退回
export function returnTask(obj) {
    return fetch({
        url: '/api/admin/approval/recycleCollectTask',
        method: 'post',
        data: obj
    });
}