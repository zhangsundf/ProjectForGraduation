<template>

  <div class = "coverLayout">
    <div class = "content">
        <el-contanier>
          <el-header>
            <span> 请设置基本信息</span>
          </el-header>
          <el-main>
            <div class = "block">
              <p>选择班级</p>
                <ul class = "parent">
                  <li v-for="(grade,index) in grade" @click = "toggleClasses(index)">
                      <p>{{grade.grades}}<i class = "el-icon-arrow-down el-icon-right arrow"></i></p>
                      <div class = "children">
                      <el-checkbox-group v-model = "checkList"  v-for="classes in grade.classes" style="dispaly:none">
                        <el-checkbox :label = classes>{{classes}}</el-checkbox>
                      </el-checkbox-group>
                      </div>
                    </li>
                </ul>
            </div>
            <div class = "block">
              <p>选择实习天数</p>
                  <label for = "startDate">起始日期:</label>
                  <input type = "date" id = "startDate" v-model = "start" :min="mindate" >
                  <label for = "endDate">结束日期:</label>
                  <input type = "date" id = "endDate" v-model = "end" :min = "start">
            </div>
            <el-button type = "primary" plain @click.once = "create(start,end)">确认创建</el-button>
          </el-main>
        </el-contanier>

    </div>

  </div>
</template>

<script>
export default {
  name: 'coverLayout',
  data () {
    return {
      hasAllInfo: true,
      showClass: false,
      checkList: [],
      diff_arr:[],
      mindate: '',
      start:'',
      end: '',
      grade:[
        {
          grades: '2014级',
          classes :['软件1401','软件1402','软件1403','软件1404','软件1405']
        },
        {
          grades: '2015级',
          classes: ['软件1501','软件1502','软件1503','软件1504','软件1505']
        },
        {
          grades: '2016级',
          classes: ['软件1601','软件1602','软件1603','软件1604','软件1605','软件1606','软件1607']
        },
        {
          grades: '2017级',
          classes: ['软件1701','软件1702','软件1703','软件1704']
        }
      ]
    }
  },
  props: {
    message: {
      default: false,
      required: true
    }
  },
  methods: {
    initDate () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      month = String(month).length == 1 ? '0'+ String(month) : String(month)
      day = String(day).length == 1 ? '0'+ String(day) : String(day)
      this.mindate = year+'-'+month+'-'+day
      this.start = this.mindate
    },
    toggleClasses (index) {
      let children = document.getElementsByClassName('children')
      let arrow = document.getElementsByClassName('arrow')
      console.log(children.length)
      for (let i = 0; i <children.length; i ++){
        if(index === i){
          if(children[i].style.display === "none")  {
            children[i].style.display = "block"
            arrow[i].classList.remove("el-icon-arrow-down")
            arrow[i].classList.add("el-icon-arrow-up")
          }
          else{
            arrow[i].classList.remove("el-icon-arrow-up")
            arrow[i].classList.add("el-icon-arrow-down")
            children[i].style.display = "none"
          }
        }
      }

    },
    create(start,end) {
      var startdate = new Date(start),
          enddate = new Date(end),
          start_time = startdate.getTime(),
          end_time = enddate.getTime(),
          timeDiff = end_time - start_time
          if(timeDiff == 0){
            alert("结束日期不能等于开始日期")
            return
          }

          else{
            for(var i = 0; i < timeDiff; i += 86400000){
              var ds = new Date(start_time + i)
              this.diff_arr.push((ds.getMonth() + 1)+'-'+ ds.getDate())
            }
             console.log(this.$store.state.ManageClass +":"+ this.$store.state.continueDate)
            this.$store.dispatch('complateInfo',this.diff_arr,this.checkList)
          }
       return
    }
  },
  mounted () {
    this.initDate()
  }

}
</script>

<style scoped>

  .coverLayout {
    position: fixed;
    width: 100%;
    height: 100%;
    top:0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 200;
    background-color: rgba(180, 186, 192,0.5);
    display: flex;
  }

  .content {
    position: relative;
    width:50%;
    height: 70%;
    margin: auto;
    border:1px solid red;
  }

  .el-header {
    position: relative;
    width: 100%;
    height: 8%;
    background-color: cadetblue;
  }

  .el-main {
    position: relative;
    width: 100%;
    height: 92%;
    background-color:honeydew;
  }

  ul,li {
    list-style-type: none;
  }



</style>
