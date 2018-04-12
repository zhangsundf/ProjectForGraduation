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
                        <!-- <i class = "fas fas-angle-down" aria-hidden="true"></i> -->
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
           <show-news id = "0"  v-if = "showPanel === 'link0' || show === 'link0'" class = "panel"></show-news>
          <student-info id = "1"  v-if = "showPanel === 'link1' || show === 'link1'"  class = "panel"></student-info>
          <attended-info id = "2"  v-if = "showPanel === 'link2'|| show === 'link2'"  class = "panel" ></attended-info>
          <statistics id = "3" v-if = "showPanel === 'link3' || show === 'link3'" class = "panel" ></statistics>
          <personal-info id = "4"  v-if = "showPanel === 'link4' ||show === 'link4'"  class = "panel"></personal-info>
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
      panelState:{
        link0 : true,
        link1 : false,
        link2 : false,
        link3 : false,
        link4 : false
      },
      currentTab:'',
      tabsList:[],
      defaultTabList:[
         {
            name:"link0",
            tip:"首页",
            show:true
         },
         {
            name: "link1",
            tip:"学生信息",
            show:false
         },
         {
            name:"link2",
            tip:"考勤信息",
            show:false
         },
         {
            name:"link3",
            tip:"成绩统计",
            show:false
         },
         {
            name:"link4",
            tip:"个人中心",
            show:false
         }

      ],

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
    TabshowPanel(){
     //   this.toggleClass("headerTabs",index,"is-active")
        var tabs = document.getElementsByClassName("headerTabs")
        var panels = document.getElementsByClassName("panel")
        for(var i = 0; i < tabs.length; i++){
          tabs[i].index = i
          tabs[i].onclick = function(){
            for(var j = 0; j < tabs.length; j++){
              tabs[j].classList.remove("is-active")
              this.currentTab = ''
            }
            this.classList.add("is-active")
            this.currentTab = 'link'+this.index
         //   alert(this.currentTab +","+this.show)
          }
        }
    },
    checkTabsinHeader(item){
      if(this.tabsList.indexOf(item) == -1){
        this.tabsList.push(item)
      }
      return true
    },
    handleClose(tag){
      this.tabsList.splice(this.tabsList.indexOf(tag),1)
    },
    tabActive(){
        var elTag = document.getElementsByClassName("el-tag")
        alert(elTag.length)
        for(var i = 0; i < elTag.length; i++){
            elTag[i].index = i
            elTag[i].onclick = function(){
            elTag[i].classList.add("is-active")
          }
        }
      }
  },
  computed:{
    currentLink(){
       return this.$store.state.currentPanel
    },
    showPanel(){
          this.checkTabsinHeader(this.currentLink)
          return this.currentLink
    },
    show:{
      get(){
        return this.currentTab
      },
      set(v){
        this.currentTab = v
      //  alert("set show"+ this.currentTab)
        return this.currentTab
      }
    }
  },
  mounted(){
    this.tabActive()
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
.tabs a{
  display: inline-block;
}
.card-content{
  height: 88%;
}
.card-footer{
  height: 4%;
}
.notification{
  width: 100%;
  line-height: 4%;
}
.left{
  position: absolute;
  float: left;
  padding-left: 20%;
}
.el-tag{
  position: relative;
  width: 120px;
  height: 50px;
  line-height: 50px;
  top:24px;
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
.left ul li{
  position: relative;
  width: 110px;
}
.left ul li a{
  width: 100%;
}
.left .tabs{
  position: absolute;
  display: inline-block;
  bottom: 0px;
  left: 100px;
}
.right{
  position: relative;
  left:90%;
  top:30%;
}
.button.delete{
  width: 5px;
}
</style>


