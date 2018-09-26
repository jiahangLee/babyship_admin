// import request from '../utils/login';
// import config from '../utils/config'
// import * as usersService from "../pages/users/services/users";
// const qs = require('qs')
// const {api} = config
// const {user, userLogout, userLogin} = api
//
// export function fetch({username, password}) {
//   return request(`http://localhost:8002/babyship/login?id=${username}&&password=${password}`);
// }
//
// export function login(req, res) {
//   const data = request(`http://localhost:8002/babyship/allUser`)
//   console.log(typeof data)
//   setTimeout(() => {
//     const {username, password} = req.data
//     const user = data.data.list.filter(_=>_.username === username)
//     if(user.length>0 && user[0].password === password){
//       const now = new Date()
//       now.setDate(now.getDate()+1)
//       res.cookie('token',JSON.stringify({id: user[0].id,deadline:now.getTime()}),{
//         maxAge:60,
//         httpOnly: true,
//       })
//       res.json({success:true,message:'OK'})
//     }else{
//       res.status(400).end()
//     }
//   }, 5000);
//
// }
//
// export function logout(params) {
//   // return request({
//   //   url: userLogout,
//   //   method: 'get',
//   //   data: params,
//   // })
// }
//
// export function query(req, res) {
//   console.log("12321")
//   console.log("12321")
//   console.log("12321")
//   const allUser = request(`http://localhost:8002/babyship/allUser`)
//   const cookie = req.headers.cookie || ''
//   const cookies = qs.parse(cookie.replace(/\s/g, ''), {delimiter: ';'})
//   const response = {}
//   const user = {}
//   if (!cookies.token) {
//     res.status(200).send({message: 'Not Login'})
//     return
//   }
//   const token = JSON.parse(cookie.token)
//   if (token) {
//     response.success = token.deadline > new Date().getTime()
//   }
//   // if (response.success) {
//   //   const userItem = allUser.filter(_ => _.id === token.id)
//   // }
//   return res.json(response);
// }
