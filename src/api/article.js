import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/api/admin/article/detail',
    method: 'get',
    params: {
      id:id
    }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/api/admin/article/create',
    method: 'post',
    data
  })
}

export function searchArticle(data) {

  return request({
    url: '/api/admin/article/search',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/admin/article/update',
    method: 'post',
    data
  })
}
