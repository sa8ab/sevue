import { createApp } from "vue";
import App from "./App.vue";
import Sevue from "../src/main";
import "../src/styles/index.scss";
import "./style/main.scss";

const app = createApp(App);
app.use(Sevue, {});
app.mount("#app");
