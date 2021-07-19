import Vue from "vue";
import App from "./App.vue";
import VueYoutube from "vue-youtube";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignInAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faSignInAlt, faPlusCircle]);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueYoutube);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
