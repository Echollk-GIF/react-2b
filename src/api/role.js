import request from "../utils/request"

//获取角色列表
export function getRoleList () {
  return request.get('/api/roleList')
}

//根据id删除角色
export function deleteRoleById (id) {
  return request.delete(`/api/roleList/${id}`)
}

//修改角色权限
export function updateRolePermission (id, permissionList) {
  return request.patch(`/api/roleList/${id}`, {
    rights: permissionList
  })
}