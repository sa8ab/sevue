import Loading from "./RLoading.vue";
import mounter from "@/utils/mountComponent";
import type { App } from "vue";
import type { LoadingOptions, Loading as LoadingType } from "@/types";

const loadingFactory = (app: App) => {
  const _app = app;
  return (data: LoadingOptions = {}): LoadingType => {
    let target;
    if (typeof data.target === "string") {
      target = document.querySelector(data.target);
    } else if (data.target) {
      //   target = data.target.el || data.target;
      target = data.target;
    } else {
      target = document.body;
    }
    const { element, vNode } = mounter(Loading, {
      props: data,
      app: _app,
    });
    target?.append(element);

    return {
      close: vNode.component?.exposed?.close
    }
  };
};

export default loadingFactory;
