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
            <span v-if = "scope.row.editFlag" class="cell-edit-input"><el-input v-model = "scope.row.grade" placeholder="请输入内容"></el-input></span>
      </template>
    </el-table-column>
    <el-table-column
      label="小组"
      min-width="80">
      <template slot-scope="scope">
            <span v-if = "!scope.row.editFlag">{{ scope.row.teamname }}</span>
            <span v-if = "scope.row.editFlag" class="cell-edit-input"><el-input v-model = "scope.row.group" placeholder="请输入内容"></el-input></span>
      </template>
    </el-table-column>
    <el-table-column
      label="电话"
      min-width="180">
      <template slot-scope="scope">
            <span>{{ scope.row.mobilePhoneNumber }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="邮箱"
      min-width="180">
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
import { mapGetters,mapActions } from 'vuex'

export default {
  name:'StudentInfo',
  data(){
    return {

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
      complete (index,row) {
        let StudentId = row.StudentId
        let username = row.username
        let sex = row.sex
        let grade = row.grade
        let group = row.group
        let email = row.email
        let tel = row.mobilePhoneNumber
        // alert(StudentId)
        // this.$store.dispatch ("changeInfo",{
        //   id: StudentId,
        //   username: username,
        //   sex: sex,
        //   grade: grade,
        //   group: group,
        //   email: email,
        //   tel:tel,
        //  
        // })
        row.editFlag = false
      }
    },

  computed: {
    ...mapGetters(['getStudentInfo']),
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
    }
  }
}
</script>
<style scoped>


</style>


