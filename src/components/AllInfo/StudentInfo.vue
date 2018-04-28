<template>
  <div class = "studentinfo">
    <!-- <virtual-list :itemHeight = "itemHeight" ref = "list"> -->
      <!-- <table>
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
      </table> -->
      {{studentListLength}}
      <div class = "content" :style= "testObj">
        <div v-for = "(item,index) in studentList">
          <p class = "item" >{{index+1}}</p>
          <p class = "item" >{{item.studentId}}</p>
          <p class = "item" >{{item.name}}</p>
          <p class = "item" >{{item.sex}}</p>
          <p class = "item" >{{item.grade}}</p>
          <p class = "item" >{{item.tel}}</p>
        </div>
      </div>
    <!-- </virtual-list> -->
      <h3>没有更多数据了</h3>
    </div>
</template>

<script>
import axios from 'axios'
// import VirtualList from '../../common/VirtualList'
export default {
  name:'StudentInfo',
  data(){
    return {
      itemHeight: 44,
      scheduledAnimationFrame: false,
      testObj : {
          gridTemplateRows:repeat(this.studentList,1+'fr')
      }
    }
  },
  // components : {
  //   VirtualList
  // },
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
    this.getInfo()

    },
    computed : {
      studentList () {
        return this.getInfo().length
      }
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
    getInfo () {
      axios.get('http://127.0.0.1:1230/all').then((val)=>{
           this.$store.commit('SETSTUDENTINFO',val.data)
          return val.data
     })
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
  .content {
    display:grid;
    grid-template-columns: repeat(6,1fr)
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
    border-radius: .2rem;
    font-size: .8em;
    min-height: 3rem;
    padding: .75rem;
    color: #f0f0f3;
    background-color: #e91e63;
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


