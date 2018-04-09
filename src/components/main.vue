
<template>
  <div class = "card">
      <header class = "card-header">
        <div class = "left">

        </div>
        <div class = "right">
              <div class = "dropdown is-hoverable">
                  <div class = "dropdown-trigger">
                    <button class = "button" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span>关于我们</span>
                      <span class = "icon is-small">
                        <!-- <i class = "fas fas-angle-down" aria-hidden="true"></i> -->
                        <font-awesome-icon :icon = "['fas','angle-down']"/>
                      </span>
                    </button>
                  </div>
                  <div class = "dropdown-menu" id = "dropdown-menu" role = "menu">
                    <div class = "dropdown-content">
                      <a href = "#" class = "dropdown-item">
                        关于系统
                      </a>
                      <a href = "#" class = "dropdown-item">
                        系统使用者
                      </a>
                      <a href = "#" class = "dropdown-item">
                        联系我们
                      </a>
                    </div>
                  </div>
              </div>
          </div>
      </header>
      <div class = "card-content">
          content
      </div>
      <footer class = "card-footer is-info">
          <div class = "notification">
            <p>©copyright &nbsp;&nbsp;2018; 西安邮电大学</p>
          </div>
      </footer>

  </div>
</template>


<script>
export default {
  name: "Main",
  data(){
    return {

    }
  }
}
</script>

<style>
.card{
    position: absolute;
    left: 12%;
    top:0px;
    width: 88%;
    height: 100%;
}
.card-header{
  border-bottom: 8px solid rgb(22, 168, 132);
  height: 8%;
}
.card-content{
  height: 88%;
}
.card-footer{
  height: 4%;
}
.notification{
  width: 100%;
  line-height: 4%;
}
.right{
  position: relative;
  left:90%;
  top:30%;
}
</style>


