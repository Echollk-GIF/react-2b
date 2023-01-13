import request from "../utils/request"

//获取角色列表
export function getRoleList () {
  return request.get('/api/roleList')
}

//根据id删除角色
export function deleteRoleById (id) {
  return request.delete(`/api/deleteRoleById/${id}`)
}