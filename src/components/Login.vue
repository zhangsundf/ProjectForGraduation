<template>
  <div class = "container is-centered">
    <div class = "media">
      <div class = "media-left">
        <p class = "img is-64x64">
          <img src = "https://bulma.io/images/paceholders/128x128.png">
        </p>
      </div>
      <div class = "media-content">
        <div class = "notification container">"工程项目训练"教师端系统</div>
        <br/>
        <p v-show = "error">用户名或者密码不正确</p>
        <label for = "username">用户名</label>
        <input type = "text" id = "username" class = "inputText" v-model = "username"/>
        <br/>
        <br/>
        <label for = "password">密码&nbsp;</label>
        <input type = "password" id = "password" class = "inputText" v-model = "password"/><br/>
        <br/>
        <button class = "submit" value = "登录" @click = "login(username,password)">登录</button>
     </div>
     <ul v-for="music in musics">
      <li>
        {{ music.name }}
      </li><br>
      <li>
        <img :src="music.album.picUrl" style="width:200px;">
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      username:'',
      password:'',
      error: false,
      musics:''
    }
  },
  methods:{

    login(name,pass){
      sessionStorage.clear()
      if(name === "admin" && pass === "admin123"){
          this.$store.commit('SETUSERNAME',{
                'name':name,
                'pass':pass
            })

          this.$router.push('/Home')
      }
      else{
        this.error = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .media{
   position: absolute;
   width:400px;
   height:400px;
   left:50%;
   top:50%;
   margin-top: -200px;
   margin-left: -200px;
} */
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
  width: 50px;
  height: 30px;
   background-color: green;
}
</style>
