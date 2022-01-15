import Ripple from "vue-material-design-ripple";

export default async (Vue) => {
    console.log('install ripple');
    Vue.directive("ripple", Ripple);
}