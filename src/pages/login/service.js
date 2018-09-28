import request from '../../utils/newrequest'

//   export function fetch({username,password}) {
//     return login(`http://localhost:8002/babyship/login?id=${username}&&password=${password}`);
// }
export function fetch({username,password}) {
  return request(`http://localhost:8002/babyship/login?username=${username}&password=${password}`,{
    method: 'POST',
    body: JSON.stringify("ok"),
    // credentials: 'include',
    // mode:"cros"
})
}
