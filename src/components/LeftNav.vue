<template>

   <div class = "menu">


      <ul class = "menu-list">
        <li class = "Avatar">
          <p class = "img is-36x36">
            <img src = "../assets/tiger.png">
          </p>
        </li>
        <li>
            <router-link to = "/Home/StudentInfo">学生信息</router-link>
        </li>

        <li>
            <router-link to = "/Home/AttendedInfo">考勤信息</router-link>
        </li>

        <li>
            <router-link to = "/Home/Statistics">成绩统计</router-link>
        </li>

        <li>
            <router-link to = "/Home/PersonalInfo">个人中心</router-link>
        </li>
      </ul>
      <!-- <router-view class = "show"/> -->
   </div>


</div>
</template>
<script>
import axios from 'axios'
export default {
  name:'LeftNav',
  data(){
    return {
     param: ''
    }
  },
// mounted(){
//    axios.get('http://127.0.0.1:3000/all').then((val)=>{
//      this.param = val.data;
//    })
// }
}
</script>
<style scoped>
 .menu{
     position: relative;
     width: 12%;
     height: 100%;
     background-color:steelblue;
     float: left;
     /* overflow: hidden; */
   }

.Avatar{
  width: 100%;
  height: 100px;
  margin: 100px 0 50px 0;
}
.menu-list li{
  border-bottom: 1px solid cadetblue;
  padding: 10px;
}
   /* .leftNav{
     position: relative;
     flex-direction: column;
     width: 60px;
     background-color: grey;
     height: 100%;
     padding-top:10%;
     /* float: left;
     } */







</style>




