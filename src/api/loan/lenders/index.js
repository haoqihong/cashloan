import fetch from 'utils/fetch';
//组织机构下拉
export function getListOrg(obj) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/getListOrg',
        method: 'post',
        data: obj
    });
}
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/loanPageList',
        method: 'get',
        params: query
    });
}
//获取详情
export function getUserByOrder(obj) {
    return fetch({
        url: '/api/admin/loanCommon/getUserByOrder',
        method: 'post',
        data: obj
    });
}
//放款确认
export function sureLoan(obj) {
    return fetch({
        url: '/api/admin/loanCommon/sureLoan',
        method: 'post',
        data: obj
    });
}