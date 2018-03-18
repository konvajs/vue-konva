import Vue from "vue";

import VueKonva from "../src/lib";
import App from "./App";
import store from "./store";
import router from "./router";

Vue.use(VueKonva);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: function(h) {
    return h(App);
  }
});
