// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store/store.js'
import axios from 'axios'
import plugin from '@/components/AllInfo/plugin'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import bulma from 'bulma'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import VueResource from 'vue-resource'
import qs from 'qs'
import toggleClass from './util/getSibling'
import echarts from 'echarts'


fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)


//Vue.use(plugin)
Vue.use(ElementUI)
Vue.use(ElementUI, { size: 'small' });
Vue.use(bulma)
Vue.use(VueResource)
Vue.use(qs)
Vue.use(toggleClass)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts 

router.beforeEach((to,from,next) => {   
    if(to.matched.some( m => m.meta.auth)){     
    
        if(store.state.isLogin===true) {        
          next()     
        }else{       
        　 next({path:'/',query:{ Rurl: to.fullPath} })
        } 
    }else{ 
    　　next() 
    } 
    })
new Vue({
  el: '#app',
  router,
   store,
   plugin,
  components: { App },
  template: '<App/>'
})
