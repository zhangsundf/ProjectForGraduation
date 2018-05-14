<template>
  <div class = "Statistics">
    <nav class="level">
      <div class="level-item has-text-centered">
        <div class="control  has-icons-left">
          <input class="input is-primary" type="text" placeholder="Primary input" v-model="attended">
          <span class=" icon is-left">
            <span style = "font-size:14px;">考勤</span>
          </span>
        </div>
      </div>

        <div class="level-item has-text-centered">
        <div class="control has-icons-left">
          <input class="input is-primary" type="text" placeholder="Primary input" v-model = "usualGrade">
          <span class=" icon is-left">
            <span style = "font-size:14px;">平时</span>
          </span>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div class="control  has-icons-left">
          <input class="input is-primary" type="text" placeholder="Primary input" v-model="documents">
          <span class=" icon is-left">
            <span style = "font-size:14px;">文档</span>
          </span>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div class="control has-icons-left">
          <input class="input is-primary" type="text" placeholder="Primary input" v-model="inGroup">
          <span class=" icon is-left">
            <span style = "font-size:14px;">组内</span>
          </span>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div class="control has-icons-left">
          <input class="input is-primary" type="text" placeholder="Primary input" v-model = "betweenGroup">
          <span class=" icon is-left">
            <span style = "font-size:14px;">组间</span>
          </span>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <a class="button is-primary">设置比重</a>
      </div>

    </nav>
    
    <el-table
    :data="result"
    style="width: 100%"
    border
    stripe
     height="80%">
    <el-table-column
      label="学号"
      min-width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{scope.row.StudentId}}</span>

      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      min-width="100">
      <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="班级"
      min-width="100">
      <template slot-scope="scope">
            <span >{{ scope.row.grade }}</span>
           </template>
    </el-table-column>
    <el-table-column
      label="小组"
      min-width="100">
      <template slot-scope="scope">
            <span >{{ scope.row.teamname }}</span>
           </template>
    </el-table-column>
    <el-table-column
      label="考勤"
      sortable
      min-width="100">
      <template slot-scope="scope">
            <span>{{scope.row.attendScore }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="平时成绩"
      min-width="80">
      <template slot-scope="scope">
            <span >{{ scope.row.unsualScore }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="组内互评"
      min-width="80">
      <template slot-scope="scope">
            <span>{{ scope.row.inGrouScore }}</span>    
      </template>
    </el-table-column>
    <el-table-column
      label="组间互评"
      min-width="180">
      <template slot-scope="scope">
            <span >{{ scope.row.betweenGroupScore }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文档"
      min-width="80">
      <template slot-scope="scope">
            <span >{{ scope.row.documentScore }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="总分"
      min-width="80">
      <template slot-scope="scope">
            <span >{{ scope.row.sumScore }}</span>
      </template>
    </el-table-column>
  </el-table>
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
      // studentInfo: []
    }
  },
  computed:{
    ...mapGetters(['getStudentInfo','getAttendScoreList']),
    total(){
      return Number(this.attended) + Number(this.usualGrade) + Number(this.documents) + Number(this.inGroup) + Number(this.betweenGroup)
    },
    studentInfo () {
      return this.getStudentInfo
    },
    result () {
       let result = []
        for (let i = 0; i < this.studentInfo.length; i++){
          for (let j = 0; j < this.getAttendScoreList.length; j++){
            if (this.studentInfo[i].id === this.getAttendScoreList[j].userID){
                result.push(Object.assign({},this.getAttendScoreList[j],this.studentInfo[i].attributes))
                break
            }
          }
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
  },
  beforeCreate () {
    this.$store.dispatch("getAttendScore")
    this.$store.dispatch("getInGroupScore")
  },
  mounted () {
  //  this.studentInfo = this.getStudentInfo
  }
}
</script>
<style scoped>

.setStandards{
  position: relative;
  width: 100%;
  height: 6%; 
  bottom:-10px;
  display: flex;
}

.el-table{
  position: relative;
  width: 100%;
  height: 85%;
  top:30px;
  overflow: hidden;
  overflow-y: auto;
  margin: 0 auto;
  top:3%;
}
.level {
  position: relative;
  width: 100%;
  height: 10%;
}
.level-item {
  position: relative;
  width:10%; 
}
.control input {
  position: relative;
  width: 80%;

}

</style>


