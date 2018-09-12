import {  config } from 'utils'
import request from './request'
const { api } = config
const { userLogin } = api

export function login (data) {
  return request({
    url: userLogin,
    method: 'post',
    data,
  })
}
