import fetch from 'utils/fetch';
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/collectQueryPage',
        method: 'get',
        params: query
    });
}
//权限下拉
export function getCollectDay(obj) {
    return fetch({
        url: '/api/admin/loanCommon/getListCollectDay',
        method: 'post',
        data: obj
    });
}