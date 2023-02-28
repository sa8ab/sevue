export default {
  beforeMount(el: HTMLElement) {
    document!.querySelector("body")!.appendChild(el);
  },
};
