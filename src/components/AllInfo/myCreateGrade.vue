<template>
  <div class = "myCreateGrade">
    abcd {{result.createGrade}}
    {{myCreateGrade}}
    {{getStudentInfo1.length}}
    {{getCurUserInfo1.createdAt}}
      {{getCurUserInfo1}}
    <el-table
    :data="result"
    style="width: 100%"
    border
    stripe
    height="100%">
    <el-table-column
      label="班级"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{scope.row.createGrade}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="注册人数"
      width="100">
      <template slot-scope="scope">
          <span>{{ scope.row.all }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="加入人数"
      width="50">
      <template slot-scope="scope">
            <span>{{ scope.row.join }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间"
      width="100">
      <template slot-scope="scope">
            <span>{{scope.row.createdAt}}</span>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'myCreateGrade',
    data () {
        return {
            // result: 
            // [
            //     {
            //     // createGrade:"333",
            //     // join: "bbb",
            //     // createdAt:"asdf"
            //     // createGrade: this.myCreateGrade,
            //     // join: this.getStudentInfo1.length,
            //     // createdAt: this.getCurUserInfo1.createdAt
            //     }
            // ]
        
        }
    },
    computed: {
        ...mapGetters (['getMyCreateGrade','getStudentInfo','getCurUserInfo']),
        myCreateGrade () {
            return this.getMyCreateGrade
        },
        getStudentInfo1(){
            return this.getStudentInfo
        },
        getCurUserInfo1 () {
            return this.getCurUserInfo
        },
        result() {
            
                return {
                // createGrade:"aaa",
                // join: "bbb",
                // createAt:"asdf"
                createGrade: this.myCreateGrade,
                join: this.getStudentInfo1.length,
                createdAt: this.getCurUserInfo1.createdAt
                }
            
        }
    },
    created () {
    }
}
</script>

<style>

</style>
