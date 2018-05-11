import state from './state.js'
export const getters = {
    getUsername: (state) => state.user,
    getStudentInfo: (state) => state.studentinfo,
    getIsLogin: (state) => state.isLogin,
    getMyCreateGrade: (state) => {
      return state.userInfo.attributes.createGrade
    },
    getCurUserInfo: (state) => state.userInfo,
    getstudentComment (state){
      return state.studentComment
    },
    getSigninList: (state) => state.signinList,
    getDate: (state) => state.dateArray,
    getAttendScoreList: (state) => state.attendScoreList
}
