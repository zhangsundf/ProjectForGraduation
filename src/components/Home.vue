<template>
<div class = "home">
  
  <!-- <left-nav  @getCurrentLink = "getCurrentLink"></left-nav>
  <main-panel :curlink = "link"></main-panel> -->

   <div class = "menu">

      <ul class = "menu-list is-boxed">
        <li>
            <img src = "../assets/logo-text.png">  
        </li>
        <li class = "link is-active" @click = "changeShow(1)">
          <router-link to = "/Home/StudentInfo">
            学生信息
          </router-link>
        </li>
        <li class = "link"  @click = "changeShow(2)">
          <router-link to = "/Home/StudentActivities">
            学生动态
          </router-link>
        </li>
         <li class = "link"  @click = "changeShow(3)">
           <router-link  to = "/Home/AttendedInfo">
           考勤信息
           </router-link>
        </li>
        <li class = "link"  @click = "changeShow(4)">
          <router-link to = "/Home/Statistics">
           成绩统计
          </router-link>
        </li>

        <li class = "link"  @click = "changeShow(5)">
          <router-link to = "/Home/PersonalInfo/myCreateGrade" >
           信息管理
          </router-link>
        </li>
      </ul>
   </div>
   <router-view class = "showView"></router-view>
</div>
</template>
 <script>

export default {
  name:'Home',
  data(){
    return {
      
    }
  },
  methods:{

    changeShow(index){
        this.toggleClass("link",index,"is-active")
    }
  },
  beforeCreate () {
     this.$store.dispatch ("getDateArray")
  },
  mounted() {
    console.log(this.$store.state.getDate)
  }
}
</script>
<style scoped>
.home{
 position: relative;
 height: 100%;
 width: 100%;
 flex-direction: row;
  overflow: hidden;
}
.menu{
     position: fixed;
     width: 18%;
     height: 100%;
     background-color:#001529;

    /* flex: 1; */
  }
  ul li:first-child {
    margin-top:8%;
    margin-bottom: 20%;
    height: 15%;
  }
  li {
    position: relative;
     color:  #fff;;
     font-size: 16px;
     width: 100%;
     font-weight: bold;
     /* height: 40px; */
     line-height: 30px;
     margin-top: 10px;
  }
  li:hover, a:hover{
    color:  #fff;
    background-color: #1890ff;
  }
  .is-active{
    color: #fff;
    background-color:  #1890ff;
  }
  .showView {
    position: relative;
    width: 82%;
    height: 100%;
    left:18%;
    overflow-y: auto;
    padding:2%;
    padding-top:5%;
  }
.showView::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.showView::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 10px;
}
.showView::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
}


</style>


