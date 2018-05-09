<template>
  <div class = "Statistics">
    <div class = "setStandards">
        <label for = "attended">考勤</label>
        <input type = "text" v-model = "attended" id = "attended" placeholder="例：20"><span>%</span>
        <label for = "usualGrade">平时成绩</label>
        <input type = "text" v-model = "usualGrade" id = "usualGrade" placeholder="例：20"><span>%</span>
        <label for = "documents">文档</label>
        <input type = "text" v-model = "documents" id = "documents" placeholder="例：20"><span>%</span>
        <label for = "inGroup">组内互评</label>
        <input type = "text" v-model = "inGroup" id = "inGroup" placeholder="例：20"><span>%</span>
        <label for = "betweenGroup">组间互评</label>
        <input type = "text" v-model = "betweenGroup" id = "betweenGroup" placeholder="例：20"><span>%</span>
        <button @click = "checkTotal">设置</button>
    </div>
     <div class = "showScore" style="width:100%;">
            <v-table
                    is-horizontal-resize
                    style="width:100%;"
                    :columns="columns"
                    :table-data="result"
                    row-hover-color="#eee"
                    row-click-color="#edf7ff"
            ></v-table>
        </div>
        <div style="clear:both;"></div>
        
        <h3>没有更多数据了</h3>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Statistics',
  data(){
    return {
      attended:0,
      usualGrade: 0,
      documents: 0,
      inGroup:0,
      betweenGroup: 0,
      columns:[
        {field: 'StudentId', title: '学号', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true,isFrozen: true},
        {field: 'username', title: '姓名', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true,isFrozen: true},
        {field: 'group', title: '小组', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true,isFrozen: true},
        {field: 'attend', title: '考勤', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true,isFrozen: true},
        {field: 'usualGrade', title: '平时成绩', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true,isFrozen: true},
        {field: 'ingroup', title: '组内互评', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true,isFrozen: true},
        {field: 'betweenGroup', title: '组间互评', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true,isFrozen: true},
        {field: 'sum', title: '合计', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true,isFrozen: true}
      ]
    }
  },
  computed:{
    ...mapGetters(['getStudentInfo']),
    total(){
      return Number(this.attended) + Number(this.usualGrade) + Number(this.documents) + Number(this.inGroup) + Number(this.betweenGroup)
    },
    studentInfo () {
      return this.getStudentInfo
    },
    result () {
       let result = []
        for (let i = 0; i < this.studentInfo.length; i++){
          result[i] = this.studentInfo[i].attributes
        }
        return result
    }
  },
  methods:{
    checkTotal(){
      if(this.total != 100){
        alert("总分必须为100")
        return
      }
    }
  }
}
</script>
<style scoped>
.Statistics {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.setStandards{
  position: relative;
  width: 100%;
  height: 6%; 
  bottom:-10px;
  display: flex;
}
input {
  position: relative;
  width: 10%;
  height: 80%;
  margin-left: 1%;
}
.setStandards span {
  position: relative;
  margin-right: 2%;
}

.showScore{
  position: relative;
  width: 100%;
  height: 88%;
  top:30px;
  overflow: hidden;
  overflow-y: scroll;
  margin: 0 auto;
}



</style>


