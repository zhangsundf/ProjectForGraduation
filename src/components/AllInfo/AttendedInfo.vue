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
        <span style="margin-left: 10px" class = "span"  :class = "scope.row.isSignin === true ? 'signin' :'nosignin'">{{scope.row.StudentId}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      min-width="200">
      <template slot-scope="scope">
          <span class = "span"  :class = "scope.row.isSignin === true ? 'signin' :'nosignin'">{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="班级"
      min-width="100">
      <template slot-scope="scope">
            <span class = "span"  :class = "scope.row.isSignin === true ? 'signin' :'nosignin'">{{ scope.row.grade }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="小组"
      min-width="100">
      <template slot-scope="scope">
            <span class = "span"  :class = "scope.row.isSignin === true ? 'signin' :'nosignin'">{{ scope.row.teamname }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="是否签到"
      min-width="200">
      <template slot-scope="scope">
            <span class = "span"  :class = "scope.row.isSignin === true ? 'signin' :'nosignin'">{{ scope.row.isSignin | fommatSign}}</span>
      </template>
    </el-table-column>
     <el-table-column label="操作" min-width="230">
      <template slot-scope="scope">
        <el-button
          size="mini"
         >编辑</el-button>
        <el-button
          size="mini"
          type="success"
          >完成</el-button>
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
      today: new Date().format()
    }
  },
  computed: {
    ...mapGetters(['getStudentInfo','getSigninList','getDate']),
    tableData () {
      return this.getStudentInfo
    },
    result () {
       let result = []
        for (let i = 0; i < this.tableData.length; i++){
          for (let j = 0; j < this.getSigninList.length; j++){
            if(this.tableData[i].id === this.getSigninList[j].userID){
                result.push(Object.assign({},this.getSigninList[j],this.tableData[i].attributes))
                break
            }
          }
        }
        return result
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
    console.log(this.getDate)
  },
  filters:{
    fommatSign(val){
      if(val === true) {
        return '成功签到'
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
    color: green;
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


