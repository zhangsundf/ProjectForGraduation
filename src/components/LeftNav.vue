<template>

   <div class = "leftNav">
      <ul>
        <li>
            <router-link to = 'Home/StudentInfo'>学生信息</router-link>
        </li>
        <li>
            <router-link to = 'Home/AttendanceInfo'>考勤信息</router-link>
        </li>
        <li>
            <router-link to = 'Home/Statistics'>成绩统计</router-link>
        </li>
        <li>
            <router-link to = 'Home/PersonnalInfo'>个人中心</router-link>
        </li>
      </ul>
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
   .mainNav{
     position:absolute;
     display: flex;
     flex-direction: column;
     width: 100%;
     height: 100%;
     top:0px;
   }

   ul li{
     list-style: none;
   }

   .leftNav{
     flex:1;
     position: relative;
     width: 50px;
     display: flex;
     background-color: grey;
   }
   .leftNav ul{
     flex: 1;
     display: flex;
     flex-direction: column;
   }

  .leftNav ul li{
    flex: 1;
    width: 40px;
    height:40px;
    margin: 20px 0px;

  }




</style>




