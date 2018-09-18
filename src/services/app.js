import request from '../utils/login';

export function query() {
  return request('/api/users');
}
  export function fetch({username, password}) {
    return request(`http://localhost:8002/babyship/login?id=${username}&&password=${password}`);
  }


