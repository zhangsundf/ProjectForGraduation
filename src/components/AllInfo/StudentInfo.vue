<template>
  <div class = "StudentInfo">
      <div class = "showinfo">
      <table>
        <tr class = "tableHeader">
            <th>序号</th>
            <th>学号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>班级</th>
            <th>联系电话</th>
        </tr>
        <tbody>
        <tr v-for = "(item,index) in studentList" class = "bodyitem">
          <td>{{index+1}}</td>
          <td>{{item.studentId}}</td>
          <td>{{item.name}}</td>
          <td>{{item.sex}}</td>
          <td>{{item.grade}}</td>
          <td>{{item.tel}}</td>
        </tr>
        </tbody>
      </table>
      <h3>没有更多数据了</h3>
      </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'StudentInfo',
  data(){
    return {
      studentList :[]
    }
  },
  // mounted(){
  //   axios.get('http://127.0.0.1:1230/all').then((val)=>{
  //          this.$store.commit('SETSTUDENTINFO',val.data)
  //          this.studentList = val.data;
  //    })
  //   },

}
</script>
<style>
.showinfo{
  width: 90%;
  height: 90%;
  border: 2px solid black;
  overflow: hidden;
  display:flex;
  overflow-y:scroll;
  flex-direction: column;
}
table{
  width: 100%;
  overflow: hidden;

}
.tableHeader{
  width: 100%;
  height: 40px;
  background-color: darkgray;
}

.tbody{
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
 .bodyitem td{

   height:30px;
   border-bottom: 2px solid darkgray;
   border-right: 2px solid darkgray;

}

</style>


