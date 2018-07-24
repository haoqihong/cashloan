import fetch from 'utils/fetch';
//领取任务
export function getTask() {
    return fetch({
        url: '/api/admin/approval/getApprovalTasks',
        method: 'post'
    });
}
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/businessApprovalListPage',
        method: 'get',
        params: query
    });
}