import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'
import StudentInfo from '@/components/AllInfo/StudentInfo'
import AttendedInfo from '@/components/AllInfo/AttendedInfo'
import Statistics from '@/components/AllInfo/Statistics'
import PersonalInfo from '@/components/AllInfo/PersonalInfo'
import createGrade from '@/components/AllInfo/createGrade'
import myCreateGrade from '@/components/AllInfo/myCreateGrade'
import changePass from '@/components/AllInfo/changePass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login

    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: 'createGrade',
          name: "CreateGrade",
          component: createGrade
        },
        {
          path: 'myCreateGrade',
          name: "myCreateGrade",
          component: myCreateGrade
        },
        {
          path: 'changePass',
          name: "changePass",
          component: changePass
        },
        
        {
          path: '*',
          name: 'NotFound',
          component: NotFound
        }


      ]
    }
  ]
})
