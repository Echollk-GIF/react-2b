import request from "../utils/request"

//获取用户权限列表
// export function getPermissionList () {
//   return request.get('/api/user/permissionList')
// }

//根据id删除权限
export function deletePermissionById (id) {
  return request.delete(`/api/user/deletePermissionById/${id}`)
}

//根据id更新权限
export function updatePermissionById (id) {
  return request.patch(`/api/user/updatePermissionById/${id}`)
}

//获取用户列表
export function getUserList () {
  return request.get('/api/userList')
}

//新增用户
export function addUser (values) {
  return request.post('/api/addUser', { ...values })
}

//获取用户permission权限列表
export function getPermissionList () {
  return request.get('/api/permissionList')
}