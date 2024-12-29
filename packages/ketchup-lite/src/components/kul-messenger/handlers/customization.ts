import { CHILD_ROOT_MAP } from "../helpers/constants";
import { createNode } from "../helpers/utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterHandlers,
  KulMessengerFilters,
} from "../kul-messenger-declarations";

export const prepCustomizationHandlers = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterHandlers["customization"] => {
  return {
    //#region Button
    button: async (e, type, action, node = null) => {
      const { eventType } = e.detail;

      const adapter = getAdapter();
      const { get, set } = adapter.controller;
      const { compInstance } = get;

      if (eventType === "click") {
        switch (action) {
          case "add":
            set.ui.setFormState(true, type);
            break;
          case "cancel":
            set.ui.setFormState(false, type);
            break;
          case "confirm": {
            const { title } = adapter.elements.refs.customization.form[type];

            const value = await title.getValue();
            title.classList.remove("kul-danger");
            if (value) {
              await createNode(adapter, type);
              set.ui.setFormState(false, type);
            } else {
              title.classList.add("kul-danger");
              title.kulHelper = {
                value: "This field is mandatory",
              };
            }
            break;
          }
          case "delete":
            compInstance.deleteOption(node, type);
            break;
          case "edit":
            set.ui.setFormState(true, type, node);
            break;
        }
      }
    },
    //#endregion

    //#region Chip
    chip: async (e) => {
      const { comp, eventType, selectedNodes } = e.detail;

      const { get, set } = getAdapter().controller;
      const { compInstance } = get;
      const { filters } = compInstance.ui;

      switch (eventType) {
        case "click":
          const newFilters: KulMessengerFilters = {
            avatars: false,
            locations: false,
            outfits: false,
            styles: false,
            timeframes: false,
          };
          Array.from(selectedNodes).forEach((n) => {
            const id = n.id as keyof KulMessengerFilters;
            newFilters[id] = true;
          });
          set.ui.filters(newFilters);
          break;
        case "ready":
          const nodes: string[] = [];
          for (const key in filters) {
            if (Object.prototype.hasOwnProperty.call(filters, key)) {
              const k = key as keyof KulMessengerFilters;
              const option = filters[k];
              if (option) {
                nodes.push(key);
              }
            }
          }
          requestAnimationFrame(() => comp.setSelectedNodes(nodes));
      }
    },
    //#endregion

    //#region Image
    image: async (_e, node, index) => {
      const { image } = getAdapter().controller.set;

      const matchedType = Object.keys(CHILD_ROOT_MAP).find((key) =>
        node.id.includes(key),
      ) as keyof typeof CHILD_ROOT_MAP;

      if (matchedType) {
        image.cover(CHILD_ROOT_MAP[matchedType], index);
      }
    },
  };
  //#endregion
};
