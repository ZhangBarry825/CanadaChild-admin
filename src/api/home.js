import request from '@/utils/request'

export function fetchAllList() {
  return request({
    url: '/api/admin/article/alllist',
    method: 'get',
    params:''
  })
}
