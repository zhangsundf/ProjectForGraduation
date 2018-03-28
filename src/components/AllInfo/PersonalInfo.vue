<template>
  <div class = "PersonalInfo">
    <div class = "editInfo">
        <div class = "contentText">
            <label for = "username">用户名</label>
            <input type = "text" id = "username" v-model = "username" readonly>
            <button @click = "editname" class = "editbtn">编辑</button>
        </div>


        <div class = "contentText">
            <label for = "pass">密码</label>
            <input type = "password" id = "pass"
                    v-model = "password" placeholder="请输入密码"
                    :onBlur = "checkpass()" readonly >
            <button @click = "editpass" class = "editbtn">编辑</button>
        </div>

        <div v-if = "istrue" class = "contentText">
            <label for = "repass">确认密码</label>
            <input type = "password" id = "repass" v-model = "newpassword"
                   style="postion:relative; left:-30px">
        </div>
        <button @click = "submitChange(username,password)" class = "submitbtn">提交修改</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PersonalInfo',
  data(){
    return {
      username: '',
      password: '',
      newpassword: '',
      istrue: false
    }
  },
  mounted(){
    this.username =this.$store.state.user
    this.password =this. $store.state.pass
  },
  methods:{
    commonOption(){
      let usertext = document.getElementById('username')
      let passtext = document.getElementById('pass')
      let editbtn = document.getElementsByClassName('editbtn')
      usertext.setAttribute("readOnly","true")
      passtext.setAttribute("readOnly","true")
      usertext.style.border = '3px solid darkgrey'
      passtext.style.border = '3px solid darkgrey'
      usertext.style.color = 'darkgrey'
      passtext.style.color = 'darkgrey'
    },
    editname(){
      let usertext = document.getElementById('username')
      usertext.removeAttribute("readOnly")
    },
     editpass(){
      let passtext = document.getElementById('pass')
      passtext.removeAttribute("readOnly")
      this.istrue = true
    },

    checkpass(){

    },

    submitChange(name,pass){
       this.$store.commit('SETUSERNAME',{
            'name':name,
            'pass':pass
        })
      this.commonOption()

        alert(this.$store.state.user+','+this.$store.state.pass)
    }

  }
}
</script>
<style scoped>
.editInfo{
  position: absolute;
  box-sizing: border-box;
  width:400px;
  height: 400px;
  border:1px solid saddlebrown;
  margin: auto;
  left:0;
  top:0;
  right: 0;
  bottom: 0;
  padding: 50px;

}

.changed{
  color: silver
}
.contentText{
  position: relative;
  width:100%;
  height: 50px;
  margin: 20px;
  color: slategray;
}
.contentText input{
  position: relative;

}
label{
  position: absolute;
  left:-30px;
  width: 64px;
}
.editbtn{
  position: relative;
  right: -20px;
  width: 50px;
  height: 25px;
  border-radius: 6px;
  background-color: steelblue;
  color: silver;
  font-family:'Lucida Sans';
  font-size: 14px;
}
.submitbtn{
  position: relative;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background-color: steelblue;
  color: silver;
  font-family: sans-serif;
  font-size: 16px;
}
</style>


