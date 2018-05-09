<template>
  <div class = "AttendedInfo">
        <div style="width:100%;">
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
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'AttendedInfo',
  data(){
    return {
      columns:[
        {field: 'StudentId', title: '学号', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true},
        {field: 'username', title: '姓名', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true},
        {field: 'group', title: '小组', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true},
        {field: 'grade', title: '班级', width: 40, titleAlign: 'center', columnAlign: 'center',isResize:true},
        {field: 'attend', title: '考勤', width: 400, titleAlign: 'center', columnAlign: 'center',isResize:true},
        {field: 'sum', title: '合计', width: 50, titleAlign: 'center', columnAlign: 'center',isResize:false}
      ]
    }
  },
  computed: {
    ...mapGetters(['getStudentInfo']),
    tableData () {
      return this.getStudentInfo
    },
    result () {
       let result = []
        for (let i = 0; i < this.tableData.length; i++){
          result[i] = this.tableData[i].attributes
        }
        return result
    }
  },

}
</script>
<style scoped>
  .AttendedInfo{
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>


