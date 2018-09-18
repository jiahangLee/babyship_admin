
import request from '../../utils/oldrequest';

export function login(payload) {
  return request(`http://localhost:8002/babyship/login?id=${payload}`);
}

