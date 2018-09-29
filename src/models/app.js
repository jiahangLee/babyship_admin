import {routerRedux} from 'dva/router'
import {parse} from "qs";
import queryString from 'query-string'
import config from '../utils/config'
import {query, logout} from '../services/app'

export default {

  namespace: 'app',

  state: {
    user: {},
    locationPathname: '',
    locationQuery: {},
  },

  subscriptions: {
    setupHistory({dispatch, history}) {
      history.listen((location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      }))
    },
    setup({dispatch, pathname}) {
      dispatch({type: 'start', payload: pathname})
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({type: 'changeNavbar'})
        }, 300)
      }

    },
  },

  effects: {
    * start({payload}, {select, put, call}) {
      const {data} = yield call(query, payload)
      console.log(JSON.stringify(data));
      const {locationPathname} = yield select(_ => _.app)
      console.log("ok")
      if (data) {
        if (data.status === "success") {
          console.log("******************" + payload)
          //这里没有payload
          if (payload === '/login') {
            yield put(routerRedux.push({
              pathname: '/news',
            }))}
          }else if(data.status===500){
            yield put(routerRedux.push({
              pathname: '/login',
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
    * fetch({payload}, {call, put}) {
      yield put({type: 'save'});
    },
    * fetchCname({payload}, {call, put}) {
      yield put({type: 'save'});
    },
    * changeNavbar(action, {put, select}) {
      const {app} = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({type: 'handleNavbar', payload: isNavbar})
      }
    },
    * logout({
               payload,
             }, {call, put}) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({
          type: 'updateState', payload: {
            user: {},
          }
        })
        yield put({type: 'query'})
      } else {
        throw (data)
      }
    },
  },

  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
    save(state, action) {
      return {...state, ...action.payload};
    },
  },
};
