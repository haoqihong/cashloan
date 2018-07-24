import fetch from 'utils/fetch';
//分页
export function page(obj) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/receiveMoneyList',
        method: 'post',
        data: obj
    });
}
//催收人
export function getCollectUser(obj) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/getCollectUser',
        method: 'post',
        data: obj
    });
}