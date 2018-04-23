<template>
  <div class = "card">
      <header class = "card-header">
        <div class = "left">
          <el-tag :key = "tag" v-for = "tag in tabsList" closable
                  :disable-tansition = "false" @close = "handleClose(tag)">
                  {{tag}}
          </el-tag>
        </div>
        <div class = "right">
              <div class = "dropdown is-hoverable">
                  <div class = "dropdown-trigger">
                    <button class = "button" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span>关于我们</span>
                      <span class = "icon is-small">
                        <font-awesome-icon :icon = "['fas','angle-down']"/>
                      </span>
                    </button>
                  </div>
                  <div class = "dropdown-menu" id = "dropdown-menu" role = "menu">
                    <div class = "dropdown-content">
                      <a href = "#" class = "dropdown-item">
                        关于系统
                      </a>
                      <a href = "#" class = "dropdown-item">
                        系统使用者
                      </a>
                      <a href = "#" class = "dropdown-item">
                        联系我们
                      </a>
                    </div>
                  </div>
              </div>
          </div>
      </header>
      <div class = "card-content">
        <keep-alive>
          <component :is = "curlink">

          </component>
        </keep-alive>
      </div>
      <footer class = "card-footer">
          <div class = "notification">
            <p>©copyright &nbsp;&nbsp;2018; 西安邮电大学</p>
          </div>
      </footer>

  </div>
</template>
<script>
import studentInfo from './AllInfo/StudentInfo'
import personalInfo from './AllInfo/PersonalInfo'
import statistics from './AllInfo/Statistics'
import attendedInfo from './AllInfo/AttendedInfo'
import showNews from './AllInfo/showNews'
export default {
  name: "Main",
  data(){
    return {
     tabsList:{
       "showNews": '首页'
     }
    }
  },

  props:{
    curlink:{
      type: String,
      default: "showNews"
    }
  },

  components:{
    studentInfo,
    personalInfo,
    statistics,
    attendedInfo,
    showNews
  },
  methods:{
    handleClose(tag){
      this.tabsList.splice(this.tabsList.indexOf(tag),1)
    },
    tabInHeader(val){

      let obj = Object.keys(this.tabsList)
      console.log(",,,,"+obj)
    //  obj.forEach( item =>{
        //if(val !== item && !this.tabsList[val]){
          switch (val){
            case  'studentInfo':
                  this.tabsList[val] = "学生信息"
              break;
            case  'personalInfo':
                  this.tabsList[val] = "个人信息"
              break;
            case  'statistics':
                  this.tabsList[val] = "成绩统计"
              break;
            case  'attendedInfo':
                  this.tabsList[val] = "考勤信息"
              break;
          }
          // if(val === 'studentInfo')
          //     this.tabsList[val] = "学生信息"
        //}
     //  })
        console.log(Object.keys(this.tabsList).length)
        console.log(Object.keys(this.tabsList))
      return this.tabsList
      }
  },
  computed:{

  },
  mounted(){
    //this.tabsList['showNews'] = "首页"
     // "showNews": '首页'
   //  this.tabInHeader(this.curlink)
  },
  beforeUpdate(){
    this.tabInHeader(this.curlink)
  }

}
</script>

<style>
.card{
    position: absolute;
    left: 12%;
    top:0px;
    width: 88%;
    height: 100%;
}
.card-header{
  border-bottom: 6px solid rgb(22, 168, 132,0.6);
  height: 8%;
}

.card-content{
  position: relative;
  height: 88%;
  overflow: hidden;
}
.card-footer{
  height: 4%;
}
.notification{
  width: 100%;
  line-height: 4%;
}
.left{
  position: relative;
  float: left;
  /* display: inline-block; */
  padding-left: 20%;
  height: 100%;
  overflow: hidden;
}
.el-tag{
  position: relative;
  width: 120px;
  height: 90%;
  line-height: 50px;
  top:10px;
  background-color:white;
  font-weight: bold;
  font-style: italic;
  font-size: 2vh;
  color:black;
}
.is-active{
  background-color:rgb(22, 168, 132,0.6);
  color: white;
}
.el-tag:hover{
  cursor: pointer;
  background-color: rgb(22, 168, 132,0.4);
}

.right{
  position: relative;
  left:20%;
  top:30%;
}
.button.delete{
  width: 5px;
}
</style>


