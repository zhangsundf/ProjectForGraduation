<template>
  <div class = "GroupManage">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>选择班级</strong> 
          </p>
        </div>
        <div class="level-item">
          <el-select style = "width:26%;margin-right:3%" v-model="chooseGrade" placeholder="选择班级">
                  <el-option
                    v-for="(item,index) in results"
                    :key="index"
                    :label="item.gradeName"
                    :value="item.gradeName">
                  </el-option>
          </el-select>
          <div class="field has-addons">
            <p class="control">
              <input class="input is-primary" type="text" placeholder="输入小组名" v-model="groupName">
            </p>
            <p class="control">
              <button class="button is-primary" @click = "addGroup(groupName)">
                创建小组
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
    height="400px;">
    <el-table-column
      label="班级"
      min-width="80">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{scope.row.gradeName}}</span>
      </template>
    </el-table-column>
   <el-table-column
      label="小组名"
      min-width="80">
      <template slot-scope="scope">
        <div class="content-rowspan">
          <div v-for= "(value,index) in scope.row.groupList "  :key = "index">
            {{ value.groupName }}
          </div>
        </div>
          
      </template>
    </el-table-column>
    <el-table-column
      label="小组人数"
      min-width="80">
      <template slot-scope="scope">
          <div class="content-rowspan">
            <div v-for= "(value,index) in scope.row.groupList"  :key = "index">
            {{ value.groupStuNumber }}
          </div>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="最近更新"
      min-width="100">
      <template slot-scope="scope">
          <div class="content-rowspan">
            <div v-for= "(value,index) in scope.row.groupList"  :key = "index">
                {{ value.updatedAt | fommatDate }}
            </div>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间"
      min-width="100">
      <template slot-scope="scope">
          <div class="content-rowspan">
            <div v-for= "(value,index) in scope.row.groupList"  :key = "index">
                {{ value.createdAt | fommatDate }}
            </div>
          </div>
      </template>
    </el-table-column>
     <el-table-column label="操作" min-width="120">
      <template slot-scope="scope">
        <div class="content-rowspan">
            <div v-for= "(value,index) in scope.row.groupList"  :key = "index">
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
            </div>
        </div>
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
      chooseGrade:'',
      groupName:''
    }
  },
  computed:{
      ...mapGetters (['getAllGradNameList']),
      results() {
        let result = []
        let grade = this.getAllGradNameList
         for (let i = 0; i < grade.length; i++) {
           let groupList = []
          for(let j = 0; j < grade[i].groups.length; j++){
            groupList.push(grade[i].groups[j])
          }
           result.push (Object.assign({'gradeName':grade[i].grades},{'groupList':groupList}))
         }
         return result
       }
  },
  methods: {
    addGroup (name) {
       let groupName =  name.trim()
        if (!groupName) {
          alert("小组名不能为空")
          this.groupName = ''
          return
        }
       for(let i = 0; i < this.getAllGradNameList.length; i++) {
         let grade = this.getAllGradNameList[i]
          for (let j = 1; j < grade.groups.length; j++) {
            if (grade.groups[j].groupName === groupName) {
              alert("小组名已经存在不能重复创建")
              return 
            }
          }
       }
      this.$store.dispatch('addGroup',{
                                      gradeName:this.chooseGrade,
                                      groupName:name
                                      }).then (function (){
                                        alert("创建班级成功")
                                        
                                      },function(){
                                        alert("创建班级失败")
                                      })
                                        this.groupName = ''
                                        this.chooseGrade = ''
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
 .content-rowspan div {
    position: relative;
    width: 100%;
    height: 46px;
    left:-10px;
    line-height: 46px;
    border-bottom: 1px solid #ECEDEE;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: content-box;
 }
 .content-rowspan div:nth-child(even) {
   background-color: #f7f7f7;
  }
.content-rowspan div:nth-child(odd) {
   background-color: #ffffff;
  }
 .content-rowspan div:last-child {
    border-bottom: 0;
  }

</style>
