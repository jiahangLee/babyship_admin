import config  from '../utils/config'
import request from '../utils/newrequest'
const { api } = config
const { hello, userLogout ,newLogin} = api

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
  return request({
    url: hello,
    method: 'get',
    data: params,
  })
}
