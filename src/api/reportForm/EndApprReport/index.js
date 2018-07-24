import fetch from 'utils/fetch';
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/orderCheckReport',
        method: 'get',
        params: query
    });
}