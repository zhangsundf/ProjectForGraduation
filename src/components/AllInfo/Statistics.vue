<template>
  <div class = "Statistics">
    <nav class="level">
      <div class="level-item has-text-centered">
        <div class="control  has-icons-left">
          <input class="input is-primary" type="text" v-model = "attended" :placeholder = "this.getstandard.attend">
          <span class=" icon is-left">
            <span style = "font-size:14px;">考勤</span>
          </span>
        </div>
      </div>

        <div class="level-item has-text-centered">
        <div class="control has-icons-left">
          <input class="input is-primary" type="text" v-model = "usualGrade"  :placeholder = "this.getstandard.usually">
          <span class=" icon is-left">
            <span style = "font-size:14px;">平时</span>
          </span>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div class="control  has-icons-left">
          <input class="input is-primary" type="text" v-model = "documents"  :placeholder = "this.getstandard.document">
          <span class=" icon is-left">
            <span style = "font-size:14px;">文档</span>
          </span>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div class="control has-icons-left">
          <input class="input is-primary" type="text" v-model = "inGroup"  :placeholder = "this.getstandard.ingroup">
          <span class=" icon is-left">
            <span style = "font-size:14px;">组内</span>
          </span>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div class="control has-icons-left">
          <input class="input is-primary" type="text" v-model = "betweenGroup"  :placeholder = "this.getstandard.betweenGroup">
          <span class=" icon is-left">
            <span style = "font-size:14px;">组间</span>
          </span>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <a class="button is-primary" @click = "setStandards">设置比重</a>
      </div>

    </nav>
   
    <el-table
    :data="result.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%"
    border
    stripe
     height="85%">
    <el-table-column
      label="学号"
      min-width="100">
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
      min-width="90">
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
      min-width="60">
      <template slot-scope="scope">
            <span>{{scope.row.attendScore }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="平时成绩"
      min-width="80">
      <template slot-scope="scope">
            <span v-if = "!scope.row.editFlag">{{ scope.row.usuallyScore }}</span>
            <input type = "text" class = "input is-success" v-if = "scope.row.editFlag" v-model="setunsualScore">
      </template>
    </el-table-column>
    <el-table-column
      label="文档"
      min-width="60">
      <template slot-scope="scope">
            <span v-if = "!scope.row.editFlag">{{ scope.row.documentScore }}</span>
             <input type = "text" class = "input is-success" v-if = "scope.row.editFlag" v-model="setDocumentScore">
      </template>
    </el-table-column>
    <el-table-column
      label="组内互评"
      min-width="80">
      <template slot-scope="scope">
            <span>{{ scope.row.inGroupScore | toFixed }}</span>    
      </template>
    </el-table-column>
    <el-table-column
      label="组间互评"
      min-width="80">
      <template slot-scope="scope">
            <span >{{ scope.row.betweenGroupScore | toFixed }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="总分"
      min-width="60">
      <template slot-scope="scope">
            <span :class = "scope.row.sum <= 60 ? 'nopass' : scope.row.sum >= 75? 'excellent' : 'pass' ">{{scope.row.sum | toFixed}}</span>
       </template>
    </el-table-column>
    <el-table-column label="操作" min-width="160">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type = "danger"
          plain
          outlined
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="success"
          @click="complete(scope.$index,scope.row)">保存</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="result.length">
  </el-pagination>
  <transition name = "fade2">
    <toggle-hander v-if = "!showRightEcharts" :showRightHander = "showRightEcharts" @toggleHander = "toggleHander"></toggle-hander>
  </transition>
   <transition name="fade2">
  <statstic-echarts v-if = "showRightEcharts" :showRightEcharts = "showRightEcharts" @showEcharts = "showEcharts" :result = "result"></statstic-echarts>
  </transition>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import toggleHander from '../../common/toggleHander'
import statsticEcharts from '../../common/statsticEcharts'
export default {
  name: 'Statistics',
  data(){
    return {
      attended:'',
      usualGrade: '',
      documents: '',
      inGroup:'',
      betweenGroup: '',
      setDocumentScore:0,
      setunsualScore:0,
      isOneEdit:false,
      index:-1,
      showRightEcharts:false,
      pagesize: 10,
      currentPage:1,
    }
  },
  components: {
    toggleHander,
    statsticEcharts
  },
  computed:{
    ...mapGetters(['getStudentInfo','getScoreList','getstandard']),
    total(){
      return Number(this.attended) + Number(this.usualGrade) + Number(this.documents) + Number(this.inGroup) + Number(this.betweenGroup)
    },
    studentInfo () {
      return this.getStudentInfo
    },
    result () {
       let result = []
        for (let i = 0; i < this.studentInfo.length; i++){
              for (let j = 0; j < this.getScoreList.length; j++) {
                if(this.studentInfo[i].id === this.getScoreList[j].userID){
                  result.push(Object.assign({'editFlag':false,'index': i},this.getScoreList[j],this.studentInfo[i].attributes))
                  break
                }
              }  
        }
        return result
    }
  },
  methods:{
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
    },
    toggleHander (val) {
      this.showRightEcharts = val
    },
     showEcharts (val) {
      this.showRightEcharts = val
    },
    setStandards(){
      if(this.total != 100){
        alert("占比总分必须为100")
        return
      }
      this.$store.dispatch('setStandards',{ attend: Number(this.attended),
                                              usually:Number(this.usualGrade),
                                              document:Number(this.documents),
                                              inGroup:Number(this.inGroup),
                                              betweenGroup:Number(this.betweenGroup)
                                              }) .then (function(){

                                              }).catch(function(err){
                                                console.log(err)
                                              })
      this.$store.dispatch("resetSum",{ attend: Number(this.attended),
                                        usually:Number(this.usualGrade),
                                        document:Number(this.documents),
                                        inGroup:Number(this.inGroup),
                                        betweenGroup:Number(this.betweenGroup)
                                        }).then(function(){
                                              }).catch(function(err){
                                                console.log(err)
                                              })
    },
    handleEdit(index, row) {
        if(this.isOneEdit === false){
            this.isOneEdit = true
            row.editFlag = true
            this.index = index
            this.setDocumentScore = row.documentScore
            this.setunsualScore = row.usuallyScore
        }else{
          alert("已有一个学生成绩处于编辑编辑状态，请点击保存后再执行该操作！")
          return
        }
    },
    complete (index,row) {
      if(this.isOneEdit === true && this.index === index) {
        this.$store.dispatch('saveScore',{
                            document:this.setDocumentScore,
                            usually:this.setunsualScore,
                            index:row.index
                            }).then(()=>{
                                row.usualGrade = this.setunsualScore
                                row.documentScore = this.setDocumentScore
                                this.isOneEdit = false
                                alert("success")
                              }).catch(()=>{
                                      alert("failed")
                                    })
              row.editFlag = false
        return
        }else{
          alert("请点击保存")
          return 
        }
      }
  },
  filters: {
    toFixed(val) {
      return val.toFixed(1)
    }
  },
  beforeCreate () {
    this.$store.dispatch("getStudentScoreList").then(function(){
    }).catch(function(err){
      console.log(err)
    })
    this.$store.dispatch('setStandardItem').then(function(){
               
            }).catch(function(err){
              console.log(err)
            })
  },
}
</script>
<style scoped>

.setStandards{
  position: relative;
  width: 100%;
  height: 5%; 
  bottom:-10px;
  display: flex;
}
.level {
  position: relative;
  width: 100%;
  height: 5%;
}
.level-item {
  position: relative;
  width:10%; 
}
.control input {
  position: relative;
  width: 80%;
}
.nopass {
  color:rgb(211, 9, 9);
}
.pass {
  color:rgb(9, 107, 22);
}
.excellent {
  color:rgb(38, 226, 21);
}
 .fade2-enter{
    opacity:0;
    width:0px;
  }
  .fade2-enter-active{
    transition:all 1.5s;
  }
  .fade2-leave {
      opacity:1;
      width:300px;
  }
  .fade2-leave-active{
    transition:all 1.5s;
  }
 .fade2-leave-to{
    width:0px;
    opacity:0;
  }

</style>
