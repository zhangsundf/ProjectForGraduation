import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const state = {
    user:''
}

const mutations = {
   GETUSERNAME(state,param){
      state.user = param
   }
}

export default new Vuex.Store({
  state,
  mutations
})
