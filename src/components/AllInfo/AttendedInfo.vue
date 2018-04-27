<template>
  <div class = "AttendedInfo">
    <!-- <div class = "createTable" v-show = "!isshow">
      <label for = "startDate">起始日期</label>
      <input type = "date" id = "startDate" v-model = "start" :min="mindate" >
      <label for = "endDate">结束日期</label>
      <input type = "date" id = "endDate" v-model = "end" :min = "start">
      <button @click = "createDate(start,end)">创建表格</button>
    </div> -->
    <div class = "showAttended" v-show = "isshow">
        <table>
          <tr class = "tableHeader">
            <th> 序号</th>
            <th> 学号</th>
            <th> 姓名</th>
            <th> 班级</th>
            <th v-for = "n in diff_arr" class = "workdate">{{n}}</th>
          </tr>
          <tbody class = "tbody">
            <tr v-for = "(item, index) in getStudentInfo">
              <td>{{index + 1}}</td>
              <td>{{item.studentId}}</td>
              <td>{{item.name}}</td>
              <td>{{item.grade}}</td>
              <td v-for = "n in getContainueDate.length" class = "workdate"></td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'AttendedInfo',
  data(){
    return {
      start: '',
      end: '',
      isshow : false,
      diff_arr:[],
      mindate:'',
      student:[],
      duration:'' //控制执行多少个td（工作日）
    }
  },
  computed: {
    ...mapGetters(['getStudentInfo,getContainueDate'])

  },
  mounted(){
  //   let date = new Date()
  //   let year = date.getFullYear()
  //   let month = date.getMonth() + 1
  //   let day = date.getDate()
  //   month = String(month).length == 1 ? '0'+ String(month) : String(month)
  //   day = String(day).length == 1 ? '0'+ String(day) : String(day)
  //   this.mindate = year+'-'+month+'-'+day
  //   this.start = this.mindate
   },

  methods:{
  //   createDate(start,end) {
  //     var startdate = new Date(start),
  //         enddate = new Date(end),
  //         start_time = startdate.getTime(),
  //         end_time = enddate.getTime(),
  //         timeDiff = end_time - start_time
  //         if(timeDiff == 0){
  //           alert("结束日期不能等于开始日期")
  //           return
  //         }

  //         else{
  //             for(var i = 0; i < timeDiff; i += 86400000){
  //                 var ds = new Date(start_time + i)
  //                 this.diff_arr.push((ds.getMonth() + 1)+'-'+ ds.getDate())
  //             }
  //             this.$store.commit('SETCONTINUEDATE',this.diff_arr)
  //             this.duration = this.diff_arr.length
  //             this.isshow = true

  //         }
  //      return
  // }
}
}
</script>
<style scoped>
  .AttendedInfo{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }
  .table{
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    flex: 1;
  }
  .tableHeader{
    position: relative;
    width: 100%;
    height: 40px;
    text-align: center;
    background-color: darkgray;
    border-right: 1px solid wheat;
    padding-left: 3%;
  }

 td{
    text-align: center;
    border: 1px solid gray;
  }
  .tbody{
    width: 100%;
    height: 500px;
    overflow: hidden;
    /* background-color: seagreen; */
  }
</style>


