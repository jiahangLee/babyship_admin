import { PAGE_SIZE } from '../constants';
import request from '../../../utils/oldrequest';
import config  from '../../../utils/config'
const { api } = config
export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
export function fetchUser({ page = 1 }) {
  return request(`http://${api.service_url}/babyship/allUser?pageNum=${page}&pageSize=${PAGE_SIZE}`,{
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });
}
export function fetchUser2() {
  return request(`http://${api.service_url}/babyship/allRoles`,{
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });
}
export function remove(id) {
  return request(`http://${api.service_url}/babyship/deleteUser?id=${id}`,{
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });
}

export function patch(values) {
  const p = values.payload
  console.log(typeof p)
  console.log(p)
  let fd = new FormData()
  for (let o in p) {
    fd.append(o, p[o])
  }
  return request(`http://${api.service_url}/babyship/updateUser`, {
    method: 'POST',
    body: fd,
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });
}
export function patch2(values) {
  const p = values.payload.values
  console.log(typeof p)
  console.log(p)
  let fd = new FormData()
  for (let o in p) {
    fd.append(o, p[o])
  }
  console.log(fd.toString())
  return request(`http://${api.service_url}/babyship/updateUser2`, {
    method: 'POST',
    body: fd,
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
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
  return request(`http://${api.service_url}/babyship/addUser`, {
    method: 'POST',
    body: fd,
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });
}


