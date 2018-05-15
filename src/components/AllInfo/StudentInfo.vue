<template>

  <div class = "studentinfo">
    <el-table
    :data="result"
    style="width: 100%"
    border
    stripe
     height="100%">
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
      label="性别"
      min-width="50">
      <template slot-scope="scope">
            <span>{{ scope.row.sex }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="班级"
      min-width="140">
      <template slot-scope="scope">
            <span v-if = "!scope.row.editFlag">{{ scope.row.grade }}</span>
            <div v-if = "scope.row.editFlag" class="field">
               <el-select v-model="chooseGrade" :placeholder="scope.row.grade">
                  <el-option
                    v-for="(item,index) in teachersGrade"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="小组"
      min-width="120">
      <template slot-scope="scope">
            <span v-if = "!scope.row.editFlag">{{ scope.row.teamname }}</span>
            <div v-if = "scope.row.editFlag" class="field">
               <el-select v-model="chooseGroup" :placeholder="scope.row.teamname">
                  <el-option
                    v-for="(item,index) in groupList"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="电话"
      min-width="140">
      <template slot-scope="scope">
            <span>{{ scope.row.mobilePhoneNumber }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="邮箱"
      min-width="150">
      <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="230">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
         @click.native.prevent="deleteRow(scope.$index,result)">删除</el-button>
        <el-button
          size="mini"
          type="success"
          @click="complete(scope.$index,scope.row)">完成</el-button>
      </template>
    </el-table-column>
  </el-table>
    <!-- </virtual-list> -->
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name:'StudentInfo',
  data(){
    return {
      chooseGrade:'',
      chooseGroup:'',
      groupList:[],
      isOneEdit:false,
      index:-1
      }
    },
    methods: {
      handleEdit(index, row) {
        if(this.isOneEdit === false){
            this.isOneEdit = true
            this.chooseGrade = row.grade
            row.editFlag = true
            this.index = index
        }else{
          alert("已有一个学生信息处于编辑编辑状态，请点击完成后在执行该操作！")
          return
        }
      
      },
      deleteRow(index,rows) {
        var r = confirm("确认将此学生从你管理的班级移除？")
        if (r) {
          this.$store.dispatch("deleteStudent",index).then(function(){
              alert("删除成功")
              this.$store.dispatch('getGradeAndGroup')
              rows.splice(index, 1);
          }).catch(()=>{
              alert("删除失败")
          })
        }
        else {
          return
        }

      },
      complete (index,row) {
        if(this.isOneEdit === true && this.index === index) {
              this.$store.dispatch('changeInfo',{
                                    grade:this.chooseGrade,
                                    group:this.chooseGroup,
                                    index:index
                                    }).then(()=>{
                                      row.grade = this.chooseGrade
                                      row.teamname = this.chooseGroup
                                      this.groupList = []
                                      this.isOneEdit = false
                                      
                                      alert("success")
                                    }).catch(()=>{
                                      alert("failed")
                                    })
                                     this.$store.dispatch('getGradeAndGroup')

              row.editFlag = false
        return
        }else{
          return 
        }
      }
},

  computed: {
    ...mapGetters(['getStudentInfo','getCurUserInfo','getAllGradNameList']),
    studentList () {
      return this.getStudentInfo
    },
    result () {
       let result = []
        for (let i = 0; i < this.studentList.length; i++){
          result[i] = this.studentList[i].attributes
          this.$set(result[i],'editFlag',false)
        }
        return result
    },
    teachersGrade () {
      return this.getCurUserInfo.attributes.createGrade
    }
    
  },
  watch: {
    chooseGrade (){
        this.groupList = []
           for(let i = 0; i < this.getAllGradNameList.length; i++) {
            if (this.getAllGradNameList[i].grades === this.chooseGrade) {
            for(let j = 0; j < this.getAllGradNameList[i].groups.length; j++) {
              this.groupList.push(this.getAllGradNameList[i].groups[j].groupName)
              }
            }
            this.chooseGroup = this.groupList[0]
         }
    }
  },
  created() {
      this.$store.dispatch('getGradeAndGroup')

  }
}
</script>
<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>


