import { routerRedux } from 'dva/router'
import {fetch} from './service'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const {data} = yield call(fetch, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.message==="success") {
        localStorage.setItem("cname",data.Cname)
        console.log("########"+data.Cname)
        const { from } = locationQuery
        yield put({ type: 'app/start' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/news'))
        }
      } else {
        yield put(routerRedux.push('/login'))
      }
    },
  },

}
