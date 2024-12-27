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

      compInstance.ui.customizationView = value;
      compInstance.refresh();
    },
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
    setFormState: async (value, type, node = null) =>
      setFormState(getAdapter, value, type, node),
  };
};
//#endregion

//#region Helpers
const setFormState = async <T extends KulMessengerUnionChildIds>(
  getAdapter: () => KulMessengerAdapter,
  value: boolean,
  type: KulMessengerImageTypes,
  node?: KulMessengerBaseChildNode<T>,
) => {
  const adapter = getAdapter();
  const { controller } = adapter;
  const { compInstance, image } = controller.get;
  const { formStatusMap, ui } = compInstance;

  ui.form[type] = value;

  if (!value) {
    formStatusMap[type] = null;
  } else {
    formStatusMap[type] = node?.id ?? image.newId(type);
  }

  await compInstance.refresh();
};
const setPanel = (
  getAdapter: () => KulMessengerAdapter,
  panel: KulMessengerPanelsValue,
  value?: boolean,
) => {
  const adapter = getAdapter();
  const { compInstance } = adapter.controller.get;
  const { panels } = compInstance.ui;

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
