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
    :data="gradeAndGroup"
    style="width: 100%"
    border
    stripe
    height="100%">
    <el-table-column
      label="班级"
      min-width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px" v-if = "!scope.row.editFlag">{{scope.row.grades}}</span>
        <span v-if = "scope.row.editFlag"><input type = "text" class = "input is-primary" v-model = "newGradeName"></span>
      </template>
    </el-table-column>
    <el-table-column
      label="小组个数"
      min-width="40">
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
      label="最近修改时间"
      min-width="100">
      <template slot-scope="scope">
            <span>{{scope.row.updatedAt | fommatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间"
      min-width="100">
      <template slot-scope="scope">
            <span>{{scope.row.createdAt | fommatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="120">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'myCreateGrade',
    data () {
        return {
          gradeName: '',
          isOneEdit: false,
          idex:-1,
          newGradeName:'',
          originalName:''
        }
    },
    computed: {
        ...mapGetters (['getAllGradNameList','getGradeList']),
        gradeAndGroup() {
          let result = []
          for (let i = 0; i < this.getAllGradNameList.length; i++){
            result[i] = this.getAllGradNameList[i]
            this.$set(result[i],'editFlag',false)
          }
          return result
        }
    },
    methods: {
      createGrade (name) {
        let gradeName =  name.trim()
        if (!gradeName) {
          alert("班级名不能为空")
          this.gradeName = ''
          return
        }
        if (this.getGradeList.indexOf(gradeName) !== -1) {
            alert("班级已经存在，不能重复创建")
            return 
        }
        this.$store.dispatch ("createMyGrade",gradeName)
        this.gradeName = ''
        this.$store.dispatch('getUser')
        alert("创建成功！快去小组管理创建班级小组吧")
      },
       handleEdit(index, row) {
        if(this.isOneEdit === false){
            this.isOneEdit = true
            row.editFlag = true
            this.originalName = row.grades
            this.index = index
            this.newGradeName = row.grades
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
              this.$store.dispatch('changeGradeName',{
                                    newGradeName:this.newGradeName,
                                    original:this.originalName,
                                    index:index
                                    }).then(()=>{
                                      this.isOneEdit = false
                                      alert("success")
                                    }).catch(()=>{
                                      alert("failed")
                                    })
              row.editFlag = false
        return
        }else{
          return 
        }
      }
    },
    filters: {
      fommatDate (val) {
        let date = new Date(val)
        let getFullYear =  date.getFullYear() < 10 ? '0'+ date.getFullYear() :  date.getFullYear()
        let getMonth =  date.getMonth() +1 < 10 ? '0'+ (date.getMonth()+1) :  date.getMonth()
        let getDate =  date.getDate() < 10 ? '0'+ date.getDate() :  date.getDate()
        let getHours =  date.getHours() < 10 ? '0'+ date.getHours() :  date.getHours()       
        let getMinutes =  date.getMinutes() < 10 ? '0'+ date.getMinutes() :  date.getMinutes()
        let getSeconds =  date.getSeconds() < 10 ? '0'+ date.getSeconds() :  date.getSeconds()
        let Str= getFullYear + '-' +
        getMonth+ '-' + 
        getDate+' '+
        getHours+':'+
        getMinutes +':'+
        getSeconds
        return Str
      }
    },
    beforeCreate() {
         this.$store.dispatch("getAllInfoList")
    },
    mounted () {
      console.log(this.getGradeList) 
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
