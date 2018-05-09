<template>
  <div class = "PersonalInfo">
    <div class = "navBar">
      <router-link class = "link" to = "/Home/myCreateGrade">已创建班级</router-link>
      <router-link class = "link" to = "/Home/createGrade">创建班级</router-link>
      <router-link class = "link" to = "/Home/changePass">修改密码</router-link>
    </div>
    <router-view class = "routerChange"></router-view>
  </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
  .PersonalInfo {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    overflow-y: scroll;
  }
  .navBar {
    position: relative;
    width: 100%;
    height:10%;
  }
  .link {
    position: relative;
    display :inline-block;
    width:100px;
  }
  .routerChange {
    position: relative;
    height: 90%;
    background-color: burlywood;
    width: 100%;
  }
  
  </style>
  