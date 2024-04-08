import { camelize, getCurrentInstance, toHandlerKey } from "vue";

// https://github.com/vuejs/core/issues/5917

export const useEmitsAsProps = <Name extends string>(emit: (name: Name, ...args: any[]) => void) => {
  const vm = getCurrentInstance();

  const events = vm?.type.emits as Name[];
  const result: Record<string, any> = {};

  if (!events?.length) {
    console.warn(`No emitted event found. Please check component: ${vm?.type.__name}`);
  }

  events?.forEach((ev) => {
    result[toHandlerKey(camelize(ev))] = (...arg: any) => emit(ev, ...arg);
  });
  return result;
};
