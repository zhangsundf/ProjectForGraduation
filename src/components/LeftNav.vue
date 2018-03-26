<template>

   <div class = "main">
      <div class = "leftNav">
        <ul>
        <li>
            <router-link to = 'Home/StudentInfo'>学生信息</router-link>
        </li>
        <li>
            <router-link to = 'Home/AttendedInfo'>考勤信息</router-link>
        </li>
        <li>
            <router-link to = 'Home/Statistics'>成绩统计</router-link>
        </li>
        <li>
            <router-link to = 'Home/PersonalInfo'>个人中心</router-link>
        </li>
      </ul>
      </div>

      <router-view class = "show"/>
   </div>


</div>
</template>
<script>
export default {
  name:'LeftNav',
  data(){
    return {

    }
  }
}
</script>
<style scoped>
 .main{
     /* flex-direction: row; */
     width: 100%;
     margin-top: 50px;
     height: 100%;
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
    margin-left: 60px;
    height: 100%;
    background-color: cornflowerblue;

  }




</style>




