import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation_types'
import moduleA from './baseStore'
import moduleB from './operateStore'
import AV from 'leancloud-storage'

AV.init ({
  appId: 'MepAGl7Wai0XwJAu4Kk8aYo1-gzGzoHsz',
  appKey: 'U3dJSqfmKuDjnl67TkLQOhpN',
  masterKey:'wJ8tjBXyxxyAWBFf8y0V4Fxn'
})
AV._config.useMasterKey =true

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
   moduleA:moduleA,
   moduleB: moduleB
  }
})
