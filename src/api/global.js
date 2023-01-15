import request from "../utils/request"

//获取角色Select选项
export function getRoleSelesctList () {
  return request.get(`/api/roleSelectList`)
}