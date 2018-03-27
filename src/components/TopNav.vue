<template>
     <div class = "topNav">
     <ul>
       <li>欢迎您:{{$store.state.user}}</li>
       <li><a href = '/Login'>注销</a></li>
     </ul>
   </div>
</template>
<script>
export default {

}
</script>
<style scoped>
/*.topNav{
  position: absolute;
  height:60px;
  width: 100%;
  background-color: grey;
}*/
.topNav{
  position: relative;
  height:60px;
  background-color: grey;

}
ul{
  position: relative;
  padding-left: 80%;
  top:-15px;
}

ul li{
  list-style-type: none;
  display: inline-block;
  width: 100px;
  line-height: 60px;
}

</style>
