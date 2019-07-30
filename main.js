import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import home from './pages/home/home.vue'
Vue.component('home',home)

import classify from './pages/classify/classify.vue'
Vue.component('classify',classify)

import meizi from './pages/meizi/meizi.vue'
Vue.component('meizi',meizi)

import my from './pages/my/my.vue'
Vue.component('my',my)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
