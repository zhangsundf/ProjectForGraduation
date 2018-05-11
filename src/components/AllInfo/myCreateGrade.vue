<template>
  <div class = "myCreateGrade">
  <nav class="level">
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle is-5">
          <strong>创建班级</strong> 
        </p>
      </div>
      <div class="level-item">
        <div class="field has-addons">
          <p class="control">
            <input class="input is-primary" type="text" placeholder="输入班级" v-model = "gradeName">
          </p>
          <p class="control">
            <button class="button is-primary" @click = "createGrade(gradeName)">
              确认创建
            </button>
          </p>
        </div>
      </div>
    </div>
  </nav>
  <el-table
    :data="getAllGradNameList"
    style="width: 100%"
    border
    stripe
    height="100%">
    <el-table-column
      label="班级"
      min-width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{scope.row.grades}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="小组个数"
      min-width="100">
      <template slot-scope="scope">
          <span>{{ scope.row.groups.length-1}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="班级人数"
      min-width="50">
      <template slot-scope="scope">
            <span>{{ scope.row.groups[scope.row.groups.length-1].gradeStuNumber }}</span>
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
    name: 'myCreateGrade',
    data () {
        return {
          gradeName: ''
        }
    },
    computed: {
        ...mapGetters (['getAllGradNameList']),
    },
    methods: {
      createGrade (name) {
        let gradeName =  name.replace(/(^\s*)|(\s*$)/g, ""); 
        if (!gradeName) {
          alert("班级名不能为空")
          this.gradeName = ''
          return
        }
        for(let i = 0; i < this.getAllGradNameList.length; i++){
          if (this.getAllGradNameList[i].grades.indexOf(gradeName) !== -1) {
            alert("班级已经存在，不能重复创建")
            return 
          }
        else {
          this.$store.dispatch ("createMyGrade",gradeName)
          this.gradeInfo.push({'GradeName':this.gradeName,'GroupCount':0,'studentCount':0,'createdAt':this.GetDate()})
          this.gradeName = ''
          alert("创建成功！快去小组管理创建班级小组吧")
        }
        }
      },
      GetDate(){
        let date = new Date()
        let Str=date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' + 
        date.getDate()
        return Str
      }
    },
    beforeCreate() {
      this.$store.dispatch("createGradeListInfo")
    },
    mounted () {
      this.gradeInfo = this.getGradeListinfo
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
