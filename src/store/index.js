import { createStore } from 'vuex';

export default createStore({
  modules: {},
  state: {
    userInfo: {},
  },
  mutations: {
    chanUserInfo: (state, view) => (state.name = view),
  },
  actions: {},
});
