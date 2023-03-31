import { createVNode, render } from "vue";
import type { Component, App } from "vue";

type Params = {
  props?: Record<string, unknown>;
  children?: unknown;
  element?: HTMLElement;
  app?: App;
};
const mounter = (
  component: Component, // Component to mount
  {
    props, // props of the component
    children, // children of the component
    element = document.createElement("div"), // where to mount
    app,
  }: Params = {}
) => {
  const vNode = createVNode(component, props, children);

  if (app) vNode.appContext = app._context;
  render(vNode, element);

  const destroy = () => {
    if (element) render(null, element);
  };
  const elementChild = element.children[0];

  return { vNode, destroy, element, elementChild };
};

// export const mounterFactory = (app: App) => {
//   return (...args: [component: Component, params: Params]) =>
//     mounter(...args, app);
// };

export default mounter;
