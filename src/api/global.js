import request from "../utils/request"

//获取Select选项
export function getBatchSelesctList (type) {
  return request.get(`/api/batchSelectList/${type}`)
}