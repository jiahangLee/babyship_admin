import {login} from '../../utils/app'

//   export function fetch({username,password}) {
//     return login(`http://localhost:8002/babyship/login?id=${username}&&password=${password}`);
// }
export function fetch(data) {
  return login({
    url:'http://localhost:8002/babyship/login',
    method:'post',
    data
})
}
