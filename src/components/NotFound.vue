<template>
<div class = "notfound">
   <!-- <img src = '../assets/notfound.png'
        title = "图片没找到"
        alt = "这是一个图片" @click="reload"> -->
  <p class = "aaa">aaaa</p>
</div>
</template>
<script>
export default {
 data(){
   return {

   }
 },
 methods:{
   reload($route) {
      this.$router.replace({
        path: '/Home'
      })
  }
 },
 created(){
   this.$emit("checkshow","asdf")
 }
}
</script>
<style>
  /* img{
    max-width:100%;
            max-height:100%;
            position:absolute;
            top:50%;
            left:50%;
            -webkit-transform-origin:50% 50%;
            -webkit-transform:translate3d(-50%,-50%,0);
            display: block;

  } */

</style>


