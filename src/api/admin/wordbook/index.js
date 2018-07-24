import fetch from 'utils/fetch';

export function fetchTree() {
  return fetch({
    url: '/api/admin/dict/dictType/tree',
    method: 'get'
  });
}
export function getObj(query) {
    return fetch({
        url: '/api/admin/dict/dictValue',
        method: 'get',
        params: query
    })
}
//字典添加 传父级ID
export function dictAdd(obj) {
  return fetch({
      url: '/api/admin/dict/adddicttype',
      method: 'post',
      data: obj
  });
}
//字典修改 传当前id 编码 名称
export function dictPut(obj) {
  return fetch({
      url: '/api/admin/dict/modDictTyp',
      method: 'put',
      data: obj
  })
}
//字典删除 传当前id
export function dictDel(id) {
  return fetch({
      url: '/api/admin/dict/deldicttype/' + id,
      method: 'delete'
  })
}
//字典值添加
export function addObj(obj) {
  return fetch({
    url: '/api/admin/dict',
    method: 'post',
    data: obj
  });
}
//字典值修改
export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/dict/' + id,
    method: 'put',
    data: obj
  })
}
//字典值删除
export function delObj(id) {
  return fetch({
    url: '/api/admin/dict/' + id,
    method: 'delete'
  })
}