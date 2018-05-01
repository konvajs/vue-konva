import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home";
import Stars from "./components/Stars";
import Circle from "./components/Circle";
import VuexExample from "./components/VuexExample";
import RadarDemo from "./components/RadarDemo";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "hash",
  routes: [
    { path: "/", component: Home },
    { path: "/stars", component: Stars },
    { path: "/circle", component: Circle },
    { path: "/vuex-example", component: VuexExample },
    { path: "/radar-demo", component: RadarDemo }
  ]
});
