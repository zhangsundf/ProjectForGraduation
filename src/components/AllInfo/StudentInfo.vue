<template>
  <div class = "studentinfo">
    <virtual-list :itemHeight = "itemHeight" ref = "list">
      <table>
        <tr class = "tableHeader">
            <th>序号</th>
            <th>学号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>班级</th>
            <th>联系电话</th>
        </tr>
        <tbody id = "tbody">
        <tr v-for = "(item,index) in studentList" class = "bodyitem">
          <td>{{index+1}}</td>
          <td>{{item.studentId}}</td>
          <td>{{item.name}}</td>
          <td>{{item.sex}}</td>
          <td>{{item.grade}}</td>
          <td>{{item.tel}}</td>
        </tr>
        </tbody>
      </table>
    </virtual-list>
      <h3>没有更多数据了</h3>
    </div>
</template>

<script>
import axios from 'axios'
import VirtualList from '../../common/VirtualList'
export default {
  name:'StudentInfo',
  data(){
    return {
      studentList :[],
      itemHeight: 44,
      scheduledAnimationFrame: false
    }
  },
  mounted(){
    let tbody = document.getElementById("tbody")
    if (tbody && tbody.children[0]) {
        return this.itemHeight = tbody.children[0].clientHeight || 44
    }

    const list = this.$refs.list
    if (list && list.$el) {
      list.$el.addEventListener (
        'scroll',
        this.handleScroll,
        false)
    }


    axios.get('http://127.0.0.1:1230/all').then((val)=>{
           this.$store.commit('SETSTUDENTINFO',val.data)
           this.studentList = val.data;
     })
    },

    methods :{
       handleScroll () {
         if (this.scheduledAnimationFrame) return

         this.scheduledAnimationFrame = true
         //requestAnimationFrame
         window.requestAnimationFrame (timeStamp => {
           this.scheduledAnimationFrame = false
           //接下来可以写一些滚动时要做或者不做的事情逻辑
         })
       }
    },
    beforeDestroy () {
      const list = this.$refs.list
      list.$el.removeEventListener (
        'scroll',
        this.handleScroll
      )
    }

}
</script>
<style scoped>
  .studentinfo{
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    overflow-y: scroll;
  }
  .tableHeader{
    width: 100%;
    height: 40px;
    background-color: darkgray;
    padding-left: 3%;
  }

 td, th{
    text-align: center;
    border: 1px solid gray;
  }

   table{
    position: relative;
    margin-top: 2%;
    width: 90%;
    /* height: 80%; */
    margin: 0 auto;

  }

</style>


