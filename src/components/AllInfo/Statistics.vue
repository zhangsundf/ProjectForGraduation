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
        <button @click = "checkTotal">设置比重</button>
    </div>

    <div class = "showScore">
      <table>
        <tr class = "tableHeader">
          <th>序号</th>
          <th>学号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>考勤</th>
          <th>平时成绩</th>
          <th>文档</th>
          <th>组内互评</th>
          <th>组间互评</th>
          <th>总分</th>
        </tr>
        <tbody>
          <tr v-for = "(item,index) in studentInfo " class = "showItem">
            <td>{{index + 1}}</td>
            <td>{{item.studentId}}</td>
            <td>{{item.name}}</td>
            <td>{{item.grade}}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

          </tr>
        </tbody>
      </table>
    </div>

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
      betweenGroup: 0
    }
  },
  computed:{
    ...mapGetters(['getStudentInfo']),
    total(){
      return Number(this.attended) + Number(this.usualGrade) + Number(this.documents) + Number(this.inGroup) + Number(this.betweenGroup)
    },
    studentInfo () {
      return this.getStudentInfo
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
  height: 8%;
  line-height: 60px;
  border-bottom: 1px solid gray;
}
.showScore{
  position: relative;
  width: 90%;
  height: 90%;
  top:30px;
  overflow: hidden;
  overflow-y: scroll;
  margin: 0 auto;
}
table {
  position: absolute;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}
.tableHeader th{
  position: relative;
  /* width: 100%; */
  height: 40px;
  background-color: darkgray;
  border-right: 1px solid white;
}

th, td {
  text-align: center;
}

.showItem td{
  border: 1px solid rgb(61, 74, 87);
}

</style>


