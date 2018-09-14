import { routerRedux } from 'dva/router'
import * as queryString from "qs";
export default {

  namespace: 'app',

  state: {
    locationPathname: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      }))
      if (history.location.pathname === '/') {
        // dispatch({ type: 'fetch'});
        console.log("subscriptions")
        dispatch({type:'start'})
      }

    },
  },

  effects: {
    *start({payload},{select,put}){
      const pathname = yield select(state => state.locationPathname)
      if(pathname!== "/login")
        yield put(routerRedux.push({
          pathname:'/login',
          search:queryString.stringify({
            form: pathname
          })
        }))
    },
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
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
