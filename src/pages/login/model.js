import { routerRedux } from 'dva/router'
import {fetch} from './service'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(fetch, payload)
      // const { locationQuery } = yield select(_ => _.app)
      if (data) {
        // const { from } = locationQuery
        // yield put({ type: 'app/query' })
        // if (from && from !== '/login') {
        //   yield put(routerRedux.push(from))
        // } else {
          yield put(routerRedux.push('/news'))
        // }
      } else {
        throw data
      }
    },
  },

}
