
<template>
  <div>
    <p>this is shownews page</p>
     <cover-layout v-if = "!hasAllInfo" :message = "!hasAllInfo"></cover-layout>
  </div>

</template>

<script>
import coverLayout from '../../common/coverLayout'
export default {
  name : "showNews",
  data(){
    return {
      msg: "abc"
    }
  },
  computed: {
    hasAllInfo () {
      console.log(this.$store.dispatch('haveComplateInfo'))
       this.$store.dispatch('haveComplateInfo')
    }
  },
  created () {

  },
  components :{
    coverLayout
  }
}
</script>

<style>

</style>
