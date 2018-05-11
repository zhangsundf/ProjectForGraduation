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
    :data="gradeInfo"
    style="width: 100%"
    border
    stripe
    height="100%">
    <el-table-column
      label="班级"
      min-width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{scope.row.GradeName}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="小组名"
      min-width="100">
      <template slot-scope="scope">
          <span>{{ scope.row.GroupCount }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="小组人数"
      min-width="50">
      <template slot-scope="scope">
            <span>{{ scope.row.studentCount }}</span>
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
export default {

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
