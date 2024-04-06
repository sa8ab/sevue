import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/HomePage.vue";
import SelectPage from "./pages/SelectPage.vue";
import SelectNewPage from "./pages/SelectNewPage.vue";
import PaginationPage from "./pages/PaginationPage.vue";
import CheckboxPage from "./pages/CheckboxPage.vue";
import NotificationPage from "./pages/NotificationPage.vue";
import LoadingPage from "./pages/LoadingPage.vue";
import TabsPage from "./pages/TabsPage.vue";
import InputPage from "./pages/InputPage.vue";
import ButtonPage from "./pages/ButtonPage.vue";
import RadioPage from "./pages/RadioPage.vue";
import SwitchPage from "./pages/SwitchPage.vue";
import SliderPage from "./pages/SliderPage.vue";
import PopupPage from "./pages/PopupPage.vue";
import AlertPage from "./pages/AlertPage.vue";
import PlaygroundPage from "./pages/PlaygroundPage.vue";
import DropdownPage from "./pages/DropdownPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/select", component: SelectPage },
  { path: "/select-new", component: SelectNewPage },
  { path: "/pagination", component: PaginationPage },
  { path: "/checkbox", component: CheckboxPage },
  { path: "/notification", component: NotificationPage },
  { path: "/loading", component: LoadingPage },
  { path: "/tabs", component: TabsPage },
  { path: "/input", component: InputPage },
  { path: "/button", component: ButtonPage },
  { path: "/radio", component: RadioPage },
  { path: "/switch", component: SwitchPage },
  { path: "/slider", component: SliderPage },
  { path: "/popup", component: PopupPage },
  { path: "/alert", component: AlertPage },
  { path: "/playground", component: PlaygroundPage },
  { path: "/dropdown", component: DropdownPage },
];

export default createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
