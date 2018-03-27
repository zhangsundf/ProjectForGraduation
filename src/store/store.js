import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const state = {
    user:'',
    isLogin: false,
    studentinfo: [],
    continueDate: []

}

const mutations = {
  //登陆
    SETUSERNAME(state,param){
      sessionStorage.setItem('username',param)
      sessionStorage.setItem('isLogin', true)
      state.user = param
      state.isLogin = true
   },
   //退出
    QUITLOGIN(state){
      sessionStorage.clear()
  },
  //存储学生的信息
    SETSTUDENTINFO(state,param){
     state.studentinfo = param
     sessionStorage.setItem('studentinfo',state.studentinfo)
   },
   //存储实习的天数
    SETCONTINUEDATE(state,param){
     state.continueDate = param
     sessionStorage.setItem('continunedate',param)
   }
}

export default new Vuex.Store({
  state,
  mutations,
})
