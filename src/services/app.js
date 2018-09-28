import config  from '../utils/config'
import request from '../utils/newrequest'
const { api } = config
const { hello2, userLogout ,newLogin} = api

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
  return request(hello2,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: sessionStorage.getItem("token"),
    },
  })
}
