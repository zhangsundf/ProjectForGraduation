<template>
  <div class = "PersonalInfo">
    <div class = "navBar">
      <ul>
      <li class = "link"  :class = "{active: tab ===1}" @click = "changeView(1)"><router-link to = "/Home/PersonalInfo/myCreateGrade" tag = "span">班级管理</router-link></li>
      <li class = "link"  :class = "{active: tab ===2 }" @click = "changeView(2)"><router-link to = "/Home/PersonalInfo/createGrade"  tag = "span">小组管理</router-link></li>
      <li class = "link"  :class = "{active: tab ===3 }" @click = "changeView(3)"><router-link to = "/Home/PersonalInfo/changePass"  tag = "span">修改密码</router-link></li>
      </ul>
    </div>
    
    <router-view class = "routerChange"></router-view>
  </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        tab:1

      }
    },
    methods: {
      changeView (index){
        this.tab=index
       
      }
    }
  }
  </script>
  
  <style scoped>

  .navBar {
    position: relative;
    width: 100%;
    height:12%;
    margin: 0 auto;

  }
  .link {
    position: relative;
    display :inline-block;
    width:120px;
    padding: 10px;
  }
  .link:hover {
    cursor: pointer;
  }
  .routerChange {
    position: relative;
    height: 87%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .active {
    color:rgb(20, 196, 202);
    border-bottom: 3px solid rgb(20, 196, 202);
  }
  
  </style>
  