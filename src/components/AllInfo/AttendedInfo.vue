<template>
  <div class = "AttendedInfo">
    <div class = "header">
       <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>选择日期</strong> 
          </p>
        </div>
        <div class="level-item">

          <div class="field has-addons">
              <el-select  v-model="chooseDate">
                  <el-option
                    v-for="(item,index) in dateList"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
              </el-select>
            
          </div>
          </div>
        </div>
    </nav>
    </div>
    <el-table
    :data="result.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%"
    border
    stripe
     height="84%">
    <el-table-column
      label="学号"
      min-width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px" class = "span">{{scope.row.StudentId}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      min-width="200">
      <template slot-scope="scope">
          <span class = "span">{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="班级"
      min-width="100">
      <template slot-scope="scope">
            <span class = "span">{{ scope.row.grade }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="小组"
      min-width="100">
      <template slot-scope="scope">
            <span class = "span">{{ scope.row.teamname }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="是否签到"
      min-width="200">
      <template slot-scope="scope">
            <span v-if = "!scope.row.editFlag" class = "span"  :class = "scope.row.isSignin === true ? 'signin' :'nosignin'">{{ scope.row.isSignin | fommatSign}}</span>
            <div v-if = "scope.row.editFlag" class = "field">
                <el-select v-model="chooseStatus" >
                  <el-option
                    v-for="(item,index) in siginState"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </div>
      </template>
    </el-table-column>
     <el-table-column label="操作" min-width="230">
      <template slot-scope="scope">
        <el-button
          size="mini"
         @click = handleEdit(scope.$index,scope.row)>编辑</el-button>
        <el-button
          size="mini"
          type="success"
          @click = "complete(scope.$index,scope.row)">完成</el-button>
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
    <toggle-hander v-if = "!showRightEcharts" :showRightHander = "showRightEcharts" @toggleHander = "toggleHander"> &lt; </toggle-hander>
  </transition>
   <transition name="fade2">
  <right-echarts v-if = "showRightEcharts" :showRightEcharts = "showRightEcharts" @showEcharts = "showEcharts" :signList = "getSigninList"></right-echarts>
  </transition>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import rightEcharts from '../../common/rightEcharts'
import toggleHander from '../../common/toggleHander'
export default {
  name: 'AttendedInfo',
  data(){
    return {
      dateList:[],
      chooseDate:'',
      isOneEdit:false,
      siginState: [{'label':"签到成功",value:true},{'label':"未签到",value:false}],
      chooseStatus: '',
      index:-1,
      showRightEcharts: false,
      pagesize: 10,
      currentPage:1,
    }
  },
  components: {
    rightEcharts,
    toggleHander
  },
  computed: {
    ...mapGetters(['getStudentInfo','getSigninList','getDate','getScoreList']),
    tableData () {
      return this.getStudentInfo
    },
    result () {
       let result = []
        for (let i = 0; i < this.tableData.length; i++){
          let student = this.tableData[i]
          for (let j = 0; j < this.getSigninList.length; j++){
            if(this.tableData[i].id === this.getSigninList[j].userID){
                result.push(Object.assign({'editFlag':false},
                            {'id':student.id,'StudentId':student.attributes.StudentId,'username':student.attributes.username},
                            this.getSigninList[j]))
                break
            }
          }
        }  
        return result
    }
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
    },
    showEcharts (val) {
      this.showRightEcharts = val
    },
    toggleHander (val) {
      this.showRightEcharts = val
    },
    handleEdit(index, row) {
        if(this.isOneEdit === false){
            this.isOneEdit = true
            row.editFlag = true
            this.index = index
            for (let i = 0; i < this.siginState.length; i++) {
              if (this.siginState[i].value === row.isSignin) {
                this.chooseStatus = this.siginState[i].label
              }
            }
        }else{
          alert("已有一个学生签到处于编辑编辑状态，请点击完成后在执行该操作！")
          return
        }
      },
      complete (index,row) {
        if(this.isOneEdit === true && this.index === index) {
              this.$store.dispatch('changeAttendStatus',{
                                    status:this.chooseStatus,
                                    row:row
                                    }).then(()=>{
                                      row.isSignin = this.chooseStatus
                                      this.isOneEdit = false
                                    
                                    this.$store.dispatch('setStudentAttendScore',row).then (function(){
                                        console.log("异步更新学生签到分数成功")
                                      }).catch(function(err){
                                        console.log(err)
                                        console.log("异步更新学生签到分数失败！")
                                      })                  
                                      alert("success")
                                    }).catch(()=>{
                                      alert("failed")
                                    })
                   
                      
              row.editFlag = false
        return
        }else{
          return 
        }
      },
      getEcharts () {
        this.showRightEcharts = true
      }
  },
//  beforeCreate() {
//     var now=new Date();
//     let getMonth = now.getMonth() + 1 < 10 ? '0'+(now.getMonth() + 1):now.getMonth() + 1
//     let getDate = now.getDate() < 10 ? '0' + now.getDate() : now.getDate() 
//     var curDate = now.getFullYear()+"-"+getMonth +"-"+getDate

//     this.$store.dispatch ("getIsSign",curDate)
//   },
  watch: {
    chooseDate() {
       this.$store.dispatch ("getIsSign",this.chooseDate)
    }
  },
  mounted () {
    this.dateList = this.getDate
    this.chooseDate = this.dateList[this.dateList.length-1]
  },
  filters:{
    fommatSign(val){
      if(val === true) {
        return '签到成功'
      }
      return '未签到'
    }
  }
}
</script>
<style scoped>
  .header {
    position: relative;
    width: 100%;
    height: 10%;
  }
  .signin {
    position: relative;
    line-height: 100%;
    color: rgb(39,194,76);
    font-weight: bold;
    font-weight:normal;
  }
  .nosignin {
    position: relative;
    line-height: 100%;
    color:red;
    font-weight:normal;
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


