import fetch from 'utils/fetch';
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/loanTotalPageList',
        method: 'get',
        params: query
    });
}
//组织机构下拉
export function getListOrg(obj) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/getListOrg',
        method: 'post',
        data: obj
    });
}
//导出
export function exportListExel(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/loanTotalPageListExel',
        method: 'get',
        params: query
    });
}