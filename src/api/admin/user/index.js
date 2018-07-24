import fetch from 'utils/fetch';

export function fetchTree() {
  return fetch({
    url: '/api/admin/org/tree',
    method: 'get'
  });
}

export function page(query) {
  return fetch({
    url: '/api/admin/user/selectPageUser',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/user/regist',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/user/single/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/user/' + id + '/updateUser',
    method: 'put',
    data: obj
  })
}

export function justUserExit(query) {
  return fetch({
    url: '/api/admin/user/justUserExit',
    method: 'get',
    params: query
  })
}