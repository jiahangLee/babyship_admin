import { routerRedux } from 'dva/router'
import {parse}  from "qs";
import queryString from 'query-string'
import config from '../utils/config'
import {query,logout} from '../utils/app'
export default {

  namespace: 'app',

  state: {
    user: {},
    locationPathname: '',
    locationQuery: {},
  },

  subscriptions: {
    setupHistory ({dispatch,history}){
    history.listen((location => {
    dispatch({
      type: 'updateState',
      payload: {
        locationPathname: location.pathname,
        locationQuery: location.query,
      },
    })
  }))},
    setup({ dispatch, history }) {
      dispatch({type: 'start'})
      // if (history.location.pathname === '/') {
      //   // dispatch({ type: 'fetch'});
      //   console.log("subscriptions")
      //   dispatch({type:'start'})
      // }

    },
  },

  effects: {
    *start({payload},{location,select,put,call }){

      const user = yield call(query, payload)
      const { locationPathname } = yield select(_ => _.app)
      if (user) {
        // const { list } = yield call(menusService.query)
        // const { permissions } = user
        // let menu = list
        // if (permissions.role === EnumRoleType.ADMIN || permissions.role === EnumRoleType.DEVELOPER) {
        //   permissions.visit = list.map(item => item.id)
        // } else {
        //   menu = list.filter((item) => {
        //     const cases = [
        //       permissions.visit.includes(item.id),
        //       item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
        //       item.bpid ? permissions.visit.includes(item.bpid) : true,
        //     ]
        //     return cases.every(_ => _)
        //   })
        // }
        yield put({
          type: 'updateState',
          payload: {
            user,
          },
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push({
            pathname: '/news',
          }))
        }
      } else if (config.openPages && config.openPages.indexOf(locationPathname) < 0) {
        yield put(routerRedux.push({
          pathname: '/login',
          search: queryString.stringify({
            from: locationPathname,
          }),
        }))
      }
    },
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
    * logout ({
                payload,
              }, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({ type: 'updateState', payload: {
            user: {},
          }})
        yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },
  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
