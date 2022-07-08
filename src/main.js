import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {
  Container,
  Header,
  Main,
  Aside,
  Input,
  Button,
  Divider,
  MessageBox,
} from "element-ui";
import "@/assets/scss/reset.scss";
import "element-ui/lib/theme-chalk/index.css";
import request from "@/services/request";

Vue.prototype.$confirm = MessageBox.confirm;
Vue.config.productionTip = false;
Vue.prototype.$env = process.env;
Vue.prototype.$request = request;

// 主要是按需加载使用
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Input);
Vue.use(Button);
Vue.use(Divider);
// Vue.use(MessageBox);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
