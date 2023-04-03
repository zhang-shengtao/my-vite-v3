// import "@/assets/debug.js";
import { createApp, h } from "vue";
import { RouterView } from "vue-router";
import store from "./store";
import rotuer from "./router";

import "element-plus/dist/index.css"; // 引入element-plus样式
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; //引入icons图标
import "@/styles/index.scss"; // 引入自己的样式
import "./permission"; // 引入权限

const app = createApp({ render: () => h(RouterView) });

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(store);
app.use(rotuer);
app.mount("#app");
