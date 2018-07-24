import fetch from 'utils/fetch';
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/collectingcQuery',
        method: 'get',
        params: query
    });
}
//催收小组
export function getCollectGroup(obj) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/getCollectGroup',
        method: 'post',
        data: obj
    });
}