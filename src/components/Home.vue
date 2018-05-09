<template>
<div class = "home">
  <left-nav  @getCurrentLink = "getCurrentLink"></left-nav>
  <main-panel :curlink = "link"></main-panel>
</div>
</template>

<script>
import LeftNav from './LeftNav'
import mainPanel from './main'
export default {
  name:'Home',
  data(){
    return {
      cur: 'studentInfo'
    }
  },
  components:{
    LeftNav,
    mainPanel
  },
  methods:{
    getCurrentLink (arg){
      this.cur = arg
      return this.cur
    },
    changeCurlink (val) {
       this.link = val
       return this.link
    }
  },
  computed:{
    link:{
      get (){
       return this.cur
      },
      set (val){
        this.cur = val
        return this.cur
      }
    }
  }
}
</script>
<style scoped>
.home{
 position: relative;
 height: 100%;
 width: 100%;
 flex-direction: row;
 overflow: hidden;
 display: flex;
}
</style>


