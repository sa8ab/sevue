import { createApp } from "vue";
import App from "./App.vue";
import Sevue from "../src/main";
import "../src/styles/index.scss";
import "./style/main.scss";
import "boxicons/css/boxicons.min.css";
import router from "./router";
import { vMaska } from "maska";

const app = createApp(App);
app.use(Sevue);
app.use(router);
app.directive("maska", vMaska);
app.mount("#app");
