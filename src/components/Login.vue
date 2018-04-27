<template>
  <div class = "container is-centered">
    <div class = "media">
      <div class = "media-left">
        <p class = "img is-64x64">
          <img src = "https://bulma.io/images/paceholders/128x128.png">
        </p>
      </div>
      <div class = "media-content">
        <div class = "notification container">
          <!-- <p class = "img is-32x32 left">
            <img src = '../assets/logo.png'>
          </p> -->
          <h4 class = "right">"工程项目训练"教师端系统</h4>
          </div>
        <br/>
        <p v-show = "error">用户名或者密码不正确</p>
        <label for = "username">用户名</label>
        <input type = "text" id = "username" class = "inputText" v-model = "username"/>
        <br/>
        <br/>
        <label for = "password">密&nbsp;&nbsp;码&nbsp;</label>
        <input type = "password" id = "password" class = "inputText" v-model = "password"/><br/>
        <br/>
        <button class = "submit" value = "登录" @click = "login(username,password)">登录</button>
     </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import notFound from './NotFound'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  components:{
    notFound
  },
  methods:{
    login(name,pass){
      sessionStorage.clear()
      if(name === "admin" && pass === "admin123"){
          this.$store.dispatch('setLoginInfo', {
            name: this.username,
            pass: this.password,
            login: true
          })
          this.$router.push('/Home')
      }
      else{
        this.error = true
      }
    }
  },
  computed:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.right{
  position: absolute;
  float: right;
}
p{
  width:400px;
  height:50px;
  color: red;
  font-size: 14px;
  font-family:'Courier New';
}
label{
  font-size: 20px;
  font-weight: bold;
}
.inputText{
  width: 200px;
  height: 20px;
  border:2px solid gray;
}
button{
  position: absolute;
  display: block;
  left: 40%;
  top:100%;
  width: 50px;
  height: 30px;
   background-color: green;
}
</style>
