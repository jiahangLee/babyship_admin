import request from '../utils/oldrequest';

export function query() {
  return request('/api/users');
}
