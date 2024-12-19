import { prepCharacter } from "./elements/character";
import { prepChat } from "./elements/chat";
import { prepOptions } from "./elements/options";
import { prepCharacterHandlers } from "./handlers/character";
import { prepChatHandlers } from "./handlers/chat";
import { prepOptionsHandlers } from "./handlers/options";
import { REFS } from "./helpers/constants";
import { updateDataset } from "./helpers/utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterGetters,
  KulMessengerAdapterHandlers,
  KulMessengerAdapterJsx,
  KulMessengerAdapterSetters,
} from "./kul-messenger-declarations";

//#region Adapter
export const createAdapter = (
  getters: KulMessengerAdapterInitializerGetters,
  setters: KulMessengerAdapterInitializerSetters,
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapter => {
  return {
    controller: {
      get: createGetters(getters),
      set: createSetters(setters, getAdapter),
    },
    elements: {
      jsx: createJsx(getAdapter),
      refs: REFS(),
    },
    handlers: createHandlers(getAdapter),
  };
};
//#endregion

//#region Controller
export const createGetters = (
  getters: KulMessengerAdapterInitializerGetters,
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterGetters => {
  return {
    ...getters,
    config: () => {
      const { currentCharacter } = getAdapter().controller.get.compInstance;
      return {
        currentCharacter: currentCharacter.id,
        ui: "messenger.ui" as any,
      };
    },
    data: () => {
      const { kulData } = getAdapter().controller.get.compInstance;
      return kulData;
    },
    history: () => {
      const { history } = getAdapter().controller.get.compInstance;
      return history;
    },
    status: {
      connection: () => {
        const { connectionStatus } = getAdapter().controller.get.compInstance;
        return connectionStatus;
      },
      editing: () => {
        const { editingStatus } = getAdapter().controller.get.compInstance;
        return editingStatus;
      },
      hoveredCustomizationOption: () => {
        const { hoveredCustomizationOption } =
          getAdapter().controller.get.compInstance;
        return hoveredCustomizationOption;
      },
      save: {
        inProgress: () => {
          const { saveInProgress } = getAdapter().controller.get.compInstance;
          return saveInProgress;
        },
      },
    },
    ui: () => {
      const { ui } = getAdapter().controller.get.compInstance;
      return ui;
    },
  };
};
export const createSetters = (
  setters: KulMessengerAdapterInitializerSetters,
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterSetters => {
  return {
    ...setters,
    data: () => updateDataset(getAdapter()),
    status: {
      connection: (status) => {
        const { compInstance } = getAdapter().controller.get;
        compInstance.connectionStatus = status;
      },
      editing: (type, id) => {
        const { compInstance } = getAdapter().controller.get;
        compInstance.editingStatus[type] = id;
      },
      hoveredCustomizationOption: (node) => {
        const { compInstance } = getAdapter().controller.get;
        compInstance.hoveredCustomizationOption = node;
      },
      save: {
        inProgress: (value) => {
          const { compInstance } = getAdapter().controller.get;
          compInstance.saveInProgress = value;
        },
      },
    },
    ui: {
      customization: (value) => {
        const { compInstance } = getAdapter().controller.get;

        compInstance.ui.customization = value;
        compInstance.refresh();
      },
      editing: async (value, type, node = null) => {
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
      panel: (panel, value?) => {
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
      },
    },
    spinnerStatus: (active) =>
      (getAdapter().elements.refs.details.spinner.kulActive = active),
  };
};
//#endregion

//#region Elements
export const createJsx = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterJsx => {
  return {
    character: prepCharacter(getAdapter),
    chat: prepChat(getAdapter),
    options: prepOptions(getAdapter),
  };
};
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterHandlers => {
  return {
    character: prepCharacterHandlers(getAdapter),
    chat: prepChatHandlers(getAdapter),
    options: prepOptionsHandlers(getAdapter),
  };
};
//#endregion
