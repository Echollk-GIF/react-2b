import request from "../utils/request"

//获取用户权限列表
export function getPermissionList () {
  return request.get('/api/user/permissionList')
}