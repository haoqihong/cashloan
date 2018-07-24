import fetch from 'utils/fetch';
//催收业绩小组
export function getCollectGroup(obj) {
    return fetch({
        url: '/api/admin/loanCommon/getCollectGroup',
        method: 'post',
        data: obj
    });
}
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/collectTaskTotalPage',
        method: 'get',
        params: query
    });
}