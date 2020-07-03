import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
import * as utils from "@/utils";
import * as api from "@/api";

import { Toast } from "vant";

Vue.use(Toast);

Vue.config.productionTip = false;
Vue.prototype.$utils = utils;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
