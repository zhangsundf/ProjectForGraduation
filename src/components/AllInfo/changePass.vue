<template>

  <div class = "changePass">
    <div class = "panel">
    <div class = "header">
      <span class = "headerText has-text-centered">密码修改</span>
    </div>
          <div class = "login login1">
            <div class="field">
              <div class="control">
                <input class="input is-primary" type="password" placeholder="输入旧密码" v-model = "oldPass">
                <span v-if = "oldPasstip">*旧密码错误</span>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-info" type="password" placeholder="输入新密码" v-model = "newpass">
                <span  v-if = "noAllowEmpty">*密码不能为空</span>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-info" type="password" placeholder="再次输入密码" v-model = "repass">
                <span  v-if = "newPasstip">*两次密码输入不一致</span>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <a class="button is-primary changePass" @click="changePass(oldPass,newpass,repass)">确认修改</a>
              </div>
            </div>
          </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      oldPass:'',
      repass:'',
      newpass:'',
      oldPasstip: false,
      newPasstip: false,
      noAllowEmpty:false
    }
  },
  computed: {
    ...mapGetters(['getPass'])
  },
  methods: {
    changePass (old,pass, repass) {
       this.oldPasstip = false
        this.newPasstip = false
        this.noAllowEmpty = false
      if (old.trim() !== this.getPass) {
        this.oldPasstip = true
        return
      }
      if (pass.trim() !== repass.trim()) {
       this.newPasstip = true
       return
      }
      if (pass.trim() === ''){
        this.noAllowEmpty = true
        return
      }
        this.$store.dispatch ("changePassWord",{new:pass.trim()}).then(function(){
          alert("密码修改成功")
        
        }).catch(function(){
          alert("密码修改失败")
        })
          this.oldPass = ''
          this.newpass = ''
          this.repass = ''
    }
  }
  
}
</script>

<style scoped>

.panel {
  position: relative;
  padding:10%;
  width: 70%;
  height: 70;
  left: 36%;
  overflow: hidden;
}
.header {
  position: relative;
  width: 78%;
  height:40px;
  margin-bottom: 20px;
  line-height: 40px;
  
}
.changePass {
  position: relative;
  width: 78%;
  float: left;
  overflow: hidden;
}
.contorl {
  position: relative;
  display: flex;
  flex-direction: column;
}

.control span {
  position: relative;
  display: inline-block;
  color: red;
  font-size: 12px;
  font-family: 'Courier New';
  flex: 1;
  width:20%;
}
.input {
  position: relative;
  width: 78%;
}
</style>
