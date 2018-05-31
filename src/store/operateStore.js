import AV from 'leancloud-storage'
import * as types from './mutation_types'
import moduleA from './baseStore'
export default {
    mutations : {
        [types.CHANGR_PASS] (state,param) {
          let userId = moduleA.state.userInfo.attributes.password
           alert(userId)
        }
    },
    actions : {
        quitSystem ({state,commit}, param) {
         return new Promise((resolve,reject)=>{
           AV.User.logOut().then(function(){
             resolve()
           },function(){
             reject()
           })
         })
         },
         destoryInfo ({state,commit,dispatch}) {
          return new Promise ((resolve,reject) =>{
            let deleteGroup = []
            let deleteStudent = []
            let deleteGrade = []
            for (let i = 0; i < moduleA.state.AllGradNameList.length; i++) {
              let gradeName = moduleA.state.AllGradNameList[i].grades
              deleteGrade[i] = dispatch('deleteGrade',{gradeName:gradeName})
              deleteGroup[i] = dispatch('deleteGroupsByGrade', {grades:gradeName})
              deleteStudent[i] = dispatch('deleteStudentByGrade',gradeName)
            }

            var todo = AV.Object.createWithoutData('_User', moduleA.state.userInfo.id);
            let deleteUser = todo.destroy().then(function (success) {
              // 删除成功
               resolve()
            }, function (error) {
              // 删除失败
              reject()
            });
            let arrA = deleteGroup.concat(deleteStudent)
            let arrB = arrA.concat(deleteUser)
            let promise = Promise.all(arrB.concat(deleteGrade)).then (()=>{
              resolve()
            },function(){
              reject()
            })
          })
         },
         forgotPass ({state,commit},param) {
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
     
         signUp ({state,commit},param){
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
         changeInfo ({state,commit}, param) {
           return new Promise((resolve,reject) => {
             let student = {}
             let studentId = moduleA.state.studentinfo[param.index].id
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
         changeAttendStatus ({state,commit}, param) {
           return new Promise ((resolve,reject) =>{
                     var todo = AV.Object.createWithoutData('SigninList', param.row.signId);
                     todo.set('isSignin', param.status);
                     // 保存到云端
                     todo.save().then(function(){
                       for (let i = 0; i < moduleA.state.signinList.length; i ++) {
                           if (param.row.userID === moduleA.state.signinList[i].userID) {
                             moduleA.state.signinList[i].isSignin = param.status
                           }
                       }
                         resolve()
                     },function(err){
                       console.log(err)
                       reject()
                     })
                   })
         },
         deleteStudent ({state,commit},param) {
           return new Promise ((resolve,reject) => {
             let studentId = moduleA.state.studentinfo[param].id
             let item = AV.Object.createWithoutData('_User', studentId);
               item.set('grade','')
               item.set('teamname','')
               item.save().then(function(){
                 // alert("删除成功")
                 moduleA.state.studentinfo.splice(param,1)
                 resolve()
               },function(){
                 // alert("删除失败")
                 reject()
               })
           })
         },
         setStudentAttendScore ({state,commit}, param) {
            return new Promise((resolve,reject)=>{
                let id = param.id
                let signScore = 0
                let querySignin = new AV.Query('SigninList')
                querySignin.equalTo('userID',id)
                querySignin.find().then((signinList) => {
                    for (let i = 0; i < signinList.length; i++) {
                        if (signinList[i].attributes.isSignin === true) {
                            signScore += 10
                        }
                    }
                    for (let j = 0; j < moduleA.state.scoreList.length; j ++) {
                        if (id === moduleA.state.scoreList[j].userID) {
                            let diffAttendScore = signScore - moduleA.state.scoreList[j].attendScore
                            let diffattendStandard = diffAttendScore * (moduleA.state.standard.attend/100) 
                            moduleA.state.scoreList[j].attendScore = signScore
                            moduleA.state.scoreList[j].sum += diffattendStandard
                        }
                    }
                    let query = new AV.Query('scoreList')
                    query.equalTo('userID',id)
                    query.find().then((userItem)=>{
                        connsole.log(userItem[0].id)
                        var todo = AV.Object.createWithoutData('scoreList',userItem[0].id)
                        todo.set('attendScore',signScore)
                        todo.save().then(function(){
                            resolve()
                        },function(err){
                            reject(err)
                        })
                    },function(err){
                        reject(err)
                    })
                },function(err){
                    reject(err)
                })
            })
         },
         setStandards ({state,commit},param) {
           return new Promise(function(resolve,reject){
             moduleA.state.standard = {}
             let queryTeacherStandard = new AV.Query('setStandard')
             queryTeacherStandard.equalTo('TeacherID',moduleA.state.userInfo.id)
     
             queryTeacherStandard.find().then(function(standardItem){
                 var todo = AV.Object.createWithoutData('setStandard',standardItem[0].id)
                 // 修改属性
                 todo.set('setAttend',param.attend)
                 todo.set('setDocument',param.document)
                 todo.set('setIngroup',param.inGroup)
                 todo.set('setBetweenGroup',param.betweenGroup)
                 todo.set('setUsually',param.usually)
                 todo.save().then (function(){
                   moduleA.state.standard = Object.assign({},{'attend':param.attend,
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
         
         changePassWord ({state,commit}, param) {
           return new Promise(function(resolve,reject) {
             let userID = moduleA.state.userInfo.id
             let queryUser = new AV.Query('_User')
             queryUser.get(userID).then(function(item) {
                   item.set('password',param.new)
                   item.save().then(function(){
                     resolve()
                   })
                },function(){
                    reject()
                })
       
           })
         },
         createMyGrade ({state,commit}, param) {
           return new Promise ((resolve,reject) => {
            let TeacherId = moduleA.state.userInfo.id
            let CreateItem = AV.Object.extend('GradeTable')
            let instance = new CreateItem()
            instance.set('TeacherId',TeacherId)
            instance.set('createGrade',param)
            instance.save().then(function(){
               moduleA.state.AllGradNameList.push({'grades':param,
                             'groups':[],'gradeStuNumber':0,
                            'updatedAt':new Date(),'createdAt':new Date()})
               moduleA.state.userInfo.attributes.createGrade.push(param)
              resolve()
            },function(){
              reject()
            }) 
           })
         },

         deleteStudentUpdateGrade({state,commit},param){
            return new Promise((resolve,reject) => {
              for (let i = 0; i < moduleA.state.AllGradNameList.length; i++ ) {
                let grade = moduleA.state.AllGradNameList[i]
                if( grade.grades === param.grade) {
                  for(let j = 0; j < grade.groups.length; j++ ) {
                    let group =grade.groups[j]
                    if( group.groupName === param.group) {
                      grade.gradeStuNumber -= 1
                      group.groupStuNumber -= 1
                      resolve()
                      return
                    }
                  }
                }
              }
              reject()
            })
         },
         addGroup ({state,commit},param) {
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
                 for (let i = 0; i < moduleA.state.AllGradNameList.length; i++) {
                   if(moduleA.state.AllGradNameList[i].grades === param.gradeName) {
                      moduleA.state.AllGradNameList[i].groups.push (Object.assign({
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
         deleteGrade ({state,commit},param) {
           return new Promise ((resolve,reject) => {
             let queryGrade = new AV.Query('GradeTable')
             queryGrade.equalTo('createGrade',param.gradeName)
     
             queryGrade.find().then(function(item){
               var todo = AV.Object.createWithoutData('GradeTable', item[0].id);
               todo.destroy().then(function (success) {
                 if(moduleA.state.gradeList.indexOf(param.gradeName) !== -1) {
                   moduleA.state.gradeList.splice(moduleA.state.gradeList.indexOf(param.gradeName),1)
                 }
                 for(let k = 0; k < moduleA.state.AllGradNameList.length; k++) {
                   let deleteGrade = moduleA.state.AllGradNameList[k].grades
                   if(deleteGrade === param.gradeName) {
                     moduleA.state.AllGradNameList.splice(k,1)
                     moduleA.state.userInfo.attributes.createGrade.splice(moduleA.state.userInfo.attributes.createGrade.indexOf(param.gradeName),1)
                     }
                   }
               }, function (error) {
                reject()
               });
                 resolve()
               },function(){
                 reject()
               })
             })
         },
         deleteGroupsByGrade ({state,commit}, param) {
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
         deleteGroupByGroupName ({state,commit},param) {
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
         updategradeAndGroup ({state,commit}, param) {
           return new Promise(function(resolve,reject) {
             for(let i = 0; i < moduleA.state.AllGradNameList.length; i++) {
               let grade = moduleA.state.AllGradNameList[i] 
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
         deleteStudentByGrade ({state,commit},param) {
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
         deleteStudentByGroup ({state,commit},param) {
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
         saveScore ({state,commit},param) {
           return new Promise ((resolve,reject) => {
             let studentId = moduleA.state.studentinfo[param.index].id
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
                 let sum = attendscore * (moduleA.state.standard.attend)/100 + documentScore * moduleA.state.standard.document/100
                         + usuallyScore * moduleA.state.standard.usually/100 + betweenGroupScore * moduleA.state.standard.betweenGroup/100
                         + inGroupScore * moduleA.state.standard.ingroup/100
                 for(let i = 0; i < moduleA.state.scoreList.length; i++) {
                   if(moduleA.state.scoreList[i].userID === studentId) {
                     moduleA.state.scoreList[i].documentScore = Number(param.document)
                     moduleA.state.scoreList[i].usuallyScore = Number(param.usually)
                     moduleA.state.scoreList[i].sum = sum
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
        },
        resetSum ({state,commit},param) {
            return new Promise ((resolve,reject) => {
                let attend = Number(param.attend/100)
                let document = Number(param.document/100)
                let usually = Number(param.usually/100)
                let betweenGroup = Number(param.betweenGroup/100)
                let inGroup = Number(param.inGroup/100)
                    for (let j = 0; j < moduleA.state.scoreList.length; j ++) {
                        moduleA.state.scoreList[j].sum  =   moduleA.state.scoreList[j].attendScore * attend + 
                                                            moduleA.state.scoreList[j].documentScore * document +
                                                            moduleA.state.scoreList[j].usuallyScore * usually +
                                                            moduleA.state.scoreList[j].inGroupScore * inGroup +
                                                            moduleA.state.scoreList[j].betweenGroupScore * betweenGroup
                    }
            })
        }
    }
}