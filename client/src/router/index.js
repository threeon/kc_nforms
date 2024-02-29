import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
//import store from '@/store'
//import Config from "@/js/config.js"
//import Constant from "@/js/constant.js"

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  // get rid of #
  mode: "history",
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
