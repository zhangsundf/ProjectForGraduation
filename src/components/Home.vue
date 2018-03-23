<template>
<div class = "home">
  <left-nav></left-nav>
  <top-nav></top-nav>
  <show-info></show-info>
</div>
</template>

<script>
import LeftNav from './LeftNav'
import TopNav from './TopNav'
import ShowInfo from './ShowInfo'
export default {
  name:'Home',
  data(){
    return {

    }
  },
  components:{
    LeftNav,
    TopNav,
    ShowInfo
  }
}
</script>
<style scoped>
.home{
 position: absolute;
 width: 100%;
 height: 100%;
 margin: 0;
 padding: 0;
 overflow: hidden;
}
</style>


