import {
  KulMessengerAdapter,
  KulMessengerAdapterGetters,
  KulMessengerAdapterSetters,
  KulMessengerBaseChildNode,
  KulMessengerImageTypes,
  KulMessengerPanelsValue,
  KulMessengerUnionChildIds,
} from "../kul-messenger-declarations";

//#region Getters
export const prepUiGetters = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterGetters["ui"] => {
  return () => {
    const { ui } = getAdapter().controller.get.compInstance;
    return ui;
  };
};
//#endregion

//#region Setters
export const prepUiSetters = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterSetters["ui"] => {
  return {
    customization: (value) => {
      const { compInstance } = getAdapter().controller.get;

      compInstance.ui.customization = value;
      compInstance.refresh();
    },
    editing: async (value, type, node = null) =>
      setEditing(getAdapter, value, type, node),
    filters: (filters) => {
      const { compInstance } = getAdapter().controller.get;

      compInstance.ui.filters = filters;
      compInstance.refresh();
    },
    options: (value, type) => {
      const { compInstance } = getAdapter().controller.get;

      compInstance.ui.options[type] = value;
      compInstance.refresh();
    },
    panel: (panel, value?) => setPanel(getAdapter, panel, value),
  };
};
//#endregion

//#region Helpers
const setEditing = async <T extends KulMessengerUnionChildIds>(
  getAdapter: () => KulMessengerAdapter,
  value: boolean,
  type: KulMessengerImageTypes,
  node?: KulMessengerBaseChildNode<T>,
) => {
  const adapter = getAdapter();
  const { controller, elements } = adapter;
  const { compInstance, image } = controller.get;
  const {} = elements.refs;

  compInstance.ui.editing[type] = value;
  compInstance.editingStatus[type] = node ? node.id : image.newId(type);
  if (!node) {
    compInstance.refresh();
  } else {
    await compInstance.refresh();
    requestAnimationFrame(() => {
      const comps = adapter.components.editing[type];
      const hasImage = node?.cells?.kulImage?.value;
      comps.descriptionTextarea.setValue(node.description);
      comps.titleTextarea.setValue(node.value);
      if (hasImage) {
        comps.imageUrlTextarea.setValue(node.cells.kulImage.value);
      }
    });
  }
};
const setPanel = (
  getAdapter: () => KulMessengerAdapter,
  panel: KulMessengerPanelsValue,
  value?: boolean,
) => {
  const adapter = getAdapter();
  const { compInstance } = adapter.controller.get;
  const { panels } = adapter.controller.get.ui();

  switch (panel) {
    case "left":
      panels.isLeftCollapsed = value ?? !panels.isLeftCollapsed;
      break;
    case "right":
      panels.isRightCollapsed = value ?? !panels.isRightCollapsed;
      break;
  }

  compInstance.refresh();
  return value;
};
//#endregion
