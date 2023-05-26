import type { VNode } from "vue";

export default (slot: VNode[], key: string) => {
  const items: VNode[] = [];

  const setItems = (unknownNodes: VNode[]) => {
    unknownNodes.forEach((unknownNode) => {
      if ((unknownNode.type as any)[key]) {
        items.push(unknownNode);
      } else if (typeof unknownNode.children === "object" && unknownNode.children) {
        // @ts-ignore
        if (unknownNode.children.default) {
          // @ts-ignore
          setItems(unknownNode.children.default() as VNode[]);
        } else {
          setItems(unknownNode.children as VNode[]);
        }
      }
    });
  };
  setItems(slot);

  return items;
};
