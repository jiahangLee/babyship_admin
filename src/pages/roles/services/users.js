import { PAGE_SIZE } from '../constants';
import request from '../../../utils/oldrequest';
import config  from '../../../utils/config'
const { api } = config
const { designRole} = api

export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
export function fetchUser({ page = 1 }) {
  return request(`http://${api.service_url}/babyship/allRole?pageNum=${page}&pageSize=${PAGE_SIZE}`);
}
export function remove(id) {
  return request(`http://${api.service_url}/babyship/deleteRole?id=${id}`);
}

export function patch({payload}) {
  console.log(typeof payload)
  console.log(payload)
  let fd = new FormData()
  for (let o in payload) {
    fd.append(o, payload[o])
  }
  return request(`http://${api.service_url}/babyship/updateRole`, {
    method: 'POST',
    body: fd,
  });
}

export function create(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function createUser({payload}) {
  console.log(typeof payload)
  console.log(payload)
  let fd = new FormData()
  for (let o in payload) {
    fd.append(o, payload[o])
  }
  return request(`http://${api.service_url}/babyship/addRole`, {
    method: 'POST',
    body: fd,
  });
}

export function fetchMenus2 (params) {
  return request(`${designRole}`)
}
