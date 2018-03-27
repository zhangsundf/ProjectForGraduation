<template>

   <div class = "main">

      <div class = "leftNav">
        <ul>
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
      </div>

      <router-view class = "show"/>
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
 .main{
     position: relative;
     width: 100%;
     height: 100%;
     overflow: hidden;
   }

   .leftNav{
     position: relative;
     flex-direction: column;
     width: 60px;
     background-color: grey;
     height: 100%;
     padding-top:10%;
     float: left;
   }

  .leftNav ul  li{
    list-style-type:none;
    position: relative;
    width: 40px;
    height:40px;
    border:1px solid green;
    left:-30px;
    margin-bottom:40px;
  }
  .show{
    position: relative;
    left: 60px;
    padding-top:20px;
    height: 100%;
    background-color: antiquewhite;

  }




</style>




