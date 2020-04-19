import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import './plugins/bootstrap-vue'
import '@babel/polyfill'
import 'mutationobserver-shim'
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'ws://192.168.1.220:8080/socket')
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
