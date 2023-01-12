import request from "../utils/request"

//获取sideMenu
export function getSideMenu () {
  return request.get('/api/user/sideMenu')
}