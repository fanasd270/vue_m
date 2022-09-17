import { createStore } from 'vuex'

export default createStore({
  state: {
    code:0,
    info:{},
  },
  mutations: {
    setCode(state, data){
      state.code=data
    },
    setInfo(state, data){
      state.info=data
    },
  },
  actions: {
  },
  modules: {
  }
})
