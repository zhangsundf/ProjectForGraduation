<template>
  <div class = "container is-centered">
   
      <div class = "loginPanel">
        <div class = "notification header">
          <h4 class = "headerText">"工程项目训练"教师端系统</h4>
        </div>
        <br/>
        <p class = "error" v-show = "error">用户名或者密码不正确</p>
        <label for = "username">用户名</label>
        <input type = "text" id = "username" class = "inputText" v-model = "username"/>
        <br/>
        <br/>
        <label for = "password">密&nbsp;&nbsp;码&nbsp;</label>
        <input type = "password" id = "password" class = "inputText" v-model = "password"/><br/>
        <br/>
        <button class = "submit" value = "登录" @click = "login(username,password)">登录</button>
     </div>
     <div class = "signup">
        <el-button type="text" @click="dialogVisible = true">忘记密码?</el-button>
        <el-button type="text" @click="dialogVisible = true">立即注册</el-button>
      </div>
    <el-dialog
        title="注册"
        :visible.sync="dialogVisible"
        width="38%"
        :before-close="handleClose">
        <div class = "content">
          <label for = "username">你的名字</label>
          <br/>
          <input type = "text" placeholder="真实姓名或常用昵称" class = "loginName">
          <br/>
          <label for = "tel">手机号</label>
          <br/>
          <input type = "text" placeholder="11位手机号" class = "loginTel">
          <br/>
          <label for = "email">邮箱</label>
          <br/>
          <input type = "text" placeholder="常用邮箱" class = "loginEmail">
          <br/>
          <label for = "pass">密码</label>
          <br/>
          <input type = "password" placeholder="6为以上的密码" class = "loginPass">
          <br/>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size = "mini">取 消</el-button>
          <el-button type="primary" @click="signup" size = "mini">注册</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: false,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['getIsLogin']),
    isLogin () {
      return this.getIsLogin
    }
  },
  methods:{
    login(name,pass){
     let result = this.$store.dispatch('checkLogin', {
            name: this.username,
            pass: this.password,
            login: true
        })
          if(this.getIsLogin) {
            this.$store.dispatch("getUser")
            this.$router.push('/Home')
          }
          else {
          // alert("用户名或者密码错误")
            this.error = true
            return
          }
       
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    signup () {
      let name = document.getElementsByClassName("loginName")[0].value
      let tel = document.getElementsByClassName("loginTel")[0].value
      let email = document.getElementsByClassName("loginEmail")[0].value
      let pass = document.getElementsByClassName("loginPass")[0].value
      this.$store.dispatch('signUp',{
          name:name,
          tel:tel,
          email:email,
          pass:pass
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    position: relative;
    width: 40%;
    height:60%;
    box-shadow: 5px 5px 5px 5px  gray;
    overflow: hidden;
    top:20%;
  }
  .error {
    position: relative;
    width: 100%;
    height: 40px;
    color: red;
    font-size: 16px;
    font-family:fantasy;
    font-weight: bold;
  }
  .headerText {
    color: gray;
    font-weight: bold;
  }
   .content {
    position: relative;
    width:60%;
    height:80%;
    top:-20px;
    margin: 0 auto;
    font-weight: bold;
  }
  .content label {
    position: relative;
    float: left;
  }
  .content input {
    position: relative;
    float: left;
    width: 100%;
    height:29px;
    margin-bottom: 5px;
    border-radius: 5px ;
    border: 1px solid #DBDBDB;
  }

</style>
