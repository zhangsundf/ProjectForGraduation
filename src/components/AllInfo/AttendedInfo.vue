<template>
  <div class = "AttendedInfo">
    <div class = "header">
      <span class= "showdate" v-for = "(item,index) in dateList" :key = "index"  @click = "changeDate(item,index)">{{item | fommatDate}}</span>
      <br>
      <div class = "showCurDate"><span class = "setcurDate"></span></div>
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
            <span class = "span">{{ scope.row.temname }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="是否签到"
      min-width="200">
      <template slot-scope="scope">
            <span class = "span"  :class = "scope.row.isSignin === true ? 'signin' :'nosignin'">{{ scope.row.isSignin}}</span>
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
    this.$store.dispatch ("getDateArray")
  },
  methods: {
    changeDate (item,index) {
      let setcurDate = document.getElementsByClassName('setcurDate')[0]
        this.$store.dispatch ("getIsSign",item)
        setcurDate.innerHTML = item
        this.toggleClass("showdate",index+1,"active")
    }
  },
  mounted () {
    this.dateList = this.getDate
    var now=new Date();
    let getMonth = now.getMonth() + 1 < 10 ? '0'+(now.getMonth() + 1):now.getMonth() + 1
    let getDate = now.getDate() < 10 ? '0' + now.getDate() : now.getDate() 
    var curDate = now.getFullYear()+"-"+getMonth +"-"+getDate

    let setcurDate = document.getElementsByClassName('setcurDate')[0]
    setcurDate.innerHTML = curDate
    
  },
  filters:{
    fommatDate (val) {
      return val.substring(5)
    },
    fommatSign(val){
      if(val === true) {
        return 10
      }
      return 0
    }
  }
}
</script>
<style scoped>
  .header {
    position: relative;
    width: 100%;
    height: 12%;
    font-size:12px;
    color: grey;
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
  }
  .showdate {
    position: relative;
    margin: 10px;
    font-size: 16px;
  }
  .showdate:hover{
    cursor: pointer;
    color:blue;
  }
  header .showdate:first-child{
    color: red;
  }
  .previous, .next{
    display: inline-block;
    
  }
  .active {
    color: red;
  }
  .signin {
    position: relative;
    line-height: 100%;
    background-color: green;
  }
  .nosignin {
    position: relative;
    line-height: 100%;
    background-color: red;
  }
</style>


