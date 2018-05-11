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
      min-width="100">
      <template slot-scope="scope">
            <span v-if = "!scope.row.editFlag">{{ scope.row.grade }}</span>
            <div v-if = "scope.row.editFlag" class="field">
                <el-dropdown @command="handleCommand" >
                  <span class="el-dropdown-link">
                    <span  id = "grade">{{scope.row.grade}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for = "(item,index) in teachersGrade" :key = "index" v-text="item" :command = "item">{{item}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> 
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="小组"
      min-width="100">
      <template slot-scope="scope">
            <span v-if = "!scope.row.editFlag">{{ scope.row.teamname }}</span>
            <div v-if = "scope.row.editFlag" class="field">
                <el-dropdown @command="handleCommandGroup">
                  <span class="el-dropdown-link">
                    {{scope.row.teamname}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="a">黄金糕</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="电话"
      min-width="150">
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
    <el-table-column label="操作" min-width="250">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
         @click.native.prevent="deleteRow(scope.$index, result)">删除</el-button>
        <el-button
          size="mini"
          type="success"
          @click="complete(scope.$index, scope.row)">完成</el-button>
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
      chooseGrade:''
      }
    },
    methods: {
      handleEdit(index, row) {
        row.editFlag = true
      },
      handleDelete(index, row) {
        alert(index, row);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleCommandGrade(command) {
        let parent = document.getElementById("grade")
        parent.innerText = command
        this.chooseGrade = command
      },
      complete (index,row) {
        
        row.editFlag = false
      }
    },

  computed: {
    ...mapGetters(['getStudentInfo','getCurUserInfo']),
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


