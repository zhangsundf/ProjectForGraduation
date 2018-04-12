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
          <tr v-for = "item in $store.state.studentinfo" class = "showItem">
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
    total(){
      return Number(this.attended) + Number(this.usualGrade) + Number(this.documents) + Number(this.inGroup) + Number(this.betweenGroup)

    }
  },
  methods:{
    checkTotal(){
      if(this.total != 100){
        alert("总分必须为100")
        return
      }
      else{

        return
      }
    }
  }
}
</script>
<style scoped>
.setStandards{
  position: relative;
  width: 100%;
  height: 60px;
  border:1px solid blue;
  line-height: 60px;
}
.showScore{
  position: relative;
  width: 90%;
  height: 80%;
  border:1px solid red;
  top:30px;
  overflow: hidden;
  overflow-y: scroll;
}
.showScore table{
  position: absolute;
  width: 100%;
  height: 40px;
}
.tableHeader{
  width: 100%;
  height: 40px;
  background-color: darkgray;
}

.showItem td{
  border-bottom: 1px solid slategrey;
  border-right: 1px solid slategrey;

}

</style>


