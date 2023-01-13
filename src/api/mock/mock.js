import request from "../../utils/request"

//测试获取用户权限列表
export function mockGetPermissionList (id, type) {
  return request.get(`/api/user/permissionList/${id}/${type}`)
} 