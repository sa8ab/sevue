import Loading from "./RLoading.vue";
import mounter from "@/utils/mountComponent";
import type { App, VNode } from "vue";
import type { LoadingOptions, Loading as LoadingType } from "@/types";
import { ref } from "vue";

const loadingFactory = (app: App) => {
  const _app = app;
  let bodyLoadingClose = ref<(() => void) | undefined>(undefined)
  return {
    loading: (data: LoadingOptions = {}): LoadingType => {
      data = {
        onlySingleLoading: true,
        ...data
      }

      let target;
      let targetIsBody = ref<boolean>(false)

      if (typeof data.target === "string") {
        target = document.querySelector(data.target);
      } else if (data.target) {
        //   target = data.target.el || data.target;
        target = data.target;
      } else {
        target = document.body;
        targetIsBody.value = true
      }

      const alreadyHasLoading = target?.lastElementChild?.classList.contains('r-loading-detector')
      if (alreadyHasLoading && data.onlySingleLoading) {
        target?.querySelectorAll('.r-loading-detector').forEach(el => el.remove())
      }

      const { element, vNode } = mounter(Loading, {
        props: data,
        app: _app,
        elementClass: 'r-loading-detector'
      });
      target?.append(element);

      if (targetIsBody.value) bodyLoadingClose.value = vNode.component?.exposed?.close

      return {
        close: vNode.component?.exposed?.close
      }
    },
    close: () => {
      const bodyLoadings = document.body.querySelectorAll(':scope > .r-loading-detector')
      const bodyHasMultipleLoadings = bodyLoadings.length > 1;

      if (bodyHasMultipleLoadings) {

        bodyLoadings.forEach(el => el.remove())
      } else {
        bodyLoadingClose.value?.()
      }
    }
  };
};

export default loadingFactory;
