import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation_types'
import AV from 'leancloud-storage'
import state from './state.js'
import getters from './getters.js'

  
export const mutations = {
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
     },
     [types.GET_STUDENT_ACTIVITIES] (state, param) {
        let obj = AV.Object.extend ("Comment")
        let query = new AV.Query (obj)
        query.find().then(function(commentList){
          let result = []
          for(let i = 0; i < commentList.length; i++){
            result.push (commentList[i])
          }
          state.studentComment = result
        },function (err) {
          return
        })
     },
     [types.GET_SIGN_LIST] (state,param) {
       state.signinList = []
       let result = []
       for (let i = 0; i < state.studentinfo.length; i++) {
         let userId = state.studentinfo[i].id
         let queryUser = new AV.Query('SigninList')
         queryUser.equalTo("userID",userId)
         let querySign = new AV.Query('SigninList')
         querySign.equalTo("date",param)
         
         var query = AV.Query.and (queryUser,querySign)
         query.find().then(function (signin) {
          if(signin.length !== 0) {
            state.signinList.push ({'userID':userId,'isSignin':signin[0].attributes.isSignin,'date':param})
          }
           if(signin.length === 0) {
             let query = new AV.Object('SigninList')
             query.set('userID',userId)
             query.set ('date',param)
             query.set ('isSignin',false)
             query.save()
             state.signinList.push({'userID':userId,'isSignin':false,'date':param}) 
           }
        })
       }
       return result
     },
     [types.GET_DATE_LIST] (state) {
       let set = []
       let query = new AV.Query("SigninList")
       query.find().then (function (item) {
         for(let i = 0; i < item.length; i ++){
           if(set.indexOf(item[i].attributes.date) === -1)
            set.push(item[i].attributes.date)
         }
       })
       state.dateArray = set.sort()
     },
     [types.GET_ATTEND_SCORE] (state) {
       let SigninList1 = state.dateArray.length
       let studentinfo = state.studentinfo
       let AttendScore = []
      
       
       for (let i = 0; i < state.studentinfo.length; i++) {
         let score = 0
        let userId = state.studentinfo[i].id
        let queryUser = new AV.Query('SigninList')
        queryUser.equalTo("userID",userId)
  
        queryUser.find().then(function(item) {
          for (let j = 0; j <item.length; j ++ ) {
            if(item[j].attributes.isSignin === true) {
              score+=10
            }
          }
          state.attendScoreList.push ({'userID':userId,'attendScore':score})
        })
       }
     }
  }
  