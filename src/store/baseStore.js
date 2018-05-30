import * as types from './mutation_types'
import AV from 'leancloud-storage'

export default {
    state: {
        user:'',
        pass: '',
        isLogin: false,
        userInfo: {},
        studentComment: [],
        studentinfo: [],
        gradeList:[],
        dateArray: [],
        AllGradNameList: [],
        signinList: [],
        scoreList:[],
        standard: {}
    },
    getters : {
        getUsername: (state) => state.user,
        getPass: (state) => state.pass,
        getIsLogin: (state) => state.isLogin,
        getCurUserInfo: (state) => state.userInfo,
        getStudentInfo: (state) => state.studentinfo,
        getGradeList: (state) => state.gradeList,
        getAllGradNameList: (state) => state.AllGradNameList,
        getDate: (state) => state.dateArray,
        getstudentComment: (state) => state.studentComment,
        getSigninList: (state) => state.signinList,
        getScoreList: (state) => state.scoreList,
        getstandard: (state) => state.standard
    },
    mutations: {
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
                    let query = new AV.Object('SigninList')
                    query.set('userID',userId)
                    query.set ('date',param)
                    query.set ('isSignin',false)
                    query.save()
                   state.signinList.push({'userID':userId,'isSignin':false,'date':param,
                                         'grade':item.attributes.grade,'teamname':item.attributes.teamname}) 
                }
              })
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
        }
    },
    actions: {
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
        getStudentActivities ({state,commit}) {
            commit (types.GET_STUDENT_ACTIVITIES)
        },
        getGradeAndGroup ({state,commit}) {
            commit (types.GRADE_AND_GROUP)
        },
        getDateArray ({state,commit}) {
            commit (types.GET_DATE_LIST)
        },
        getUser ({state,commit}) {
            commit(types.SET_STUDENT_LIST)
        },
        getIsSign ({state,commit},param) {
            commit (types.GET_SIGN_LIST,param)
        },
        getAllInfoList ({state,commit}) {
            commit (types.GET_GRADE_LIST)
        },
        getStudentScoreList ({state,commit}) {
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
              let query = new AV.Query('InTeamComment')
              query.equalTo('targetUserID',studentId).find().then(function(item){
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
                            let sum = score * (state.standard.attend/100) + result * (state.standard.ingroup/100) +
                                        betweenResult * (state.standard.betweenGroup/100)

                            let CreateItem = AV.Object.extend('scoreList')
                            let instance = new CreateItem()
                            instance.set('userID',studentId)
                            instance.set('attendScore',score)
                            instance.set('inGroupScore',result)
                            instance.set('betweenGroupSore',betweenResult)
                            instance.set('sum',sum)
                            instance.save().then(function(){
                              state.scoreList.push({'userID':studentId,'attendScore':score,
                                                    'documentScore':0,'usuallyScore':0,
                                                    'betweenGroupSore':betweenResult,
                                                    'inGroupScore':result,'sum':sum})
                             
                            },function(){
                               reject()
                            })
                          }
                          if(scoreItem.length !== 0) {
                            let documentScore = scoreItem[0].attributes.documentScore
                            let usuallyScore = scoreItem[0].attributes.usuallyScore
                            let betweenGroupScore = scoreItem[0].attributes.betweenGroupScore
                            let inGroupScore = scoreItem[0].attributes.inGroupScore
                            let sum = (score * (state.standard.attend)/100 + documentScore * state.standard.document/100
                                    + usuallyScore * state.standard.usually/100 + betweenGroupScore * state.standard.betweenGroup/100
                                    + inGroupScore * state.standard.ingroup/100)
                            var todo = AV.Object.createWithoutData('scoreList',scoreItem[0].id)
                            // 修改属性
                            todo.set('attendScore', score)
                            todo.set('inGroupScore',result)
                            todo.set('betweenGroupScore',betweenResult)
                            todo.set('sum',sum)
                            todo.save().then (function(){
                              state.scoreList.push({'userID':studentId,'attendScore':score,
                                                    'documentScore':documentScore,
                                                    'usuallyScore':usuallyScore,
                                                    'betweenGroupScore':betweenResult,
                                                    'inGroupScore':result,
                                                    'sum': sum
                                                  })
                            },function(){
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
          setStandardItem ({state,commit}) {
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
          }
    }
}