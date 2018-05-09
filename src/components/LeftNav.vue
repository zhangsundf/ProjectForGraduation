<template>

   <div class = "menu">


      <ul class = "menu-list is-boxed">
        <!-- <li class = "link"  @click = "showPanel('studentInfo',1)">
            创建班级
        </li> -->

        <li class = "link is-active"  @click = "showPanel('studentInfo',1)">
            学生信息
        </li>

         <li class = "link"  @click = "showPanel('attendedInfo',2)">
           考勤信息
        </li>

        <li class = "link" @click = "showPanel('statistics',3)">
           成绩统计
        </li>

        <li class = "link" @click = "showPanel('personalInfo',4)" >
           个人中心
        </li>
      </ul>
      <!-- <router-view class = "show"/> -->
   </div>
</template>
<script>
import axios from 'axios'
  export default {
    name:'LeftNav',
    data(){
      return {
      param: '',
      username:'',
      showSubMenu: false
      }
    },
  mounted(){
  this.username = this.$store.state.user

  },
  methods:{
    showPanel(val,index){
        this.toggleClass("link",index,"is-active")
        this.$emit("getCurrentLink",val)
    }
  }

}
</script>
<style scoped>
 .menu{
     position: relative;
     width: 18%;
     height: 100%;
     background-color:rgb(249, 250, 250);
     padding-top: 10%;
    
  }
  li {
    position: relative;
     color: cornflowerblue;
     margin: 10px;
     font-size: 16px;
     width: 100%;
     height: 40px;
     line-height: 40px;
     
  }
li:hover, a:hover{
  color: rgb(235, 197, 197);
  background-color: rgba(70, 214, 159, 0.3);
}
.is-active{
  color: #fff;
 background-color:  rgba(70, 214, 159, 0.5);;
}







</style>




