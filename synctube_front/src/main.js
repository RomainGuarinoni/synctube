import Vue from "vue";
import App from "./App.vue";
import VueYoutube from "vue-youtube";

Vue.config.productionTip = false;
Vue.use(VueYoutube);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
