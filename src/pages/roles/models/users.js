import * as usersService from '../services/users';
import {fetchMenus2} from "../services/users";

export default {
  namespace: 'roles',
  state: {
    list: [],
    total: null,
    page: null,
    upload: false,
    designRole:[]
  },
  reducers: {
    save(state, {payload: {data: list, total, page}}) {
      return {...state, list, total, page};
    },
    save2(state, {payload: {data: designRole}}) {
      return {...state, designRole};
    },
  },
  effects: {
    * fetch({payload: {page = 1}}, {call, put}) {
      const {data, headers} = yield call(usersService.fetch, {page});
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    * fetchUser({payload: {page = 1}},{call, put}){
      yield put({ type: 'app/start' })
      const {data} = yield call(usersService.fetchUser,{page});
      yield put({type:'fetchMenus'})
      console.log(data)
      yield put({
        type: 'save',
        payload: {
          data: data.list,
          total: parseInt(data.total,10),
          page: parseInt(page,10)
        }
      })
    },
    //payload 不可少
    * fetchMenus(payload,{call, put}) {
      // console.log(JSON.stringify(payload))
      const {data}= yield call(fetchMenus2);
      console.log("获取设计角色的所有菜单"+JSON.stringify(data))
      //这边的{}应该要对应save的{}，不能省略
      yield put({type: 'save2',payload:{data}});
    },
    * remove({payload: id}, {call, put, select}) {
      yield call(usersService.remove, id);
      const page = yield select(state => state.roles.page);
      yield put({type: 'fetchUser', payload: {page}});
    },
    * patch({payload: {values,editor,role}}, {call, put, select}) {
      yield call(usersService.patch, {payload:{...values,editor}});
      const page = yield select(state => state.roles.page);
      yield put({type: 'fetchUser', payload: {page}});
    },
    * create({payload: values}, {call, put, select}) {
      yield call(usersService.create, values);
      const page = yield select(state => state.roles.page);
      yield put({type: 'fetch', payload: {page}});
    },
    * createUser({payload: {values,editor,role}}, {call, put, select}) {
      yield call(usersService.createUser, {payload:{...values,role,editor}});
      const page = yield select(state => state.roles.page);
      yield put({type: 'fetchUser', payload: {page}});
    },
    // *createNew({ payload: values,url }, { call, put, select }) {
    //   yield call(usersService.create, {values,url});
    //   const page = yield select(state => state.roles.page);
    //   yield put({ type: 'fetch', payload: { page } });
    // },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/roles') {
          dispatch({type: 'fetchUser', payload: query});
        }

      });
    },
  },
};
