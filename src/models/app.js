import {routerRedux} from 'dva/router'
import {parse} from "qs";
import queryString from 'query-string'
import config from '../utils/config'
import {query, logout, fetchMenus} from '../services/app'

export default {

  namespace: 'app',

  state: {
    user: {},
    locationPathname: '',
    locationQuery: {},
    leftMenu:[]
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
      console.log("再次校验token是否过期"+JSON.stringify(data))
      if (data) {
        if (data.status === "success") {
          const {leftMenu} = yield select(_ => _.app)
          console.log("如何加载leftMenu"+JSON.stringify(leftMenu.length))
          // if(leftMenu.length === 0) {
            //原来state缓存到浏览器了，退出账号都有值
          if(!sessionStorage.getItem("menu") || leftMenu.length === 0 ) {
            yield put({type: 'fetchMenus', payload: {role: sessionStorage.getItem("role")}})
            sessionStorage.setItem("menu", "true")
          }
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
    * fetchMenus({payload}, {call, put}) {
      // console.log(JSON.stringify(payload))
      const {data}= yield call(fetchMenus,payload.role);
      console.log("获取左侧动态菜单森林"+JSON.stringify(data))
      //这边的{}应该要对应save的{}，不能省略
      yield put({type: 'save',payload:{data}});
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
    save(state, {payload: {data: leftMenu}}) {
      return {...state, leftMenu};
    },
  },
};
