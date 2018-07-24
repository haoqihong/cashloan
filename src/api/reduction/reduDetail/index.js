import fetch from 'utils/fetch';
//表格
export function getTable(query) {
    return fetch({
        url: '/api/admin/approval/getAllBreakPenalty',
        method: 'get',
        params: query
    });
}
//申请保存
export function saveData(obj) {
    return fetch({
        url: '/api/admin/approval/saveBreakPenalty',
        method: 'post',
        data: obj
    });
}
//上传图片
export function uploadImg(fileType, obj) {
    return fetch({
        url: '/api/admin/loanCommon/' + fileType + '/uploadImg',
        method: 'post',
        data: obj
    });
}
//上传图片后传递参数 orderId  imageType imageName imagePath channel
export function multiUploadImage(obj) {
    return fetch({
        url: '/api/admin/loanCommon/multiUploadImage',
        method: 'post',
        data: obj
    });
}
//移除图片
export function removeImg(obj) {
    return fetch({
        url: '/api/admin/loanCommon/removeImg',
        method: 'delete',
        data: obj
    });
}
//查询图片 传orderId fileType
export function getImgList(query) {
    return fetch({
        url: '/api/admin/loanCommon/getImgPathList',
        method: 'get',
        params: query
    });
}
//审核保存
export function saveAudit(obj) {
    return fetch({
        url: '/api/admin/approval/saveCheckBreakPenalty',
        method: 'post',
        data: obj
    });
}