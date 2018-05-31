<template>
<div class = "home">

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
      <span class = "operate" @click = "quit" >退出系统</span>
      <span class = "operate" @click = "destory">注销</span>
   </div>
   <keep-alive><router-view class = "showView"></router-view></keep-alive>
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
    },
    quit () {
      
        this.$store.dispatch('quitSystem').then (() =>{
          this.$router.push({path:'/'})
          alert("退出成功")
        }).catch(function(){
          alert("退出失败")
        })
    },
    destory () {
        var r = confirm("注销此账号将清除掉与你关联的所有班级以及学生，确认注销？") 
        if (r) {
          this.$store.dispatch('destoryInfo').then(()=>{
            alert("清除班级和学生成功")
            this.$router.push({path:'/'})
          }).catch(function(err){
            alert("删除失败")
            console.log(err)
          })
        } else {
          return 
        }

    }
  },
  beforeCreate () {
     this.$store.dispatch ("getDateArray")
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
  a:hover{
    color:  #fff;
    background-color: #1890ff;
  }
  .is-active{
    background-color:  #1890ff;
  }
  .showView {
    position: relative;
    width: 82%;
    height: 100%;
    left:18%;
    overflow-y: auto;
    padding:2%;
    padding-top:3%;
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
  .operate {
    position: relative;
    color:#fff;
    top:100px;
    font-size:14px;
    display: inline-block;
  }

  .operate:hover{
    cursor: pointer;
  }


</style>


