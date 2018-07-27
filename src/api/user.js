import request from '@/utils/request'

export function updatePwd(form) {
  let data={
    'old_password':form.oldPass,
    'new_password':form.pass
  }
  return request({
    url: '/api/admin/user/updatepwd',
    method: 'post',
    data
  })
}
