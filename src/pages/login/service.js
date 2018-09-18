import request from './request'

  export function fetch({username,password}) {
    return request(`http://localhost:8002/babyship/login?id=${username}&&password=${password}`);
}
