<template>
<div class = "home">
  <left-nav></left-nav>
  <main-panel></main-panel>

  <!-- <show-info></show-info> -->
</div>
</template>

<script>
import LeftNav from './LeftNav'
import mainPanel from './main'
export default {
  name:'Home',
  data(){
    return {

    }
  },
  components:{
    LeftNav,
    mainPanel
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


