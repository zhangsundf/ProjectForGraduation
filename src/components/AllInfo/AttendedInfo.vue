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
              <el-select  v-model="chooseDate" :placeholder= "dateList[dateList.length-1]">
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
    :data="result"
    style="width: 100%"
    border
    stripe
     height="86%">
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
                <el-select v-model="chooseStatus" :placeholder= "scope.row.isSignin | fommatSign" >
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
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'AttendedInfo',
  data(){
    return {
      dateList:[],
      chooseDate:'',
      isOneEdit:false,
      siginState: [{'label':"签到成功",value:true},{'label':"未签到",value:false}],
      chooseStatus: '',
      index:-1
    }
  },
  computed: {
    ...mapGetters(['getStudentInfo','getSigninList','getDate','getScoreList']),
    tableData () {
      return this.getStudentInfo
    },
    result () {
       let result = []
        for (let i = 0; i < this.tableData.length; i++){
          for (let j = 0; j < this.getSigninList.length; j++){
            if(this.tableData[i].id === this.getSigninList[j].userID){
                result.push(Object.assign({'editFlag':false},this.getSigninList[j],this.tableData[i].attributes))
                break
            }
          }
        }  
        return result
    }
  },
  methods: {
    handleEdit(index, row) {
        if(this.isOneEdit === false){
            this.isOneEdit = true
            row.editFlag = true
            this.index = index
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
                                      alert("success")
                                    }).catch(()=>{
                                      alert("failed")
                                    })
              this.$store.dispatch('getStudentScoreList').then (function(){
                console.log("修改签到信息，重新计算签到次数")
               
              }).catch(function(){
                console.log("修改签到信息，重新计算签到次数失败啦！")
              })
              row.editFlag = false
        return
        }else{
          return 
        }
      }
  },
 beforeCreate() {
    var now=new Date();
    let getMonth = now.getMonth() + 1 < 10 ? '0'+(now.getMonth() + 1):now.getMonth() + 1
    let getDate = now.getDate() < 10 ? '0' + now.getDate() : now.getDate() 
    var curDate = now.getFullYear()+"-"+getMonth +"-"+getDate

    this.$store.dispatch ("getIsSign",curDate)
  },
  watch: {
    chooseDate() {
       this.$store.dispatch ("getIsSign",this.chooseDate)
    }
  },
  mounted () {
    this.dateList = this.getDate
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
    height: 12%;

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
</style>


