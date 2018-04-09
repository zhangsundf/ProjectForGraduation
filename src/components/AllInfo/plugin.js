import mixin from './mixin'

export default{
  install(Vue){
    Vue.directive('focus',{
      bind:function(el,binding){
        console.log(el)

        console.log(binding.name)
      },
      inserted:function(el){
          el.focus()
          el.style.border = "1px solid green"

      }
    })

    Vue.mixin(mixin)

    Vue.prototype.myGlobalMethod = function(){
      console.log("this is my define globalmethod in plugin")
    }
  }
}
