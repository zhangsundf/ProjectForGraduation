<template>
<div class = "StudentActivities">

    <div class = "commentItem" v-for = "(item,index) in result" :key = "index">
        <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                {{item.attributes.userID}}
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <div>
                    <strong>{{item.attributes.userID}}</strong> 
                    <br>
                    <div class = "commentArea">
                        {{item.attributes.comment}}
                    </div>
                </div>
            </div>
            <nav class="level is-mobile">
            <div class="level-left">
                <a class="level-item">
                <span class="icon is-small heart"  @click = "support"> <font-awesome-icon :icon = "['fas','heart']"/></span>
                </a>
                <a class="level-item">
                <span class="icon is-small reply"> <font-awesome-icon :icon = "['fas','reply-all']"/></span>
                </a>
            </div>
            <div class = "level-right">
                 <span class="level-item">
                <span>对自己评价：<span class="icon is-small rating"> <font-awesome-icon :icon = "['fas','heart']"/></span>{{item.attributes.rating}}</span>
                </span>
            </div>
            </nav>
        </div>
         <div class="media-right">
             <span>{{item.attributes.date}}</span>
         </div>
        </article>
        <!-- </a> -->
    </div>
    <div class = "footer" style = "height:30px">
        <span style = "color:grey">已加载全部</span>
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
     ...mapGetters (['getstudentComment']),
     result : {
         get() {
        return this.getstudentComment
         },
         set (val) {
             return val
         }
     }
 },
 beforeCreate () {
     this.$store.dispatch ("getStudentActivities")
     this.result = []
 },
 methods: {
     support () {
         
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
    color:grey;
  }
  .image {
      color: #fff;
      overflow: hidden;
      font-weight:bold;
      border-radius:32px;
      background-color: rgb(122, 233, 164);
  }
  .content {
      border-bottom: 2px solid #e9e6e6;

  }
</style>
