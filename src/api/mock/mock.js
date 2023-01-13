import request from "../../utils/request"

//模拟获取用户权限列表
export function mockGetPermissionList (id, type) {
  return request.get(`/api/user/permissionList/${id}/${type}`)
}

//模拟根据id删除角色
export function mockDeleteRoleById (id, type) {
  return request.get(`/api/roleList/${id}/${type}`)
}