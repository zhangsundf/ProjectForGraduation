<template>
  <div class = "card">
      <header class = "card-header">
        
        <!-- <div class = "right">
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
          </div> -->
      </header>
      <div class = "card-content">
        <keep-alive>
          <component :is = "curlink">

          </component>
        </keep-alive>
      </div>

  </div>
</template>
<script>
import studentInfo from './AllInfo/StudentInfo'
import personalInfo from './AllInfo/PersonalInfo'
import statistics from './AllInfo/Statistics'
import attendedInfo from './AllInfo/AttendedInfo'
export default {
  name: "Main",
  data(){
    return {
     tabsList:{
       "studentInfo": '学生信息'
     }
    }
  },

  props:{
    curlink:{
      type: String,
      default: "studentInfo"
    }
  },

  components:{
    studentInfo,
    personalInfo,
    statistics,
    attendedInfo,
   // showNews
  },
  methods:{
    handleClose(tag){
      this.tabsList.splice(this.tabsList.indexOf(tag),1)
    },
    togglePanel(val) {
      let clickTab = ''
        switch (val){
            case  '学生信息':
                clickTab = "studentInfo"
              break;
            case  '个人信息':
                 clickTab = "personalInfo"
              break;
            case  '成绩统计':
                 clickTab = "statistics"
              break;
            case  '考勤信息':
                  clickTab = "attendedInfo"
              break;
          }
          this.$emit("changeCurlink",clickTab)
       this.curlink = clickTab 
    }
  },
  computed:{

  },
  mounted(){
    //this.tabsList['showNews'] = "首页"
     // "showNews": '首页'
   //  this.tabInHeader(this.curlink)
  },
  

}
</script>

<style scoped>
.card{
    position: relative;
    width: 80%;
    height: 100%;
    flex:1;
 
}
.card-header{
  position: relative;
  width: 100%;
  border-bottom: 6px solid rgb(22, 168, 132,0.6);
  height: 10%;
}

.right{
  position: relative;
  width:20%;
  top:20px;
  left:80%;
}

.card-content{
  position: relative;
  height: 90%;
  overflow: hidden;
  background-color: rgb(243, 243, 243)
}

</style>


