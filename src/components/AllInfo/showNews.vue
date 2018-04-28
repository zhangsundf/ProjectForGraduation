
<template>
  <div>
    <p>this is shownews page</p>
     <!-- <cover-layout v-if = "hasAllInfo" ></cover-layout> -->
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
      return this.$store.dispatch('haveComplateInfo')
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
