<template>
  <div class = "container is-centered">
      <div class = "loginPanel">
        <div class = "notification header">
          <h4 class = "headerText">"工程项目训练"教师端系统</h4>
          <!-- <img src = "../assets/logo-text.png"> -->
        </div>
        <br/>
            <a class = "is-centered button is-danger is-outlined error" v-show = "error" disabled>用户名或者密码不正确</a>
      
        <div class = "panel">
          <div class = "loginMethods">
            <ul>
              <li :class = "{active: tab === 1}"  @click = "changeLoginMethods(1)">账户密码登录</li>
              <li :class = "{active: tab === 2}"  @click = "changeLoginMethods(2)">手机号登录</li>
            </ul>
         </div>
          <div class = "login login1" v-if = "tab === 1">
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-primary" type="text" placeholder="Primary input" v-model = "username">
               <span class=" icon is-left">
                 <span style = "font-size:14px;">账号</span>
               </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-info" type="password" placeholder="Password input" v-model = "password">
                <span class=" icon is-left">
                  <span style = "font-size:14px;">密码</span>
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <a class="button is-primary loginBtn" @click="login(username,password)">登录</a>
              </div>
            </div>
          </div>
         <div class = "login login2" v-if = "tab === 2">
            <div class="field">
              <div class="control">
                <input class="input is-primary" type="text" placeholder="请输入手机号" v-model = "username">
              </div>
            </div>
            <div class="field getMessage">
              <div class="control">
                <a class="button is-primary loginBtn" @click="login(username,password)">获取验证码</a>
              </div>
            </div>
          </div>
        </div>
     </div>
     <div class = "signup">
        <el-button type="text" @click="dialogVisible1 = true">忘记密码?</el-button>
        <el-button type="text" @click="dialogVisible2 = true">立即注册</el-button>
      </div>
    <el-dialog
        title="注册"
        :visible.sync="dialogVisible2"
        width="38%"
        :before-close="handleClose">
        <div class = "content">
          <label for = "username">你的名字</label>
          <br/>
          <input type = "text" placeholder="真实姓名或常用昵称" class = "input is-success loginName" v-model="name">
          <br/>
          <label for = "tel">手机号</label>
          <br/>
          <input type = "text" placeholder="11位手机号" class = "input is-success loginTel" v-model = 'tel'>
          <br/>
          <label for = "email">课设开始时间</label>
          <br/>
          <input type = "date"  class = "input is-success loginEmail" v-model = 'date'>
          <br/>
          <label for = "pass">密码</label>
          <br/>
          <input type = "password" placeholder="6位以上的密码" class = "success is-primary loginPass" v-model = 'pass'>
          <br/>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false" size = "mini">取 消</el-button>
          <el-button type="primary" @click="signup" size = "mini">注册</el-button>
        </span>
    </el-dialog>
     <el-dialog
        title="找回密码"
        :visible.sync="dialogVisible1"
        width="38%"
        :before-close="handleClose">
        <div class = "content">
           <label for = "tel">账号</label>
          <br/>
           <input type = "text" placeholder="用户名" class = "input is-success" v-model = 'name2'>
          <label for = "tel">手机号</label>
          <br/>
          <input type = "text" placeholder="11位手机号" class = "input is-success" v-model = 'tel2'>
          <br/>
          <label for = "newPass">新密码</label>
          <br/>
          <input type = "password" placeholder="6位以上的密码" class = "success is-primary" v-model = 'newpass'>
          <br/>
          <label for = "pass">密码</label>
          <br/>
          <input type = "password" placeholder="6位以上的密码" class = "success is-primary" v-model = 'repass'>
          <br/>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false" size = "mini">取 消</el-button>
          <el-button type="primary" @click = "changePass(name2,tel2,newpass,repass)" size = "mini">修改密码</el-button>
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
      dialogVisible2: false,
      dialogVisible1: false,
      tab:1,
      name:'',
      pass:'',
      date:'',
      tel:'',
      tel2:'',
      newpass:'',
      repass:'',
      name2:''
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
     this.$store.dispatch('checkLogin', {
            name: this.username,
            pass: this.password,
            login: true
        }).then (() => {       
               this.$store.dispatch("getUser")
               this.$router.push({path:'/Home/StudentInfo'})
        }).catch(() => {
          this.error = true
        })   
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    signup () {
    
      this.$store.dispatch('signUp',{
          name:this.name,
          tel:this.tel,
          date:this.date,
          pass:this.pass,
          isteacher:true
      }).then(function(){
        alert("注册成功")
        
      }).catch(function(){
        alert("注册失败！\n可能原因：1.用户名已被注册;\n 2.手机号已被注册或无效；\n 3.信息填写不完整")
      })
      this.dialogVisible2 = false 
         this.name = ''
         this.tel = ''
         this.email = ''
         this.pass = '',
         this.date = ''
    },
    changePass (name,tel,pass, repass) {
      if (pass!== repass) {
        alert("两次密码输入不一致！")
      }
      else {
        this.$store.dispatch ("forgotPass",{name:name.trim(),tel:tel.trim(),pass:pass.trim()}).then(function(){
          alert("密码修改成功")
          this.dialogVisible1 = false 
        }).catch(function(){
          alert("用户名和预留手机号不匹配")
        })
         
      }
    },
    changeLoginMethods(index) {
      this.tab = index
    }
  }
}
</script>

<style scoped>
  .container {
    position: relative;
    width: 30%;
    height:50%;
    top:20%;
  }
  .notification {
    background-color: white;
    margin: 0px;
  }
  .error {
    position: relative;
    width: 84%;
    height: 30px;
    margin-top: -20px;
    font-size:14px;
    margin: 0 auto;
  }
  .error:hover {
    cursor: pointer;
  }
  .headerText {
    color: gray;
    font-weight: bold;
    font-size: 26px;
    font-family:cursive;
  }
  .field{
    width: 90%;
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
  ul li {
    position: relative;
    display: inline-block;
    margin: 10px;
  }
  .active {
    color: rgb(33, 202, 194);
    border-bottom: 3px solid rgb(33, 202, 194)
      }
.login {
  margin: 20px;
}
.loginBtn {
  position: relative;
  width: 100%;
  margin-top: 20px;
}
.el-button {
  margin-right:30px;
}
.getMessage {
  margin-top:50px;
}
</style>
