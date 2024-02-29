import Vue from 'vue'
// Vue Router
import VueRouter  from 'vue-router'
//import { routes } from './router/routes'
import router from './router'
import store      from './store'
import App        from './App.vue'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import 'date-input-polyfill'
import 'vuetify/dist/vuetify.min.css'
// axios.defaults.withCredentials = true;

import VueExcelXlsx from "vue-excel-xlsx";


Vue.use(VueExcelXlsx);

//Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuetify);

Vue.prototype.$env = process.env;

// Vue.component('icon', Icon);
//const router = new VueRouter({
//    routes,
//    // get rid of #
//    mode: 'history'
//});

// Event Bus
Vue.prototype.$EventBus = new Vue();

new Vue({
    store,
    el: '#app',
    router,
    render: h => h(App)
})
