import fetch from 'utils/fetch';
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/loanDispatchPage',
        method: 'get',
        params: query
    });
}
//点击指定处理人
export function getAllBaseUser(obj) {
    return fetch({
        url: '/api/admin/loanCommon/getAllBaseUser',
        method: 'post',
        data: obj
    })
}
//指定处理人吧确定
export function loanDispatch(obj) {
    return fetch({
        url: '/api/admin/loanCommon/loanDispatch',
        method: 'post',
        data: obj
    })
}