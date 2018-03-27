<template>
<div class = "home">
  <top-nav></top-nav>
  <left-nav></left-nav>

  <!-- <show-info></show-info> -->
</div>
</template>

<script>
import LeftNav from './LeftNav'
import TopNav from './TopNav'
export default {
  name:'Home',
  data(){
    return {

    }
  },
  components:{
    LeftNav,
    TopNav
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


