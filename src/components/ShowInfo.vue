<template>
  <div class = "showInfo">
    <student-info v-if = "shows"></student-info>
    <attended-info></attended-info>
    <statistics></statistics>
    <personal-info></personal-info>
  </div>
</template>
<script>

import studentInfo from '@/components/AllInfo/StudentInfo'
import attendedInfo from '@/components/AllInfo/AttendedInfo'
import statistics from '@/components/AllInfo/Statistics'
import personalInfo from '@/components/AllInfo/PersonalInfo'
export default {
  name:"ShowInfo",
  data(){
    return{
      shows:false
    }
  },

  components:{
    studentInfo,
    attendedInfo,
    statistics,
    personalInfo

  }
}
</script>
<style>
.showInfo{
  position: absolute;
  top:50px;
  left:50px;
}

</style>
