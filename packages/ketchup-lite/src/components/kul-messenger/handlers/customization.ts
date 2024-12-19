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

      if (eventType === "click") {
        const handleEditing = (enabled: boolean) =>
          set.messenger.ui.editing(enabled, type);

        switch (action) {
          case "add":
            handleEditing(true);
            break;
          case "cancel":
            handleEditing(false);
            break;
          case "confirm": {
            const titleTextarea =
              adapter.components.editing[type].titleTextarea;
            const value = await titleTextarea.getValue();
            titleTextarea.classList.remove("kul-danger");
            if (value) {
              createNode(adapter, type);
              handleEditing(false);
            } else {
              titleTextarea.classList.add("kul-danger");
              titleTextarea.kulHelper = {
                value: "This field is mandatory",
              };
            }
            break;
          }
          case "delete":
            adapter.actions.delete.option(node, type);
            break;
          case "edit":
            handleEditing(true);
            break;
        }
      }
    },
    //#endregion

    //#region Chip
    chip: async (e) => {
      const { comp, eventType, selectedNodes } = e.detail;

      const filtersSetter = adapter.set.messenger.ui.filters;

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
            newFilters[n.id] = true;
          });
          filtersSetter(newFilters);
          break;
        case "ready":
          const filters = adapter.get.messenger.ui().filters;
          const nodes: string[] = [];
          for (const key in filters) {
            if (Object.prototype.hasOwnProperty.call(filters, key)) {
              const option = filters[key];
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
    image: (_e, node, index) => {
      const coverSetter = adapter.set.image.cover;

      const matchedType = Object.keys(CHILD_ROOT_MAP).find((key) =>
        node.id.includes(key),
      ) as keyof typeof CHILD_ROOT_MAP;

      if (matchedType) {
        coverSetter(CHILD_ROOT_MAP[matchedType], index);
      }
    },
  };
  //#endregion
};
