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
    standard:{},
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
    getstandard: (state) => state.standard,
    getGradeList: (state) => state.gradeList,
    getAllGradNameList: (state) => state.AllGradNameList
}

const mutations = {

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
     for (let i = 0; i < state.studentinfo.length; i++) {
       let userId = state.studentinfo[i].id
      
       let queryUserGrade = new AV.Query('_User')
       queryUserGrade.get (userId).then (function(item) {

        let queryUser = new AV.Query('SigninList')
        queryUser.equalTo("userID",userId)
        let querySign = new AV.Query('SigninList')
        querySign.equalTo("date",param)
        
        var query = AV.Query.and (queryUser,querySign)
        query.find().then(function (signin) {
         if(signin.length !== 0) {
           state.signinList.push ({'userID':userId,'isSignin':signin[0].attributes.isSignin,'date':param,
                                  'signId':signin[0].id,
                                  'grade':item.attributes.grade,'teamname':item.attributes.teamname})
         }
          if(signin.length === 0) {
            for (let i = 0; i < state.dateArray.length; i ++) {
             let query = new AV.Object('SigninList')
             query.set('userID',userId)
             query.set ('date',state.dateArray[i])
             query.set ('isSignin',false)
             query.save()
            }
            state.signinList.push({'userID':userId,'isSignin':false,'date':param,
                                  'grade':item.attributes.grade,'teamname':item.attributes.teamname}) 
          }
       })
       })

     }
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
    quitSystem ({commit}, param) {
    return new Promise((resolve,reject)=>{
      AV.User.logOut().then(function(){
        resolve()
      },function(){
        reject()
      })
    })
    },
    forgotPass ({commit},param) {
      return new Promise ((resolve,reject) => {
        let queryName = new AV.Query('_User')
            queryName.equalTo('username',param.name)

        let queryTel = new AV.Query('_User')
            queryTel.equalTo('mobilePhoneNumber',param.tel)
        
        let query = AV.Query.and(queryName,queryTel)
        query.find().then((item) => {
          if(item.length === 0) {
            reject()
          }
          else{
            item[0].set('password',param.pass)
            item[0].save().then(() => {
              resolve()
            },function(){
              reject()
            })
        }
        },function(){
          reject()
        })
      })
    },
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
      return new Promise((resolve,reject) =>{
        var user = new AV.User();
        user.set('username',param.name);
        user.set('password',param.pass);
        user.set('startDate',param.date)
        user.set('mobilePhoneNumber',param.tel)
        user.set('isTeacher',param.isteacher)
        user.signUp().then(function (loginedUser) {
          alert("注册成功")
          resolve()
        },function (error) {
          reject()   
        })
      })
     
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
      return new Promise ((resolve,reject) =>{
                var todo = AV.Object.createWithoutData('SigninList', param.row.signId);
                todo.set('isSignin', param.status);
                // 保存到云端
                todo.save().then(function(){
                  for (let i = 0; i < state.signinList.length; i ++) {
                      if (param.row.userID === state.signinList[i].userID) {
                        state.signinList[i].isSignin = param.status
                      }
                  }
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
    setStandards ({commit},param) {
      return new Promise(function(resolve,reject){
        state.standard = {}
        let queryTeacherStandard = new AV.Query('setStandard')
        queryTeacherStandard.equalTo('TeacherID',state.userInfo.id)

        queryTeacherStandard.find().then(function(standardItem){
            var todo = AV.Object.createWithoutData('setStandard',standardItem[0].id)
            // 修改属性
            todo.set('setAttend',param.attend)
            todo.set('setDocument',param.document)
            todo.set('setIngroup',param.inGroup)
            todo.set('setBetweenGroup',param.betweenGroup)
            todo.set('setUsually',param.usually)
            todo.save().then (function(){
              state.standard = Object.assign({},{'attend':param.attend,
                                              'usually':param.usually,
                                              'document':param.document,
                                              'ingroup':param.inGroup,
                                              'betweenGroup':param.betweenGroup})
              resolve()
            },function(){
              console.log("保存到云端的考勤成绩更新失败")
               reject()
            })
        })
      })
    },
    setStandardItem ({commit}) {
      return new Promise (function(resolve,reject)  {
        let queryTeacherStandard = new AV.Query('setStandard')
        queryTeacherStandard.equalTo('TeacherID',state.userInfo.id)
        queryTeacherStandard.find().then(function(standardItem){

          if(standardItem.length === 0) {
            let CreateItem = AV.Object.extend('setStandard')
            let instance = new CreateItem()
            instance.set('TeacherID',state.userInfo.id)
            instance.save().then(function(){
               state.standard = Object.assign({},{'attend':20,
                                              'usually':20,
                                              'document':20,
                                              'ingroup':20,
                                              'betweenGroup':20})
              resolve()
            },function(){
              reject()
            })
          }
          state.standard = Object.assign({},{'attend':standardItem[0].attributes.setAttend,
                                              'usually':standardItem[0].attributes.setUsually,
                                              'document':standardItem[0].attributes.setDocument,
                                              'ingroup':standardItem[0].attributes.setIngroup,
                                              'betweenGroup':standardItem[0].attributes.setBetweenGroup})
           resovle()
        })
      })
    },
    getStudentScoreList ({commit}) {
      return new Promise((resolve,reject) => {
        let sum = 0
        state.scoreList = []
        for (let i = 0; i < state.studentinfo.length; i ++) {
          let studentId = state.studentinfo[i].id
          let score = 0 
          let score2 = 0
          let result = 0
          let betweenResult = 0
          let betweenScore = 0
          let queryAttend = new AV.Query('SigninList')
          queryAttend.equalTo('userID',studentId)
  
          queryAttend.find().then (function(signinList){
            for (let k = 0; k < signinList.length; k ++) {
                if(signinList[k].attributes.isSignin === true) {
                  score += 10
                }
            }
          })
        let userId = state.studentinfo[i].id
        let query = new AV.Query('InTeamComment')
        query.equalTo('targetUserID',userId).find().then(function(item){
          let itemLength = item.length
          if (!itemLength) result = 0
          else{
            for (let j = 0; j < itemLength; j ++) {
              score2 += item[j].attributes.score
            }
            result = Math.ceil(score2/itemLength)
            }
        })

        let grade = state.studentinfo[i].attributes.grade
        let teamname = state.studentinfo[i].attributes.teamname

        let queryGrade = new AV.Query('GradeTable')
        queryGrade.equalTo('createGrade',grade)

        queryGrade.find().then(function(gradeItem) {
          let queryTeamId = new AV.Query('Team')
          queryTeamId.equalTo('GradeID',gradeItem[0].id)

          let queryOnlyTeam = new AV.Query('Team')
          queryOnlyTeam.equalTo('teamname',teamname)

          let queryOneTeam = AV.Query.and(queryTeamId,queryOnlyTeam)

          queryOneTeam.find().then (function(teamItem){
            let queryBetweenGroupScore = new AV.Query('BetweenTeamComment')
            queryBetweenGroupScore.equalTo('targetTeamID',teamItem[0].id) 

            queryBetweenGroupScore.find().then (function(commentItem){
              if (commentItem.length === 0) betweenResult = 0
              else {
                  
                  for(let p = 0; p < commentItem.length; p ++) {
                    betweenScore += Number(commentItem[p].attributes.rating)
                  }
                
                  betweenResult = Number(betweenScore/commentItem.length)
              }
                  let queryScore = new AV.Query('scoreList') 
                  queryScore.equalTo('userID',studentId)
        
                  queryScore.find().then (function(scoreItem) {
                    if (scoreItem.length === 0) {
                      let CreateItem = AV.Object.extend('scoreList')
                      let instance = new CreateItem()
                      instance.set('userID',studentId)
                      instance.set('attendScore',score)
                      instance.set('inGroupScore',result)
                      instance.save().then(function(){
                        state.scoreList.push({'userID':studentId,'attendScore':score,
                                              'documentScore':0,'usuallyScore':0,
                                              'betweenGroupSore':betweenResult,
                                              'inGroupScore':result,'sum':0})
                       
                      },function(){
                         reject()
                      })
                    }
                    if(scoreItem.length !== 0) {
                      var todo = AV.Object.createWithoutData('scoreList',scoreItem[0].id)
                      // 修改属性
                      todo.set('attendScore', score)
                      todo.set('inGroupScore',result)
                      todo.set('betweenGroupScore',betweenResult)
                      todo.save().then (function(){
                        let documentScore = scoreItem[0].attributes.documentScore
                        let usuallyScore = scoreItem[0].attributes.usuallyScore
                        let betweenGroupScore = scoreItem[0].attributes.betweenGroupScore
                        let inGroupScore = scoreItem[0].attributes.inGroupScore
                        let sum = (score * (state.standard.attend)/100 + documentScore * state.standard.document/100
                                + usuallyScore * state.standard.usually/100 + betweenGroupScore * state.standard.betweenGroup/100
                                + inGroupScore * state.standard.ingroup/100)
                        state.scoreList.push({'userID':studentId,'attendScore':score,
                                              'documentScore':documentScore,
                                              'usuallyScore':usuallyScore,
                                              'betweenGroupScore':betweenResult,
                                              'inGroupScore':result,
                                              'sum': sum
                                            })
                      },function(){
                        console.log("保存到云端的考勤成绩更新失败")
                         reject()
                      })
                    }
                  })
            })
          })

        })   
          resolve()
        }
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
      return new Promise(function(resolve,reject) {
        let userID = state.userInfo.id
        let queryUser = new AV.Query('_User')
        queryUser.get(userID).then(function(item) {
          let pass = item.get('mobilePhoneNumber')
          if (param.old === pass){
              item.set('password',param.new)
              item.save().then(function(){
                resolve()
              },function(){
                reject()
              })
          }
          else {
            reject()
          }
        })
      })
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
        let query = new AV.Query('scoreList')
        query.equalTo('userID',studentId)

        query.find().then(function(scoreItem) {
          var todo = AV.Object.createWithoutData('scoreList',scoreItem[0].id)
          // 修改属性
          todo.set('documentScore',Number(param.document))
          todo.set('usuallyScore',Number(param.usually))

          todo.save().then (function(){
            let attendscore = scoreItem[0].attributes.attendScore
            let documentScore = Number(param.document)
            let usuallyScore = Number(param.usually)
            let betweenGroupScore = scoreItem[0].attributes.betweenGroupScore
            let inGroupScore = scoreItem[0].attributes.inGroupScore
            let sum = attendscore * (state.standard.attend)/100 + documentScore * state.standard.document/100
                    + usuallyScore * state.standard.usually/100 + betweenGroupScore * state.standard.betweenGroup/100
                    + inGroupScore * state.standard.ingroup/100
            for(let i = 0; i < state.scoreList.length; i++) {
              if(state.scoreList[i].userID === studentId) {
                state.scoreList[i].documentScore = Number(param.document)
                state.scoreList[i].usuallyScore = Number(param.usually)
                state.scoreList[i].sum = sum
              }
            }
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
