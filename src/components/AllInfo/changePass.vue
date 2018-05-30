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
              </div>
               <div class="control" v-if = "oldPasstip">
                <span>旧密码错误</span>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-info" type="password" placeholder="输入新密码" v-model = "newpass">
              
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input is-info" type="password" placeholder="再次输入密码" v-model = "repass">
              </div>
              <div class="control" v-if = "newPasstip">
                <span>两次密码输入不一致</span>
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
      newPasstip: false
    }
  },
  computed: {
    ...mapGetters(['getPass'])
  },
  methods: {
    changePass (old,pass, repass) {
       this.oldPasstip = false
        this.newPasstip = false
      if (old.trim() !== this.getPass) {
        this.oldPasstip = true
        return
      }
      if (pass.trim() !== repass.trim()) {
       this.newPasstip = true
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
  padding:5%;
  width: 50%;
  height: 70;
  margin: 0 auto;
  overflow: hidden;
}
.header {
  position: relative;
  background-color: whitesmoke;
  width: 100%;
  height:40px;
  margin-bottom: 20px;
  line-height: 40px;
}
.changePass {
  position: relative;
  width: 100%;
}
.field {
  position: relative;
}
</style>
