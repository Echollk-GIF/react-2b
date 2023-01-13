import request from "../utils/request"

//获取用户权限列表
export function getPermissionList () {
  return request.get('/api/user/permissionList')
}

//根据id删除权限
export function deletePermissionById (id) {
  return request.delete(`/api/user/deletePermissionById/${id}`)
}

//根据id更新权限
export function updatePermissionById (id) {
  return request.patch(`/api/user/updatePermissionById/${id}`)
}