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
      cur: 'showNews'
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
<style >
.home{
 position: relative;
 height: 100%;
 width: 100%;
 flex-direction: column;
 overflow: hidden;
 display: flex;
}
</style>


