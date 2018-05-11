<template>
  <div class = "GroupManage">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>创建小组</strong> 
          </p>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input is-primary" type="text" placeholder="输入班级">
            </p>
            <p class="control">
              <button class="button is-primary">
                确认创建
              </button>
            </p>
          </div>
          </div>
        </div>
    </nav>
  <el-table
    :data="results"
    style="width: 100%"
    border
    stripe
    height="500px;">
    <el-table-column
      label="班级"
      min-width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{scope.row.gradeName}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="小组名"
      min-width="100">
      <template slot-scope="scope">
          <span>{{ scope.row.groupName.groupName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="小组人数"
      min-width="50">
      <template slot-scope="scope">
            <span>{{ scope.row.groupName.groupStuNumber }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间"
      min-width="100">
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
  name : 'CreateGroup',
  data () {
    return {

    }
  },
  computed:{
      ...mapGetters (['getAllGradNameList']),
      results() {
        let result = []
        let grade = this.getAllGradNameList
         for (let i = 0; i < grade.length; i++) {
          for(let j = 0; j < grade[i].groups.length-1; j++){
            result.push ({'groupName':grade[i].groups[j],'gradeName':grade[i].grades})
          }
         }
         return result
       }
  }

}
</script>

<style scoped>
nav {
  position: relative;
  box-sizing: border-box;
  padding-top: 3%;
  flex:1;
}
.level-left {
  padding-left:6%;
}
 .el-table {
    position: relative;
    width: 100%;
    height:60%
 }

</style>
