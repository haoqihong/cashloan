import fetch from 'utils/fetch';

export function getAllGroupTypes() {
  return fetch({
    url: '/api/admin/groupType/all',
    method: 'get'
  });
}

export function fetchTree(query) {
  return fetch({
    url: '/api/admin/group/tree',
    method: 'get',
    params: query
  });
}


export function addObj(obj) {
  return fetch({
    url: '/api/admin/group',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/group/' + id,
    method: 'get'
  });
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/group/' + id,
    method: 'delete'
  });
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/group/' + id,
    method: 'put',
    data: obj
  });
}
//回显账户
export function getUsers(id) {
  return fetch({
    url: '/api/admin/group/' + id + '/user',
    method: 'get'
  });
}
//保存
export function modifyUsers(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/user',
    method: 'put',
    params: data
  });
}

//资源单选移除
export function removeElementAuthority(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/element/remove',
    method: 'post',
    params: data
  });
}
//资源单选添加
export function addElementAuthority(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/element/add',
    method: 'post',
    params: data
  });
}
//资源全选移除
export function allRemove(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/element/allremove',
    method: 'post',
    params: data
  });
}
//资源全选添加
export function allAdd(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/element/alladd',
    method: 'post',
    params: data
  });
}
export function getElementAuthority(id) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/element',
    method: 'get'
  });
}

export function modifyMenuAuthority(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/menu',
    method: 'post',
    params: data
  });
}


export function getMenuAuthority(id) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/menu',
    method: 'get'
  });
}


