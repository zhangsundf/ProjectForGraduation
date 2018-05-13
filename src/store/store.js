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
    gradeList:[],
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
    getGradeList: (state) => state.gradeList,
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
      state.studentinfo = []
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
   [types.DELETE_STUDENT] (state, param) {
  
   },
   [types.GET_STUDENT_ACTIVITIES] (state, param) {
      state.studentComment = []
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
      state.gradeList  = []
      let queryGroup = new AV.Query('GradeTable')
      queryGroup.find().then (function(groupItem){
        for(let i = 0; i < groupItem.length; i++){
          state.gradeList.push(groupItem[i].attributes.createGrade)
        }
    },function(err){
      console.log("无权访问班级表")
    })
   },
   [types.CHANGR_PASS] (state,param) {
     let userId = state.userInfo.attributes.password
      alert(userId)
   },
   [types.CREATE_MY_GRADE] (state,param) {
      // let myGradeArray = state.userInfo.attributes.createGrade
        let TeacherId = state.userInfo.id
        let CreateItem = AV.Object.extend('GradeTable')
        let instance = new CreateItem()
        instance.set('TeacherId',TeacherId)
        instance.set('createGrade',param)
        instance.save().then(function(){
           state.AllGradNameList.push({'grades':param,
                         'groups':[{'gradeStuNumber':0}],
                        //  [{'groupName':'','groupStuNumber':0,'updatedAt':new Date(),'createdAt':new Date()}],
                        'updatedAt':new Date(),'createdAt':new Date()})
          alert("创建成功")
        },function(){
          alert("创建失败")
        })
        
   },
   [types.GRADE_AND_GROUP] (state) {
    state.AllGradNameList = []
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
       queryGroup.find().then(function(items) {
         for(let i = 0; i < items.length; i++){
           let groupitem = items[i].attributes.teamname
           obj[groupitem] = obj[groupitem] ? obj[groupitem]+1 : 1
         }
         for(let key in obj){
            gradeStuNumber += obj[key]
            let query1 = new AV.Query('Team')
            query1.equalTo('GradeID',item[p].id)

            let query2 = new AV.Query('Team')
            query2.equalTo('teamname',key)

            let query = AV.Query.and(query1,query2)
            query.find().then(function(item2){
              Group.push({'groupName':key,'groupStuNumber':obj[key],'createdAt':item2[0].createdAt,'updatedAt':item2[0].updatedAt})
            })

            // Group.push({'groupName':key,'groupStuNumber':obj[key]})
         }
         Group.push({'gradeStuNumber':gradeStuNumber})
       })
       state.AllGradNameList.push(Object.assign({'createdAt':item[p].createdAt,'updatedAt':item[p].updatedAt},{'grades':gradeName,'groups':Group}))
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
      return new Promise((resolve,reject) => {
        let student = {}
        let studentId = state.studentinfo[param.index].id
        var todo = AV.Object.createWithoutData('_User', studentId);
        todo.set('grade', param.grade);
        todo.set('teamname',param.group)
        // 保存到云端
        todo.save().then(function(){
            resolve()
        },function(err){
          console.log(err)
           reject()
        })
      })
    },
    deleteStudent ({commit},param) {
      return new Promise ((resolve,reject) => {
        let studentId = state.studentinfo[param].id
        let item = AV.Object.createWithoutData('_User', studentId);
          item.set('grade','')
          item.set('teamname','')
          item.save().then(function(){
            // alert("删除成功")
            state.studentinfo.splice(param,1)
            resolve()
          },function(){
            // alert("删除失败")
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
    getAllInfoList ({commit}) {
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
    },
    changeGradeName ({commit},param){
      return new Promise(function (resolve,reject) {
        let UserId = state.userInfo.id
        AV.Query.doCloudQuery('update GradeTable set createGrade= '+param.newGradeName+'where TeacherId = '+'UserId')
        .then(function (data) {
          // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
          // var results = data.results;
          resolve()
        }, function (error) {
          // 异常处理
          reject()
        });
      })
    },
    addGroup ({commit},param) {
      return new Promise (function(resolve,reject) {
        let queryGrade = new AV.Query("GradeTable")
        queryGrade.equalTo('createGrade',param.gradeName)

        queryGrade.find().then(function(item){

          let CreateItem = AV.Object.extend('Team')
          let instance = new CreateItem()
          instance.set('GradeID',item[0].id)
          instance.set('teamname',param.groupName)
          instance.set('membersCount',0)
          instance.save().then(function(){
            for (let i = 0; i < state.AllGradNameList.length; i++) {
              if(state.AllGradNameList[i].grades === param.gradeName) {
                 state.AllGradNameList[i].groups.push (Object.assign({
                   'groupName':param.groupName,'groupStuNumber':0,'updatedAt':new Date(),'createdAt':new Date()
                  }))
                 
                  break
            }
          }
          commit(types.SET_STUDENT_LIST)
          resolve()
          },function(){
            reject()
          })

        })
      })
    },
    deleteGrade ({commit},param) {
      console.log("进入了state")
      return new Promise ((resolve,reject) => {

        let queryGrade = new AV.Query('GradeTable')
        queryGrade.equalTo('createGrade',param.gradeName)

        queryGrade.find().then(function(item){
          var todo = AV.Object.createWithoutData('GradeTable', item[0].id);
          todo.destroy().then(function (success) {
            
          
            if(state.gradeList.indexOf(param.gradeName) !== -1) {
              state.gradeList.splice(state.gradeList.indexOf(param.gradeName),1)
            }
            console.log("删除班级后，在班级列表中删除:" + state.gradeList)
            for(let k = 0; k < state.AllGradNameList.length; k++) {
              let deleteGrade = state.AllGradNameList[k].grades
              if(deleteGrade === param.gradeName) {
                state.AllGradNameList.splice(k,1)
                console.log("删除班级小组表中的班级")
                console.log(state.AllGradNameList)
                break
              }
            }
            
            
            resolve()
          }, function (error) {
           reject()
          });
            resolve()
          },function(){
            // alert("删除失败")
            reject()
          })
        })
    },
    deleteGroupsByGrade ({commit}, param) {
      return new Promise(function(resolve,reject) {
          let queryGrade = new AV.Query('GradeTable')
          queryGrade.equalTo('createGrade',param.grades)

          queryGrade.find().then(function(item) {
            let queryGroupByGrade = new AV.Query('Team')
            queryGroupByGrade.equalTo("GradeID",item[0].id)
            let objects = []
            queryGroupByGrade.find().then(function(group) {
              for(let i = 0; i < group.length; i++){
               objects.push(group[i])
                // var todo2 = AV.Object.createWithoutData('Team',group[i].id);
                // todo2.destroy().then(function (success) {
                //   resolve()
                //   console.log("从小组表中删除group成功")
                // }, function (error) {
                //   reject()
                //   console.log("从小组表中删除group失败")
                // })
             
            }
         })
         AV.Object.destroyAll(objects).then(function () {
          resolve()
        }, function (error) {
          reject()
        });
        })
    })

}
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
