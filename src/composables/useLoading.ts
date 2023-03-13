import { LoadingKey } from "@/injectionKeys";
import type { LoadingOptions } from "@/types";
import { inject } from "vue";

const useLoading = () => {
  return inject(LoadingKey) as (params?: LoadingOptions) => () => {};
};

export default useLoading;
