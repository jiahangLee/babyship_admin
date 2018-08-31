import { PAGE_SIZE } from '../constants';
import request from '../../../utils/oldrequest';

export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
export function fetchTeacher({ page = 1 }) {
  return request(`http://localhost:8002/babyship/all?pageNum=${page}&pageSize=${PAGE_SIZE}`);
}
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
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
  return request('http://localhost:8002/babyship/add', {
    method: 'POST',
    body: fd,
  });
}

