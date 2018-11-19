import { routerRedux } from 'dva/router'
import {fetch} from './service'
import {message} from 'antd'
export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const {data} = yield call(fetch, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data && data.message==="success") {
        sessionStorage.setItem("cname",data.Cname)
        sessionStorage.setItem("username",data.username)
        sessionStorage.setItem("role",data.roleId)
        console.log("########"+JSON.stringify(data))
        const { from } = locationQuery
        yield put({ type: 'app/start' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/news'))
        }
      } else {
        message.error("登录失败！");
        yield put(routerRedux.push('/login'))
      }
    },
  },

}
