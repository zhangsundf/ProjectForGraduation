import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation_types'
import AV from 'leancloud-storage'

AV.init ({
  appId: 'MepAGl7Wai0XwJAu4Kk8aYo1-gzGzoHsz',
  appKey: 'U3dJSqfmKuDjnl67TkLQOhpN'
})

Vue.use(Vuex)
const state = {
    user:'',
    pass: '',
    isLogin: false,
    studentinfo: [],
    myCreateGrade: '',
    userInfo: {}
}

const getters = {
    getUsername: (state) => state.user,
    getStudentInfo: (state) => state.studentinfo,
    getIsLogin: (state) => state.isLogin,
    getMyCreateGrade: (state) => {
      return state.userInfo.attributes.createGrade
    },
    getCurUserInfo: (state) => state.userInfo
}

const mutations = {
  //登陆
  [types.SET_CURUSER_INFO](state,param){
      AV.User.logIn(param.name,param.pass).then(function(loginedUser) {
        if(loginedUser.attributes.isTeacher){
            state.user = param.name
            state.pass = param.pass
            state.isLogin = param.login
            state.userInfo = AV.User.current()
        }
        else {
          alert("您没有登录权限")
        }
      }, function (err) {
        return
      })
   },
   //退出
  [types.QUIT_LOGIN](state){
      AV.User.logOut();
  },
  //存储学生的信息
   [types.SET_STUDENT_LIST](state){
     let userObj = AV.Object.extend('_User')
     let query = new AV.Query(userObj)
    query.equalTo("isTeacher",false).equalTo('grade',state.userInfo.attributes.createGrade).find().then(function (userList){
      let result = []
      for (let i = 0; i < userList.length; i++) {
        result[i] = userList[i]
      }
       state.studentinfo = result
    },function(err){
      alert(err)
    })
    // AV.User.current().set("sex",'女')
    // AV.User.current().save()

    // var User = new AV.Object.extend('_User');
    // var query2 = new AV.Query(User);
    // // query2.equalTo('isTeacher', false);
    // query2.find().then(function(userList) {
    //    AV._.each(userList, function(v) {
           
    //        // 对每个符合条件的 user 进行设置
    //        v.set('StudentId', '04143080');
    
    //        // 存储设置
    //        v.save();
    //    });
    // });
  
   },

   [types.SET_CURRENT_PANEL](state,param){
     state.currentPanel = param
     sessionStorage.setItem("currentPanel",param)
   },
   [types.CHANGR_STUDENT_INFO] (state, param) {
     console.log(param.row)
      param.row.set("username",param.username)
      param.row.set('StudentId',param.id)
      param.row.save()
      alert("save studentinfo")
   }
}

const actions = {
  checkLogin ({state,commit},param) {
    commit (types.SET_CURUSER_INFO,param)
        
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
    }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
