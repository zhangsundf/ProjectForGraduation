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
    scoreList:[],
    // inGroupScoreList:[],
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
    getScoreList: (state) => state.scoreList,
    // getinGroupScoreList: (state) => state.inGroupScoreList,
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
     queryTeacherId.equalTo('TeacherId',state.userInfo.id)
     queryTeacherId.ascending('createGrade')
     queryTeacherId.find().then (function (item) {
      state.studentinfo = []
       for (let i = 0; i < item.length; i++) {
         let gradeItem = item[i].attributes.createGrade
         gradeArray.push(gradeItem)
         let queryStudent1 = new AV.Query('_User')
         queryStudent1.equalTo('grade',gradeItem)
         queryStudent1.ascending('grade')
         queryStudent1.find().then(function(userList) {
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
        comment.ascending('date')
        comment.find().then(function(commentItem) {
          for(let k = 0; k < commentItem.length; k++){
            state.studentComment.push(commentItem[k])
          }
      })
    }
  },
   
   [types.GET_SIGN_LIST] (state,param) {
     state.signinList = []
    //  let result = []
     for (let i = 0; i < state.studentinfo.length; i++) {
       let userId = state.studentinfo[i].id
       let queryUser = new AV.Query('SigninList')
       queryUser.equalTo("userID",userId)
       let querySign = new AV.Query('SigninList')
       querySign.equalTo("date",param)
       
       var query = AV.Query.and (queryUser,querySign)
       query.find().then(function (signin) {
        if(signin.length !== 0) {
          state.signinList.push ({'userID':userId,'isSignin':signin[0].attributes.isSignin,'date':param,'signId':signin[0].id})
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
    //  return result
   },
   [types.GET_DATE_LIST] (state) {
    let beginDate = state.userInfo.attributes.startDate
    let today = new Date().format() 
      let dateList = []
      var ab = beginDate.split("-");  
      var ae = today.split("-");  
      var db = new Date();  
      db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);  
      var de = new Date();  
      de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);  
      var unixDb = db.getTime();  
      var unixDe = de.getTime();  
      for (var k = unixDb; k <= unixDe;) {  
         dateList.push((new Date(parseInt(k))).format());  
          k = k + 24 * 60 * 60 * 1000;  
      }
      
     state.dateArray =  dateList
   },
  //  [types.GET_ATTEND_SCORE] (state) {
  //    let studentinfo = state.studentinfo
  //    for (let i = 0; i < studentinfo.length; i++) {
  //      let score = 0
  //     let userId = state.studentinfo[i].id
  //     let queryUser = new AV.Query('SigninList')

  //     queryUser.equalTo('userID',userId).find().then(function(item) {
  //       for (let j = 0; j <item.length; j ++ ) {
  //         if(item[j].attributes.isSignin === true) {
  //           score+=100
  //         }
  //       }
  //       state.studentinfo[i].attributes = Object.assign({},{'attendScore':score},state.studentinfo[i].attributes)
  //        state.attendScore.push ({'userID':userId,'attendScore':score})
  //     })
  //    }
  //  },
  //  [types.GET_SCORE_INGROUP] (state) {
  //    let studentinfo = state.studentinfo
  //    for (let i = 0; i < state.studentinfo.length; i++){
  //      let score = 0
  //      let result = 0
  //      let userId = state.studentinfo[i].id
  //      let query = new AV.Query('InTeamComment')
  //      query.equalTo('targetUserID',userId).find().then(function(item){
  //        let itemLength = item.length
  //        if (!itemLength) result = 0
  //        else{
  //         for (let j = 0; j < itemLength; j ++) {
  //           score += item[j].attributes.score
  //         }
  //         result = Math.ceil(score/itemLength)
  //       }
  //       state.studentinfo[i].attributes = Object.assign({},{'inGrouScore':result},state.studentinfo[i].attributes)
  //       state.inGroupScoreList.push({'UserID':userId,'inGrouScore':result})
  //      })
  //    }
  //  },
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
                         'groups':[],'gradeStuNumber':0,
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
    findAllGradeName.ascending('createGrade')
    findAllGradeName.find().then(function(item){
     for(let p = 0; p < item.length; p ++) {

        let gradeName = item[p].attributes.createGrade
        let Group = []
        let obj = {}
        let objGrade = {}
        let gradeStuNumber = 0
        
        let queryGroup = new AV.Query('Team')
        queryGroup.equalTo('GradeID',item[p].id) 
        queryGroup.find().then (function(groupitem) {
          for(let i = 0; i < groupitem.length; i ++ ){
            let key = groupitem[i]
            let queryStudent1 = new AV.Query('_User')
            queryStudent1.equalTo('teamname',key.attributes.teamname) 

            let queryStudent2 = new AV.Query('_User')
            queryStudent2.equalTo('grade',gradeName) 

            let query = AV.Query.and(queryStudent1,queryStudent2)
            query.count().then (function(count) {

              Group.push({'groupName':key.attributes.teamname,'groupStuNumber':count,'createdAt':key.createdAt,'updatedAt':key.updatedAt})
            })
          }
        })
        let countGradeStuNum = new AV.Query('_User')
        countGradeStuNum.equalTo('grade',item[p].attributes.createGrade)

        countGradeStuNum.count().then (function(count) {
          state.AllGradNameList.push(Object.assign({'createdAt':item[p].createdAt,'updatedAt':item[p].updatedAt,'gradeStuNumber':count},{'grades':gradeName,'groups':Group}))
        })
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
    changeAttendStatus ({commit}, param) {
      console.log(param)
      return new Promise ((resolve,reject) =>{
                var todo = AV.Object.createWithoutData('SigninList', param.row.signId);
                todo.set('isSignin', param.status);
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
    getStudentScoreList ({commit}) {

      return new Promise((resolve,reject) => {
        state.scoreList = []
        for (let i = 0; i < state.studentinfo.length; i ++) {
          let studentId = state.studentinfo[i].id
          let score = 0 
          let queryAttend = new AV.Query('SigninList')
          queryAttend.equalTo('userID',studentId)
  
          queryAttend.find().then (function(signinList){
            for (let k = 0; k < signinList.length; k ++) {
                if(signinList[k].attributes.isSignin === true) {
                  score += 100
                }
            }
            let queryScore = new AV.Query('scoreList') 
            queryScore.equalTo('userID',studentId)
  
            queryScore.find().then (function(scoreItem) {
              if (scoreItem.length === 0) {
                let CreateItem = AV.Object.extend('scoreList')
                let instance = new CreateItem()
                instance.set('userID',studentId)
                instance.set('attendScore',score)
                instance.save().then(function(){
                  console.log("创建远端的学生考勤成绩成功")
                  state.scoreList.push({'userID':studentId,'attendScore':score})
                 resolve()
                },function(){
                  console.log("创建远端的学生考勤成绩失败")
                  // reject()
                })
              }

              if(scoreItem.length !== 0) {
                var todo = AV.Object.createWithoutData('scoreList',scoreItem[0].id)
                // 修改属性
                todo.set('attendScore', score)
                todo.save().then (function(){
                  state.scoreList.push({'userID':studentId,'attendScore':score})
                  console.log("保存到云端的考勤成绩更新成功")
                  resolve()
                },function(){
                  console.log("保存到云端的考勤成绩更新失败")
                  // reject()
                })
              }
            })
       
             
          })
        }
        // reject()
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
          resolve()
          },function(){
            reject()
          })

        })
      })
    },
    deleteGrade ({commit},param) {
      return new Promise ((resolve,reject) => {
        let queryGrade = new AV.Query('GradeTable')
        queryGrade.equalTo('createGrade',param.gradeName)

        queryGrade.find().then(function(item){
          var todo = AV.Object.createWithoutData('GradeTable', item[0].id);
          todo.destroy().then(function (success) {
            if(state.gradeList.indexOf(param.gradeName) !== -1) {
              state.gradeList.splice(state.gradeList.indexOf(param.gradeName),1)
            }
            for(let k = 0; k < state.AllGradNameList.length; k++) {
              let deleteGrade = state.AllGradNameList[k].grades
              if(deleteGrade === param.gradeName) {
                state.AllGradNameList.splice(k,1)
              }
            }
             resolve()
          }, function (error) {
           reject()
          });
            resolve()
          },function(){
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
            queryGroupByGrade.find().then(function(todos){
              todos.forEach(function(todo) {
                var todo = AV.Object.createWithoutData('Team', todo.id)
                todo.destroy().then(function (success) {
                 console.log("删除成功")
                }, function (error) {
                 reject()
                });
              });
              return AV.Object.saveAll(todos)
            })
           
        }).then(function(){
          resoLlve()
        },function(){
          reject()
        })
    })
  },
  deleteGroupByGroupName ({commit},param) {
    return new Promise (function(resolve,reject) {
      let queryGrade = new AV.Query('GradeTable')
          queryGrade.equalTo('createGrade',param.gradeName)
          queryGrade.find().then(function(gradeItem) {
            let queryGroup1 = new AV.Query('Team')
                queryGroup1.equalTo('GradeID',gradeItem[0].id)

            let queryGroup2 = new AV.Query('Team')
                queryGroup2.equalTo('teamname',param.groupName)

            let query = AV.Query.and(queryGroup1,queryGroup2)
                query.find().then(function(todo) {
                  var todo = AV.Object.createWithoutData('Team', todo[0].id)
                  todo.destroy().then(function (success) {
                    
                    resolve()
                  }, function (error) {
                   reject()
                  });
                })
          })

    })
  },
  updategradeAndGroup ({commit}, param) {
    return new Promise(function(resolve,reject) {
      for(let i = 0; i < state.AllGradNameList.length; i++) {
        let grade = state.AllGradNameList[i]
         
            // for(let j = 0; j < grade.groups.length; j ++) {
           
              if(grade.grades === param.gradeName ){
                for(let j = 0; j < grade.groups.length; j++) {
                  if (grade.groups[j].groupName === param.groupName) {
                     grade.groups.splice(j,1)
                     resolve()
                  }  
              }
          }
        }
      reject()
    })
  },
  deleteStudentByGrade ({commit},param) {
    return new Promise(function(resolve,reject){
      let querystudent1 = new AV.Query('_User')
      querystudent1.equalTo('grade',param)
  
      querystudent1.find().then(function(stuList){
        stuList.forEach(function(todo) {
          var todo = AV.Object.createWithoutData('_User', todo.id)
          todo.destroy().then(function (success) {
           console.log("删除成功")
          }, function (error) {
           reject()
          })
        })
        commit(types.SET_STUDENT_LIST)
        return AV.Object.saveAll(stuList)
      })
    })
    
  },
  deleteStudentByGroup ({commit},param) {
    return new Promise(function(resolve,reject){
      let querystudent1 = new AV.Query('_User')
      querystudent1.equalTo('grade',param.gradeName)
  
      let querystudent2 = new AV.Query('_User')
      querystudent2.equalTo('teamname',param.groupName)
  
      let query = AV.Query.and(querystudent1,querystudent2)
      query.find().then(function(stuList){
        stuList.forEach(function(todo) {
          var todo = AV.Object.createWithoutData('_User', todo.id)
          todo.destroy().then(function (success) {
           commit(types.GRADE_AND_GROUP)
          }, function (error) {
           reject()
          })
        })
        commit(types.SET_STUDENT_LIST)
        return AV.Object.saveAll(stuList)
      })
    })
  },
  saveScore ({commit},param) {
    return new Promise ((resolve,reject) => {
      let studentId = state.studentinfo[param.index].id
      console.log(param.index +','+ param.usually + ',' + param.document +','+studentId)
      let query = new AV.Query('scoreList')
      query.equalTo('userID',studentId)

      query.find().then(function(scoreItem) {
        console.log(scoreItem)
        var todo = AV.Object.createWithoutData('scoreList',scoreItem[0].id)
        // 修改属性
        todo.set('documentScore',Number(param.document))
        todo.set('usuallyScore',Number(param.usually))

        todo.save().then (function(){
          // state.scoreList.push({'userID':studentId,'attendScore':score})
          console.log("保存到云端的考勤成绩更新成功")
          resolve()
        },function(){
          console.log("保存到云端的考勤成绩更新失败")
           reject()
        })
      
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
