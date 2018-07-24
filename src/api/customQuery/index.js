import fetch from 'utils/fetch';
//获取渠道接口
export function getChannels() {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/getChannels',
        method: 'get'
    });
}
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/getCustomerInfo',
        method: 'get',
        params: query
    });
}