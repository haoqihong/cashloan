import fetch from 'utils/fetch';

export function fetchTreeG(query) {
    return fetch({
        url: '/api/admin/group/tree',
        method: 'get',
        params: query
    });
}
//总树
export function fetchTree() {
    return fetch({
        url: '/api/admin/org/tree',
        method: 'get'
    });
}
//用户管理列表
export function fetchUser(query) {
    return fetch({
        url: '/api/admin/org/user',
        method: 'get',
        params: query
    });
}
//用户组列表
export function group(query) {
    return fetch({
        url: '/api/admin/org/group',
        method: 'get',
        params: query
    });
}
//关联用户保存
export function addUserGroup(id, data) {
    return fetch({
        url: '/api/admin/org/'+id+'/addUserGroup',
        method: 'post',
        data: data
    });
}
//关联用户列表
export function getUser(id) {
    return fetch({
        url: '/api/admin/org/'+id+'/getOrgUser',
        method: 'get'
    });
}
//关联用户回显
export function getGroupUser(id) {
    return fetch({
        url: '/api/admin/org/'+id+'/getUser',
        method: 'get'
    });
}
//数据授权保存
export function authGroupUser(id, data) {
    return fetch({
        url: '/api/admin/org/'+id+'/authGroupUser',
        method: 'post',
        data: data
    });
}
//数据授权
export function getOrgByGroup(id) {
    return fetch({
        url: '/api/admin/org/'+id+'/getOrgByGroup',
        method: 'get'
    });
}
//字典添加 传父级ID
export function orgAdd(obj) {
    return fetch({
        url: '/api/admin/org',
        method: 'post',
        data: obj
    });
}
//字典修改 传当前id 编码 名称
export function orgPut(id, obj) {
    return fetch({
        url: '/api/admin/org/' + id,
        method: 'put',
        data: obj
    })
}
//字典删除 传当前id
export function orgDel(id) {
    return fetch({
        url: '/api/admin/org/' + id,
        method: 'delete'
    })
}
