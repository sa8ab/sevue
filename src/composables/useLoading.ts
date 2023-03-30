import { loadingKey } from "@/injectionKeys";
import type { LoadingOptions } from "@/types";
import { inject } from "vue";

const useLoading = () => {
  return inject(loadingKey) as (params?: LoadingOptions) => () => {};
};

export default useLoading;
