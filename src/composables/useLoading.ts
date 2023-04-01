import { loadingKey } from "@/injectionKeys";
import type { LoadingOptions, Loading } from "@/types";
import { inject } from "vue";

const useLoading = () => {
  return inject(loadingKey) as (params?: LoadingOptions) => Loading;
};

export default useLoading;
