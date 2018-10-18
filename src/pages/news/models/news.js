import * as usersService from '../services/users';

export default {
  namespace: 'news',
  state: {
    list: [],
    total: null,
    page: null,
    upload: false
  },
  reducers: {
    save(state, {payload: {data: list, total, page}}) {
      return {...state, list, total, page};
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
    * fetchTeacher({payload: {page = 1}},{call, put}){
      yield put({ type: 'app/start' })
      const {data} = yield call(usersService.fetchTeacher,{page});
      yield put({
        type: 'save',
        payload: {
          data: data.list,
          total: parseInt(data.total,10),
          page: parseInt(page,10)
        }
      })
    },
    * remove({payload: id}, {call, put, select}) {
      yield call(usersService.remove, id);
      const page = yield select(state => state.news.page);
      yield put({type: 'fetchTeacher', payload: {page}});
    },
    * patch(values, {call, put, select}) {
      yield call(usersService.patch,values);
      const page = yield select(state => state.news.page);
      yield put({type: 'fetchTeacher', payload: {page}});
    },
    * create({payload: values}, {call, put, select}) {
      yield call(usersService.create, values);
      const page = yield select(state => state.users.page);
      yield put({type: 'fetch', payload: {page}});
    },
    * createTeacher({payload: {values,resp,editor}}, {call, put, select}) {
      yield call(usersService.createTeacher, {payload:{...values,url:resp,editor}});
      const page = yield select(state => state.news.page);
      yield put({type: 'fetchTeacher', payload: {page}});
    },
    // *createNew({ payload: values,url }, { call, put, select }) {
    //   yield call(usersService.create, {values,url});
    //   const page = yield select(state => state.users.page);
    //   yield put({ type: 'fetch', payload: { page } });
    // },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/news') {
          dispatch({type: 'fetchTeacher', payload: query});
        }
      });
    },
  },
};
