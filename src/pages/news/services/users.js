import { PAGE_SIZE } from '../constants';
import request from '../../../utils/oldrequest';

export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
export function fetchTeacher({ page = 1 }) {
  return request(`http://localhost:8002/babyship/allNews?pageNum=${page}&pageSize=${PAGE_SIZE}`);
}
export function remove(id) {
  return request(`http://localhost:8002/babyship/deleteNews?id=${id}`);
}

export function patch(values) {
  const p = values.payload
  console.log(typeof p)
  console.log(p)
  let fd = new FormData()
  for (let o in p) {
    fd.append(o, p[o])
  }
  return request(`http://localhost:8002/babyship/updateNews`, {
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

export function createTeacher({payload}) {
  console.log(typeof payload)
  console.log(payload)
  let fd = new FormData()
  for (let o in payload) {
    fd.append(o, payload[o])
  }
  return request('http://localhost:8002/babyship/addNews', {
    method: 'POST',
    body: fd,
  });
}

