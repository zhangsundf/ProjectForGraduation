import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation_types'
import AV from 'leancloud-storage'
import state from './state'
import mutations from './mutations'
import getters from './getters'


export const actions = {
  checkLogin ({state,commit},param) {
    return new Promise((resolve, reject) => {

      AV.User.logIn(param.name,param.pass).then(function(loginedUser) {
           if(loginedUser.attributes.isTeacher){
              state.user = param.name
              state.pass = param.pass
              state.isLogin = param.login
              state.userInfo = AV.User.current()
              resolve()
          }
          if (!loginedUser.attributes.isTeacher) {
              reject()
           }
      }).catch(error => {
        reject()
      })
    })
        
    },
    getUser ({commit}) {
      commit(types.SET_STUDENT_LIST)
    },
    signUp ({commit},param){
      var user = new AV.User();
      user.setUsername(param.name);
      user.setPassword(param.pass);
      user.setEmail(param.email);
      user.setMobilePhoneNumber(param.tel)
      user.signUp().then(function (loginedUser) {
        alert("注册成功")
      }, (function (error) {
          alert(JSON.stringify(error));
          
      }));
    },
    changeInfo ({commit}, param) {
      commit (types.CHANGR_STUDENT_INFO,param)
    },
    getStudentActivities ({commit}) {
      commit (types.GET_STUDENT_ACTIVITIES)
    },
    getIsSign ({commit},param) {
      commit (types.GET_SIGN_LIST,param)
    },
    getDateArray ({commit}) {
      commit (types.GET_DATE_LIST)
    },
    getAttendScore ({commit}) {
      commit (types.GET_ATTEND_SCORE)
    }
}
