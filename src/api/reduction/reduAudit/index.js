import fetch from 'utils/fetch';
//减免审核分页
export function page(query) {
    return fetch({
        url: '/api/admin/approval/getCheckBreakPenalty',
        method: 'get',
        params: query
    });
}