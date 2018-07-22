import request from '@/utils/request'

export function getListOne(type,pageNum=1,pageSize=10) {
  let params={
    type:type,
    page_size:pageSize,
    page_num:pageNum
  }
  return request({
    url: '/api/admin/article/lists',
    method: 'get',
    params: params
  })
}

export function delListOne(id) {
  let params={
    id:id
  }
  return request({
    url: '/api/admin/article/delete',
    method: 'get',
    params: params
  })

}
