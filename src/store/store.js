import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation_types'

Vue.use(Vuex)
const state = {
    user:'',
    pass: '',
    isLogin: false,
    studentinfo: [],
    ManageClass: [],
    continueDate: [],
    currentPanel:'首页'
}

const getters = {
    getUsername: (state) => state.user,
    getStudentInfo: (state) => state.studentinfo,
    getIsLogin: (state) => state.isLogin,
    getManageClass: (state) => state.ManageClass,
    getContainueDate: (state) => state.continueDate,
    getIsLogin: (state) => state.isLogin
}

const mutations = {
  //登陆
  [types.SET_USERNAME](state,param){
      sessionStorage.setItem('username',param.name)
      sessionStorage.setItem('username',param.pass)
      sessionStorage.setItem('isLogin', true)
      state.user = param.name
      state.pass = param.pass
      state.isLogin = param.login
   },
   //退出
  [types.QUIT_LOGIN](state){
      sessionStorage.clear()
  },
  //存储学生的信息
   [types.SET_STUDENT_INFO](state,param){
     state.studentinfo = param
     sessionStorage.setItem('studentinfo',state.studentinfo)
   },
   //存储实习的天数
    [types.SET_CONTINUE_DATE](state,param){
     state.continueDate = param
     sessionStorage.setItem('continunedate',param)
   },
   [types.SET_MANGECLASS] (state,param ){
      state.ManageClass = param
   },
   [types.SET_CURRENT_PANEL](state,param){
     state.currentPanel = param
     sessionStorage.setItem("currentPanel",param)
   }
}

const actions = {
    setLoginInfo ({commit},param) {
      return commit (types.SET_USERNAME,param)
    },
    haveComplateInfo ({getters}) {
      let isLogin = this.getters.getIsLogin
      let containeDate = this.getters.getContainueDate.length
      let ManageClass = this.getters.getManageClass.length
      if  (isLogin && !!containeDate && !!ManageClass) {
         return true
      }
      return false
    },
    complateInfo ({commit},{arg1,arg2}){
        commit (types.SET_CONTINUE_DATE, arg1)
        commit (type.SET_MANGECLASS,arg2)
    }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
