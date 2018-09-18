import   config  from '../../utils/config'
import {login} from './request'
const { api } = config
const { userLogin } = api

export function login1 (data) {
  return login({
    url: userLogin,
    method: 'post',
    data,
  })
}
