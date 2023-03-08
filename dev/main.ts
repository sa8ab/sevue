import { createApp } from "vue";
import App from "./App.vue";
import Sevue from "../src/main";
import "../src/styles/index.scss";
import "./style/main.scss";
import "boxicons/css/boxicons.min.css";

const app = createApp(App);
app.use(Sevue, {});
app.mount("#app");
