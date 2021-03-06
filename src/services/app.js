import request from '../utils/newrequest'
import request2 from '../utils/usercheck'
import config  from '../utils/config'
const { api } = config
const { hello2, userLogout ,newLogin,getMenus} = api

export function login (params) {
  return request({
    url: newLogin,
    method: 'post',
    data: params,
  })
}

export function logout (params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export function query (params) {
  return request2(hello2,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: sessionStorage.getItem("token"),
    },
  })
}
export function fetchMenus (params) {
  return request(`${getMenus}?role=${params}`)
}
