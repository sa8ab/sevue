import { loadingKey } from "@/injectionKeys";
import type { LoadingInject } from "@/types";
import { inject } from "vue";

const useLoading = () => {
  return inject(loadingKey) as LoadingInject;
};

export default useLoading;
