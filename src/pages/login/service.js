import request from '../../utils/newrequest'
import config  from '../../utils/config'
const { api } = config
//   export function fetch({username,password}) {
//     return login(`http://localhost:8002/babyship/login?id=${username}&&password=${password}`);
// }
export function fetch({username,password,remember}) {
  return request(`http://${api.service_url}/babyship/login?username=${username}&password=${password}&remember=${remember}`,{
    method: 'POST',
    body: JSON.stringify("ok"),
    // credentials: 'include',
    // mode:"cros"
})
}
