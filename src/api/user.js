import request from "../utils/request"

//获取用户列表
export function getUserList () {
  return request.get('/api/userList')
}

//新增用户
export function addUser (values) {
  let newUser = {
    ...values,
    "userStatus": true,
    "default": false,
  }
  let roleMap = new Map()
  roleMap.set(1, {
    "id": 1,
    "roleName": "超级管理员",
    "roleType": 1,
    "rights": [
      "/user-manage",
      "/user-manage/add",
      "/user-manage/delete",
      "/user-manage/update",
      "/user-manage/list",
      "/right-manage",
      "/right-manage/role/list",
      "/right-manage/right/list",
      "/right-manage/role/update",
      "/right-manage/role/delete",
      "/right-manage/right/update",
      "/right-manage/right/delete",
      "/news-manage",
      "/news-manage/list",
      "/news-manage/add",
      "/news-manage/update/:id",
      "/news-manage/preview/:id",
      "/news-manage/draft",
      "/news-manage/category",
      "/audit-manage",
      "/audit-manage/audit",
      "/audit-manage/list",
      "/publish-manage",
      "/publish-manage/unpublished",
      "/publish-manage/published",
      "/publish-manage/sunset",
      "/home"
    ]
  })
  roleMap.set(2, {
    "id": 2,
    "roleName": "普通管理员",
    "roleType": 2,
    "rights": [
      "/home",
      "/user-manage",
      "/user-manage/add",
      "/user-manage/delete",
      "/user-manage/update",
      "/user-manage/list",
      "/news-manage",
      "/news-manage/list",
      "/news-manage/add",
      "/news-manage/update/:id",
      "/news-manage/preview/:id",
      "/news-manage/draft",
      "/news-manage/category",
      "/audit-manage",
      "/audit-manage/audit",
      "/audit-manage/list",
      "/publish-manage",
      "/publish-manage/unpublished",
      "/publish-manage/published",
      "/publish-manage/sunset"
    ]
  })
  roleMap.set(3, {
    "id": 3,
    "roleName": "普通编辑",
    "roleType": 3,
    "rights": [
      "/home",
      "/news-manage",
      "/news-manage/list",
      "/news-manage/add",
      "/news-manage/update/:id",
      "/news-manage/preview/:id",
      "/news-manage/draft",
      "/audit-manage",
      "/audit-manage/list",
      "/publish-manage",
      "/publish-manage/unpublished",
      "/publish-manage/published",
      "/publish-manage/sunset"
    ]
  })
  newUser.role = roleMap.get(newUser.roleId)
  console.log(newUser)
  return request.post('/api/userList', newUser)
}

//根据id删除用户
export function deleteUser (id) {
  return request.delete(`/api/userList/${id}`)
}

//更新用户状态
export function updateUserStatus (id, newStatus) {
  return request.patch(`/api/userList/${id}`, {
    userStatus: newStatus
  })
}

//更新用户信息
export function updateUserInfo (id, newUserInfo) {
  let newUser = {
    ...newUserInfo
  }
  let roleMap = new Map()
  roleMap.set(1, {
    "id": 1,
    "roleName": "超级管理员",
    "roleType": 1,
    "rights": [
      "/user-manage",
      "/user-manage/add",
      "/user-manage/delete",
      "/user-manage/update",
      "/user-manage/list",
      "/right-manage",
      "/right-manage/role/list",
      "/right-manage/right/list",
      "/right-manage/role/update",
      "/right-manage/role/delete",
      "/right-manage/right/update",
      "/right-manage/right/delete",
      "/news-manage",
      "/news-manage/list",
      "/news-manage/add",
      "/news-manage/update/:id",
      "/news-manage/preview/:id",
      "/news-manage/draft",
      "/news-manage/category",
      "/audit-manage",
      "/audit-manage/audit",
      "/audit-manage/list",
      "/publish-manage",
      "/publish-manage/unpublished",
      "/publish-manage/published",
      "/publish-manage/sunset",
      "/home"
    ]
  })
  roleMap.set(2, {
    "id": 2,
    "roleName": "普通管理员",
    "roleType": 2,
    "rights": [
      "/home",
      "/user-manage",
      "/user-manage/add",
      "/user-manage/delete",
      "/user-manage/update",
      "/user-manage/list",
      "/news-manage",
      "/news-manage/list",
      "/news-manage/add",
      "/news-manage/update/:id",
      "/news-manage/preview/:id",
      "/news-manage/draft",
      "/news-manage/category",
      "/audit-manage",
      "/audit-manage/audit",
      "/audit-manage/list",
      "/publish-manage",
      "/publish-manage/unpublished",
      "/publish-manage/published",
      "/publish-manage/sunset"
    ]
  })
  roleMap.set(3, {
    "id": 3,
    "roleName": "普通编辑",
    "roleType": 3,
    "rights": [
      "/home",
      "/news-manage",
      "/news-manage/list",
      "/news-manage/add",
      "/news-manage/update/:id",
      "/news-manage/preview/:id",
      "/news-manage/draft",
      "/audit-manage",
      "/audit-manage/list",
      "/publish-manage",
      "/publish-manage/unpublished",
      "/publish-manage/published",
      "/publish-manage/sunset"
    ]
  })
  newUser.role = roleMap.get(newUserInfo.roleId)
  return request.patch(`/api/userList/${id}`, {
    ...newUser
  })
}

//用户登录
export function userpassLogin (values) {
  return request.get(`/api/userList?username=${values.username}&password=${values.password}&userStatus=true`)
}





