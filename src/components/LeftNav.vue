<template>

   <div class = "menu">


      <ul class = "menu-list is-boxed">
        <li class = "Avatar">
          <p class = "img is-36x36">
            <img src = "../assets/tiger.png">
          </p>
          <span> {{username}}</span>
        </li>
        <li class = "link"  @click = "showPanel('link1',1)">
            <a id = "link1">学生信息</a>
        </li>

        <li class = "link"  @click = "showPanel('link2',2)">
           <a id = "link2">考勤信息</a>
        </li>

        <li class = "link" @click = "showPanel('link3',3)">
            <a id = "link3">成绩统计</a>
        </li>

        <li class = "link"  @click = "showPanel('link4',4)">
            <a id = "link4">个人中心</a>
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
      param: '',
      username:''
      }
    },
  mounted(){
  this.username = this.$store.state.user

  },
  methods:{
    showPanel(val,index){
        this.$store.commit("SETCURRENTPANEL",val)
        this.toggleClass("link",index,"is-active")
    }
  }

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
.menu-list li:not(.Avatar){
  border-bottom: 1px solid cadetblue;
  padding: 10px;
}
li:hover, a:hover{
  background-color: silver;
}
.is-active{
 background-color:silver;
}







</style>




