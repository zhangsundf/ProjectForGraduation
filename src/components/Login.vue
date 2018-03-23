<template>
  <div class="login">
        <label for = "username">用户名</label>
        <input type = "text" id = "username" class = "inputText" v-model = "username"/>
        <br/>
        <br/>
        <label for = "password">密码&nbsp;</label>
        <input type = "password" id = "password" class = "inputText" v-model = "password"/><br/>
        <br/>
        <button class = "submit" value = "登录" @click = "login(username)">登录</button>
        {{username}}--{{$store.state.user}}
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username:'',
      password:''
    }
  },
  methods:{

    login(name){
      this.$store.commit('GETUSERNAME',name)
      this.$router.push('/Home')
      //console.log(this.$store.state.user)


    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
   position: absolute;
   width:400px;
   height:400px;
   left:50%;
   top:50%;
   margin-top: -200px;
   margin-left: -200px;
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
