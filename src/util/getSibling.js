export default{
  install(Vue){
    Vue.prototype.$bus = new Vue()
    Vue.prototype.toggleClass = (tagclass,curindex, style) => {
   //   console.log("this is getSibling")
        var li_list = document.getElementsByClassName(tagclass)
        for(var i = 0; i < li_list.length; i++){

            if(curindex == i+1){
              li_list[i].classList.add(style)
            }
            else{
              li_list[i].classList.remove(style)
            }
        }
    }
  }
}

