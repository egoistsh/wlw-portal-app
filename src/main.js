import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '../public/css/portal.css'
import '../public/css/portal-ext.css'
import '../public/lib/element-ui/custom-theme/theme/index.css'
import '../public/lib/element-ui/custom-theme/theme/index-ext.css'
import './utils/http-client'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
