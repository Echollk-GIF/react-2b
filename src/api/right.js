import request from "../utils/request"

//获取用户permission权限列表
export function getPermissionList () {
  return request.get('/api/permissionList')
}

//根据权限id删除权限
export function deletePermissionById (id) {
  return request.delete(`/api/permissionList/${id}`)
}

//根据id更新页面权限
export function updatePermissionById (id, newPagePermission) {
  return request.patch(`/api/permissionList/${id}`, {
    pagepermission: newPagePermission
  })
}