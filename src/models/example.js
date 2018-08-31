
export default {

  namespace: 'example',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      // if (dispatch.pathname === '/') {
      //   dispatch({ type: 'fetch'});
      // }

    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
