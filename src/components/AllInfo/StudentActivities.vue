<template>
<div class = "StudentActivities">

    <div class = "commentItem" v-for = "(item,index) in result" :key = "index">
        <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                {{item.username}}
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <div>
                    <strong>{{item.username}}</strong>        
                    <span class = "info"> {{item.grade}}</span>
                    <span class = "info group">{{item.teamname}}</span>
                    <br>
                    <div class = "commentArea">
                        {{item.comment}}
                    </div>
                </div>
            </div>
            <nav class="level is-mobile">
            <div class="level-left">
                <a class="level-item"  @click = "support(index)">
                <span class="icon is-small heart" > <font-awesome-icon :icon = "['fas','heart']"/></span>
                </a>
                <a class="level-item">
                <span class="icon is-small reply"> <font-awesome-icon :icon = "['fas','reply-all']"/></span>
                </a>
            </div>
            <div class = "level-right">
                 <span class="level-item">
                <span>对自己评价：<span class="icon is-small rating"> <font-awesome-icon :icon = "['fas','heart']"/></span>{{item.rating}}</span>
                </span>
            </div>
            </nav>
        </div>
         <div class="media-right">

             <span>{{item.date}}</span>
         </div>
        </article>
        <!-- </a> -->
    </div>
    <div class = "footer" style = "backgroundColor:#fff">
        <span>已加载全部</span>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
 name: 'StudentActivities',
 data (){
     return {
     }
 },
 computed: {
     ...mapGetters (['getstudentComment','getStudentInfo']),
     result () {
        let result = []
        for(let i = 0; i < this.getStudentInfo.length; i++){
            let student = this.getStudentInfo[i]
            for(let j = 0; j < this.getstudentComment.length; j++){
                let commentItem = this.getstudentComment[j]
                if (student.id === commentItem.attributes.userID){
                    result.push(Object.assign({'index':i},commentItem.attributes,student.attributes))
                }
            }
        }
        return result
     }
 },
 beforeCreate () {
     this.$store.dispatch ("getStudentActivities")
 },
 methods: {
     support (index) {
        let hearts = document.getElementsByClassName('heart')
        if(hearts[index].style.color === "red") {
            hearts[index].style.color = "grey"
        }
        else {
            hearts[index].style.color = "red"
        }
     }
 }
}
</script>

<style>

  .commentItem {
      position: relative;
      border: 1px solid rgba(172, 172, 173,0.3);
      border-radius: 20px;
      margin: 10px;
      width: 90%;
      min-height: 100px;
  }
  article {
      position: relative;
      padding: 30px;
  }
  .commentArea {
      position: relative;
      min-height: 100px ;
      background-color:rgba(254,254,254,0.2);
      border-radius: 20px;
      padding: 10px;
      margin: 10px;
      font-size: 16px;
      font-family: cursive;
      color: rgb(112, 109, 109);
  }
    .level-right {
        font-size: 10px;
        color:brown;
    }
    .heart {
        color: grey;
    }
    .media-right {
        font-size: 14px;
        font-weight:bold;
        color: rgb(52, 168, 139);
    }
    .image {
        color: #fff;
        overflow: hidden;
        font-weight:bold;
        border-radius:32px;
        background-color: rgb(122, 233, 164);
        line-height: 64px;
        text-align: center;
    }
    .content {
        border-bottom: 2px solid #f5f4f4;
    }
    .info {
        color:rgb(112, 115, 116);
        font-size: 14px;
        margin-left:15%;
    }
    .group {
        margin:2%;
        color:rgb(150, 155, 156);
    }
</style>
