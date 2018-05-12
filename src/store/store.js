import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation_types'
import AV from 'leancloud-storage'

AV.init ({
  appId: 'MepAGl7Wai0XwJAu4Kk8aYo1-gzGzoHsz',
  appKey: 'U3dJSqfmKuDjnl67TkLQOhpN',
  masterKey:'wJ8tjBXyxxyAWBFf8y0V4Fxn'
})
AV._config.useMasterKey =true
Vue.use(Vuex)
const state = {
    user:'',
    pass: '',
    isLogin: false,
    studentinfo: [],
    myCreateGrade: '',
    userInfo: {},
    studentComment: [],
    signinList: [],
    dateArray: [],
    attendScoreList:[],
    inGroupScoreList:[],
    gradeListinfo:[],
    AllGradNameList: []
}

const getters = {
    getUsername: (state) => state.user,
    getStudentInfo: (state) => state.studentinfo,
    getIsLogin: (state) => state.isLogin,
    getCurUserInfo: (state) => state.userInfo,
    getstudentComment (state){
      return state.studentComment
    },
    getSigninList: (state) => state.signinList,
    getDate: (state) => state.dateArray,
    getAttendScoreList: (state) => state.attendScoreList,
    getinGroupScoreList: (state) => state.inGroupScoreList,
    getGradeListinfo: (state) => state.gradeListinfo,
    getAllGradNameList: (state) => state.AllGradNameList
}

const mutations = {
  [types.QUIT_LOGIN](state){
      AV.User.logOut();
  },
   [types.SET_STUDENT_LIST](state){
      let gradeArray = []
     let queryTeacherId = new AV.Query("GradeTable")
     queryTeacherId.equalTo('TeacherId',state.userInfo.id).find().then (function (item) {
       for (let i = 0; i < item.length; i++) {
         let gradeItem = item[i].attributes.createGrade
         gradeArray.push(gradeItem)
         let queryStudent1 = new AV.Query('_User')
         queryStudent1.equalTo('grade',gradeItem)
         let queryStudent2 = new AV.Query('_User')
         queryStudent2.equalTo('isTeacher',false)

         let query = AV.Query.and(queryStudent1,queryStudent2)
         query.ascending('StudentId');
         query.find().then(function(userList) {
           for (let j = 0; j < userList.length; j++){
            state.studentinfo.push(userList[j])
           }
         })
       }
       state.userInfo.attributes = Object.assign({'createGrade':gradeArray},state.userInfo.attributes)
      })

    },
   [types.CHANGR_STUDENT_INFO] (state, param) {
    
   },
   [types.GET_STUDENT_ACTIVITIES] (state, param) {

      for (let i = 0; i < state.studentinfo.length; i++){
        let comment = new AV.Query('Comment')
        comment.equalTo('userID',state.studentinfo[i].id)

        comment.find().then(function(commentItem) {
          for(let k = 0; k < commentItem.length; k++){
            state.studentComment.push(commentItem[k])
          }
      })
    }
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
     query.ascending('date')
     query.find().then (function (item) {
       for(let i = 0; i < item.length; i ++){
         if(set.indexOf(item[i].attributes.date) === -1)
          set.push(item[i].attributes.date)
       }
     })
     state.dateArray = set.sort()
   },
   [types.GET_ATTEND_SCORE] (state) {
     let studentinfo = state.studentinfo
     for (let i = 0; i < studentinfo.length; i++) {
       let score = 0
      let userId = state.studentinfo[i].id
      let queryUser = new AV.Query('SigninList')

      queryUser.equalTo('userID',userId).find().then(function(item) {
        for (let j = 0; j <item.length; j ++ ) {
          if(item[j].attributes.isSignin === true) {
            score+=10
          }
        }
        state.studentinfo[i].attributes = Object.assign({},{'attendScore':score},state.studentinfo[i].attributes)
        state.attendScoreList.push ({'userID':userId,'attendScore':score})
      })
     }
   },
   [types.GET_SCORE_INGROUP] (state) {
     let studentinfo = state.studentinfo
     for (let i = 0; i < state.studentinfo.length; i++){
       let score = 0
       let result = 0
       let userId = state.studentinfo[i].id
       let query = new AV.Query('InTeamComment')
       query.equalTo('targetUserID',userId).find().then(function(item){
         let itemLength = item.length
         if (!itemLength) result = 0
         else{
          for (let j = 0; j < itemLength; j ++) {
            score += item[j].attributes.score
          }
          result = Math.ceil(score/itemLength)
        }
        state.studentinfo[i].attributes = Object.assign({},{'inGrouScore':result},state.studentinfo[i].attributes)
        state.inGroupScoreList.push({'UserID':userId,'inGrouScore':result})
       })
     }
   },
   [types.GET_GRADE_LIST] (state){
    let gradeList = state.userInfo.attributes.createGrade
    let result = []
    for (let i = 0; i < gradeList.length; i++) {
      let info = {}
      let groupList = []
      let queryGrade = new AV.Query('_User')
      queryGrade.equalTo('grade',gradeList[i]).equalTo('isTeacher',false)
      queryGrade.count().then(function (count){
        info.GradeName = gradeList[i]
        info.studentCount = count
      },function(err){
        console(err)
      })
      let queryGroup = new AV.Query('_User')
      queryGroup.equalTo('grade',gradeList[i]).equalTo('isTeacher',false)
      queryGroup.find().then (function(groupItem){
        for (let j = 0; j < groupItem.length; j++) {
          let teamname = groupItem[j].attributes.teamname
          if(teamname && groupList.indexOf(teamname) === -1){
            groupList.push(groupItem[j].attributes.teamname)
          }
        }
        info.GroupList = groupList
        info.GroupCount = groupList.length
      })
      result.push(info)
    }
    state.gradeListinfo = result
   },
   [types.CHANGR_PASS] (state,param) {
    console.log(state.userInfo)
     let userId = state.userInfo.attributes.password
      alert(userId)
   },
   [types.CREATE_MY_GRADE] (state,param) {
      let myGradeArray = state.userInfo.attributes.createGrade
      let TeacherId = state.userInfo.id
        let CreateItem = AV.Object.extend('GradeTable')
        let instance = new CreateItem()
        instance.set('TeacherId',TeacherId)
        instance.set('createGrade',param)
        instance.save()
        myGradeArray.push(param)
   },
   [types.GRADE_AND_GROUP] (state) {
     let TeacherId = state.userInfo.id
     
    let findAllGradeName = new AV.Query("GradeTable")
    findAllGradeName.equalTo("TeacherId",TeacherId)
    findAllGradeName.find().then(function(item){
      for(let p = 0; p < item.length; p ++) {

        let gradeName = item[p].attributes.createGrade
        let Group = []
        let obj = {}
        let objGrade = {}
        let gradeStuNumber = 0
        let queryGroup = new AV.Query('_User')
        queryGroup.equalTo('grade',gradeName)
        queryGroup.find().then(function(item) {
          for(let i = 0; i < item.length; i++){
            let groupitem = item[i].attributes.teamname
            obj[groupitem] = obj[groupitem] ? obj[groupitem]+1 : 1
            
          }
          for(let key in obj){
            gradeStuNumber += obj[key]
            Group.push({'groupName':key,'groupStuNumber':obj[key]})
          }
          Group.push({'gradeStuNumber':gradeStuNumber})
        })
        state.AllGradNameList.push({'grades':gradeName,'groups':Group})
        console.log(state.AllGradNameList)
        }
      })
   }
}

const actions = {
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
        reject(error)
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
      alert(param.grade+','+param.group)
      return new Promise((resolve,reject) => {
        let student = {}
        let studentId = state.studentinfo[param.index].id
        console.log(studentId)
        var todo = AV.Object.createWithoutData('_User', studentId);
        todo.set('grade', param.grade);
        todo.set('teamname',param.group)
        // 保存到云端
        console.log(todo)
        todo.save().then(function(){
            resolve()
        },function(err){
          console.log(err)
           reject()
        })
      })
     
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
    },
    getInGroupScore ({commit}) {
      commit(types.GET_SCORE_INGROUP)
    },
    createGradeListInfo ({commit}) {
      commit (types.GET_GRADE_LIST)
    },
    changePassWord ({commit}, param) {
      commit (types.CHANGR_PASS,param)
    },
    createMyGrade ({commit}, param) {
      commit (types.CREATE_MY_GRADE,param)
    },
    getGradeAndGroup ({commit}) {
      commit (types.GRADE_AND_GROUP)
    }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
