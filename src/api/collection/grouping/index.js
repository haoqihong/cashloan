import fetch from 'utils/fetch';
//分页
export function page(query) {
    return fetch({
        url: '/api/admin/loanOrderApplyTown/loanCollectAuthPage',
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
//启用或停用
export function beginOrStop(obj) {
    return fetch({
        url: '/api/admin/loanCommon/beginOrStop',
        method: 'post',
        data: obj
    });
}
//根据组ID查询对应成员
export function getUserById(obj) {
    return fetch({
        url: '/api/admin/loanCommon/getListUserByGroupId',
        method: 'post',
        data: obj
    });
}
//编辑保存
export function editSave(obj) {
    return fetch({
        url: '/api/admin/loanCommon/saveOrUpdateCollect',
        method: 'post',
        data: obj
    });
}