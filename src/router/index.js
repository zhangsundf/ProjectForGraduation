import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import StudentInfo from '@/components/AllInfo/StudentInfo'
import AttendedInfo from '@/components/AllInfo/AttendedInfo'
import Statistics from '@/components/AllInfo/Statistics'
import PersonalInfo from '@/components/AllInfo/PersonalInfo'

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
          path:'StudentInfo',
          name:'StudentInfo',
          component : StudentInfo

         },
        {
          path: 'AttendedInfo',
          name: 'AttendedInfo',
          component: AttendedInfo

        },
        {
          path: 'Statistics',
          name: 'Statistics',
          component: Statistics
        },
        {
          path: 'PersonalInfo',
          name: 'PersonalInfo',
          component: PersonalInfo
        }
      ]
    }
  ]
})
