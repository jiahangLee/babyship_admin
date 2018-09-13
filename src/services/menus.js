import  config  from '../utils/config'
import  request from '../utils/request'

const { api } = config
const { menus } = api

export function query (params) {
  return request({
    url: menus,
    method: 'get',
    data: params,
  })
}
